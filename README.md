# SFDX  Deployment Issue.
To reproduce the issue regarding Picklist Field value too long(exceeds 255). This issue is not specific to DX, but still happens with Force.com migration utility.

## Prerequisites 
1. Salesfore CLI 
2. Salesforce DX org and DevHub enabled
3. Any Managed package from Appexchange.
    For ex: **Lightning Carousel and Banner package** [Link](https://appexchange.salesforce.com/appxListingDetail?listingId=a0N3A00000EFp50UAD)

## Steps to reproduce:
1. Clone the repo to local
2. Create a new Scratch org (alias = "s1")
  ```
  sfdx force:org:create -f config/project-scratch-def.json -d 30 --setalias
  ```
4. Install **Lightning Carousel and Banner package** on DevHub and Scratch Org.
  ```
  sfdx force:package:install --package 04tB00000009XuZIAU -u s1
  ```
5. Now push this changes to scratch org using following command.
  ```
  sfdx force:source:push -u s1
  ```
10. You may get the follwoing deployment error due the recordtype picklist value has encoded strings, which increases 255 character limit.

**Error  mdapipkg/objects/cloudx_cms__SS_Carousel_Slide__c.object  cloudx_cms__SS_Carousel_Slide__c.cloudx_cms__image  Picklist value is too long for the max size of 255**

## Temporary fix for this issue:
1. Go to dx project and open  cloudx_cms__SS_Carousel_Slide__c.object 
2. Manually replace encoded picklist value in recordtype with its original value
3. Now you can able to push your changes.
