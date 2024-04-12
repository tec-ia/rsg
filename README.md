
# RSG proyecto 

Este es el desarrollo de prueba técnica de José Enrique, la cual consta de 3 partes las cuales se describen de forma general a continuación.



## front

Este es un proyecto desarrollado con Next.JS, el cual es un framework de react, opté por esta herramienta debido a que facilita el desarrollo de páginas con renderizado del lado del servidor. Trae un enrutador integrado en (pages) lo que hace que cada archivo sea una ruta visual.

para levantar el servicio de front en modo desarrollo ejecute los comandos en lista: 

Instale todas las dependencias:
```bash
  yarn install
```

Levante el servicio en modo desarrollo:
```bash
  yarn run dev
```

Por otro lado si requiere levantarlo en modo producción ejecute los siguientes comandos: 

Para crear una compilación on webpack para optimizar los recursos:
```bash
  yarn run build
```

Finalmente levante el proyecto compilado con
```bash
  yarn run start
```


## back

El desarrollo del lado del backen se ha desarrollado con express, es una tecnología de nodejs que nos facilita levantar un servidor que escuche todas las peticiones http que entren, y a cada una de ellas asignarles la función a ejecutar. 

Se ha integrado una base de datos que funciona de manera directa con express, usando la librería pg, la cual nos permite un pool de conexión. Para optmizar los recursos del servidor y no tener conexiones abiertas perdidas se optó por implementar un patrón singleton a la base de datos.

Para levantar el servicio instale las dependencias:
```bash
  yarn install
```

Posteriormente levante el servicio en modo desarrollo con nodemon ya previamente configurado:
```bash
  yarn run dev
```

O bien, levante directamente con nodejs con el comando
```bash
  yarn run start
```
