locals {
  lambda_function_count = length(var.lambda_functions)

  resource_names = distinct([
    for lambda in var.lambda_functions : lambda.entity
  ])
  resource_count = length(local.resource_names)

}

resource "aws_api_gateway_rest_api" "this" {
  name        = var.rest_api_name
  description = var.rest_api_desc
  tags = {
    Name = var.rest_api_tag_name
  }
}

resource "aws_api_gateway_resource" "this" {
  count = local.resource_count

  rest_api_id = aws_api_gateway_rest_api.this.id
  parent_id   = aws_api_gateway_rest_api.this.root_resource_id
  path_part   = local.resource_names[count.index]
}

locals {
  resources_id_by_entity = {
    for resource in aws_api_gateway_resource.this : resource.path_part => resource.id
  }
}

resource "aws_api_gateway_method" "this" {
  count = local.lambda_function_count

  rest_api_id   = aws_api_gateway_rest_api.this.id
  resource_id   = local.resources_id_by_entity[var.lambda_functions[count.index].entity]
  http_method   = var.lambda_functions[count.index].method
  authorization = "NONE"
}


resource "aws_api_gateway_integration" "this" {
  count = local.lambda_function_count

  rest_api_id             = aws_api_gateway_rest_api.this.id
  resource_id             = aws_api_gateway_method.this[count.index].resource_id
  http_method             = aws_api_gateway_method.this[count.index].http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = var.lambda_functions[count.index].invoke_arn
}

resource "aws_api_gateway_deployment" "this" {

  rest_api_id = aws_api_gateway_rest_api.this.id
  triggers = {
    deploy = sha1(jsonencode([
      aws_api_gateway_resource.this,
      aws_api_gateway_method.this,
      aws_api_gateway_integration.this
    ]))
  }
}

resource "aws_api_gateway_stage" "this" {
  depends_on = [
    aws_api_gateway_integration.this,
  ]

  deployment_id = aws_api_gateway_deployment.this.id
  rest_api_id   = aws_api_gateway_rest_api.this.id
  stage_name    = var.rest_api_stage_name
}

resource "aws_lambda_permission" "this" {
  count = local.lambda_function_count

  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_functions[count.index].name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.this.execution_arn}/*/*"
}
