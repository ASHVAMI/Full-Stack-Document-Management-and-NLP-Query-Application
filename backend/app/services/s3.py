import boto3
from botocore.exceptions import ClientError
from app.core.config import settings

class S3Service:
    def __init__(self):
        self.s3_client = boto3.client(
            's3',
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_REGION
        )
        self.bucket = settings.S3_BUCKET

    async def upload_file(self, file_obj, file_name: str) -> str:
        try:
            self.s3_client.upload_fileobj(file_obj, self.bucket, file_name)
            return f"s3://{self.bucket}/{file_name}"
        except ClientError as e:
            raise Exception(f"Failed to upload file to S3: {str(e)}")

    async def get_file(self, file_name: str):
        try:
            response = self.s3_client.get_object(Bucket=self.bucket, Key=file_name)
            return response['Body']
        except ClientError as e:
            raise Exception(f"Failed to get file from S3: {str(e)}")