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

6. Ejecuta el seed para poblar la base de datos con datos de prueba:

```bash
curl -X GET http://localhost:3000/seed
```

## Ejecutar pruebas

Para ejecutar las pruebas end-to-end:

```bash
yarn test:e2e
```

## Estructura del proyecto

```
├── docker-compose.yaml         # Configuración de MongoDB con Docker
├── package.json                # Dependencias y scripts
├── src/                        # Código fuente principal
│   ├── app.module.ts           # Módulo principal
│   ├── main.ts                 # Punto de entrada
│   ├── common/                 # Módulos y pipes comunes
│   ├── pokemon/                # Módulo de Pokémon (controlador, servicio, DTOs, entidades)
│   └── seed/                   # Módulo de seed para poblar la base de datos
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

Puedes probar los endpoints usando herramientas como [Postman](https://www.postman.com/) o [Insomnia](https://insomnia.rest/).

## Recomendaciones
- Asegúrate de que el puerto 27017 (MongoDB) esté libre antes de levantar Docker.
- Si necesitas limpiar la base de datos, puedes detener el contenedor y eliminar la carpeta `mongo/`.
- Para producción, revisa las variables de entorno y la configuración de seguridad.

## Licencia

MIT