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
    // DAILIES
    {
      name        = "dailiesPost"
      description = "Creates daily data"
      handler     = "index.handler"
      runtime     = "nodejs16.x"
      source_path = "resources/lambda/dailies/post/main.zip"
      entity      = "dailies"
      method      = "POST"
    },
    {
      name        = "dailiesGet"
      description = "Retrieves daily data"
      handler     = "index.handler"
      runtime     = "nodejs16.x"
      source_path = "resources/lambda/dailies/get/main.zip"
      entity      = "dailies"
      method      = "GET"
    },
    // TEAMS
    {
      name        = "teamsGet"
      description = "Retrieves teams data"
      handler     = "index.handler"
      runtime     = "nodejs16.x"
      source_path = "resources/lambda/teams/get/main.zip"
      entity      = "teams"
      method      = "GET"
    },
    // SUBSCRIPTIONS
    {
      name        = "subscriptionsPost"
      description = "Creates a new subscription"
      handler     = "index.handler"
      runtime     = "nodejs16.x"
      source_path = "resources/lambda/subscriptions/post/main.zip"
      entity      = "subscriptions"
      method      = "POST"
    },
    // NOTIFICATIONS
    {
      name        = "notificationsPost"
      description = "Creates a new notification"
      handler     = "index.handler"
      runtime     = "nodejs16.x"
      source_path = "resources/lambda/notifications/post/main.zip"
      entity      = "notifications"
      method      = "POST"
    }
  ]
}
