![Screenshot (149)](https://github.com/user-attachments/assets/fc3e3009-2e26-4a00-9bc7-9c54c9a2156e)# Cloud Resume Project – Ali Wazeer

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

## All Terminal Commands Used in the Project

---

### 1. Terraform Setup

```bash
cd terraform
terraform init
terraform validate
terraform plan
terraform apply
```

---

### 2. Fixing Resource Conflicts (if resources already exist)

```bash
terraform import aws_iam_role.lambda_exec_role lambda_exec_role
terraform import aws_iam_policy.lambda_dynamodb_policy arn:aws:iam::your-account-id:policy/LambdaDynamoDBPolicy
terraform import aws_dynamodb_table.visitor_count visitor-count
```

---

### 3. Packaging Lambda Function (Windows PowerShell)

```powershell
Compress-Archive -Path lambda/handler.py -DestinationPath lambda_function_payload.zip -Force
```

---

### 4. Deploy Lambda After Packaging

```bash
terraform apply
```

---

### 5. Upload Files to S3 Bucket (Frontend Only)

```bash
aws s3 sync ./frontend s3://cloudresume-ali-bucket-47457077/ --delete
```

---

### 6. Upload Entire Project (Excluding Terraform/Backend)

```bash
aws s3 sync . s3://cloudresume-ali-bucket-47457077/ --exclude "terraform/*" --exclude "backend/*" --exclude ".terraform/*"
```

---

### 7. View S3 Static Website

Visit:

```text
http://cloudresume-ali-bucket-47457077.s3-website-us-east-1.amazonaws.com
```



---

### 8. GitHub Actions (CI/CD)

Push your changes to GitHub:

```bash
git add .
git commit -m "Deploy resume website"
git push origin main
```

Then GitHub Action will trigger and sync the frontend with S3 bucket automatically.

---

### 9. (Optional) Delete S3 Bucket Files

```bash
aws s3 rm s3://cloudresume-ali-bucket-47457077/ --recursive
```

## Final Result

A fully functional static resume website with:

* Live visitor tracking
* Serverless backend using Lambda and DynamoDB
* API integration via API Gateway
* Infrastructure built and managed by Terraform
* CI/CD pipeline for automatic deployment


## Pictures For project


## AWS Cloud Photos And Services


![Screenshot (161)](https://github.com/user-attachments/assets/fa610f5d-8a78-4569-b41f-c7a036b359d0)


![Screenshot (159)](https://github.com/user-attachments/assets/98f23293-3054-40f1-af35-96d1ae126453)


![Screenshot (158)](https://github.com/user-attachments/assets/28689771-d91c-4c21-9094-b49e6e5e984e)


![Screenshot (157)](https://github.com/user-attachments/assets/5e1f6d15-73fa-434e-bf55-1c64b818c004)


![Screenshot (156)](https://github.com/user-attachments/assets/0000fa1a-7962-4f6e-b2e8-b0405e786f92)


![Screenshot (155)](https://github.com/user-attachments/assets/05b41eb5-f35b-466d-aa18-a065b5919fcf)


![Screenshot (154)](https://github.com/user-attachments/assets/869284da-3d25-411d-8f74-00413624198c)


![Screenshot (153)](https://github.com/user-attachments/assets/719a111f-39aa-442a-b693-082fc693ae38)


![Screenshot (152)](https://github.com/user-attachments/assets/35adca76-5d0f-4a57-90e9-5ac20b7c1c14)


![Screenshot (165)](https://github.com/user-attachments/assets/47ae227f-a1a4-4a34-b615-d755c4b4325c)


![Screenshot (164)](https://github.com/user-attachments/assets/6b99023b-7b32-4834-82dd-0fd260a0d74d)


![Screenshot (163)](https://github.com/user-attachments/assets/cf2f938c-94fc-4467-a0a0-26db0ed8c9d8)


![Screenshot (162)](https://github.com/user-attachments/assets/c7e48972-c570-4eee-ada2-5f8e651811e3)


![Screenshot (170)](https://github.com/user-attachments/assets/27b71d4e-847b-4e83-bec3-8486479ada48)


![Screenshot (176)](https://github.com/user-attachments/assets/f441de98-b8cf-4b9b-8f87-2adb0b873c88)


![Screenshot (167)](https://github.com/user-attachments/assets/c88f8c17-5b99-4ede-a281-ba265ee59dca)

![Screenshot (174)](https://github.com/user-attachments/assets/20ef3633-b4f5-48ea-92cc-db63507cfb81)


![Screenshot (173)](https://github.com/user-attachments/assets/a12a68e2-5ce0-4187-bc75-b3d1e5798812)


![Screenshot (172)](https://github.com/user-attachments/assets/14b47b46-ab26-4ad1-81c5-40794626d4ba)


![Screenshot (171)](https://github.com/user-attachments/assets/96221cad-5615-4935-b721-a454e40deef0)


![Screenshot (169)](https://github.com/user-attachments/assets/ee8eb45e-d989-4928-9fe6-9825197abd8b)





