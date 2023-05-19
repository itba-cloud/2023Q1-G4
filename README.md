# Cloud Computing

## Grilla

| Nombre | Legajo | Participación |
| ------ | ------ | ------------- |
| Ana Cruz | 60476 |  |
| Matías Lombardi | 60527 |  |
| Gian Luca Pecile | 59235 |  |
| Salustiano Zavalía | 60312 |  |
| Lucas Gomez | 60408 |  |

## Ejecución

Para ejecutar los comandos de terraform necesarios se debe tener previamente instalado el CLI de AWS y configurado con las credenciales de la cuenta de AWS a utilizar en el archivo `~/.aws/credentials`.

Para ejecutar el comando de terraform que crea la infraestructura se debe ejecutar el siguiente comando:

```bash
terraform init
terraform apply
```

## Módulos

- [x] VPC
- [x] Lambda
- [x] Bucket S3
- [ ] Route 53
- [x] CloudFront
- [x] API Gateway

### VPC
Decidimos que los únicos parámetros obligatorios son `availability_zones`, `public_subnet_count` y `private_subnet_count`. Cada subred usará 8 bits para los hosts por defecto (configurable cambiando los `subnet_bits`), mientras que la VPC usará 16. Tomamos esa decisión para abstraer la configuración del módulo de los CIDRs que va a tener cada subred, reduciendo la posibilidad del error humano y haciéndola menos engorrosa. También podemos configurar el CIDR de la VPC mediante la variable `vpc_cidr_block`, pero por defecto usamos `10.0.0.0/16`. 
Por cuestiones de completitud también configuramos un Internet Gateway, tablas de routing y asociamos las subredes a las tablas correspondientes. Además de eso, configuramos el security group de la VPC para que permita el tráfico entrante HTTPS.

