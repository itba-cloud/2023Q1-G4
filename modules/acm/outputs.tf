output "certificate_arn" {
  description = "ARN of the certificate to use for the Cloudfront distribution"
  value       = aws_acm_certificate.this.arn
}