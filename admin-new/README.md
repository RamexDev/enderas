# Enderas Visual Editor (`admin-new`)

A visual-editing admin for the Enderas Asset Management website. Instead of a
Sanity-style dashboard full of content tables, this app renders the public
website as a live preview and lets editors click any CMS-managed region to
open a focused side drawer, edit the content, and save it back through the
existing backend API.

## What it does

- Renders the public pages (Home, About, Services, Gallery, Blog, Contact)
  inside the editor using the same Tailwind theme tokens as the real site.
- Highlights every CMS-managed region with a dashed gold outline on hover and
  an "Edit" button in the top-right corner.
- Clicking a region opens a right-side drawer with a form pre-populated with
  the current content. Saving PUTs/POSTs to the existing admin API endpoints
  (the same ones the legacy CMS uses) and refreshes the preview automatically.
- Collections (hero slides, services, gallery items, blog posts, etc.) show a
  list view inside the drawer with "Add new", per-row Edit/Delete, and toggle
  / publish actions where supported.
- Site settings, media library, inbound messages, and user management live on
  dedicated non-preview surfaces accessible from the sidebar.

## Stack

- Vite + React 19 + JavaScript (JSX)
- Tailwind CSS v4 (same `primary` / `gold` / `sand` palette as the frontend)
- React Router DOM v7
- Zustand (auth + editor UI state)
- Axios with JWT auth + silent token refresh (same interceptor chain as the
  legacy admin)
- `sonner` for toasts, `lucide-react` for icons

## Getting started

### 1. Configure environment variables

Copy `.env.example` to `.env` and adjust to point at your backend:

```
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_UPLOAD_BASE_URL=http://localhost:5000/uploads
VITE_FRONTEND_URL=http://localhost:5173
VITE_APP_NAME=Enderas Visual Editor
```

The API base URL and upload base URL should match what the legacy `admin/`
app uses — both apps share the same backend.

### 2. Install + run

```bash
cd admin-new
npm install
npm run dev
```

The dev server starts on http://localhost:5175 by default.

### 3. Sign in

Use the same admin account you'd use for the legacy CMS. The editor uses the
`/auth/login`, `/auth/me`, and `/auth/refresh` endpoints, storing tokens in
`sessionStorage` under the same keys (`enderas_access_token`,
`enderas_refresh_token`) as the legacy admin.

## Architecture

```
src/
├── components/
│   ├── auth/         — login form
│   ├── layout/       — VisualLayout, Sidebar (page navigation)
│   ├── preview/      — EditOverlay, EditDrawer, FieldRenderer,
│   │                   PreviewToolbar, PreviewPage, ManagePage,
│   │                   PreviewAtoms (shared visual primitives)
│   └── ui/           — Button, Input, Modal, ImageField, Loading, Badge
├── constants/
│   ├── routes.js            — route constants
│   ├── navigation.js        — sidebar nav groups
│   └── editableSections.js  — declarative registry of editable regions
├── hooks/
│   └── useAsyncData.js      — generic async fetcher with reload()
├── pages/
│   ├── LoginPage.jsx
│   ├── HomePagePreview.jsx       — visual preview of / (public home)
│   ├── AboutPagePreview.jsx      — visual preview of /about
│   ├── ServicesPagePreview.jsx   — visual preview of /services
│   ├── GalleryPagePreview.jsx    — visual preview of /gallery
│   ├── BlogPagePreview.jsx       — visual preview of /blog
│   ├── ContactPagePreview.jsx    — visual preview of /contact
│   ├── MessagesPage.jsx          — inbound contact messages
│   ├── MediaPage.jsx             — image library
│   ├── SettingsPage.jsx          — site settings (super-admin only)
│   ├── UsersPage.jsx             — user management (super-admin only)
│   └── NotFoundPage.jsx
├── routes/
│   ├── AppRoutes.jsx        — top-level router
│   └── ProtectedRoute.jsx   — auth + role guards
├── services/
│   ├── api.js               — Axios + JWT + refresh (shared with legacy admin)
│   ├── cmsApi.js            — admin endpoints + resourceApi dispatcher
│   └── publicApi.js         — /public/* endpoints for the preview
├── store/
│   ├── useAuthStore.js      — session state
│   └── useEditorStore.js    — open-drawer state, edit-mode toggle, reload tokens
└── utils/
    ├── cn.js                — clsx + tailwind-merge
    ├── errors.js            — ApiError + getErrorMessage
    ├── helpers.js           — mediaUrl, formatDate, slugify, …
    ├── imageUrl.js          — public-site image URL resolver
    └── mappers.js           — copied from the public frontend
```

### How editing works

1. The preview page fetches data from `/public/*` (the same endpoints the
   real public site uses) and renders it through `mapHomePageData` /
   `mapAboutPageData` / etc. — the same mappers the frontend uses. This
   guarantees the preview matches what a visitor sees.

2. Each editable region is wrapped in `<EditOverlay>` with a reference to a
   `SectionDef` from `constants/editableSections.js`. The section def
   declares the field list, the API resource to call, and whether it's a
   singleton or a collection.

3. Clicking the overlay's "Edit" button calls
   `useEditorStore.openEdit(section, record, pageKey)` which mounts the
   `EditDrawer`.

4. The drawer fetches the full record (for singletons) or the list of
   records (for collections) through `resourceApi[section.resource]` — a
   dispatcher that maps the `resource` key to the right `cmsApi` method.

5. On save, the drawer calls `create()` / `update()` / `delete()` /
   `toggle()` / `publish()` on the right API object, then bumps the per-page
   reload token via `useEditorStore.bumpReload(pageKey)`.

6. The preview page listens for its reload token (via `useAsyncData` deps)
   and refetches `/public/*`. The new content renders immediately.

### Editable content vs. hardcoded design

The editor only exposes content that the backend already manages. Hardcoded
design elements (the four "Who we are" pillars on the homepage, the unsplash
collage images, the page heroes on inner pages, the contact form fields,
etc.) are not editable — they're part of the site's design system and
intentionally left to developers, exactly as the project's CMS philosophy
document (`docs/doc.md`) prescribes.

### Roles

- **Editor**: can use every visual-editing surface (homepage, about,
  services, gallery, blog, contact, messages, media). Cannot access Site
  settings or Users.
- **Super admin**: everything an editor can do, plus Site settings and Users.

The `/settings` and `/users` routes are wrapped in
`<ProtectedRoute superAdminOnly>` and the sidebar hides those entries for
non-super-admins.
