# 82.08 - Cloud Computing TP FINAL

- [82.08 - Cloud Computing TP FINAL](#8208---cloud-computing-tp-final)
  - [Integrantes](#integrantes)
  - [Descripción](#descripción)
    - [Problema](#problema)
    - [Solución](#solución)
  - [Arquitectura](#arquitectura)
  - [Módulos en Terraform](#módulos-en-terraform)
  - [Ejecución](#ejecución)

## Integrantes

| Nombre | Legajo | Participación |
| ------ | ------ | ------------- |
| [Gian Luca Pecile](https://github.com/glpecile) | 59235 | 25% |
| [Salustiano Zavalía](https://github.com/szavalia) | 60312 | 25% |
| [Ana Cruz](https://github.com/anitacruz) | 60476 | 25% |
| [Matías Lombardi](https://github.com/matiaslombardi) | 60527 | 25% |


## Descripción

### Problema

En algunas organizaciones con equipos de soporte en varios proyectos, muchas dailies de SCRUM
dificultan el seguimiento del equipo por parte del manager.

Hacer una daily unificada no tendría mucho sentido ya que el equipo trabaja en varios proyectos diferentes.

Para resolver esto, se propone un sistema en el que los miembros del equipo puedan realizar un
reporte asincrónico al estilo de la daily de SCRUM, que sea fácil de visualizar para el manager.

### Solución

Se propone implementar un sistema de gestión en el que un representante de la empresa Soporta2
genere los formularios de las preguntas para la Daily de SCRUM, que luego serán enviados al equipo
y almacenados en un dashboard para que el manager pueda ver las respuestas.

Los miembros del equipo recibirán un enlace para llenar su formulario diario, que incluye preguntas sobre
lo que hicieron ayer y los bloqueos actuales. Entre las funcionalidades incluyen la creación de múltiples dailies,
envío automatizado de formularios, un portal de relleno de formularios y un dashboard para
monitorear las dailies pasadas.

## Arquitectura

El diagrama completo de la arquitectura se encuentra dentro de [`/assets/architecture.pdf`](/assets/architecture.pdf).

## Módulos en Terraform

- VPC
  - Security Group
  - Route table
- Lambda
- Bucket S3
- CloudFront
- API Gateway
- DNS
  - Route53
  - ACM

## Ejecución

Para ejecutar los comandos de terraform necesarios se debe tener previamente instalado el CLI de AWS y configurado con las credenciales de la cuenta de AWS a utilizar en el archivo `~/.aws/credentials`.

Para ejecutar el comando de terraform que crea la infraestructura se debe ejecutar el siguiente comando:

```bash
terraform init
terraform apply -var-file=config.tfvars -auto-approve 
```