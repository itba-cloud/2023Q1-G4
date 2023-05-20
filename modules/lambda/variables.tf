variable "lambda_functions" {
  description = "List of Lambda functions to create"
  type = list(object({
    name = string
    description   = string
    handler       = string
    runtime       = string
    source_path   = string
    entity = string
    method = string
  }))
}

variable "vpc_subnet_ids" {
  description = "List of subnet IDs to place Lambda function in a VPC"
  type        = list(string)
}

variable "vpc_security_group_ids" {
  description = "List of security group IDs to place Lambda function in a VPC"
  type        = list(string)
}

variable "attach_network_policy" {
  description = "Whether to attach a network policy to the Lambda function"
  type        = bool
  default     = false
}

variable "create_role" {
  description = "Whether to create IAM role for Lambda function"
  type        = bool
  default     = true
}

variable "lambda_role" {
  description = "ARN of IAM role for Lambda function"
  type        = string
}

