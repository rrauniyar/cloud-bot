package com.capstone.beginsetup.controller;

import com.amazonaws.services.s3.model.Bucket;
import com.capstone.beginsetup.service.S3BucketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class S3BucketController {
    @Autowired
    private  S3BucketService s3BucketService;


    @GetMapping("/buckets")

    public List<Bucket> getBucketsForUser() {
        return s3BucketService.listBucketsForAccount();
    }


}