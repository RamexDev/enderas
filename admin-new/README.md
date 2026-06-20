# Enderas Asset Management — Frontend

Production-ready React application for the **Enderas Asset Management public website**. Content is loaded from the backend REST API (`/api/v1/public/*`) and managed through the separate **Admin CMS** app in [`../admin`](../admin).

The UI follows the specification in [`../docs/frontenddoc.md`](../docs/frontenddoc.md). Layout and navigation are developer-controlled; all business copy, media, and SEO metadata come from the CMS.

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Requirements](#requirements)
- [Quick start](#quick-start)
- [Environment variables](#environment-variables)
- [Available scripts](#available-scripts)
- [Testing](#testing)
- [Project structure](#project-structure)
- [Architecture](#architecture)
- [Public routes](#public-routes)
- [API layer](#api-layer)
- [State management](#state-management)
- [Design system](#design-system)
- [Accessibility and SEO](#accessibility-and-seo)
- [Production deployment](#production-deployment)
- [Browser support](#browser-support)
- [Troubleshooting](#troubleshooting)
- [Related documentation](#related-documentation)

---

## Features

### Public website

- Responsive corporate site with dark mode toggle
- **CMS-driven** homepage: hero slider, company intro, auction & valuation banner, featured services/gallery, statistics, optional team / testimonials / FAQ sections, latest blog posts, contact CTA
- About, Services (with `#auctions` valuation promo), Gallery (masonry + lightbox), Blog (search/filter/pagination), Blog detail, Contact form, and 404 pages
- Lazy-loaded routes and code splitting
- WCAG-oriented markup: skip link, semantic HTML, ARIA on interactive widgets, reduced-motion support
- Per-page SEO via `react-helmet-async` (titles, descriptions, Open Graph, Twitter cards, JSON-LD)

### Auction / assets for sale

Per project spec, there is **no standalone auction platform** yet. The **Assets for Sale** nav button and homepage CTAs point to `#` as a placeholder until that site is built. The `/auctions` route has been removed.

### Intentionally excluded

- Live auction listings, bidding, or marketplace functionality
- Content editing in this app (use the [`admin`](../admin) CMS instead)

---

## Tech stack

| Category | Package | Purpose |
| -------- | ------- | ------- |
| UI | [React 19](https://react.dev/) | Component framework |
| Build | [Vite 8](https://vite.dev/) | Dev server and production bundler |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first design system |
| Routing | [React Router 7](https://reactrouter.com/) | Public routes |
| State | [Zustand 5](https://zustand.docs.pmnd.rs/) | Site settings, UI preferences only |
| HTTP | [Axios 1.x](https://axios-http.com/) | Centralized API client |
| Forms | [React Hook Form 7](https://react-hook-form.com/) + [Zod 4](https://zod.dev/) | Contact form validation |
| SEO | [react-helmet-async 3](https://github.com/staylor/react-helmet-async) | Document head management |
| Sanitization | [DOMPurify 3](https://github.com/cure53/DOMPurify) | Safe HTML in blog posts |
| Animation | [Framer Motion 12](https://www.framer.com/motion/) | Page transitions, hero carousel |
| Testing | [Vitest 4](https://vitest.dev/) + Testing Library | Unit and integration tests |

---

## Requirements

- **Node.js** 20 LTS or newer
- **npm** 10 or newer
- **Backend API** running (see [`../backend/README.md`](../backend/README.md))

```bash
node -v   # v20.x or v22.x recommended
npm -v    # 10.x or newer
```

---

## Quick start

### 1. Start the backend

From the repository root:

```bash
cd backend
cp .env.example .env   # configure MySQL + JWT secrets
npm install
npm run migrate
npm run seed           # optional: loads CMS content from docs export
npm run dev            # default: http://localhost:5000/api/v1
```

### 2. Start the frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

### 3. Start the admin CMS (optional, for content editing)

```bash
cd admin
cp .env.example .env
npm install
npm run dev    # http://localhost:5173
```

### Local URLs

| URL | Description |
| --- | ----------- |
| `http://localhost:5173` | Admin CMS (fixed port) |
| `http://localhost:5173` or `http://localhost:5174` | Public website |
| `http://localhost:5000/api/v1/health` | Backend health check |

Content is edited in the **Admin CMS** (`../admin`), not in this app.

Ensure `FRONTEND_URL` in `backend/.env` includes whichever origin Vite prints in the terminal.

---

## Environment variables

Create a `.env` file from [`.env.example`](.env.example). Only variables prefixed with `VITE_` are exposed to the client.

| Variable | Required | Default | Description |
| -------- | -------- | ------- | ----------- |
| `VITE_API_BASE_URL` | **Yes** (for live CMS) | `http://localhost:5000/api/v1` | Backend public API base URL |
| `VITE_APP_NAME` | No | `Enderas Asset Management` | Fallback display name |

Example `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_APP_NAME=Enderas Asset Management
```

Never commit production secrets. Configure env vars on your hosting provider before building.

---

## Available scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint across the project |
| `npm test` | Run all unit + integration tests (Vitest) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:integration` | Run only `tests/integration/` (requires backend) |

---

## Testing

The test suite uses **Vitest** with **jsdom** for hooks/components and live HTTP calls for API integration tests.

### Test layout

```plaintext
tests/
├── setup.js                    # @testing-library/jest-dom
├── unit/
│   ├── mappers.test.js         # API → UI shape transformations
│   ├── navigation.test.js    # Static nav + auction placeholder (#)
│   └── services.test.js        # Domain services (mocked publicApi)
├── hooks/
│   └── useAsyncData.test.jsx   # Page-level data fetching hook
└── integration/
    └── publicApi.test.js       # Live backend /public/* endpoints
```

### Running tests

```bash
# Unit tests only (no backend required)
npx vitest run tests/unit tests/hooks

# Full suite — backend must be running on VITE_API_BASE_URL
npm test

# With coverage
npm run test:coverage
```

Integration tests call `GET/POST /api/v1/public/*` against the configured API. If the backend is unreachable, those cases are **skipped** automatically so CI without a database still passes unit tests.

### Verified (latest run)

| Check | Result |
| ----- | ------ |
| Unit tests (mappers, navigation, services, hooks) | 21 passed |
| Integration tests (live API) | 9 passed |
| ESLint | 0 errors |
| Production build | Success |

---

## Project structure

```plaintext
frontend/
├── public/                     # Static assets (favicon, robots.txt)
├── tests/                      # Vitest unit + integration tests
├── src/
│   ├── components/
│   │   ├── atoms/              # Button, Badge, Container, Icon, Loader
│   │   ├── molecules/          # Cards, FormField, SectionHeading
│   │   └── organisms/          # TopNav, Footer, HeroSlider, FaqSection, etc.
│   ├── constants/
│   │   ├── navigation.js       # Static PUBLIC_NAV (Assets for Sale → #)
│   │   ├── homeSections.js     # Fixed section headings (layout-controlled)
│   │   └── validationSchemas.js
│   ├── hooks/
│   │   ├── useAsyncData.js     # Fetch-on-mount for pages
│   │   ├── useScrollReveal.js
│   │   └── useCountUp.js
│   ├── layouts/
│   │   └── MainLayout.jsx      # Public shell; initializes site store
│   ├── pages/
│   │   └── public/             # Home, About, Services, Gallery, Blog, Contact, 404
│   ├── routes/
│   ├── services/
│   │   ├── api.js              # Axios client + unwrap helpers
│   │   ├── publicApi.js        # All /public/* endpoint definitions
│   │   ├── homeService.js      # Domain services (one per page/module)
│   │   ├── aboutService.js
│   │   ├── serviceService.js
│   │   ├── galleryService.js
│   │   ├── blogService.js
│   │   ├── contactService.js
│   │   ├── settingsService.js
│   │   └── index.js            # Barrel export
│   ├── store/
│   │   ├── useSiteStore.js     # Global settings + footer services
│   │   └── useUiStore.js       # Theme, mobile nav, scroll state
│   ├── utils/
│   │   ├── mappers.js          # Backend snake_case → UI shapes
│   │   ├── sanitizeHtml.js
│   │   └── formatDate.js
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── vite.config.js
└── package.json
```

Path alias: `@/` → `src/` (configured in `vite.config.js` and `jsconfig.json`).

---

## Architecture

```plaintext
Backend API (/api/v1/public/*)
        ↓
publicApi.js          ← single source of endpoint paths
        ↓
Domain services       ← homeService, blogService, …
        ↓
mappers.js            ← normalize API payloads for components
        ↓
Pages (useAsyncData)  ← local page state
        ↓
Components            ← never call Axios directly
```

**Rules (from project spec):**

1. Components and pages **never** import Axios directly.
2. All HTTP traffic goes through `services/`.
3. Page content lives in **local component state** (`useAsyncData`), not global Zustand.
4. `useSiteStore` holds only **site settings** and footer service links for layout components.
5. Navigation structure is **static** (`constants/navigation.js`), not CMS-managed.

---

## Public routes

| Route | Page | Data source |
| ----- | ---- | ----------- |
| `/` | Home | `GET /public/home` + `GET /public/posts?limit=3` |
| `/about` | About | `GET /public/about` |
| `/services` | Services | `GET /public/services` |
| `/gallery` | Gallery | `GET /public/gallery` |
| `/blog` | Blog listing | `GET /public/posts` |
| `/blog/:slug` | Blog detail | `GET /public/posts/:slug` |
| `/contact` | Contact | `GET /public/contact`, `POST /public/contact` |
| `*` | 404 | — |

There is **no** `/auctions` route. **Assets for Sale** in the header points to `#`.

### Homepage optional sections

Controlled by CMS flags on the `home_page` record (`show_team`, `show_testimonials`, `show_faq`):

| Section | Flag | Shown when |
| ------- | ---- | ---------- |
| Team | `show_team` | `true` and team members exist |
| Testimonials | `show_testimonials` | `true` and testimonials exist |
| FAQ | `show_faq` | `true` and FAQ items exist |

Toggle these in **Admin → Homepage → Section visibility**.

---

## API layer

### What uses the API vs what is static

| Content | Source |
| ------- | ------ |
| Homepage, About, Services, Gallery, Blog | CMS API (`/public/*`) |
| Footer SEO, social links | `GET /public/settings` (merged with static defaults) |
| Contact form submission | `POST /public/contact` only |
| Navigation, section headings, contact info, map embed | Static in `constants/siteDefaults.js` |
| Contact page hero copy | Static in `constants/siteDefaults.js` |

The contact page **does not** fetch `GET /public/contact` for display. Address, phone, email, hours, and the map are always available from static defaults (enriched by site settings when the API is up).

### Public endpoints consumed

| Service | Endpoints |
| ------- | --------- |
| `homeService` | `GET /public/home` |
| `aboutService` | `GET /public/about` |
| `serviceService` | `GET /public/services`, `GET /public/services/:slug` |
| `galleryService` | `GET /public/gallery` |
| `blogService` | `GET /public/posts`, `GET /public/posts/:slug` |
| `contactService` | `GET /public/contact`, `POST /public/contact` |
| `settingsService` | `GET /public/settings` (+ contact page for address/phone) |

Full backend reference: [`../backend/README.md`](../backend/README.md) and [`../docs/backenddoc.md`](../docs/backenddoc.md).

### Adding a new endpoint

1. Add the path to `src/services/publicApi.js`.
2. Create or extend a domain service in `src/services/`.
3. Add a mapper in `src/utils/mappers.js` if the UI shape differs from the API.
4. Fetch from the page via `useAsyncData` — do not call the API from a component.
5. Add unit tests under `tests/unit/` and integration coverage under `tests/integration/`.

---

## State management

| Store | Purpose | Used by |
| ----- | ------- | ------- |
| `useSiteStore` | Settings, footer service links | `MainLayout`, `Footer`, `TopNavigation`, `Logo`, `SeoHead` |
| `useUiStore` | Theme, mobile nav, scroll | `TopNavigation` |

---

## Design system

Tokens are defined in [`src/index.css`](src/index.css):

| Token | Usage |
| ----- | ----- |
| `primary` (navy) | Headings, dark sections, footer |
| `gold` (accent) | CTAs, highlights, badges |
| `sand` | Page background |

Typography: **Fraunces** (headings), **Inter** (body).

Utility classes: `.reveal`, `.masonry`, `.section-padding`, reduced-motion overrides in [`src/styles/globals.css`](src/styles/globals.css).

---

## Accessibility and SEO

### Accessibility

- Skip-to-content link on every public page
- Keyboard navigation for mobile menu, hero slider, gallery lightbox, FAQ accordion
- Focus-visible rings on interactive elements
- Form errors linked with `aria-describedby` / `aria-invalid`
- `prefers-reduced-motion`: disables auto-slide, count-up, and ken-burns effect

### SEO

- Unique `<title>` and meta description per page (from CMS where available)
- Canonical URLs, Open Graph, and Twitter Card tags
- JSON-LD `Organization` on Home; `Article` on blog posts

---

## Production deployment

```bash
# Set env vars, then:
npm run build
npm run preview   # optional smoke test on :4173
```

Output is written to `dist/`. Deploy to any static host (Netlify, Vercel, S3 + CloudFront, Nginx, etc.).

Configure `VITE_API_BASE_URL` to your production API **before** building. For SPA routing, ensure non-file routes fall back to `index.html`.

### Pre-release checklist

- [ ] `npm test` — all tests pass (run backend for integration suite)
- [ ] `npm run lint` — no errors
- [ ] `npm run build` — succeeds
- [ ] All public routes load without console errors
- [ ] Contact form submits successfully (`POST /public/contact`)
- [ ] CMS changes in Admin appear on the public site after refresh
- [ ] Homepage FAQ / testimonials / team sections respect visibility flags
- [ ] Assets for Sale button stays on `#` (no broken `/auctions` link)
- [ ] Lighthouse accessibility ≥ 90 on Home and Contact

---

## Browser support

| Browser | Support |
| ------- | ------- |
| Chrome | Latest 2 versions |
| Edge | Latest 2 versions |
| Firefox | Latest 2 versions |
| Safari | Latest 2 versions |

Requires ES2020+, CSS Grid/Flexbox, and `fetch`.

---

## Troubleshooting

### CORS errors in the browser console

- Confirm the backend is running: `curl http://localhost:5000/api/v1/health`
- Check `VITE_API_BASE_URL` in `.env` matches the backend port (default **5000**, not 3000)
- Restart Vite after changing `.env`
- Add your frontend origin to `FRONTEND_URL` in `backend/.env`, e.g. `http://localhost:5174` when the public site runs on 5174
- Restart the backend after changing `FRONTEND_URL` (env changes are not hot-reloaded)

### Pages show "Unable to load" / empty content

### Integration tests skipped or failing

- Start the backend: `cd ../backend && npm run dev`
- Ensure database is migrated and seeded: `npm run migrate && npm run seed`
- Run with explicit API URL: `VITE_API_BASE_URL=http://localhost:5000/api/v1 npm test`

### Contact form returns an error

- Backend rate-limits contact submissions (3 per hour per IP in development)
- All fields (`name`, `email`, `phone`, `subject`, `message`) are required

### Stale build after dependency changes

```bash
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

---

## Related documentation

| Document | Description |
| -------- | ----------- |
| [`../docs/frontenddoc.md`](../docs/frontenddoc.md) | Frontend specification |
| [`../docs/doc.md`](../docs/doc.md) | System architecture overview |
| [`../docs/backenddoc.md`](../docs/backenddoc.md) | Backend API specification |
| [`../admin/README.md`](../admin/README.md) | Production Admin CMS |
| [`../backend/README.md`](../backend/README.md) | Backend setup and API reference |

---

## License

Private — Enderas Asset Management. All rights reserved.
