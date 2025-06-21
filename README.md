# Pokedex

[![Nest Logo](https://nestjs.com/img/logo-small.svg)](http://nestjs.com/)

## Ejecutar en desarrollo

1. Clona el repositorio
2. Instala las dependencias:

```bash
yarn install
```

3. Asegúrate de tener Nest CLI instalado globalmente:

```bash
npm i -g @nestjs/cli
```

4. Levanta la base de datos MongoDB con Docker:

```bash
docker-compose up -d
```

5. Inicia el servidor de desarrollo:

```bash
yarn start:dev
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

Puedes probar los endpoints usando herramientas como [Postman](https://www.postman.com/) o [Insomnia](https://insomnia.rest/).

## Licencia

MIT