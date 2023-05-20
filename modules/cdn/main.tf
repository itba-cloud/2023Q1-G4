resource "aws_cloudfront_distribution" "this" {
  enabled             = true
  retain_on_delete    = true # Esto va a hacer que se deshabilite cuando haces terraform destroy
  default_root_object = "index.html"
  aliases             = var.alias

  origin {
    domain_name = var.static_site
    origin_id   = var.web_origin_id

    s3_origin_config {
      origin_access_identity = var.OAI
    }
  }

  origin {
    domain_name = replace(var.api_domain, "/^https?://([^/]*).*/", "$1")
    origin_id   = var.api_origin_id
    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }


  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = var.static_site

    cache_policy_id = data.aws_cloudfront_cache_policy.caching_optimized.id

    viewer_protocol_policy = "https-only"
  }

  ordered_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = var.api_origin_id
    path_pattern     = "/api/*"

    cache_policy_id = data.aws_cloudfront_cache_policy.caching_disabled.id

    viewer_protocol_policy = "https-only"

  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = var.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}