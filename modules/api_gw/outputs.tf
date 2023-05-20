output "api_url" {
    description = "The invoke url of the Api GW"
    value = aws_api_gateway_deployment.this.invoke_url
}