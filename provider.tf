provider "aws" {
  region = "us-east-1"

  shared_credentials_files = [".aws/credentials"]

  default_tags {
    tags = {
      Owner = "2023Q1-G4"
      Environment = "dev"
    }
  }
}