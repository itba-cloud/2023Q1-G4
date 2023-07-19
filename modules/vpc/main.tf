locals {
  az_count = length(var.availability_zones)
}

resource "aws_vpc" "main" {
  cidr_block       = var.vpc_cidr_block
  instance_tenancy = "default"

  tags = {
    Name = "cloud-nuke-vpc"
  }
}

# Create public subnets in each AZ
resource "aws_subnet" "public_subnets" {
  count  = var.public_subnet_count * local.az_count
  vpc_id = aws_vpc.main.id

  cidr_block              = cidrsubnet(var.vpc_cidr_block, var.subnet_bits, count.index + 1)
  availability_zone       = var.availability_zones[count.index % local.az_count]
  map_public_ip_on_launch = true

  tags = {
    Name = "pub-${count.index + 1}"
  }
}

# Create private subnets in each AZ
resource "aws_subnet" "private_subnets" {
  count  = var.private_subnet_count * local.az_count
  vpc_id = aws_vpc.main.id

  #var.public_subnet_count * length(var.availability_zones) + count.index + 1 is to avoid repeating the same cidr block
  cidr_block              = cidrsubnet(var.vpc_cidr_block, var.subnet_bits, var.public_subnet_count * local.az_count + count.index + 1)
  availability_zone       = var.availability_zones[(var.public_subnet_count * local.az_count + count.index) % local.az_count]
  map_public_ip_on_launch = false

  tags = {
    Name = "priv-${count.index + 1}"
    # This will wrap around to 1 after each AZ has a private subnet, so we can use it to assign a tier. 
    Tier = floor(count.index / local.az_count) + 1
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "main_gateway"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "public_route_table"
  }
}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "private_route_table"
  }
}

resource "aws_route_table_association" "public_associations" {
  count          = var.public_subnet_count * local.az_count
  subnet_id      = aws_subnet.public_subnets[count.index].id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "private_associations" {
  count          = var.private_subnet_count * local.az_count
  subnet_id      = aws_subnet.private_subnets[count.index].id
  route_table_id = aws_route_table.private.id
}

resource "aws_security_group" "lambda_sg" {
  name        = "lambda_SG"
  description = "Lambda security group"
  vpc_id      = aws_vpc.main.id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    name = "lambda_sg"
  }
}

resource "aws_security_group" "database_sg" {
  name        = "rds_sg"
  description = "RDS security group"
  vpc_id      = aws_vpc.main.id
  
  ingress {
    from_port                 = 5432
    to_port                   = 5432
    protocol                  = "TCP"
    security_groups  = [aws_security_group.lambda_sg.id]
  }

  tags = {
    name = "rds_sg"
  }
}