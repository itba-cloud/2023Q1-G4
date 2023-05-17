output "bucket_id" {
    description = "Id of the created bucket"
    value = module.static_site.s3_bucket_id
}