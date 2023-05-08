package com.capstone.beginsetup.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.costexplorer.AWSCostExplorer;
import com.amazonaws.services.costexplorer.AWSCostExplorerClientBuilder;
import com.amazonaws.services.ec2.AmazonEC2;
import com.amazonaws.services.ec2.AmazonEC2ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
@Configuration
public class AWSCostExplorerConfig {
        @Value("${aws.access.key}")
        private String accessKey;

        @Value("${aws.secret.key}")
        private String secretKey;

    @Value("${aws.region}")
    private String region;

        @Bean
        public AWSCostExplorer amazonCostExplorer() {
            AWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
            AWSCostExplorer awsCostExplorer = AWSCostExplorerClientBuilder.standard()
                    .withCredentials(new AWSStaticCredentialsProvider(credentials))
                    .withRegion(region)
                    .build();
            return awsCostExplorer;
        }

}
