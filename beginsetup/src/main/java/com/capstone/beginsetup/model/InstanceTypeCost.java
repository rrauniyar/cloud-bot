package com.capstone.beginsetup.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class InstanceTypeCost {

    private String month;

    private BigDecimal cost;

    public InstanceTypeCost(String month, String cost) {

    }
}
