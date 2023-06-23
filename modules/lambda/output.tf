
output "lambda_functions" {
  value = [
    for index in range(0, length(var.lambda_functions)) : {
      name       = module.external_lambda[index].lambda_function_name
      invoke_arn = module.external_lambda[index].lambda_function_invoke_arn
      entity     = var.lambda_functions[index].entity
      method     = var.lambda_functions[index].method
    }
  ]
}
