resource "aws_route53_record" "this" {
  name    = var.base_domain
  type    = "A"
  zone_id = data.aws_route53_zone.this.zone_id

  alias {
    name                   = var.cdn.domain_name
    zone_id                = var.cdn.hosted_zone_id
    evaluate_target_health = false # Set to true if you want Route 53 to determine whether to respond to DNS queries using this resource record set by checking the health of the resource record set.
  }
}

data "aws_route53_zone" "this" {
  name = var.base_domain
}