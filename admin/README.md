# Enderas Admin CMS

A secure content management application for the [Enderas Asset Management](https://enderas.com) website. Administrators use it to update public-site content without touching code — homepage sections, blog posts, gallery, team profiles, contact details, and more.

Built with **React 19**, **Vite 8**, **Tailwind CSS 4**, and integrated with the Express + MySQL backend in `../backend`.

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Authentication](#authentication)
- [Architecture](#architecture)
- [Adding a new CMS page](#adding-a-new-cms-page)
- [Testing](#testing)
- [Scripts](#scripts)
- [Deployment](#deployment)

---

## Features

| Module | Capabilities |
|--------|-------------|
| **Dashboard** | Aggregate stats, quick actions, recent contact messages |
| **Homepage** | Section content, statistics CRUD, visibility toggles, SEO |
| **Hero slides** | Create / edit / delete / activate slides |
| **Services** | Paginated CRUD, status toggle, per-service SEO |
| **Gallery** | Items + categories, image upload |
| **Blog** | Posts with publish workflow, categories, rich content, SEO |
| **Team** | Member profiles with enable/disable |
| **Testimonials & FAQs** | CRUD with visibility toggle |
| **About & Core values** | Company story and values |
| **Partners** | Logo partners with website links |
| **Contact** | Page info editor + message inbox |
| **Media library** | Centralized image upload (JPG, PNG, WEBP) |
| **Settings** | Branding, footer, social links *(super admin)* |
| **Users** | Admin user management *(super admin)* |
| **Profile** | Change password |

**Role-based access**

- **Super admin** — full access including users and site settings
- **Editor** — content modules only; settings and users are hidden

---

## Tech stack

| Layer | Library |
|-------|---------|
| UI | React 19 |
| Build | Vite 8 |
| Routing | React Router 7 |
| HTTP | Axios (centralized in `src/services/`) |
| State | Zustand (auth session) |
| Forms | React Hook Form + Zod (login) |
| Notifications | Sonner |
| Icons | Lucide React |
| Styling | Tailwind CSS 4 |
| Testing | Vitest + React Testing Library + jsdom |

---

## Project structure

```
admin/
├── src/
│   ├── components/
│   │   ├── common/          # Shared CMS patterns (CrudPageLayout, FormModal, …)
│   │   ├── layout/            # AdminLayout, Sidebar, Header
│   │   └── ui/                # Primitive UI (Button, Input, DataTable, …)
│   ├── constants/
│   │   ├── navigation.js    # Sidebar nav groups (role-filtered)
│   │   ├── routes.js          # Route path constants
│   │   └── roles.js           # Role helpers
│   ├── hooks/
│   │   ├── useAsyncData.js    # Fetch-on-mount with reload
│   │   ├── useCrudList.js     # CRUD modal + delete confirmation
│   │   ├── usePaginatedList.js
│   │   ├── useRecordEditor.js # Singleton page editors
│   │   └── useFormState.js    # Form field helpers
│   ├── pages/                 # One file per CMS screen
│   ├── routes/
│   │   ├── AppRoutes.jsx      # Route table
│   │   └── ProtectedRoute.jsx # Auth + role guards
│   ├── services/
│   │   ├── api.js             # Axios instance, JWT refresh
│   │   ├── cmsApi.js          # All backend endpoint wrappers
│   │   └── index.js           # Barrel export
│   ├── store/
│   │   └── useAuthStore.js    # Session state
│   └── utils/                 # Errors, formatting, media URLs
├── tests/
│   ├── setup.js               # Vitest global setup
│   ├── unit/                  # Utils, hooks, components, routes
│   └── integration/           # Page-level flows (login)
├── .env.example
└── README.md
```

**Design principles**

1. **All API calls** go through `src/services/cmsApi.js` — pages never import Axios directly.
2. **Repeated CRUD logic** lives in `useCrudList` + `CrudPageLayout` instead of being copy-pasted per page.
3. **Singleton editors** (About, Settings, Contact) use `useRecordEditor`.
4. **Every module** has a `@fileoverview` comment explaining its purpose.

---

## Getting started

### Prerequisites

- Node.js 20+
- Backend running at `http://localhost:5000` (see `../backend/README.md`)

### Install and run

```bash
cd admin
cp .env.example .env
npm install
npm run dev
```

Open **http://localhost:5173** (port is fixed in `vite.config.js`).

If you also run the public frontend (`../frontend`), Vite will use the next free port (usually **5174**) for that app. Set `FRONTEND_URL` in the backend `.env` to match.

### Default login

After seeding the backend (`cd ../backend && npm run seed`):

| Field | Value |
|-------|-------|
| Email | `admin@enderas.com` (or `SUPER_ADMIN_EMAIL` from backend `.env`) |
| Password | Printed to the backend console in development if not set in `.env` |

---

## Environment variables

Copy `.env.example` to `.env`. **No URLs are hardcoded** in source code.

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend REST API prefix | `http://localhost:5000/api/v1` |
| `VITE_UPLOAD_BASE_URL` | Static uploads base URL | `http://localhost:5000/uploads` |
| `VITE_APP_NAME` | Title shown in sidebar | `Enderas CMS` |

**CORS:** Set `ADMIN_URL` and `FRONTEND_URL` in `backend/.env` so the API accepts requests from each app on its designated routes:

```env
ADMIN_URL=http://localhost:5173,http://127.0.0.1:5173
FRONTEND_URL=http://localhost:5174,http://127.0.0.1:5174
```

Restart the backend after changing CORS URLs.

---

## Authentication

1. **Login** — `POST /auth/login` returns access + refresh tokens.
2. **Storage** — Tokens persist in `localStorage` (Remember me) or `sessionStorage`.
3. **Refresh** — On 401, the Axios interceptor silently refreshes tokens and retries.
4. **Logout** — Invalidates the refresh token server-side and clears local storage.

Protected routes redirect to `/login`. Super-admin-only routes (`/settings`, `/users`) redirect editors to the dashboard.

---

## Architecture

### Data flow

```
Page component
    ↓ uses
Custom hook (useCrudList / useRecordEditor / useAsyncData)
    ↓ calls
cmsApi.* (centralized endpoints)
    ↓ uses
api.js (Axios + JWT interceptors)
    ↓
Express backend /api/v1/*
```

### CRUD page pattern

Most list pages follow this structure:

```jsx
const { data: items, loading, reload } = useAsyncData(teamApi.list)

const crud = useCrudList({
  createFn: teamApi.create,
  updateFn: teamApi.update,
  deleteFn: teamApi.delete,
  toggleFn: teamApi.toggleStatus,  // optional
  reload,
  emptyRecord: EMPTY_MEMBER,
  messages: { create: 'Member created', ... },
})

return (
  <CrudPageLayout title="..." loading={loading} deleteDialog={crud} ...>
    <DataTable data={items ?? []} columns={[...]} />
    <MemberFormModal key={crud.editingRecord?.id ?? 'new'} ... />
  </CrudPageLayout>
)
```

### Singleton page pattern

```jsx
const { data, loading, saving, updateField, save } = useRecordEditor(
  settingsApi.get,
  settingsApi.update,
  'Settings updated',
)
```

---

## Adding a new CMS page

1. **Backend** — Add the endpoint in `backend/src/routes/admin.js` (if not already present).
2. **API** — Add methods to the appropriate namespace in `src/services/cmsApi.js`.
3. **Route** — Add a path constant in `src/constants/routes.js` and a `<Route>` in `src/routes/AppRoutes.jsx`.
4. **Navigation** — Add a sidebar item in `src/constants/navigation.js`.
5. **Page** — Create `src/pages/YourPage.jsx` using `useCrudList` or `useRecordEditor`.
6. **Comments** — Include a `@fileoverview` block at the top of the new file.
7. **Tests** — Add unit tests for new hooks/utils; integration tests for new user flows.

---

## Testing

The admin app uses **Vitest** and **React Testing Library**. **49 automated tests** cover utilities, hooks, auth storage, role-based navigation, route guards, shared components, and the login flow.

```bash
npm test              # run all tests once
npm run test:watch    # watch mode
npm run test:coverage # HTML coverage report in coverage/
```

### Test coverage by layer

| Layer | Files | Examples |
|-------|-------|----------|
| **Unit — utils** | `tests/unit/utils/` | `mediaUrl`, `slugify`, `ApiError`, `cn()` |
| **Unit — hooks** | `tests/unit/hooks/` | `useCrudList`, `useAsyncData`, `recordToForm` |
| **Unit — constants** | `tests/unit/constants/` | Role checks, nav filtering for editors |
| **Unit — services** | `tests/unit/services/` | JWT remember-me token storage |
| **Unit — components** | `tests/unit/components/` | `TableActions`, `StatCard` |
| **Unit — routes** | `tests/unit/routes/` | `ProtectedRoute` auth + role redirects |
| **Integration** | `tests/integration/` | Login form, validation, navigation |

See **[tests/README.md](./tests/README.md)** for the full test guide, conventions, and how to add new tests.

### Recommended pre-commit check

```bash
npm run lint && npm test && npm run build
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server with HMR |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | ESLint |
| `npm test` | Run Vitest test suite (49 tests) |
| `npm run test:watch` | Vitest in watch mode |
| `npm run test:coverage` | Tests with V8 coverage report |

---

## Deployment

1. Set production values in `.env` (API URL, upload URL, app name).
2. Run `npm run build`.
3. Serve the `dist/` folder with any static host (Nginx, Vercel, Netlify, S3 + CloudFront).
4. Set `ADMIN_URL` and `FRONTEND_URL` in the backend to match every deployed browser origin.
5. Configure HTTPS for both admin and API in production.

---

## Related documentation

- [Backend API](../backend/README.md) — endpoints, auth, seeding
- [Test suite guide](./tests/README.md) — how to run and write tests
- [Admin CMS spec](../docs/admindoc.md) — full feature requirements
- [Admin SRS](../docs/adminsrs.md) — software requirements
