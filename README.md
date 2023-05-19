# Cloud Computing

## Grilla

| Nombre | Legajo | Participación |
| ------ | ------ | ------------- |
| [Ana Cruz](https://github.com/anitacruz) | 60476 |  |
| [Matías Lombardi](https://github.com/matiaslombardi) | 60527 |  |
| [Gian Luca Pecile](https://github.com/glpecile) | 59235 |  |
| [Salustiano Zavalía](https://github.com/szavalia) | 60312 |  |
| [Lucas Gomez](https://github.com/lusegomez) | 60408 |  |

## Ejecución

Para ejecutar los comandos de terraform necesarios se debe tener previamente instalado el CLI de AWS y configurado con las credenciales de la cuenta de AWS a utilizar en el archivo `~/.aws/credentials`.

Para ejecutar el comando de terraform que crea la infraestructura se debe ejecutar el siguiente comando:

```bash
terraform init
terraform apply -var-file=config.tfvars -auto-approve 
```

## Arquitectura

El diagrama completo de la arquitectura se encuentra dentro de [`/assets/architecture.pdf`](/assets/architecture.pdf).

## Módulos

- VPC
- Lambda
- Bucket S3
- CloudFront
- API Gateway
- DNS
  - Route53
  - ACM

### DNS

![DNS](/assets/dns.png)

Para la configuración del DNS se utilizó Route53 para la creación de los registros y ACM para la creación del certificado SSL.

Se hace uso de los módulos:

- [`aws_route53_record`](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_record.html)
- [`aws_route53_zone`](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_zone)
- [`aws_acm_certificate`](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/acm_certificate)
- [`aws_acm_certificate_validation`](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/acm_certificate_validation)

### S3

![S3](/assets/s3.png)

Para la configuración del bucket S3 se utilizó el módulo [`aws_s3_bucket`](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket).

### CloudFront

![CloudFront](/assets/cdn.png)

Para la configuración de CloudFront se utilizó el módulo [`aws_cloudfront_distribution`](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudfront_distribution).

### API Gateway

![API Gateway](/assets/api_gw.png)

Para la configuración de API Gateway se utilizó el módulo [`aws_api_gateway_rest_api`](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/api_gateway_rest_api).

### VPC

![VPC](/assets/vpc.png)

Para la configuración de la VPC se creó un módulo custom-made [`vpc`](/modules/vpc) que crea la VPC, subnets, internet gateway, route table, security groups, etc.

Se decidió que los únicos parámetros obligatorios son `availability_zones`, `public_subnet_count` y `private_subnet_count`. Cada subred usará 8 bits para los hosts por defecto (configurable cambiando los `subnet_bits`), mientras que la VPC usará 16. Tomamos esa decisión para abstraer la configuración del módulo de los CIDRs que va a tener cada subred, reduciendo la posibilidad del error humano y haciéndola menos engorrosa. También podemos configurar el CIDR de la VPC mediante la variable `vpc_cidr_block`, pero por defecto usamos `10.0.0.0/16`.
Por cuestiones de completitud también configuramos un Internet Gateway, tablas de routing y asociamos las subredes a las tablas correspondientes. Además de eso, configuramos el security group de la VPC para que permita el tráfico entrante HTTPS.

### Lambda

![Lambda](/assets/lambda.png)

Para la configuración de Lambda se hace uso del módulo [`aws_lambda_function`](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function). En particular se utiliza el atributo [`lambda_function_in_vpc`](https://registry.terraform.io/modules/terraform-aws-modules/lambda/aws/latest#lambda-function-in-vpc) que permite ejecutar la función dentro de la VPC.
