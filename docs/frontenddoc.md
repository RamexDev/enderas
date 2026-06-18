# ENDERAS ASSET MANAGEMENT WEBSITE

# Frontend Technical Specification

**Project:** Enderas Asset Management Website
**Frontend Version:** 1.0
**Document Status:** Approved for Development

---

# 1. Project Overview

The Enderas Asset Management Website is a modern corporate website designed to:

* Present company information
* Showcase services
* Display managed projects and properties
* Publish industry insights and blog content
* Generate customer inquiries
* Promote valuation and auction services

The website serves as the public-facing digital platform for Enderas Asset Management.

All website content must originate from the backend CMS and be manageable through the Admin Dashboard.

No business content should be hardcoded into the frontend.

---

# 2. Project Objectives

The website must:

* Present Enderas as a professional asset management company
* Showcase company services
* Display projects and gallery items
* Publish blog content
* Capture customer inquiries
* Promote auction and valuation services
* Maintain strong SEO foundations
* Deliver a responsive user experience
* Support future expansion without architectural changes

---

# 3. Frontend Principles

## CMS-Driven Architecture

All editable content must be delivered through API endpoints.

This includes:

* Homepage content
* Hero slides
* Statistics
* Services
* Gallery items
* Team members
* Testimonials
* FAQs
* About page content
* Core values
* Partners
* Contact information
* SEO metadata
* Social media links

---

## Fixed Layout Architecture

Website structure is controlled by developers.

Content is controlled by administrators.

Administrators cannot:

* Rearrange sections
* Modify layouts
* Change navigation structure

The frontend must assume a fixed page structure.

---

## Component Reusability

All UI elements should be reusable.

Examples:

* Buttons
* Cards
* Modals
* Hero Components
* CTA Components
* Forms
* Section Headers
* Empty States

---

## Separation of Concerns

Separate:

* Pages
* Components
* Services
* State
* Utilities

Components must never directly perform API requests.

---

# 4. Technology Stack

| Category         | Technology         |
| ---------------- | ------------------ |
| Framework        | React              |
| Build Tool       | Vite               |
| Styling          | Tailwind CSS v4    |
| Routing          | React Router DOM   |
| State Management | Zustand            |
| API Client       | Axios              |
| Forms            | React Hook Form    |
| Validation       | Zod                |
| SEO              | React Helmet Async |
| Animation        | Framer Motion      |

---

# 5. Application Structure

```plaintext
frontend/

src/

├── assets/
├── components/
│   ├── atoms/
│   ├── molecules/
│   └── organisms/
│
├── layouts/
├── pages/
├── routes/
├── services/
├── hooks/
├── store/
├── utils/
├── constants/
├── styles/
│
├── App.jsx
└── main.jsx
```

---

# 6. Route Structure

## Public Routes

| Route           | Purpose        |
| --------------- | -------------- |
| /               | Home           |
| /about          | About          |
| /services       | Services       |
| /services/:slug | Service Detail |
| /gallery        | Gallery        |
| /blog           | Blog Listing   |
| /blog/:slug     | Blog Detail    |
| /contact        | Contact        |
| *               | 404 Page       |

---

# 7. Layout Architecture

## Main Layout

```jsx
<TopNavigation />

<main>
  <Outlet />
</main>

<Footer />
```

Responsibilities:

* Navigation
* Footer
* SEO Wrapper
* Global Error Handling
* Responsive Layout

---

# 8. Homepage

## Purpose

Introduce Enderas and direct visitors toward services and inquiries.

---

## Homepage Sections

### Hero Slider

Source:

```http
GET /public/home
```

Displays active hero slides.

---

### Company Introduction

Displays:

* Title
* Description
* CTA

Managed via CMS.

---

### Auction & Valuation Highlight

Displays:

* Title
* Description
* CTA

Purpose:

Promote valuation and auction services.

No auction platform functionality exists.

---

### Featured Services

Displays selected services.

Source:

```http
GET /public/services
```

---

### Featured Gallery Items

Displays selected gallery items.

Source:

```http
GET /public/gallery
```

---

### Statistics

Displays CMS-managed statistics.

Examples:

* Years of Experience
* Assets Managed
* Clients Served

---

### Team Section

Only rendered when:

```javascript
show_team === true
```

Displays active team members.

---

### Testimonials Section

Only rendered when:

```javascript
show_testimonials === true
```

Displays active testimonials.

---

### FAQ Section

Only rendered when:

```javascript
show_faq === true
```

Displays active FAQs.

---

### Contact CTA

Displays inquiry call-to-action content.

---

# 9. About Page

Source:

```http
GET /public/about
```

---

## Sections

### Company History

### Mission

### Vision

### Core Values

### Partners

Only active partners should be displayed.

---

# 10. Services Page

Source:

```http
GET /public/services
```

---

## Service Card Fields

* Title
* Description
* Image
* CTA

---

## Service Detail Page

Source:

```http
GET /public/services/:slug
```

Displays:

* Full Description
* Service Image
* CTA Information
* SEO Metadata

---

# 11. Gallery Page

Source:

```http
GET /public/gallery
```

---

## Features

* Responsive Grid
* Lazy Loading
* Category Filtering
* Lightbox Preview

---

# 12. Blog Listing Page

Source:

```http
GET /public/posts
```

---

## Features

* Search
* Category Filtering
* Pagination
* Featured Images

---

# 13. Blog Detail Page

Source:

```http
GET /public/posts/:slug
```

---

## Features

* Rich Content Rendering
* Featured Image
* Publication Date
* SEO Metadata
* Related Articles

---

# 14. Contact Page

Source:

```http
GET /public/contact
```

---

## Displays

* Address
* Phone
* Email
* Google Map

---

## Contact Form

Fields:

* Name
* Email
* Phone
* Subject
* Message

Submission Endpoint:

```http
POST /contact
```

---

# 15. Navigation

Navigation structure is static.

Links:

* Home
* About
* Services
* Gallery
* Blog
* Contact

Navigation must not be CMS-managed.

---

# 16. Footer

Source:

```http
GET /public/settings
```

Displays:

* Company Information
* Social Media Links
* Footer Text
* Copyright

---

# 17. API Layer

Each API domain must have a dedicated service file.

```plaintext
services/

api.js

homeService.js
aboutService.js
serviceService.js
galleryService.js
blogService.js
contactService.js
settingsService.js
```

---

# 18. State Management

Use Zustand only for:

* Mobile Navigation
* Site Settings
* Global UI State

Avoid storing API page content globally.

Use local page state whenever possible.

---

# 19. SEO Requirements

Every page must support:

* Dynamic Title
* Meta Description
* Canonical URL
* Open Graph Metadata
* Twitter Cards

SEO content must originate from CMS-managed metadata.

---

# 20. Performance Requirements

## Code Splitting

Use:

```jsx
React.lazy()
<Suspense />
```

for page-level loading.

---

## Image Optimization

Requirements:

* Lazy Loading
* Responsive Images
* WebP Support

---

## Animation

Only animate:

* Opacity
* Transform

Avoid expensive layout animations.

---

# 21. Accessibility Requirements

The website must support:

* Semantic HTML
* Keyboard Navigation
* Screen Reader Compatibility
* ARIA Labels
* WCAG AA Compliance

---

# 22. Error Handling

Every page must support:

### Loading State

Loaders or skeletons.

### Error State

User-friendly error messages.

### Empty State

Reusable empty-state components.

### Retry State

Retry actions where appropriate.

---

# 23. Security Requirements

The frontend must:

* Sanitize rendered HTML
* Prevent script injection
* Never expose credentials
* Store only public environment variables

---

# 24. Browser Support

Supported Browsers:

* Chrome (Latest 2 Versions)
* Edge (Latest 2 Versions)
* Firefox (Latest 2 Versions)
* Safari (Latest 2 Versions)

---

# 25. Acceptance Criteria

The frontend is considered complete when:

* All public routes are implemented
* Homepage content is CMS-driven
* Hero slider is CMS-driven
* Services are CMS-driven
* Gallery is CMS-driven
* Team section supports enable/disable visibility
* Testimonials section supports enable/disable visibility
* FAQ section supports enable/disable visibility
* About page content is CMS-driven
* Partners are CMS-driven
* Blog functionality is complete
* Contact form functions correctly
* SEO metadata is fully dynamic
* Responsive design is complete
* Accessibility requirements are met
* Error handling is implemented
* Performance requirements are met
* No business content is hardcoded
* All content is delivered through backend APIs
* Production deployment passes validation

```
```