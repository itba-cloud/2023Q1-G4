
# output "lambda_functions" {
#   value = [
#     for lambda in module.external_lambda : {
#       name       = lambda.lambda_function_name
#       invoke_arn = lambda.lambda_function_invoke_arn
#       entity     = lambda.tags.entity
#       method     = lambda.tags.method
#     }
#   ]
# }

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
