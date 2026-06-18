# Enderas Asset Management — Backend API

RESTful backend for the Enderas Asset Management website and admin CMS. Built with Express 5, Sequelize ORM, and MySQL.

## Tech Stack

| Category     | Technology                        |
| ------------ | --------------------------------- |
| Runtime      | Node.js 20+                       |
| Framework    | Express 5                         |
| Language     | JavaScript (ES Modules)           |
| ORM          | Sequelize 6                       |
| Database     | MySQL 8+                          |
| Auth         | JWT (access + refresh tokens)     |
| Validation   | express-validator                 |
| File Uploads | multer 2                          |
| Security     | helmet, cors, express-rate-limit  |
| Testing      | Vitest + Supertest + SQLite       |

## Prerequisites

- Node.js 20+
- MySQL 8+ (or MariaDB 10.5+)
- npm

## Quick Start

```bash
# 1. Enter backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your database credentials and JWT secrets

# 4. Create database
mysql -u root -e "CREATE DATABASE IF NOT EXISTS enderas"

# 5. Run migrations
npm run migrate

# 6. Seed super admin + site content (from docs/existing HTML export)
npm run seed

# 7. Start development server
npm run dev
```

## Environment Variables

| Variable                | Description                    | Default                        |
| ----------------------- | ------------------------------ | ------------------------------ |
| `PORT`                  | Server port                    | `5000`                         |
| `NODE_ENV`              | Environment                    | `development`                  |
| `DB_HOST`               | Database host                  | `localhost`                    |
| `DB_PORT`               | Database port                  | `3306`                         |
| `DB_NAME`               | Database name                  | `enderas`                      |
| `DB_USER`               | Database user                  | `root`                         |
| `DB_PASSWORD`           | Database password              |                                |
| `JWT_SECRET`            | Access token secret            |                                |
| `JWT_REFRESH_SECRET`    | Refresh token secret           |                                |
| `JWT_ACCESS_EXPIRES_IN` | Access token expiry            | `15m`                          |
| `JWT_REFRESH_EXPIRES_IN`| Refresh token expiry           | `7d`                           |
| `ADMIN_URL`             | Admin CMS browser origin(s)    | `http://localhost:5173`        |
| `FRONTEND_URL`          | Public site browser origin(s)  | `http://localhost:5174`        |
| `API_BASE_URL`          | Backend base URL               | `http://localhost:5000/api/v1` |
| `UPLOAD_PATH`           | File upload directory          | `./src/uploads`                |
| `MAX_FILE_SIZE`         | Max upload size (bytes)        | `5242880` (5MB)                |
| `SUPER_ADMIN_EMAIL`     | Initial super admin email      | `admin@enderas.com`            |
| `SUPER_ADMIN_PASSWORD`  | Initial super admin password   | (auto-generated in dev)        |

> **Production:** `SUPER_ADMIN_PASSWORD` is required when `NODE_ENV=production`. The server will refuse to start without it.

### CORS (`ADMIN_URL` / `FRONTEND_URL`)

CORS is path-scoped: each browser origin may only call the API surface it is meant to use.

| Origin env        | Allowed routes                                      |
| ----------------- | --------------------------------------------------- |
| `ADMIN_URL`       | `/api/v1/auth/*`, admin management routes, `/uploads` |
| `FRONTEND_URL`    | `/api/v1/public/*`, `/uploads`                      |

Use comma-separated values when you need both `localhost` and `127.0.0.1` in development.

**Local development** (admin on 5173, public site on 5174 when both run):

```env
ADMIN_URL=http://localhost:5173,http://127.0.0.1:5173
FRONTEND_URL=http://localhost:5174,http://127.0.0.1:5174
```

**Production** example:

```env
ADMIN_URL=https://admin.enderas.com
FRONTEND_URL=https://enderas.com
```

`CLIENT_URLS` is still read as a fallback when `ADMIN_URL` / `FRONTEND_URL` are unset (first origin → admin, rest → frontend).

> **Restart required:** Changing `.env` does not hot-reload. Restart `npm run dev` after updating CORS URLs.

### Local dev URLs

| App | Default URL | Notes |
| --- | ----------- | ----- |
| Backend API | `http://localhost:5000/api/v1` | Set `PORT` in `.env` |
| Admin CMS | `http://localhost:5173` | Fixed in `admin/vite.config.js` |
| Public frontend | `http://localhost:5173` or `5174` | Vite picks the next free port if 5173 is taken |

Run all three together: backend → admin → frontend. Set `ADMIN_URL` and `FRONTEND_URL` to match each app's browser origin.

## Database Seeding

Two seeders run with `npm run seed`:

| Seeder | File | Purpose |
| ------ | ---- | ------- |
| `001-super-admin` | `src/seeders/001-super-admin.cjs` | Creates the super admin user |
| `002-site-content` | `src/seeders/002-site-content.cjs` | Populates CMS from `docs/existing/*.html` |

The site content seeder is **idempotent** — it skips tables that already have data. Content is sourced from the existing Enderas website HTML export (`docs/existing/*.html`), supplemented with placeholder team and testimonial data where the export had no CMS entries.

| Content | Count | Source |
| ------- | ----- | ------ |
| Site settings | 1 | HTML + logo/favicon URLs |
| Home page | 1 | index.html |
| Hero slides | 3 | index.html |
| Statistics | 4 | index.html |
| Services | 5 | index.html, service.html |
| About page + core values | 1 + 5 | about.html |
| Contact page | 1 | contact.html |
| Gallery categories + items | 3 + 12 | gallery.html |
| Blog categories + posts | 3 + 3 | blog.html |
| FAQs | 8 | HTML + business context |
| Team members | 6 | Placeholder (editable in CMS) |
| Testimonials | 5 | Placeholder (editable in CMS) |
| Partners | 4 | about.html logos |

**Super admin behavior by environment:**

- **Development** — auto-generates a password if `SUPER_ADMIN_PASSWORD` is empty (printed to console)
- **Staging / Production** — requires a strong password (12+ chars, mixed case, number, special character)

Reset everything:

```bash
npm run db:reset   # migrate:fresh + seed
```

## Scripts

| Script             | Description                              |
| ------------------ | ---------------------------------------- |
| `npm run dev`      | Start development server with watch mode |
| `npm start`        | Run migrations + start production server |
| `npm test`         | Run unit + integration tests             |
| `npm run test:watch` | Run tests in watch mode                |
| `npm run migrate`  | Run pending migrations                   |
| `npm run migrate:undo` | Undo last migration                  |
| `npm run migrate:fresh` | Undo all migrations, then re-run    |
| `npm run seed`     | Run all seeders                          |
| `npm run seed:undo`| Undo last seeder                         |
| `npm run db:reset` | Fresh migrate + seed                     |

## Testing

### Automated Tests

```bash
npm test
```

**115 tests** across three layers (see `tests/README.md`):

| Layer | Files | Coverage |
| ----- | ----- | -------- |
| Unit | `tests/unit/` | JWT sign/verify/expiry, token hashing, password edge cases, pickFields security, duration parsing, slugs |
| Contract | `tests/contract/` | Service ↔ controller error mapping, validation middleware shape |
| Integration | `tests/integration/` | Full HTTP flows, utilities inside auth/service/user creation |

Tests use a shared in-memory SQLite database (no MySQL required). Environment is configured in `tests/setup.js`; the DB connection closes once via `tests/globalTeardown.js`.

### Manual API Testing (Postman)

See **[test.md](./test.md)** for a complete Postman testing guide with request examples, environment variables, and a recommended test sequence.

## API Overview

All endpoints are prefixed with `/api/v1`.

### Authentication

```
POST   /api/v1/auth/login             # Login → { accessToken, refreshToken, user }
POST   /api/v1/auth/refresh           # Refresh access token (token rotation)
POST   /api/v1/auth/logout            # Invalidate refresh token (idempotent)
GET    /api/v1/auth/me                # Current user info
POST   /api/v1/auth/change-password   # Change password
```

### Public Endpoints (no auth)

```
GET    /api/v1/public/home            # Homepage + hero slides + stats + featured
GET    /api/v1/public/about           # About + core values + partners
GET    /api/v1/public/services        # Active services only (paginated)
GET    /api/v1/public/services/:slug  # Service detail
GET    /api/v1/public/gallery         # Gallery items (paginated, filterable)
GET    /api/v1/public/posts           # Published blog posts (paginated)
GET    /api/v1/public/posts/:slug     # Blog post detail
GET    /api/v1/public/contact         # Contact page info
POST   /api/v1/public/contact         # Submit contact form
GET    /api/v1/public/settings        # Site settings
```

### Admin Endpoints (JWT required)

Includes CRUD for: users, homepage, statistics, hero slides, services, gallery, team, testimonials, FAQs, about, contact, blog, media, settings.

```
GET    /api/v1/dashboard              # Aggregate statistics
PATCH  /api/v1/services/:id/status  # Toggle service active state
```

See `src/routes/admin.js` for the complete route list.

### Health Check

```
GET    /api/v1/health
```

Returns `{ status, database, uptime, timestamp }`. Returns 503 if database is disconnected.

### Response Format

**Success:**
```json
{ "success": true, "message": "Operation successful", "data": {} }
```

**Error:**
```json
{ "success": false, "message": "Error description", "errors": [] }
```

**Paginated:**
```json
{ "success": true, "data": [], "meta": { "page": 1, "limit": 10, "total": 50, "totalPages": 5 } }
```

## Authentication Flow

1. **Login** — `POST /auth/login` returns access token (15 min) and refresh token (7 days).
2. **Authenticate** — Include `Authorization: Bearer <accessToken>` in protected requests.
3. **Refresh** — `POST /auth/refresh` rotates tokens (old refresh token is invalidated).
4. **Logout** — `POST /auth/logout` invalidates the refresh token. Always returns 200.

Refresh tokens are stored as SHA-256 hashes. DB expiry is synchronized with `JWT_REFRESH_EXPIRES_IN`.

## Security

- **Helmet** — Secure HTTP headers
- **CORS** — Path-scoped by `ADMIN_URL` and `FRONTEND_URL`
- **Rate Limiting** — Login: 5/15 min. Contact: 3/hour
- **Password Hashing** — bcrypt, 12 salt rounds
- **JWT** — Access + refresh tokens with rotation
- **Input Validation** — express-validator on auth, users, contact, and admin content endpoints
- **Mass Assignment Protection** — `pickFields` whitelists allowed model fields
- **SQL Injection** — Sequelize parameterized queries
- **File Validation** — JPG, JPEG, PNG, WEBP only. Max size enforced
- **Graceful Shutdown** — SIGTERM/SIGINT closes HTTP server and DB pool

## Project Structure

```
backend/
├── app.js                    # Express setup (middleware, routes, health)
├── server.js                 # Entry point + graceful shutdown
├── test.md                   # Postman testing guide
├── vitest.config.js          # Test configuration
├── tests/
│   ├── setup.js              # Test env variables
│   ├── helpers/db.js         # In-memory DB sync helper
│   ├── unit/                 # Unit tests
│   └── integration/          # API integration tests
│
└── src/
    ├── config/               # env, database, sequelize CLI
    ├── constants/            # Role definitions
    ├── models/               # 20 Sequelize models
    ├── middleware/           # auth, validation, upload, errors
    ├── validations/          # express-validator rules
    ├── services/             # Business logic layer
    ├── controllers/          # Request handlers
    ├── routes/               # Route definitions
    ├── utils/                # JWT, password, pagination, etc.
    ├── migrations/           # 21 database migrations
    ├── seeders/              # Super admin + site content seeders
    │   └── data/             # Content extracted from docs/existing
    └── uploads/              # Uploaded media files
```

## Deployment

1. Set `NODE_ENV=production` and configure all environment variables.
2. Set a strong `SUPER_ADMIN_PASSWORD`.
3. Set `ADMIN_URL` and `FRONTEND_URL` to the deployed admin and public site origins.
4. Run `npm run migrate` to apply schema.
5. Run `npm run seed` to create admin and populate content.
6. Start with `npm start` (runs migrations automatically).

## Roadmap

- Activity logging (v2)
- S3/Cloudinary media storage (v2)
- Scheduled post publishing (v2)
- Expired refresh token cleanup job (v2)
