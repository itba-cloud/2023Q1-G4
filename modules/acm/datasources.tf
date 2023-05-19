data "aws_route53_zone" "this" {
  name = var.base_domain
}