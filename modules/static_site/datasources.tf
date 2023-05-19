/*Intentamos con 2 politicas en donde solo cloudfront podia acceder a los bucket pero no funcionó

data "aws_iam_policy_document" "www" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["arn:aws:s3:::${local.www_bucket}" ,"arn:aws:s3:::${local.www_bucket}/*"]

    principals {
      type        = "AWS"
      identifiers = var.www_bucket_access
    }
  }
}
*/

/* No sabemos si hace un redirect a nivel HTTP o si S3 hace una nueva conexion al redireccionar
y tampoco lo encontramos buscando, por lo que también intentamos una politica donde solo el bucket www
que redirecciona puede acceder al sitio web y no funcionó
data "aws_iam_policy_document" "site" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["arn:aws:s3:::${var.bucket_name}/*"]
    #resources = ["${module.www.s3_bucket_arn}/*"]
    #resources = ["${aws_s3_bucket.files.arn}/*"]

	principals {
	  type = "Service"
	  identifiers = ["s3.amazonaws.com"]

	}
    condition {
      test     = "StringEquals"
      variable = "aws:SourceArn"
      values   = ["arn:aws:s3:::${local.www_bucket}"]
    }
  }
}
*/

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