package com.capstone.beginsetup.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InstanceTypeDto {
    private String instanceType;
    private Integer vCPU;
    private Integer memory;
    private Double costPerCpu;
    private Double costPerMemory;
    private Double costPerHour;
    private Double costPerMonth;
    private Double CostPerMemory;
}
