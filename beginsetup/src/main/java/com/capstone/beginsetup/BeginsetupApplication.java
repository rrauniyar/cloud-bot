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
//		BasicAWSCredentials credentials = new BasicAWSCredentials("AKIAY2NQXGDSTQYWQ2JQ", "dFths7qHqMrMcCGMhYIpbNTBaRlqAz67ZyLagAQR");
//		AmazonS3 s3 = AmazonS3ClientBuilder.standard()
//				.withCredentials(new AWSStaticCredentialsProvider(credentials))
//				.withRegion(Regions.EU_NORTH_1)
//				.build();
//  List<Bucket> buckets=s3.listBuckets();
//
//  buckets.stream().forEach(bucket -> {
//	  System.out.println(bucket.getName()+" "+bucket.getOwner().getDisplayName()+ " "+bucket.getCreationDate());
//  });
//


//		DescribeInstancesResult result = amazonEC2.describeInstances();
//		List<Reservation> reservations = result.getReservations();
//		for (Reservation reservation : reservations) {
//			List<Instance> instances = reservation.getInstances();
//			for (Instance instance : instances) {
//				// Do something with the instance object, e.g. print its ID System.out.println(instance.getInstanceId());
//				String instanceId = instance.getInstanceId();
//				String instanceType = instance.getInstanceType();
//				String imageId = instance.getImageId();
//				String keyName = instance.getKeyName();
//				//List<String> securityGroupIds = instance.getSecurityGroups().stream().map(SecurityGroup::getGroupId).collect(Collectors.toList());
//				List<String> securityGroupIds = instance.getSecurityGroups().stream()
//						.map(group -> group.getGroupId())
//						.collect(Collectors.toList());
//
//				String privateIpAddress = instance.getPrivateIpAddress();
//				String publicIpAddress = instance.getPublicIpAddress();
//				InstanceState state = instance.getState();
//				Date launchTime = instance.getLaunchTime();
//				String iamInstanceProfile = instance.getIamInstanceProfile() != null ? instance.getIamInstanceProfile().getArn() : null;
//				String availabilityZone = instance.getPlacement().getAvailabilityZone();
//				String placementGroup = instance.getPlacement().getGroupName();
//				System.out.println("Instance ID: " + instanceId); System.out.println("Instance Type: " + instanceType); System.out.println("Image ID: " + imageId); System.out.println("Key Name: " + keyName);
//				System.out.println("Security Group IDs: " + securityGroupIds);
//				System.out.println("Private IP Address: " + privateIpAddress); System.out.println("Public IP Address: " + publicIpAddress); System.out.println("Instance State: " + state.getName()); System.out.println("Launch Time: " + launchTime); System.out.println("IAM Instance Profile: " + iamInstanceProfile); System.out.println("Availability Zone: " + availabilityZone); System.out.println("Placement Group: " + placementGroup); System.out.println("------------------------"); } }

////
////		// Create a map with EC2 inventory filters
////		Map<String, List<String>> ec2InventoryFilters = new HashMap<>();
////		ec2InventoryFilters.put("AWS:InstanceInformation.PlatformType", List.of("Linux", "Windows"));
////
////
////
		// Create the SSM Inventory request
//		GetInventoryRequest inventoryRequest = new GetInventoryRequest();
//		var filter = new InventoryFilter();
//		filter.setKey("AWS:InstanceInformation.PlatformType");
//		filter.setValues(List.of("Linux", "Windows"));
//		inventoryRequest.withFilters(filter);
////
//		// Retrieve the EC2 instance metadata from the SSM Inventory
//		GetInventoryResult inventoryResult = ssmClient.getInventory(inventoryRequest);
//		List<Software.amazon.awssdk.services.ssm.model.InventoryResultEntity> ec2Instances = inventoryResult.getEntities().stream()
//				.filter(entity -> entity.().equals("AWS:EC2:Instance"))
//				.collect(Collectors.toList());
//
//		// Print the EC2 instance metadata
//		for (InventoryResultEntity ec2Instance : ec2Instances) {
//			Map<String, InventoryResultAttributeValue> attributes = ec2Instance.data().asMap();
//			String instanceId = attributes.get("AWS:InstanceId").value();
//			String vpcId = attributes.get("AWS:VPCId").value();
//			String instanceType = attributes.get("AWS:InstanceInformation.InstanceType").value();
//			String osType = attributes.get("AWS:InstanceInformation.PlatformName").value();
//			String vCpuCount = attributes.get("AWS:InstanceInformation.CPUs").value();
//			String memorySize = attributes.get("AWS:InstanceInformation.Memory").value();
//			System.out.println("EC2 Instance: " + instanceId
//					+ " in " + vpcId
//					+ " has " + vCpuCount + " vCPU(s)"
//					+ " and " + instanceType + " instance type"
//					+ " with " + memorySize + " RAM"
//					+ " running " + osType);
//		}

//		public class GetInventory {
//
//			public static void main(String[] args) {
//
//				// Create an AWS Resource Groups Tagging API client
//				//AWSResourceGroupsTaggingAPI client = AWSResourceGroupsTaggingAPIClientBuilder.standard()
//						.withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration("tagging.us-east-1.amazonaws.com", "us-east-1"))
//						.build();
//
//				// Create a request to get all resources with tags
//				GetResourcesRequest getResourcesRequest = new GetResourcesRequest()
//						.withResourceTypeFilters("all")
//						.withTagFilters(new TagFilter().withKey("Name"));
//
//				// Get the resources with tags
//				GetResourcesResult getResourcesResult = client.getResources(getResourcesRequest);
//
//				// Print the resources with tags
//				for (ResourceTagMapping resourceTagMapping : getResourcesResult.getResourceTagMappingList()) {
//					System.out.println("ResourceARN: " + resourceTagMapping.getResourceARN());
//					System.out.println("Tags: " + resourceTagMapping.getTags());
//				}
//
//			}
//
//		}

//   }
//}
	}
}













