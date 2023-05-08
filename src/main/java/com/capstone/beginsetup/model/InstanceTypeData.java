package com.capstone.beginsetup.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InstanceTypeData {
    private String instanceType;
    private int vCpus;
    private int memory;
    private double costPerHour;

    private double costPerMonth;
    private double costPerYear;
    private double CostPerVCpu;
    private double CostPerMemory;
    private String resourceType;
    private String resourceId;
}
