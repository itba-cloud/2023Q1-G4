module "external_lambda" {
  count  = length(var.lambda_functions)
  source = "terraform-aws-modules/lambda/aws"

  function_name = var.lambda_functions[count.index].name
  description   = var.lambda_functions[count.index].description
  handler       = var.lambda_functions[count.index].handler
  runtime       = var.lambda_functions[count.index].runtime
  timeout       = 30
  memory_size   = 512

  //TODO: check
  create_package            = false
  local_existing_package    = var.lambda_functions[count.index].source_path

  vpc_subnet_ids         = var.vpc_subnet_ids
  vpc_security_group_ids = var.vpc_security_group_ids
  attach_network_policy  = var.attach_network_policy

  create_role = var.create_role
  lambda_role = var.lambda_role

  tags = {
    entity = var.lambda_functions[count.index].entity
    method = var.lambda_functions[count.index].method
  }
}