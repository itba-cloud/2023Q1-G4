variable "static_site" {
  description = "Domain name for S3"
  type        = string
}

variable "OAI" {
  description = "The Origin Access Identity path for S3"
  type        = string
}

variable "alias" {
  description = "Alias for the Cloudfront distribution"
  type        = set(string)
}

variable "certificate_arn" {
  description = "ARN of the certificate to use for the Cloudfront distribution"
  type        = string
}