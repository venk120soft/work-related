# RPM (Remote Patient Monitoring) Buy 2 Pay
## Overview of the Business Application
RPM stands for Remote Patient Monitoring

RPM consist of Bluetooth enable monitoring devices, currently we have 
1) Blood Pressure cufffs(Regular and XL)
2) Weighing scales
3) Doppler(recently added): Monitoring heart rate of baby (Fatal doppler) Monitoring Blood flow

These units are covered under the regional programs of Kaiser Permenente

To get these devices, patient has to be prescribed by the provider(doctor). there is no co-pay or co-insurance required but pre-auth(doctor prescription) is required 

What is co-pay/co-insurance?
These are extra doller amount to get the services

## Why do we need these RPM devices Project?
There is a current application where we order these 3 devices manually and there is no Product catalog management within KP to get th real time update of product and catalog information availabe. 
no notification to product stock updates post order submission

There is 2 types of ordering
1) Individual ordering
2) Bulk ordering

As the results these basic infrstructure both these orderings are suffering, then to address these issues this project came acress

## What's the goal of this project?
1) The goal of this project is to automate the Ordering workflow by integrating Multiple internal and external entities to provide better order fulfilment
2) Providers/Clinicians have full flexibility and transperency in preparing RPM orders instead of Manual intervention to other applications and they should be able to see availability of product catalog when they are ordering
3) Providers/Clinicians would have the ability to be notified and review product status, alternatives stock fulfilment process etc

## Who are using or RPM Stake holders?
1) KP Provider(Doctor/Clinical member)
2) KP Member(Patient or Dependents of the patient)
3) Suppliers(Organizations who supply the medical equipments)
4) IT Fulfilment

## Functional flow or Architecture
There are 2 types of Ordering
1) Clinician/Provider Ordering
2) MOB/ Disperse from Closet()

**KP Health Connect System** is also know as an **EPIC** is an User Interface used by the providers/clinicians to create oders check the status and so on.
KP Health Connect UI is implemented based on EPIC software with some improvements. **We can say KPHC is the Customized Front end of EPIC**
 
 ### What is EPIC?
 EPIC is Epic is the preferred electronic medical record system used by more than 250 health care organizations nationwide. 
 To date, 45 percent of the US population have their medical records in an Epic system.
 
Bulk Medical equipment orders made in one line by the provide which is then send to the Product Supplier/
Then, Product Supllier will directly semd RPM devices to the Medical Office to stock in closet.

## Who are having access to Disperse from Closet?
Health Ally is an application used by the Providers to access the devices in instore stock.
Health Ally acts as the application between Validic and Health Connect to Identify the Eligible members for dispensing the RPM devices.
Validic is maintaining all the eligible members data

When the Provider select the option either the member is enrolled to have RPM devices or not. If the answer is no order sent to validic/health ally and provider get notification for 30 days to make the member joined any of the region to avail

With this statement, can we understand that the patient is getting the RPM device from the closet??

Is it mandate to enroll in RMP Programm?


FAM(Federated Access Management): Authentication and Autherization of the members
