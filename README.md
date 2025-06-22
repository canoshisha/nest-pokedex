# Pokedex

[![Nest Logo](https://nestjs.com/img/logo-small.svg)](http://nestjs.com/)

## Requisitos previos

- Node.js >= 18.x
- Yarn o npm
- Docker (para base de datos MongoDB)
- Nest CLI global: npm i -g @nestjs/cli

## Instalación y ejecución en desarrollo

1. Clona el repositorio
2. Instala las dependencias:

```bash
yarn install
```

3. Asegúrate de tener Nest CLI instalado globalmente:

```bash
npm i -g @nestjs/cli
```

4. Copia el archivo de variables de entorno de ejemplo y configúralo según tus necesidades:

```bash
cp .env.template .env
```

Edita el archivo `.env` para establecer tus propias variables de entorno.


5. Levanta la base de datos MongoDB con Docker:

```bash
docker-compose up -d
```

6. Inicia el servidor de desarrollo:

```bash
yarn start:dev
```

7. Ejecuta el seed para poblar la base de datos con datos de prueba:

```bash
curl -X GET http://localhost:3000/seed
```

## Ejecución en producción

1. Usando Docker Compose:

```bash
docker-compose -f docker-compose.prod.yaml up --build -d
```

Esto construirá la imagen y levantará la aplicación junto con MongoDB en modo producción.

## Scripts útiles

- yarn start:dev - Inicia el servidor en modo desarrollo
- yarn start:prod - Compila y ejecuta en modo producción
- yarn test:e2e - Ejecuta pruebas end-to-end
- yarn lint - Ejecuta linter

## Estructura del proyecto

```
├── docker-compose.yaml         # Configuración de MongoDB con Docker
├── package.json                # Dependencias y scripts
├── .env.template               # Variables de entorno de ejemplo
├── src/                        # Código fuente principal
│   ├── app.module.ts           # Módulo principal
│   ├── main.ts                 # Punto de entrada
│   ├── common/                 # Pipes, DTOs y utilidades comunes
│   ├── pokemon/                # CRUD de Pokémon (controlador, servicio, DTOs, entidades)
│   └── seed/                   # Módulo para poblar la base de datos
├── test/                       # Pruebas end-to-end
└── public/                     # Archivos estáticos
```

## Stack usado
* [NestJS](https://nestjs.com/) - Framework principal
* [MongoDB](https://www.mongodb.com/) - Base de datos NoSQL
* [Docker](https://www.docker.com/) - Contenedores para la base de datos

## Uso

El servidor se ejecuta por defecto en `http://localhost:3000`.

### Endpoints principales
- `GET /pokemon` - Lista todos los pokémon
- `POST /pokemon` - Crea un nuevo pokémon
- `GET /pokemon/:id` - Obtiene un pokémon por ID
- `PATCH /pokemon/:id` - Actualiza un pokémon
- `DELETE /pokemon/:id` - Elimina un pokémon

Puedes probar los endpoints usando herramientas como [Postman](https://www.postman.com/).

## Recomendaciones
- Asegúrate de que el puerto 27017 (MongoDB) esté libre antes de levantar Docker.
- Si necesitas limpiar la base de datos, puedes detener el contenedor y eliminar la carpeta `mongo/`.
- Para producción, revisa las variables de entorno y la configuración de seguridad.
- Utiliza los scripts de package.json para facilitar tareas comunes.


## Licencia
Este proyecto está bajo la licencia MIT.