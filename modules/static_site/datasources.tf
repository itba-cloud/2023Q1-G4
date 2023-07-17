data "aws_iam_policy_document" "this" {
  statement {
    actions   = ["s3:GetObject"]
    resources = [module.static_site.s3_bucket_arn, "${module.static_site.s3_bucket_arn}/*"]

    principals {
      type        = "AWS"
      identifiers = var.bucket_access
    }
  }
}