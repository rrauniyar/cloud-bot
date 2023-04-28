package com.capstone.beginsetup.controller;


import com.amazonaws.services.costexplorer.AWSCostExplorer;
import com.amazonaws.services.costexplorer.model.*;
import com.capstone.beginsetup.model.CostAndUsage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RestController
public class CostAndUsageController {

    @Autowired
    AWSCostExplorer awsCostExplorer;

    @GetMapping("/cost")
    public List<CostAndUsage> getCostAndUsageReports() {

        LocalDate startDate = LocalDate.now().minusMonths(1);
        LocalDate endDate = LocalDate.now();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        List<CostAndUsage> costAndUsageList = new ArrayList<>();



        GetCostAndUsageRequest request = new GetCostAndUsageRequest()
                .withTimePeriod(new DateInterval()
                        .withStart(startDate.format(formatter))
                        .withEnd(endDate.format(formatter)))
                .withGranularity(Granularity.MONTHLY)
                .withMetrics("BlendedCost")
                .withGroupBy(new GroupDefinition()
                        .withType("DIMENSION")
                        .withKey("SERVICE"));

        GetCostAndUsageResult result = awsCostExplorer.getCostAndUsage(request);

        for (ResultByTime resultByTime : result.getResultsByTime()) {
            for (Group group : resultByTime.getGroups()) {
                CostAndUsage costAndUsage = new CostAndUsage(group.getKeys().get(0), resultByTime.getTimePeriod().getStart(), group.getMetrics().get("BlendedCost").getAmount());
                costAndUsageList.add(costAndUsage);
            }
        }
        return costAndUsageList;
    }
}
