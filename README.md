# SFDX  Deployment Issue.
In this repo, we have created a sample DX project to reproduce the picklist too long issue. 

## Prerequisites 
1. Salesfore CLI 
2. Salesforce DX org and DevHub enabled
3. Any Managed package from Appexchange.
    For ex: **Lightning Carousel and Banner package** [Link](https://appexchange.salesforce.com/appxListingDetail?listingId=a0N3A00000EFp50UAD)

## Steps to reproduce the issue:
1. Create New DX Project.
  ```
  sfdx force:project:create --projectname DemoApp
  ```
2. Connect your DevHub Org and set alias as dx.
  ```
  sfdx force:auth:web:login -d -a dx
  ```
3. Create new scracth Org and set alias as s1
  ```
  sfdx force:org:create -f config/project-scratch-def.json -d 30 --setalias
  ```
4. Install **Lightning Carousel and Banner package** on DevHub and Scratch Org.
  ```
  sfdx force:package:install --package 04tB00000009XuZIAU -u dx -w 10
  sfdx force:package:install --package 04tB00000009XuZIAU -u s1
  ```
5. Now open the DevHub org and create field dependancy in the managed package object.
  - Open salesforce with following command
  `sfdx force:org:open -u dx`
  - Go to setup, naviagte to objects.
  - Open Carousel Slide object.
  - Click PickList Field in Custom Fields section.
  - Click New  
  - Add new value with 245 characters.
  - Create ReordType and include the picklist field.
6. Now get back to the DX project folder and Create Package.xml file with only these picklist field and recordtype.
7. Run the follwoing command to retreive source data based on the Package.xml
  ```
  sfdx force:mdapi:retrieve -r ./mdapipkg  -k ./package.xml -u dx
  ```
8. Unzip the downloaded metadata and convert into dx format using following command.
  ```
  sfdx force:mdapi:convert -r mdapipkg
  ```
9. Now push this changes to scratch org using following command.
  ```
  sfdx force:source:push -u s1
  ```
10. You may get the follwoing deployment error due the recordtype picklist value has encoded strings, which increases 255 character limit.

**Error  mdapipkg/objects/cloudx_cms__SS_Carousel_Slide__c.object  cloudx_cms__SS_Carousel_Slide__c.cloudx_cms__image  Picklist value is too long for the max size of 255**

## Temporary fix for this issue:
manually replace encoded picklist value in recordtype with its original value and deploy your changes.
