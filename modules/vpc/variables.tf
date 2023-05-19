variable "availability_zones" {
  type    = list(string)
  default = ["us-east-1a", "us-east-1b"]
}

variable "vpc_cidr_block" {
  type    = string
  default = "10.0.0.0/16"
}

variable "subnet_bits" {
  #Additional bits to borrow from the VPC CIDR block for public and private subnets
  #second parameter for cidrsubnet, the default is 8 so the subnets will be /24
  type        = number
  default     = 8
  description = "Bits from the VPC CIDR block for public and private subnets"
}

variable "public_subnet_count" {
  type = number
}

variable "private_subnet_count" {
  type = number
}