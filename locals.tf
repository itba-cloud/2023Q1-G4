locals {
  api_description = "API gateway for the lambdas"
  api_name        = "API-GW-G4"
  api_tag_name    = "API Gateway"
  api_stage_name  = "api"

  account_id = data.aws_caller_identity.current.account_id

  # ARN of the IAM role to assume, particular to the Learner Lab account
  iam_role_arn = "arn:aws:iam::${local.account_id}:role/LabRole"

  s3_bucket_name = "cloud-2023-1q-g4"

  current_region = data.aws_region.current.name

  api_origin_id = "api"

  static_origin_id = "static"

  lambda_functions = [
    {
      name        = "usersGet"
      description = "Gets user data"
      handler     = "usersGet.lambda_handler"
      runtime     = "python3.9"
      source_path = "resources/usersGet.py"
      entity      = "users"
      method      = "GET"
    },
    {
      name        = "usersPut"
      description = "Updates user data"
      handler     = "usersPut.lambda_handler"
      runtime     = "python3.9"
      source_path = "resources/usersPut.py"
      entity      = "users"
      method      = "PUT"
    },
    {
      name        = "usersPost"
      description = "Creates user data"
      handler     = "usersPost.lambda_handler"
      runtime     = "python3.9"
      source_path = "resources/usersPost.py"
      entity      = "users"
      method      = "POST"
    },
    {
      name        = "usersDelete"
      description = "Deletes user data"
      handler     = "usersDelete.lambda_handler"
      runtime     = "python3.9"
      source_path = "resources/usersDelete.py"
      entity      = "users"
      method      = "DELETE"
    }
  ]
}
