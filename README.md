# RealEngo customer platform

React/Vite frontend plus an Express API prepared for PostgreSQL through Prisma. The public website remains usable as a guest; permanent customer data is handled only by the API and database.

## Architecture

- `src/`: public interface, booking prototype and the new **Mi cuenta** experience.
- `src/api.js`: the only browser HTTP client; always sends the secure session cookie.
- `server/`: Express API, validation, authorization and session security.
- `prisma/schema.prisma`: users, sessions, pets, services, appointments, availability, products, favorites, carts, orders and roles.
- `api/index.js`: Vercel serverless entry point.
- `prisma/migrations/202607120001_initial_customer_platform/`: initial PostgreSQL migration.

## Data boundaries

Permanent data belongs in PostgreSQL: accounts, pets, sensitive health notes, favorites, carts, appointments and orders. `localStorage` remains only in the older guest-facing prototype for an expiring 24-hour booking draft and temporary demo cart; the UI does not describe those values as permanent.

Passwords are hashed with bcrypt (cost 12). Sessions use random opaque tokens; only their SHA-256 hashes are stored in the database, while the browser receives an `HttpOnly`, `SameSite=Lax` cookie. Administrative endpoints require the `ADMIN` role.

## Local setup

Requirements: Node 22, PostgreSQL and npm.

1. Copy `.env.example` to `.env` and set a real `DATABASE_URL`.
2. Install and generate the client:

   ```bash
   npm install
   npm run prisma:generate
   ```

3. Apply the migration and seed the six official services:

   ```bash
   npm run db:migrate
   npm run db:seed
   ```

4. Start the API and frontend in separate terminals:

   ```bash
   npm run dev:api
   npm run dev
   ```

The Vite development server proxies `/api` to `http://127.0.0.1:3001`.

## Validation

```bash
npm run lint
npm test
npm run build
npm audit --audit-level=high
```

The server tests cover password hashing, HttpOnly session cookies, generic login failures, account isolation, administrative authorization and duplicate confirmed-slot protection.

## External configuration still required

- PostgreSQL `DATABASE_URL` (prefer a pooled serverless URL on Vercel).
- `APP_ORIGIN` set to the final production domain.
- An approved email provider (`EMAIL_API_KEY`, `EMAIL_FROM`) before password-recovery messages can be delivered.
- Private object storage before pet photos can be uploaded. The API returns `PHOTO_STORAGE_NOT_CONFIGURED` until then.
- Confirmed business hours, staff/resource capacity, service duration and closure rules.
- Real product catalog, prices, SKUs and inventory.
- Payment provider and explicit authorization before enabling payment.

This repository is not represented as production-ready until database backups, email delivery, private file storage, monitoring, security review and production deployment are verified.
