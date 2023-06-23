output "bucket_id" {
  description = "Id of the created bucket"
  value       = module.static_site.s3_bucket_id
}

output "domain_name" {
  description = "Domain Name"
  value       = module.static_site.s3_bucket_bucket_regional_domain_name
}