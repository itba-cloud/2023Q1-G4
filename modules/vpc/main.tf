resource "aws_vpc" "main" {
  cidr_block       = var.vpc_cidr_block
  instance_tenancy = "default"

  tags = {
    Name = "main"
  }
}

# Create public subnets in each AZ
resource "aws_subnet" "public_subnets" {
  count      = var.public_subnet_count * length(var.availability_zones)
  vpc_id     = aws_vpc.main.id

  cidr_block = cidrsubnet(var.vpc_cidr_block, var.public_subnet_bits, count.index + 1)
  availability_zone = var.availability_zones[count.index % length(var.availability_zones)]
  map_public_ip_on_launch = true

  tags = {
    Name = "pub-${count.index + 1}"
  }
}

# Create private subnets in each AZ
resource "aws_subnet" "private_subnets" {
  count      = var.private_subnet_count * length(var.availability_zones)
  vpc_id     = aws_vpc.main.id

  cidr_block = cidrsubnet(var.vpc_cidr_block, var.private_subnet_bits, count.index + 1)
  availability_zone = var.availability_zones[count.index % length(var.availability_zones)]
  map_public_ip_on_launch = false

  tags = {
    Name = "priv-${count.index + 1}"
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

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id # TODO: Change this to a NAT gateway
  }

  tags = {
    Name = "private_route_table"
  }
}

resource "aws_route_table_association" "public_associations" {
  count          = var.public_subnet_count * length(var.availability_zones)
  subnet_id      = aws_subnet.public_subnets[count.index % length(var.availability_zones)].id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "private_associations" {
  count = var.private_subnet_count * length(var.availability_zones)
  subnet_id      = aws_subnet.private_subnets[count.index % length(var.availability_zones)].id
  route_table_id = aws_route_table.private.id
}





