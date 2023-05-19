output "rest_api_domain_name" {
  value = aws_api_gateway_deployment.this.invoke_url
}
output "rest_api_path" {
  value = "${aws_api_gateway_stage.this.stage_name}${aws_api_gateway_resource.this.path_part}"
}