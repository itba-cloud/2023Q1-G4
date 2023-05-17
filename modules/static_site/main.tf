# TODO: policies. In particular, cloudfront policy for www

module "logs" {
    source = "terraform-aws-modules/s3-bucket/aws"
    bucket_prefix = local.logs_bucket
    acl    = "log-delivery-write"

    force_destroy = true

    attach_deny_insecure_transport_policy = true
    attach_require_latest_tls_policy      = true

    control_object_ownership = true
    object_ownership         = "ObjectWriter"

}

module "www" {
    source = "terraform-aws-modules/s3-bucket/aws"
    #FIXME maybe move this to locals
    bucket_prefix = "www${var.bucket_name}"
    acl    = "private"
    control_object_ownership = true
    object_ownership         = "ObjectWriter"
    block_public_acls       = true
    block_public_policy     = true
    ignore_public_acls      = true
    restrict_public_buckets = true

    website = {
        // redirect to bucket below
        redirect_all_requests_to = {
            host_name = module.static_site.s3_bucket_website_endpoint
        }
    }
    
}

module "static_site" {
    source = "terraform-aws-modules/s3-bucket/aws"
    bucket_prefix = var.bucket_name
    acl    = "private"
    control_object_ownership = true
    object_ownership         = "ObjectWriter"
    block_public_acls       = true
    block_public_policy     = true
    ignore_public_acls      = true
    restrict_public_buckets = true

    logging = {
        target_bucket = module.logs.s3_bucket_id
        target_prefix = "log/"
    }

     website = {
        index_document = "index.html"
        error_document = "error.html"
    }
}