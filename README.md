# FreelanceHub API

REST API for a freelance marketplace: freelancers sign in, publish their services, and anyone can browse the public catalog. Built with NestJS, TypeORM and PostgreSQL as my Back-end Development midterm at ESEN.

| | |
|---|---|
| **Author** | Kathleen Argueta |
| **Stack** | NestJS · TypeScript · TypeORM · PostgreSQL · JWT · Swagger |
| **Portfolio** | [kathleenargueta.github.io](https://kathleenargueta.github.io) |

## What it does

| Endpoint | Access | What it returns |
|---|---|---|
| `POST /auth/login` | Public | A JWT for a registered user |
| `POST /services` | JWT required | Creates a service linked to the signed-in freelancer |
| `GET /public/services` | Public | The catalog: title, category, price and freelancer name |

Interactive docs are served by Swagger at `/api`.

## Decisions

- **Separate public and private modules.** Publishing goes through `JwtAuthGuard`; the catalog lives in its own `PublicModule`, so it is clear which routes are open.
- **The catalog only exposes what a visitor needs.** It maps each service to title, category, price and the freelancer's name, instead of returning the full user record.
- **Input validation at the edge.** A global `ValidationPipe` and `class-validator` rules on `CreateServiceDto` reject incomplete or wrongly typed services before they reach the database.

## Known limitations and next steps

This was scoped as an exam with a simulated login, and I would change these before any real use:

- Passwords are compared in plain text. Next step: hash them with bcrypt.
- Database credentials are in `app.module.ts`. Next step: move them to environment variables.
- `synchronize: true` is convenient in development but unsafe in production. Next step: use migrations.

## Run it locally

Requires Node.js and a PostgreSQL database named `freelancehub`.

```bash
cd freelancehub-api
npm install
npm run start:dev
```

Then open http://localhost:3000/api.
