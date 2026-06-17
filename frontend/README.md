# Enderas Asset Management — Frontend

Production-ready React application for the Enderas Asset Management public website and embedded content admin (CMS). The UI is built from the design prototype in [`demo/enderas.html`](demo/enderas.html) and follows the specification in [`../docs/frontenddoc.md`](../docs/frontenddoc.md).

This phase runs **frontend-only**: content is seeded from demo data, persisted in the browser via `localStorage`, and exposed through a mock service layer that mirrors future REST API endpoints. When the backend is available, only the service files need to change — pages and components stay the same.

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Requirements](#requirements)
- [Quick start](#quick-start)
- [Environment variables](#environment-variables)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [Public routes](#public-routes)
- [Admin CMS](#admin-cms)
- [Data layer](#data-layer)
- [Design system](#design-system)
- [Accessibility and SEO](#accessibility-and-seo)
- [Migrating to the backend API](#migrating-to-the-backend-api)
- [Production deployment](#production-deployment)
- [Browser support](#browser-support)
- [Troubleshooting](#troubleshooting)
- [Related documentation](#related-documentation)

---

## Features

### Public website

- Responsive corporate site with dark mode toggle
- Home page with hero slider, company intro, auction & valuation highlight, featured services/projects, statistics, latest blog posts, and inquiry CTA
- About, Services (with `#auctions` promo block), Gallery (masonry + lightbox), Blog (search/filter/pagination), Blog detail, Contact form, and 404 pages
- Lazy-loaded routes and code splitting for performance
- WCAG-oriented markup: skip link, semantic HTML, ARIA on interactive widgets, reduced-motion support
- Per-page SEO via `react-helmet-async` (titles, descriptions, Open Graph, Twitter cards, JSON-LD on Home and blog posts)

### Admin CMS (embedded)

- Protected admin area at `/admin/*` with mock password auth
- Dashboard with content counts and quick actions
- Editors for site settings, homepage, about page, services, gallery, blog posts, and contact messages
- CRUD tables with validation (React Hook Form + Zod) and toast notifications (Sonner)
- Changes sync instantly to the public site via shared Zustand store + `localStorage`

### Intentionally excluded (per spec)

- `/assets-for-sale` auction listings page (informational auction promo only; no bidding/marketplace)
- Real JWT authentication, media file uploads, and backend API calls (deferred)

---

## Tech stack

All dependencies are **actively maintained** packages with no npm `deprecated` flags and **zero known vulnerabilities** (`npm audit`).

| Category | Package | Purpose |
| -------- | ------- | ------- |
| UI | [React 19](https://react.dev/) | Component framework |
| Build | [Vite 8](https://vite.dev/) | Dev server and production bundler |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first design system |
| Routing | [React Router 7](https://reactrouter.com/) | Public + admin routes |
| State | [Zustand 5](https://zustand.docs.pmnd.rs/) | CMS content, UI, auth |
| HTTP (future) | [Axios 1.x](https://axios-http.com/) | Shared API client (stubbed) |
| Forms | [React Hook Form 7](https://react-hook-form.com/) + [Zod 4](https://zod.dev/) | Validation |
| SEO | [react-helmet-async 3](https://github.com/staylor/react-helmet-async) | Document head management (maintained fork of deprecated `react-helmet`) |
| Sanitization | [DOMPurify 3](https://github.com/cure53/DOMPurify) | Safe HTML rendering |
| Icons | [Lucide React](https://lucide.dev/) | Icon set |
| Toasts | [Sonner](https://sonner.emilkowal.ski/) | Admin notifications |

Animations use **CSS** (`@keyframes`, Intersection Observer scroll reveal) — no animation library dependency.

---

## Requirements

- **Node.js** 20 LTS or newer
- **npm** 10 or newer

Verify:

```bash
node -v   # v20.x or v22.x recommended
npm -v    # 10.x or newer
```

---

## Quick start

```bash
# From the repository root
cd frontend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Start development server
npm run dev
```

| URL | Description |
| --- | ----------- |
| http://localhost:5173 | Public website |
| http://localhost:5173/admin/login | Admin CMS login |

**Default admin password:** `enderas-admin` (override with `VITE_ADMIN_PASSWORD` in `.env`).

---

## Environment variables

Create a `.env` file from [`.env.example`](.env.example). Only variables prefixed with `VITE_` are exposed to the client.

| Variable | Required | Default | Description |
| -------- | -------- | ------- | ----------- |
| `VITE_API_BASE_URL` | No | `http://localhost:3000/api` | Backend API base URL (used when services switch to HTTP) |
| `VITE_APP_NAME` | No | `Enderas Asset Management` | Application display name |
| `VITE_ADMIN_PASSWORD` | No | `enderas-admin` | Mock admin login password (frontend-only) |

Never commit secrets or production passwords. Use your hosting provider's environment configuration in production.

---

## Available scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## Project structure

```plaintext
frontend/
├── public/                 # Static assets (favicon, robots.txt)
├── demo/
│   └── enderas.html        # Original single-file design prototype
├── src/
│   ├── assets/             # Local images/fonts (if added)
│   ├── components/
│   │   ├── atoms/          # Button, Badge, Container, Icon, Loader
│   │   ├── molecules/      # Cards, FormField, SectionHeading
│   │   ├── organisms/      # TopNav, Footer, HeroSlider, SeoHead, etc.
│   │   └── admin/          # Admin form/table primitives
│   ├── constants/          # Routes, Zod schemas
│   ├── data/seed/
│   │   └── cmsData.js      # Default CMS seed data
│   ├── hooks/              # useScrollReveal, useCountUp
│   ├── layouts/
│   │   ├── MainLayout.jsx  # Public shell
│   │   └── AdminLayout.jsx # Admin shell
│   ├── pages/
│   │   ├── public/         # Home, About, Services, Gallery, Blog, Contact, 404
│   │   └── admin/          # Login, Dashboard, CRUD editors
│   ├── routes/             # AppRouter, PublicRoutes, AdminRoutes
│   ├── services/           # Mock API layer (swap for Axios later)
│   ├── store/              # Zustand stores
│   ├── styles/             # Global CSS utilities
│   ├── utils/              # Storage, sanitization, formatting
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css           # Tailwind v4 theme tokens
├── .env.example
├── index.html
├── jsconfig.json           # Path alias: @ → src/
├── package.json
└── vite.config.js
```

Path alias: import from `@/components/...` instead of relative paths.

---

## Public routes

| Route | Page | Notes |
| ----- | ---- | ----- |
| `/` | Home | Hero slider, intro, auction banner, featured content |
| `/about` | About | History, mission, vision, values, team, partners |
| `/services` | Services | Service detail panel; `#auctions` valuation promo |
| `/gallery` | Gallery | Category filters, masonry grid, lightbox |
| `/blog` | Blog listing | Search, category filter, pagination |
| `/blog/:slug` | Blog detail | Dynamic SEO, related articles |
| `/contact` | Contact | Validated form, map embed |
| `*` | 404 | Not found |

---

## Admin CMS

| Route | Purpose |
| ----- | ------- |
| `/admin/login` | Mock authentication |
| `/admin/dashboard` | Overview stats and quick links |
| `/admin/settings` | Site settings, SEO defaults, navigation JSON, reset-to-seed |
| `/admin/homepage` | Hero slides, stats, intro, auction highlight, CTA |
| `/admin/about` | About page content |
| `/admin/services` | Create / edit / delete services |
| `/admin/gallery` | Create / edit / delete gallery items |
| `/admin/blog` | Create / edit / delete blog posts |
| `/admin/messages` | View and delete contact form submissions |

### Authentication (temporary)

Admin auth is a **development placeholder**:

- Password checked against `VITE_ADMIN_PASSWORD`
- Session stored in `sessionStorage` (`enderas-admin-session`)
- Replace with JWT flow when the backend `/auth/login` endpoint is ready (see [`../docs/admindoc.md`](../docs/admindoc.md))

### Resetting content

In **Admin → Settings**, use **Reset to seed** to restore all CMS data from [`src/data/seed/cmsData.js`](src/data/seed/cmsData.js). This clears customized content in `localStorage`.

---

## Data layer

```plaintext
Seed data (cmsData.js)
        ↓
Zustand store (useContentStore)  ←→  localStorage (enderas-cms-v1)
        ↓
Service modules (contentService, blogService, …)
        ↓
Pages & admin editors
```

- **Components never call Axios directly.** They read from the store or call service functions.
- **`services/api.js`** defines a shared Axios instance with interceptors for future JWT auth.
- **Contact submissions** are stored in the same content store under `messages`.

---

## Design system

Tokens are defined in [`src/index.css`](src/index.css):

| Token | Usage |
| ----- | ----- |
| `primary` (navy) | Headings, dark sections, footer |
| `gold` (accent) | CTAs, highlights, badges |
| `sand` | Page background |
| `success` / `warning` / `error` | Semantic states |

Typography: **Fraunces** (headings), **Inter** (body) — loaded in [`index.html`](index.html).

Utility classes: `.reveal` (scroll animation), `.masonry`, reduced-motion overrides in [`src/styles/globals.css`](src/styles/globals.css).

---

## Accessibility and SEO

### Accessibility

- Skip-to-content link on every public page
- Keyboard navigation for mobile menu, hero slider, gallery lightbox, and modals
- Focus-visible rings on interactive elements
- Form errors linked with `aria-describedby` and `aria-invalid`
- `prefers-reduced-motion`: disables auto-slide, count-up animation, and ken-burns effect

### SEO

- Unique `<title>` and meta description per page
- Canonical URLs, Open Graph, and Twitter Card tags
- JSON-LD `Organization` schema on Home; `Article` schema on blog posts
- `robots.txt` disallows `/admin/` crawling

---

## Migrating to the backend API

When the backend is ready:

1. Set `VITE_API_BASE_URL` to your API origin.
2. Update each file in [`src/services/`](src/services/) to call `api.get/post/put/delete` instead of reading/writing the Zustand store.
3. Replace mock admin auth in [`src/store/useAuthStore.js`](src/store/useAuthStore.js) with JWT from `POST /auth/login`.
4. Keep component and page code unchanged — they already consume services only.

Endpoint shapes are documented in [`../docs/admindoc.md`](../docs/admindoc.md) and [`../docs/backenddoc.md`](../docs/backenddoc.md).

Example service change:

```js
// Before (mock)
export async function getServices() {
  return useContentStore.getState().services
}

// After (API)
import api from './api'
export async function getServices() {
  const { data } = await api.get('/services')
  return data
}
```

---

## Production deployment

```bash
npm run build
npm run preview   # optional local smoke test
```

Output is written to `dist/`. Deploy `dist/` to any static host (Netlify, Vercel, S3 + CloudFront, Nginx, etc.).

Configure environment variables on your host before building. For SPA routing, ensure all non-file routes fall back to `index.html`.

Suggested checks before release:

- [ ] All public routes load without console errors
- [ ] Contact form submits and appears in Admin → Messages
- [ ] Admin CRUD changes reflect on the public site
- [ ] Lighthouse accessibility score ≥ 90 on Home and Contact
- [ ] `npm audit` reports 0 vulnerabilities

---

## Browser support

| Browser | Support |
| ------- | ------- |
| Chrome | Latest 2 versions |
| Edge | Latest 2 versions |
| Firefox | Latest 2 versions |
| Safari | Latest 2 versions |

Requires ES2020+ and CSS Grid/Flexbox. Intersection Observer is used for scroll reveal (graceful fallback shows content immediately if unavailable).

---

## Troubleshooting

### Admin login fails

- Confirm `.env` exists and `VITE_ADMIN_PASSWORD` matches what you enter.
- Restart the dev server after changing `.env` (Vite reads env at startup).

### Content changes not appearing

- Hard refresh the public page. Both admin and public share the same Zustand store in one tab; open the site in the same browser session.
- Check browser `localStorage` key `enderas-cms-v1` is not blocked (private mode restrictions).

### Stale or corrupted CMS data

- Use **Admin → Settings → Reset to seed**, or delete `enderas-cms-v1` from Application → Local Storage in DevTools.

### Build errors after dependency updates

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## Related documentation

| Document | Description |
| -------- | ----------- |
| [`../docs/frontenddoc.md`](../docs/frontenddoc.md) | Full frontend specification |
| [`../docs/admindoc.md`](../docs/admindoc.md) | Admin CMS specification (backend phase) |
| [`../docs/backenddoc.md`](../docs/backenddoc.md) | Backend API specification |
| [`demo/enderas.html`](demo/enderas.html) | Original design prototype |

---

## License

Private — Enderas Asset Management. All rights reserved.
