
module "api_gw" {
  source              = "./modules/api_gw"
  rest_api_desc       = local.api_description
  rest_api_name       = local.api_name
  rest_api_tag_name   = local.api_tag_name
  rest_api_stage_name = local.api_stage_name

  lambda_functions = module.lambda.lambda_functions
}


resource "aws_cloudfront_origin_access_identity" "this" {
  comment = "OAI for the static site"
}

/*
Esta seria la manera correcta (updateada de OAI) de dar permisos para acceder a S3,
por cuestión de tiempos y pruebas decidimos quedarnos con OAI

resource "aws_cloudfront_origin_access_control" "this" {
 name                              = "S3 Access Control"
 origin_access_control_origin_type = "s3"
 signing_behavior                  = "always"
 signing_protocol                  = "sigv4"
}
*/

module "acm" {
  source      = "./modules/acm"
  base_domain = var.base_domain
}


module "route53" {
  source      = "./modules/route53"
  base_domain = var.base_domain
  cdn         = module.cdn.cloudfront_distribution
}

module "cdn" {
  source          = "./modules/cdn"
  static_site     = module.web_site.domain_name
  web_origin_id   = local.static_origin_id
  api_domain      = module.api_gw.api_url
  api_origin_id   = local.api_origin_id
  OAI             = aws_cloudfront_origin_access_identity.this.cloudfront_access_identity_path
  certificate_arn = module.acm.certificate_arn
  alias           = [var.base_domain, "www.${var.base_domain}"]
}

module "web_site" {
  #external module
  source        = "./modules/static_site"
  bucket_name   = local.s3_bucket_name
  bucket_access = [aws_cloudfront_origin_access_identity.this.iam_arn]
}


resource "aws_s3_object" "data" {
  bucket       = module.web_site.bucket_id
  key          = "index.html"
  source       = "resources/index.html"
  content_type = "text/html"
}

module "vpc" {
  source             = "./modules/vpc"
  availability_zones = ["${local.current_region}a", "${local.current_region}b"]

  # These are the subnets that will be created IN EACH AZ
  public_subnet_count  = 1
  private_subnet_count = 2
}

module "lambda" {
  #external module
  source = "./modules/lambda"

  lambda_functions = local.lambda_functions

  vpc_subnet_ids         = module.vpc.subnet_ids_by_tier["1"]
  vpc_security_group_ids = [module.vpc.default_security_group_id]
  attach_network_policy  = true
  create_role            = false // Esto esta así ya que de no estar no funciona por permisos del Lab
  lambda_role            = local.iam_role_arn
}
