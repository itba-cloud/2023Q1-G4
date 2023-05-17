module "web_site" {
  source      = "./modules/static_site"
  bucket_name = "cloud-2023-1q-g4"
}

resource "aws_s3_object" "data" {
  bucket = module.web_site.bucket_id
  key    = "index.html"
  source = "./index.html"
  #etag         = filemd5("${var.src}/${each.value.file}")
  #content_type = each.value.mime
}