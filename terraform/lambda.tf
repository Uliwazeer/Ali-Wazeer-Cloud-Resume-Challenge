resource "aws_lambda_function" "visitor_counter" {
  filename         = "lambda_function_payload.zip"
  function_name    = "visitor_counter"
  role             = aws_iam_role.lambda_exec_role.arn
  handler          = "handler.lambda_handler"
  runtime          = "python3.10"
  source_code_hash = filebase64sha256("lambda_function_payload.zip")
}
