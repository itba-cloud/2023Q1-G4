locals {
  account_id = data.aws_caller_identity.current.account_id

  # ARN of the IAM role to assume, particular to the Learner Lab account
  iam_role_arn = "arn:aws:iam::${local.account_id}:role/LabRole"

  # iam_role_arn = "arn:aws:iam::143422629436:role/LabRole"

  s3_bucket_name = "cloud-2023-1q-g4"

  current_region = data.aws_region.current.name
}
