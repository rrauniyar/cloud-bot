package com.capstone.beginsetup.controller;

import com.amazonaws.services.costexplorer.AWSCostExplorer;

import com.amazonaws.services.costexplorer.model.*;
import com.capstone.beginsetup.model.AWSCostReport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.Month;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.*;


import java.util.ArrayList;
import java.util.List;

@RestController
public class AWSCostController {
    @Autowired
    private AWSCostExplorer costExplorerClient;


    @GetMapping("/service-costs")
    public Map<String, Map<String, Double>> getServiceCosts(@RequestParam int year, @RequestParam int month) {
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.with(TemporalAdjusters.lastDayOfMonth());

        GetCostAndUsageRequest request = new GetCostAndUsageRequest()
                .withTimePeriod(new DateInterval().withStart(startDate.toString()).withEnd(endDate.toString()))
                .withGranularity(Granularity.MONTHLY)
                .withMetrics("UnblendedCost")
                .withGroupBy(new GroupDefinition().withType("DIMENSION").withKey("SERVICE"));

        GetCostAndUsageResult result = costExplorerClient.getCostAndUsage(request);

        Map<String, Map<String, Double>> response = new HashMap<>();
        double totalCost = 0;
        for (ResultByTime timeResult : result.getResultsByTime()) {
            Map<String, Double> serviceCosts = new HashMap<>();
            for (Group group : timeResult.getGroups()) {
                String serviceName = group.getKeys().get(0);
                double serviceCost = Double.parseDouble(group.getMetrics().get("UnblendedCost").getAmount());
                serviceCosts.put(serviceName, serviceCost);
                totalCost += serviceCost;
            }
            response.put(timeResult.getTimePeriod().getStart(), serviceCosts);
        }
        response.put("Total Cost", Collections.singletonMap("Total Cost", totalCost));
        return response;
    }

    @GetMapping("/total-cost")
    public AWSCostReport getAWSTotalCost() {
        LocalDate today = LocalDate.now();
        LocalDate startLocalDate = today.with(TemporalAdjusters.firstDayOfMonth());
        LocalDate endLocalDate = today.with(TemporalAdjusters.lastDayOfMonth());

        GetCostAndUsageRequest costAndUsageRequest = new GetCostAndUsageRequest()
                .withTimePeriod(new DateInterval()
                        .withStart(startLocalDate.format(DateTimeFormatter.ISO_LOCAL_DATE))
                        .withEnd(endLocalDate.format(DateTimeFormatter.ISO_LOCAL_DATE)))
                .withGranularity(Granularity.MONTHLY)
                .withMetrics("UnblendedCost")
                .withGroupBy(new GroupDefinition()
                        .withType("DIMENSION")
                        .withKey("SERVICE"));

        GetCostAndUsageResult costAndUsageResult = costExplorerClient.getCostAndUsage(costAndUsageRequest);

        List<ResultByTime> resultByTimeList = costAndUsageResult.getResultsByTime();

        List<Map<String, Object>> awsCostList = new ArrayList<>();
        double totalCostPerMonth = 0;
        double totalCostPerYear = 0;

        for (ResultByTime resultByTime : resultByTimeList) {
            List<Group> groupList = resultByTime.getGroups();

            for (Group group : groupList) {
                String serviceName = group.getKeys().get(0);
                Double serviceCost = Double.parseDouble(group.getMetrics().get("UnblendedCost").getAmount());

                Map<String, Object> costDetails = new HashMap<>();
                costDetails.put("service_name", serviceName);
                costDetails.put("cost_per_hour", serviceCost / 744); // assuming 31 days per month, 24 hours per day
                costDetails.put("cost_per_month", serviceCost);
                costDetails.put("cost_per_year", serviceCost * 12);

                awsCostList.add(costDetails);

                totalCostPerMonth += serviceCost;
                totalCostPerYear += serviceCost;
            }
        }

        String month = startLocalDate.getMonth().toString();
        String year = String.valueOf(startLocalDate.getYear());
        List<Map<String, Object>> costDetails = awsCostList;
        double totalCostPerHour = totalCostPerMonth / (31 * 24); // assuming 31 days per month, 24 hours per day

        return new AWSCostReport(month, year, totalCostPerHour,totalCostPerMonth, totalCostPerYear, costDetails);
    }
}


