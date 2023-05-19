// Output with the main vpc id and CIDR
output "vpc_id" {
  description = "ID of the main vpc"
  value       = aws_vpc.main.id
}

output "vpc_main_data" {
  description = "Main VPC data"
  value = {
    id         = aws_vpc.main.id,
    cidr_block = aws_vpc.main.cidr_block,
  }
}

output "subnet_ids_by_tier" {
  value = {
    for subnet in aws_subnet.private_subnets : subnet.tags["Tier"] => subnet.id...
  }
}

output "default_security_group_id" {
  value = aws_security_group.default.id
}
