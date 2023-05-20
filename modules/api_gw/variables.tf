variable "rest_api_name" {
  type        = string
  description = "API name"
}

variable "rest_api_desc" {
  type        = string
  description = "Short description of what this api is/does"
  default     = ""
}

variable "rest_api_stage_name" {
  type        = string
  description = "The name of the API Gateway stage"
  default     = "prod"
}

variable "lambda_functions" {
  description = "List of Lambda functions to create"
  type = list(object({
    name = string
    invoke_arn = string
    entity = string
    method = string
  }))
}

variable "rest_api_tag_name" {
  type        = string
  description = "Rest api tag for resource identification"
}