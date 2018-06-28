# url-shortener

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/659bf0dad19672c8d3b3)

## Instrucciones 

Para poder ejecutar el proyecto se necesita tener instalado docker y docker-compose.

Docker 

https://docs.docker.com/docker-for-mac/install/#what-to-know-before-you-install

https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-using-the-repository

https://docs.docker.com/docker-for-windows/install/

Docker Compose

https://docs.docker.com/v17.09/compose/install/#install-compose

Una vez instalados, desde la ruta del archivo (en donde se encuentran los archivos: package.json, Dockerfile, docker-compose.yml, etc) se debe ejecutar el comando

```
docker-compose up -d
// ver contenedores
docker ps
// ver logs
docker logs [id-contenedor]
```

Una vez que se ejecuta el anterior comando, docker procede a descargar las imágenes necesarias, crear la imagen del proyecto y correrlo, por lo que puede
tardar unos minutos.

### API

##### One Shortened URL

The endpoint should receive a URL as a parameter and return a shortened URL.

POST http://localhost:3000/v1/url/


###### Request

JSON
{
  "url":"http://www.facebook.com"
 
}

###### Request

JSON

{
    "message":"http://localhost:3000/r1XP_CWfX"
}

##### BULK

Add another endpoint to your service that allows for the bulk (hundreds) submission of URLs.

POST http://localhost:3000/v1/url/bulk

###### Request

Json
{
  "urls": [
  	"http://www.facebook.com",
  	"https://www.google.com",
    "http://doc.gorm.io/advanced.html#compose-primary-key"
  ]
  
}

###### Response

{
    "message":[
        {"short_url":"http://localhost:3000/BJ9zvAZfX","original_url":"http://www.facebook.com"},
        {"short_url":"http://localhost:3000/HJg5MvAWz7","original_url":"https://www.google.com"},
        {"short_url":"http://localhost:3000/BJZ9fD0bfX","original_url":"http://doc.gorm.io/advanced.html#compose-primary-key"}
    ]
}

##### REDIRECCIONAMIENTO

Si en el navegador se escribe lo siguiente http://localhost:3000/CODIGO, el servicio se encargará de realizar el redireccionamiento.

Ejemplo:
GET http://localhost:3000/v1/url/Ux56Xy


##### LIsta de URLs Activas

GET http://localhost:3000/v1/url/

###### Response

{
    "data": {
        "urls": [
            {
                "uuid": "af3651ea-38a0-4ec7-9bae-e0e375786ff0",
                "original": "http://doc.gorm.io/advanced.html#compose-primary-key",
                "short": "http://localhost:3000/rkeJoBRWf7",
                "code": "rkeJoBRWf7",
                "visits": 1,
                "updatedAt": "2018-06-28T03:52:37.411Z"
            },
            {
                "uuid": "6d706a93-4888-4911-b080-0ba6fff7f7f3",
                "original": "http://www.facebook.com",
                "short": "http://localhost:3000/SJkoH0ZMX",
                "code": "SJkoH0ZMX",
                "visits": 0,
                "updatedAt": "2018-06-28T03:27:18.664Z"
            }
        ]
    }
}


Si no se desea usar docker compose para generar los conterendores, se puede correr el proyecto pero se debe contar con un servidor de base de datos de postgresql.
Si lo desea puede descargar una imagen para iniciar un contenedor de postgresql de la siguiente forma:

```
$ docker pull postgres
$ docker run --name web-postgres -p 5432:5432 -e POSTGRES_PASSWORD=12345678 -e POSTGRES_DB=url-shortener POSTGRES_USER=12345678  -d postgres

```


#### Estructura

db: contiene los archivos de configuracion para la bd, se usa sequelize.

tests: contiene los tests que prueban las funcionalidades de la capa de servicios, y los de integración de todos los componentes para la api.

config: contiene un archivo con la configuración necesaria para que el servicio pueda trabajar.

api: contiene los directorios con los módulos necesarios para que el servicio pueda funcionar via http.

api.server: tiene la configuración para expressjs.

api.routes: tiene la configuración de las rutas con sus respectivos controladores.

api.controllers: tiene las funciones que se le pasan a las rutas, y las funciones tienen los parámetros necesarios para trabajar con expressjs.

api.services: tiene la lógica para crear las urls cortas y realizar las consultas necesarias. Esta capa se añade por si en algún momento se hace necesario implementar otro canal como grpc, rpc, etc. Mantiene los controladores que dependen de expressjs limpios.

api.utils: contiene algunas funciones de ayuda.

Dockerfile: contiene las intrucciones para generar una imagen docker.