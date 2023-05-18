module "vpc" { 
  source = "./modules/vpc"
  availability_zones = [ "us-east-1a", "us-east-1b" ]

  # These are the subnets that will be created IN EACH AZ
  public_subnet_count = 1
  private_subnet_count = 2
}