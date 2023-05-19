module "logs" {
  source        = "terraform-aws-modules/s3-bucket/aws"
  bucket_prefix = local.logs_bucket
  acl           = "log-delivery-write"

  force_destroy = true

  attach_deny_insecure_transport_policy = true
  attach_require_latest_tls_policy      = true

  control_object_ownership = true
  object_ownership         = "ObjectWriter"
}


/** 
Este seria el bucket www, pero al redireccionar y acceder desde Cloudfront, tiraba error de Access Denied (403)

  module "www" {
  source        = "terraform-aws-modules/s3-bucket/aws"
  bucket        = local.www_bucket
  attach_policy = true
  policy        = data.aws_iam_policy_document.www.json

  acl                      = "private"
  control_object_ownership = true
  object_ownership         = "ObjectWriter"
  block_public_acls        = true
  block_public_policy      = true
  ignore_public_acls       = true
  restrict_public_buckets  = true

  website = {
    redirect_all_requests_to = {
      host_name = module.static_site.s3_bucket_bucket_regional_domain_name
    }
  }
}
*/

module "static_site" {
  source        = "terraform-aws-modules/s3-bucket/aws"
  bucket_prefix = var.bucket_name
  attach_policy = true
  policy        = data.aws_iam_policy_document.this.json

  acl                      = "private"
  control_object_ownership = true
  object_ownership         = "ObjectWriter"
  block_public_acls        = true
  block_public_policy      = true
  ignore_public_acls       = true
  restrict_public_buckets  = true

  logging = {
    target_bucket = module.logs.s3_bucket_id
    target_prefix = "log/"
  }

  website = {
    index_document = "index.html"
    error_document = "error.html"
  }
}