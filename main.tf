module "api-gw" {
  source            = "./modules/api-gw"
  rest_api_desc     = "API gateway for the lambdas"
  rest_api_name     = "API-GW-G4"
  rest_api_tag_name = "API Gateway"
  #   TODO: Define lambda
  lambda_func_arn  = "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:123456789012:function:dummy-lambda/invocations"
  lambda_func_name = "example-lambda"
}

module "web_site" {
  source      = "./modules/static_site"
  bucket_name = local.s3_bucket_name
}

resource "aws_s3_object" "data" {
  bucket = module.web_site.bucket_id
  key    = "index.html"
  source = "./index.html"
  #etag         = filemd5("${var.src}/${each.value.file}")
  #content_type = each.value.mime
}

module "vpc" {
  source             = "./modules/vpc"
  availability_zones = ["us-east-1a", "us-east-1b"]

  # These are the subnets that will be created IN EACH AZ
  public_subnet_count  = 1
  private_subnet_count = 2
}

module "lambda_function_in_vpc" {
  #external module
  source = "terraform-aws-modules/lambda/aws"

  function_name = "post_daily"
  description   = "Lambda function that creates a daily entry for a given user."
  handler       = "helloPython.lambda_handler" #Lambda function entrypoint in your code. 
  runtime       = "python3.9"


  source_path = "resources/helloPython.py" #The absolute path to a local file or directory containing your Lambda source code

  vpc_subnet_ids         = module.vpc.subnet_ids_by_tier["1"]
  vpc_security_group_ids = [module.vpc.default_security_group_id]
  attach_network_policy  = true

  create_role = false
  lambda_role = local.iam_role_arn
}
