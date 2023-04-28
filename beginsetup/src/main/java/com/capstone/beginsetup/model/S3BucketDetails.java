package com.capstone.beginsetup.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class S3BucketDetails {
    private String name;
    private long size;
    private String owner;
    private String creationDate;
    private boolean versioningEnabled;
}
