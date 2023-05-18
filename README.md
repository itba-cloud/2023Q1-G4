# repo-template
Repositorio correspondiente al Grepo-template

## VPC
Decidimos que los únicos parámetros obligatorios son `availability_zones`, `public_subnet_count` y `private_subnet_count`. Cada subred usará 8 bits para los hosts por defecto (configurable cambiando los `subnet_bits`), mientras que la VPC usará 16. Tomamos esa decisión para abstraer la configuración del módulo de los CIDRs que va a tener cada subred, reduciendo la posibilidad del error humano y haciéndola menos engorrosa. También podemos configurar el CIDR de la VPC mediante la variable `vpc_cidr_block`, pero por defecto usamos `10.0.0.0/16`. 

