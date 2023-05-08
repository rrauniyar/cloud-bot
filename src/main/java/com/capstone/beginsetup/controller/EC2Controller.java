package com.capstone.beginsetup.controller;

import com.amazonaws.services.costexplorer.AWSCostExplorer;
import com.amazonaws.services.costexplorer.model.*;
import com.amazonaws.services.ec2.AmazonEC2;
import com.amazonaws.services.ec2.model.*;

import com.amazonaws.services.simplesystemsmanagement.AWSSimpleSystemsManagement;
import com.capstone.beginsetup.model.InstanceTypeDtos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1")
public class EC2Controller {

    @Autowired
    private AmazonEC2 amazonEC2;
    @Autowired
    AWSSimpleSystemsManagement s;


    @GetMapping("/instances")

    public List<Instance> getInstances() {

        DescribeInstancesRequest request = new DescribeInstancesRequest();

        DescribeInstancesResult result = amazonEC2.describeInstances(request);

        List<Reservation> reservations = result.getReservations();
        List<Instance> instances = new ArrayList<>();
        for (Reservation reservation : reservations) {
            instances.addAll(reservation.getInstances());
        }

        return instances;
    }


    @GetMapping("/instance-types/{type}")
    public String getInstanceTypeInfo(@PathVariable String type) {
        DescribeInstanceTypesRequest request = new DescribeInstanceTypesRequest().withInstanceTypes(type);
        DescribeInstanceTypesResult result = amazonEC2.describeInstanceTypes(request);
        InstanceTypeInfo instanceTypeInfo = result.getInstanceTypes().get(0);
        int vCpus = instanceTypeInfo.getVCpuInfo().getDefaultVCpus();
        Long memory = instanceTypeInfo.getMemoryInfo().getSizeInMiB()/ 1024;
        return "Instance Type: " + type + "\n" + "vCPUs: " + vCpus + "\n" + "ramSizeInGb: " + memory;
    }

    @GetMapping("/instance-types")
    public List<InstanceTypeInfo> getInstanceTypes() {
        DescribeInstanceTypesRequest request = new DescribeInstanceTypesRequest();
        DescribeInstanceTypesResult result = amazonEC2.describeInstanceTypes(request);
        return result.getInstanceTypes();
    }

    @GetMapping("/instance-types/info")
    public List<InstanceTypeDtos> getInstanceTypesInformation() {
        DescribeInstanceTypesResult result = amazonEC2.describeInstanceTypes(new DescribeInstanceTypesRequest());
        List<InstanceTypeDtos> instanceTypes = result.getInstanceTypes().stream()
                .map(instanceTypeInfo -> new InstanceTypeDtos(
                        instanceTypeInfo.getInstanceType(),
                        instanceTypeInfo.getVCpuInfo().getDefaultVCpus(),
                        Math.toIntExact(instanceTypeInfo.getMemoryInfo().getSizeInMiB())/ 1024
                ))
                .collect(Collectors.toList());
        return instanceTypes;
    }

    @GetMapping("/instance-types/information")
    public List<InstanceTypeDtos> getInstanceTypeInformationData() {
        List<InstanceTypeDtos> instanceTypes = new ArrayList<>();
        DescribeInstancesResult result = amazonEC2.describeInstances(new DescribeInstancesRequest()
                .withFilters(new Filter("instance-state-name").withValues("running")));
        List<Reservation> reservations = result.getReservations();
        for (Reservation reservation : reservations) {
            List<Instance> instances = reservation.getInstances();
            for (Instance instance : instances) {
                String instanceType = instance.getInstanceType();
                DescribeInstanceTypesResult instanceTypesResult = amazonEC2.describeInstanceTypes(
                        new DescribeInstanceTypesRequest().withInstanceTypes(instanceType)
                );
                InstanceTypeInfo instanceTypeInfo = instanceTypesResult.getInstanceTypes().get(0);
                InstanceTypeDtos instanceTypeDtos = new InstanceTypeDtos(
                        instanceTypeInfo.getInstanceType(),
                        instanceTypeInfo.getVCpuInfo().getDefaultVCpus(),
                        Math.toIntExact(instanceTypeInfo.getMemoryInfo().getSizeInMiB()) / 1024
                );
                instanceTypes.add(instanceTypeDtos);
            }
        }
        return instanceTypes;

    }

}









