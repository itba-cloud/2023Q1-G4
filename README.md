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
- [ ] Lambda
- [ ] Bucket S3
- [ ] CloudFront
