package com.capstone.beginsetup.controller;
import com.amazonaws.services.ec2.AmazonEC2;
import com.amazonaws.services.ec2.AmazonEC2ClientBuilder;
import com.amazonaws.services.ec2.model.*;

import com.capstone.beginsetup.model.InstanceTypeData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class InstanceController {
@Autowired
private  AmazonEC2 ec2Client;
    @GetMapping("/instances")
    public List<InstanceTypeData> getInstancesDetails() {


        // Describe all running instances
        DescribeInstancesRequest describeInstancesRequest = new DescribeInstancesRequest();
        describeInstancesRequest.withFilters(new Filter("instance-state-name").withValues("running"));

        DescribeInstancesResult describeInstancesResult = ec2Client.describeInstances(describeInstancesRequest);
        List<Reservation> reservations = describeInstancesResult.getReservations();

        Map<String, InstanceTypeData> instanceTypeDataMap = new HashMap<>();

        // Calculate the vCPUs, memory, and cost of each running instance type
        for (Reservation reservation : reservations) {
            List<Instance> instances = reservation.getInstances();

            for (Instance instance : instances) {
                String instanceType = instance.getInstanceType();
                String resourceId = instance.getInstanceId();
                String resourceType = "AWS::EC2::Instance";


                // Retrieve the pricing information for the instance type
                DescribeSpotPriceHistoryRequest describeSpotPriceHistoryRequest = new DescribeSpotPriceHistoryRequest();
                describeSpotPriceHistoryRequest.withInstanceTypes(instanceType);

                DescribeSpotPriceHistoryResult describeSpotPriceHistoryResult = ec2Client.describeSpotPriceHistory(describeSpotPriceHistoryRequest);
                List<SpotPrice> spotPrices = describeSpotPriceHistoryResult.getSpotPriceHistory();

                if (spotPrices.size() > 0) {
                    SpotPrice spotPrice = spotPrices.get(0);

                    // Calculate the cost per hour for the instance
                    double costPerHour = Double.parseDouble(spotPrice.getSpotPrice());
                    double costPerDay = costPerHour * 24.0;
                    double costPerMonth = costPerDay * 30.0;
                    double costPerYear = costPerMonth * 12.0;

                    // Retrieve the instance type information
                    DescribeInstanceTypesRequest describeInstanceTypesRequest = new DescribeInstanceTypesRequest();
                    describeInstanceTypesRequest.withInstanceTypes(instanceType);

                    DescribeInstanceTypesResult describeInstanceTypesResult = ec2Client.describeInstanceTypes(describeInstanceTypesRequest);
                    List<InstanceTypeInfo> instanceTypes = describeInstanceTypesResult.getInstanceTypes();

                    if (instanceTypes.size() > 0) {
                        InstanceTypeInfo instanceTypeInfo = instanceTypes.get(0);

                        // Retrieve the vCPU and memory information for the instance type
                        int vCpus = instanceTypeInfo.getVCpuInfo().getDefaultVCpus();
                        int memory = Math.toIntExact(instanceTypeInfo.getMemoryInfo().getSizeInMiB());

                        // Add or update the instance type data in the map
                        InstanceTypeData instanceTypeData = instanceTypeDataMap.getOrDefault(instanceType, new InstanceTypeData(instanceType, 0, 0, 0.0,0.0,0.0,0.0,0.0,resourceType,resourceId));
                        instanceTypeData.setVCpus(instanceTypeData.getVCpus() + vCpus);
                        instanceTypeData.setMemory(instanceTypeData.getMemory() + memory);
                        instanceTypeData.setCostPerHour(instanceTypeData.getCostPerHour() + costPerHour);
                        instanceTypeData.setCostPerMonth(instanceTypeData.getCostPerMonth() + costPerMonth);
                        instanceTypeData.setCostPerYear(instanceTypeData.getCostPerYear() + costPerYear);
                        instanceTypeData.setCostPerVCpu(instanceTypeData.getCostPerVCpu() + (costPerHour / vCpus));
                        instanceTypeData.setCostPerMemory(instanceTypeData.getCostPerMemory() + (costPerHour / memory));
                        instanceTypeDataMap.put(instanceType, instanceTypeData);
                    }
                }
            }
        }

        // Convert the map to a list

        // Convert the map to a list
        List<InstanceTypeData> instanceTypeDataList = new ArrayList<>(instanceTypeDataMap.values());

        // Return the list of instance type data
        return instanceTypeDataList;
    }
}
