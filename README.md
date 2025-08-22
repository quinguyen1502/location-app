# Location App

A NestJS-based REST API for managing hierarchical locations, with JWT authentication and PostgreSQL integration.

## Features

- CRUD operations for locations (supports parent-child hierarchy)
- JWT-based authentication (see [`AuthGuard`](src/app/auth/auth.guard.ts))
- API documentation via Swagger (`/api/docs`)
- Rate limiting via [`ThrottlerModule`](src/app/app.module.ts)
- PostgreSQL database integration (see [`AppDataSource`](src/app/data-source.ts))

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL database

### Installation

```bash
npm install
```

### Environment Variables

Configure your database and JWT settings in the [.env](.env) file:

```
ENV=development
DATABASE_TYPE=postgres
DATABASE_NAME=location_app
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=username
DATABASE_PASSWORD=password
DATABASE_LOGGING=true
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=60s
```

### Running the App

```bash
# development
npm run start

# watch mode
npm run start:dev

# production
npm run build
npm run start:prod
```

### API Documentation

Swagger UI is available at [http://localhost:3000/api/docs](http://localhost:3000/api/docs).

## Usage

### Location Endpoints

- `GET /api/locations` — List all locations
- `GET /api/locations/:id` — Get location by ID
- `POST /api/locations` — Create a new location
- `PUT /api/locations/:id` — Update a location
- `DELETE /api/locations/:id` — Delete a location

See [`LocationsController`](src/app/location/controllers/locations.controller.ts) for details.

### Authentication

Protected endpoints require a JWT token in the `Authorization` header:

```
Authorization: Bearer <your_token>
```

See [`AuthGuard`](src/app/auth/auth.guard.ts) for implementation.

## Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# coverage
npm run test:cov
```

## Project Structure

- [`src/main.ts`](src/main.ts): App entry point
- [`src/app/app.module.ts`](src/app/app.module.ts): Main module
- [`src/app/location`](src/app/location): Location feature modules, controllers, entities, services
- [`src/app/auth`](src/app/auth): Authentication module and guard

## License

MIT