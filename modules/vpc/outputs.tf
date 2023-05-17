output "vpc_main_cidr" {
  description = "CIDR of the main vpc"
  value =  aws_vpc.main.cidr_block
}

// Output with the main vpc id and CIDR
output "vpc_main_id" {
  description = "ID of the main vpc"
  value = aws_vpc.main.id
}

output "vpc_main_data" { 
  description = "Main VPC data"
  value = {
    id = aws_vpc.main.id,
    cidr_block = aws_vpc.main.cidr_block,
  }
}