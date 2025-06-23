# Cloud Resume Project – Ali Wazeer

This project is a complete implementation of the Cloud Resume Challenge. It demonstrates skills in DevOps, Cloud Infrastructure, and Full-Stack serverless application development. The main goal is to host a resume website with a real-time visitor counter using AWS services and manage the infrastructure using Terraform.

## Table of Contents

* Project Overview
* Tech Stack Used
* File Structure
* How the Project Works
* Terraform Scripts
* Lambda Function
* Frontend Files
* Deployment Steps

---

## Technical Flow Diagram (Textual)

User Browser
   │
   └──► S3 (Static Website Hosting)
             │
             ▼
   index.html + script.js (JS sends fetch to API Gateway)
             │
             ▼
       API Gateway (ANY /visitor)
             │
             ▼
     AWS Lambda Function
             │
             ▼
     DynamoDB Table (visitor-count)
             │
             ▼
   Returns updated count → Displayed in frontend


## Project Overview

The website displays a cloud-hosted resume with a real-time visitor counter. The counter is powered by a Lambda function that interacts with a DynamoDB table. Every time a visitor loads the page, the visitor count is fetched from the database and incremented.

This setup is completely serverless and deployed using Infrastructure as Code (Terraform). The frontend is hosted in an Amazon S3 bucket with public access via a static website.

---

## Tech Stack Used

* AWS S3 (Static Website Hosting)
* AWS DynamoDB (Visitor Count Storage)
* AWS Lambda (Backend Function)
* AWS API Gateway (HTTP Interface)
* AWS IAM (Permissions)
* Terraform (Infrastructure as Code)
* GitHub Actions (CI/CD pipeline)
* JavaScript (Fetch API to call Lambda)
* HTML/CSS (Frontend)

---

## Project File Structure

```
cloud-resume/
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── lambda/
│   └── handler.py
├── backend/
│   ├── lambda_function.py
│   └── requirements.txt
├── terraform/
│   ├── api_gateway.tf
│   ├── dynamodb.tf
│   ├── iam.tf
│   ├── lambda.tf
│   ├── s3.tf
│   ├── variables.tf
│   └── lambda_function_payload.zip
├── .github/
│   └── workflows/
│       └── deploy.yml
└── README.md
```

---

## How the Project Works

1. A visitor opens the website hosted in the S3 bucket.
2. The browser runs a JavaScript script that sends a request to an API Gateway endpoint.
3. The API Gateway routes the request to a Lambda function.
4. The Lambda function retrieves and increments the visitor count from the DynamoDB table.
5. The updated count is sent back to the frontend and displayed in the browser.

---

## Terraform Scripts

* `dynamodb.tf`: Creates the DynamoDB table with a string `id` as the primary key.
* `iam.tf`: Creates IAM roles and policies to allow Lambda to interact with DynamoDB.
* `lambda.tf`: Deploys the Lambda function and sets its IAM execution role and source code.
* `s3.tf`: Creates the S3 bucket and configures it for static website hosting.
* `api_gateway.tf`: Creates the API Gateway, routes, and integrates it with Lambda.
* `variables.tf`: Contains variable definitions for bucket names and region.
* `lambda_function_payload.zip`: The zipped code used to upload the Lambda function.

---

## Lambda Function

Path: `lambda/handler.py`

```python
import boto3
import os
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('visitor-count')

def lambda_handler(event, context):
    response = table.update_item(
        Key={'id': '1'},
        UpdateExpression='ADD visitor_count :incr',
        ExpressionAttributeValues={':incr': 1},
        ReturnValues='UPDATED_NEW'
    )

    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'body': '{"count": ' + str(response['Attributes']['visitor_count']) + '}'
    }
```

---

## Frontend Files

### index.html

Contains the structure of the resume website, including sections like About Me, Skills, Project, and Contact.

### style.css

Provides styling to the resume using modern CSS and layout for dark/light theme toggle and responsive design.

### script.js

Sends a fetch request to the API Gateway and displays the live visitor count.

```javascript
fetch('https://your-api-id.execute-api.us-east-1.amazonaws.com/prod/visitor')
  .then(res => {
    if (!res.ok) {
      throw new Error('HTTP error! status: ' + res.status)
    }
    return res.json()
  })
  .then(data => {
    document.getElementById('visitor-count').innerText = data.count
  })
  .catch(err => {
    document.getElementById('visitor-count').innerText = 'Error'
    console.error('Failed to fetch visitor count:', err)
  })
```

Replace `'your-api-id'` with the actual API Gateway ID.

---

## Deployment Steps

1. Initialize Terraform
   `terraform init`

2. Plan infrastructure changes
   `terraform plan`

3. Apply changes
   `terraform apply`

4. Zip Lambda function
   `Compress-Archive -Path handler.py -DestinationPath ../lambda_function_payload.zip -Force`

5. Sync frontend to S3
   `aws s3 sync ./frontend s3://your-bucket-name/`

6. Visit the S3 website URL to view the resume

---

## Final Result

A fully functional static resume website with:

* Live visitor tracking
* Serverless backend using Lambda and DynamoDB
* API integration via API Gateway
* Infrastructure built and managed by Terraform
* CI/CD pipeline for automatic deployment

