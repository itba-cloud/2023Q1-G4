variable "bucket_name" {
  description = "Name of the bucket"
  type        = string
}

variable "bucket_access" {
  description = "Authorized bucket accessors"
  type        = list(string)
}