
resource "aws_s3_bucket" "resume_bucket" {
  bucket        = "cloudresume-ali-bucket-47457077" # عدل الاسم بإضافة رقم عشوائي
  force_destroy = true
}





resource "aws_s3_bucket_website_configuration" "website_config" {
  bucket = aws_s3_bucket.resume_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}
