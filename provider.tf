provider "aws" {
  region                   = "us-east-1"
  shared_credentials_files = [".aws/credentials", "~/.aws/credentials"]
  profile                  = "default"

  default_tags {
    tags = {
      author = "2021Q1-G4"
    }
  }
}
