package com.capstone.beginsetup;


import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.auth.DefaultAWSCredentialsProviderChain;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.ec2.model.*;

import com.amazonaws.services.ec2.AmazonEC2;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.Bucket;
import com.amazonaws.services.s3.model.ListObjectsV2Result;
import com.amazonaws.services.simplesystemsmanagement.AWSSimpleSystemsManagement;
import com.amazonaws.services.simplesystemsmanagement.model.GetInventoryRequest;
import com.amazonaws.services.simplesystemsmanagement.model.GetInventoryResult;
import com.amazonaws.services.simplesystemsmanagement.model.InventoryResultEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.amazonaws.services.simplesystemsmanagement.model.InventoryFilter;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.resourcegroupstaggingapi.AWSResourceGroupsTaggingAPI;
import com.amazonaws.services.resourcegroupstaggingapi.AWSResourceGroupsTaggingAPIClientBuilder;
import com.amazonaws.services.resourcegroupstaggingapi.model.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@SpringBootApplication
public class BeginsetupApplication implements CommandLineRunner {
    @Autowired
    private AmazonEC2 amazonEC2;
    @Autowired
    private AWSSimpleSystemsManagement ssmClient;

    public static void main(String[] args) {
        SpringApplication.run(BeginsetupApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {


        System.out.println("Compiled successfully");

    }

}

















