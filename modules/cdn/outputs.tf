output "endpoint_id" {
  description = "ID of the Cloudfront distribution"
  value       = aws_cloudfront_distribution.this.domain_name
}

output "cloudfront_distribution" {
  description = "Cloudfront distribution"
  value       = aws_cloudfront_distribution.this
}