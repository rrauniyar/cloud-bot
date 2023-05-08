package com.capstone.beginsetup.controller;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import com.capstone.beginsetup.model.BucketDetails;
import com.capstone.beginsetup.model.MonthlyBucketDetails;
import com.capstone.beginsetup.model.YearlyBucketDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.Bucket;
import com.amazonaws.services.s3.model.ObjectListing;
import com.amazonaws.services.s3.model.S3ObjectSummary;

@RestController
@RequestMapping("/s3")
public class S3Controller {

    @Autowired
    private AmazonS3 s3Client;

    @GetMapping("/buckets-details")
    public List<BucketDetails> getBucketDetails() {
        List<BucketDetails> bucketDetailsList = new ArrayList<>();

        List<Bucket> buckets = s3Client.listBuckets();
        double totalSizeOfAllBuckets = 0;
        for (Bucket bucket : buckets) {
            BucketDetails bucketDetails = new BucketDetails();
            bucketDetails.setBucketName(bucket.getName());

            try {
                ObjectListing objectListing = s3Client.listObjects(bucket.getName());
                List<S3ObjectSummary> objectSummaries = objectListing.getObjectSummaries();
                long totalSize = 0;
                String storageClass = null;
                List<String> objectNames = new ArrayList<>();
                List<BucketDetails.ObjectDetails> objectDetailsList = new ArrayList<>();

                for (S3ObjectSummary objectSummary : objectSummaries) {
                    totalSize += objectSummary.getSize();
                    long objectSize = objectSummary.getSize();
                    BucketDetails.ObjectDetails objectDetails = new BucketDetails.ObjectDetails();
                    objectDetails.setObjectName(objectSummary.getKey());
                    objectDetails.setObjectSize(objectSize);
                    objectDetailsList.add(objectDetails);

                    if (storageClass == null) {
                        storageClass = objectSummary.getStorageClass();
                    } else if (!storageClass.equals(objectSummary.getStorageClass())) {
                        storageClass = "mixed";
                        break;
                    }
                    objectNames.add(objectSummary.getKey());

                }
                double gbSize = (double) totalSize / (1024 * 1024 * 1024);
                bucketDetails.setTotalSizeGb(gbSize);

                double usageSize = gbSize - totalSizeOfAllBuckets;
                bucketDetails.setUsageSizeGb(usageSize);
                bucketDetails.setStorageClass(storageClass);
                bucketDetails.setStorageObjectCount(objectSummaries.size());
                bucketDetails.setObjectNames(objectNames);
                bucketDetails.setObjectDetailsList(objectDetailsList);


                double costPerMonth = 0;
                switch (storageClass) {
                    case "STANDARD":
                        costPerMonth = gbSize * 0.023;
                        break;
                    case "INTELLIGENT_TIERING":
                        costPerMonth = gbSize * 0.022;
                        break;
                    case "STANDARD_IA":
                        costPerMonth = gbSize * 0.0125;
                        break;
                    case "ONEZONE_IA":
                        costPerMonth = gbSize * 0.01;
                        break;
                    case "GLACIER":
                        costPerMonth = gbSize * 0.004;
                        break;
                    case "DEEP_ARCHIVE":
                        costPerMonth = gbSize * 0.00099;
                        break;
                    case "mixed":
                    default:
                        costPerMonth = -1;
                }
                bucketDetails.setCostPerMonth(costPerMonth);

                totalSizeOfAllBuckets += gbSize;
            } catch (AmazonServiceException e) {
                System.out.println("Error getting bucket usage: " + e.getMessage());
                bucketDetails.setTotalSizeGb(-1.0);
                bucketDetails.setUsageSizeGb(-1.0);
                bucketDetails.setCostPerMonth(-1.0);
                bucketDetails.setStorageClass("Unknown");
                bucketDetailsList.add(bucketDetails);
                bucketDetails.setStorageObjectCount(-1);
                continue;
            }


            bucketDetailsList.add(bucketDetails);
        }

        return bucketDetailsList;

    }

    @GetMapping("/buckets-details/year-month")
    // List<BucketDetails>
    public ResponseEntity<?> getBucketDetailsMonth(@RequestParam("year") int year, @RequestParam("month") int month) {
        List<MonthlyBucketDetails> bucketDetailsList = new ArrayList<>();

        List<Bucket> buckets = s3Client.listBuckets();
        double totalSizeOfAllBuckets = 0;
        boolean dataFound = false;
        for (Bucket bucket : buckets) {
            MonthlyBucketDetails bucketDetails = new MonthlyBucketDetails();
            bucketDetails.setBucketName(bucket.getName());

            try {
                ObjectListing objectListing = s3Client.listObjects(bucket.getName());
                List<S3ObjectSummary> objectSummaries = objectListing.getObjectSummaries();
                long totalSize = 0;
                String storageClass = null;
                List<String> objectNames = new ArrayList<>();
                List<MonthlyBucketDetails.ObjectDetails> objectDetailsList = new ArrayList<>();

                for (S3ObjectSummary objectSummary : objectSummaries) {
                    Date lastModified = objectSummary.getLastModified();
                    Calendar cal = Calendar.getInstance();
                    cal.setTime(lastModified);
                    int objYear = cal.get(Calendar.YEAR);
                    int objMonth = cal.get(Calendar.MONTH) + 1; // 0-based index, so add 1
                    if (objYear == year && objMonth == month) {
                        dataFound = true;
                        totalSize += objectSummary.getSize();
                        long objectSize = objectSummary.getSize();
                        MonthlyBucketDetails.ObjectDetails objectDetails = new MonthlyBucketDetails.ObjectDetails();
                        objectDetails.setObjectName(objectSummary.getKey());
                        objectDetails.setObjectSize(objectSize);
                        objectDetailsList.add(objectDetails);

                        if (storageClass == null) {
                            storageClass = objectSummary.getStorageClass();
                        } else if (!storageClass.equals(objectSummary.getStorageClass())) {
                            storageClass = "mixed";
                            break;
                        }
                        objectNames.add(objectSummary.getKey());
                    }
                }
                if (!dataFound) {
                    // No information found for this month and year
                    String message = "No data available for year: " + year + ", month: " + month;
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
                }


                double gbSize = (double) totalSize / (1024 * 1024 * 1024);
                bucketDetails.setTotalSizeGb(gbSize);

                double usageSize = gbSize - totalSizeOfAllBuckets;
                bucketDetails.setYear(year);
                bucketDetails.setMonth(month);
                bucketDetails.setUsageSizeGb(usageSize);
                bucketDetails.setStorageClass(storageClass);
                bucketDetails.setStorageObjectCount(objectSummaries.size());
                bucketDetails.setObjectNames(objectNames);
                bucketDetails.setObjectDetailsList(objectDetailsList);

                double costPerMonth = 0;
                switch (storageClass) {
                    case "STANDARD":
                        costPerMonth = gbSize * 0.023;
                        break;
                    case "INTELLIGENT_TIERING":
                        costPerMonth = gbSize * 0.022;
                        break;
                    case "STANDARD_IA":
                        costPerMonth = gbSize * 0.0125;
                        break;
                    case "ONEZONE_IA":
                        costPerMonth = gbSize * 0.01;
                        break;
                    case "GLACIER":
                        costPerMonth = gbSize * 0.004;
                        break;
                    case "DEEP_ARCHIVE":
                        costPerMonth = gbSize * 0.00099;
                        break;
                    case "mixed":
                    default:
                        costPerMonth = -1;
                }

                bucketDetails.setCostPerMonth(costPerMonth);

                totalSizeOfAllBuckets += gbSize;
            } catch (AmazonServiceException e) {
                System.out.println("Error getting bucket usage: " + e.getMessage());
                bucketDetails.setTotalSizeGb(-1.0);
                bucketDetails.setUsageSizeGb(-1.0);
                bucketDetails.setCostPerMonth(-1.0);
                bucketDetails.setStorageClass("Unknown");
                bucketDetailsList.add(bucketDetails);
                bucketDetails.setStorageObjectCount(-1);
                continue;
            }

            bucketDetailsList.add(bucketDetails);
        }


        return ResponseEntity.ok(bucketDetailsList);
    }

    @GetMapping("/buckets-details/year")
    public ResponseEntity<?> getBucketDetailsYear(@RequestParam("year") int year) {
        List<YearlyBucketDetails> bucketDetailsList = new ArrayList<>();

        List<Bucket> buckets = s3Client.listBuckets();
        double totalSizeOfAllBuckets = 0;
//        double totalCostOfAllBuckets = 0;
        boolean dataFound = false;
        for (Bucket bucket : buckets) {
            YearlyBucketDetails bucketDetails = new YearlyBucketDetails ();
            bucketDetails.setBucketName(bucket.getName());

            try {
                ObjectListing objectListing = s3Client.listObjects(bucket.getName());
                List<S3ObjectSummary> objectSummaries = objectListing.getObjectSummaries();
                long totalSize = 0;
                String storageClass = null;
                List<String> objectNames = new ArrayList<>();
                List<YearlyBucketDetails .ObjectDetails> objectDetailsList = new ArrayList<>();

                for (S3ObjectSummary objectSummary : objectSummaries) {
                    Date lastModified = objectSummary.getLastModified();
                    Calendar cal = Calendar.getInstance();
                    cal.setTime(lastModified);
                    int objYear = cal.get(Calendar.YEAR);
                    if (objYear == year) {
                        dataFound = true;
                        totalSize += objectSummary.getSize();
                        long objectSize = objectSummary.getSize();
                        YearlyBucketDetails.ObjectDetails objectDetails = new YearlyBucketDetails.ObjectDetails();
                        objectDetails.setObjectName(objectSummary.getKey());
                        objectDetails.setObjectSize(objectSize);
                        objectDetailsList.add(objectDetails);

                        if (storageClass == null) {
                            storageClass = objectSummary.getStorageClass();
                        } else if (!storageClass.equals(objectSummary.getStorageClass())) {
                            storageClass = "mixed";
                            break;
                        }
                        objectNames.add(objectSummary.getKey());
                    }
                }
                if (!dataFound) {
                    // No information found for this year
                    String message = "No data available for year: " + year;
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
                }

                double gbSize = (double) totalSize / (1024 * 1024 * 1024);
                bucketDetails.setTotalSizeGb(gbSize);

                double usageSize = gbSize - totalSizeOfAllBuckets;
                bucketDetails.setYear(year);
                bucketDetails.setUsageSizeGb(usageSize);
                bucketDetails.setStorageClass(storageClass);
                bucketDetails.setStorageObjectCount(objectSummaries.size());
                bucketDetails.setObjectNames(objectNames);
                bucketDetails.setObjectDetailsList(objectDetailsList);

                double costPerYear = 0;
                switch (storageClass) {
                    case "STANDARD":
                        costPerYear = gbSize * 0.023 * 12;
                        break;
                    case "INTELLIGENT_TIERING":
                        costPerYear = gbSize * 0.022 * 12;
                        break;
                    case "STANDARD_IA":
                        costPerYear = gbSize * 0.0125 * 12;
                        break;
                    case "ONEZONE_IA":
                        costPerYear = gbSize * 0.01 * 12;
                        break;
                    case "GLACIER":
                        costPerYear = gbSize * 0.004 * 12;
                        break;
                    case "DEEP_ARCHIVE":
                        costPerYear = gbSize * 0.00099 * 12;
                        break;
                    case "mixed":
                    default:
                        costPerYear = -1;
                }

                bucketDetails.setCostPerYear(costPerYear);

                totalSizeOfAllBuckets += gbSize;
            } catch (AmazonServiceException e) {
                System.out.println("Error getting bucket usage: " + e.getMessage());
            }

            YearlyBucketDetails yearlyBucketDetails = new YearlyBucketDetails();
            yearlyBucketDetails.setYear(year);

               bucketDetailsList.add(bucketDetails);

        }
        return ResponseEntity.ok(bucketDetailsList);
    }
}

