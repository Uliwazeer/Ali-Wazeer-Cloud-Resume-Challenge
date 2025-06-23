variable "lambda_function_name" {
  default = "visitor-counter-fn"
}

variable "dynamodb_table_name" {
  default = "visitor-count"
}

variable "region" {
  default = "us-east-1"
}
