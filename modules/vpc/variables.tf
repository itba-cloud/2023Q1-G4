variable "availability_zones" {
  type    = list(string)
  default = ["us-east-1a", "us-east-1b"]
}

variable "vpc_cidr_block" {
  type    = string
  default = "10.0.0.0/16"
}

variable "public_subnet_bits" {
  type    = number
  default = 8
}

variable "private_subnet_bits" {
  type    = number
  default = 8
}

variable "vpc_bits" {
  type    = number
  default = 16
}

variable "public_subnet_count" {
  type = number
}

variable "private_subnet_count" {
  type = number
}