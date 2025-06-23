import json
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('visitor-count')

def lambda_handler(event, context):
    try:
        response = table.update_item(
            Key={'id': 'counter'},
            UpdateExpression='ADD visitor_count :inc',
            ExpressionAttributeValues={':inc': 1},
            ReturnValues='UPDATED_NEW'
        )
        count = int(response['Attributes']['visitor_count'])
    except ClientError as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f"Error updating count: {e}")
        }

    return {
        'statusCode': 200,
        'headers': {"Access-Control-Allow-Origin": "*"},
        'body': json.dumps({'visitor_count': count})
    }
