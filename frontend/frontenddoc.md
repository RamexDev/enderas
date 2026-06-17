# ENDERAS ASSET MANAGEMENT WEBSITE

## Frontend Technical Specification

**Project:** Enderas Asset Management Website
**Frontend Version:** 1.0
**Document Status:** Approved for Development

---

# 1. Project Overview

The Enderas Asset Management Website is a modern corporate website designed to present company information, showcase services and managed projects, publish industry insights, and generate customer inquiries.

The website will serve as the public-facing digital presence of Enderas Asset Management and must provide a professional, responsive, and easy-to-manage experience.

All website content must be manageable through the administrative dashboard, allowing business users to update content without requiring developer assistance.

The frontend application will consume data exclusively through REST API endpoints provided by the backend system.

---

# 2. Project Objectives

The website must:

* Present Enderas as a professional asset management company.
* Showcase all company services.
* Display managed properties and projects.
* Publish blog articles and industry insights.
* Capture customer inquiries and leads.
* Promote auction and valuation services.
* Provide a modern and responsive user experience.
* Maintain strong SEO foundations.
* Be easy to maintain and extend in the future.

---

# 3. Core Frontend Principles

## Modular Design

The application must follow a modular component architecture.

Every UI element should be reusable and independently maintainable.

Examples include:

* Buttons
* Cards
* Forms
* Hero Sections
* Galleries
* Navigation Components
* CTA Sections

No page-specific component should contain hardcoded business content.

---

## CMS-Driven Content

All editable website content must originate from the backend API.

This includes:

* Homepage content
* Hero sections
* Statistics
* Service information
* About page content
* Company values
* Gallery items
* Blog posts
* Contact information
* Social media links
* SEO metadata

Business users should be able to modify content without requiring code changes.

---

## Separation of Concerns

The application must maintain clear separation between:

* UI Components
* Layouts
* Pages
* API Services
* State Management
* Utilities

Components should never directly perform API requests.

All API communication should be handled through dedicated service files.

---

# 4. Technology Stack

| Category         | Technology            |
| ---------------- | --------------------- |
| Framework        | React                 |
| Build Tool       | Vite                  |
| Styling          | Tailwind CSS v4       |
| Routing          | React Router DOM      |
| State Management | Zustand               |
| API Client       | Axios                 |
| Animation        | Framer Motion         |
| SEO              | React Helmet Async    |
| Form Validation  | React Hook Form + Zod |

---

# 5. Application Structure

```plaintext
frontend/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── atoms/
│   │   ├── molecules/
│   │   └── organisms/
│   │
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── hooks/
│   ├── store/
│   ├── constants/
│   ├── utils/
│   ├── styles/
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── package.json
└── vite.config.js
```

---

# 6. Route Structure

## Public Routes

| Route       | Purpose       |
| ----------- | ------------- |
| /           | Home          |
| /about      | About         |
| /services   | Services      |
| /gallery    | Gallery       |
| /blog       | Blog Listing  |
| /blog/:slug | Blog Details  |
| /contact    | Contact       |
| *           | 404 Not Found |

---

# 7. Layout Architecture

## MainLayout

Every public page must use a shared layout structure.

```jsx
<TopNavigation />

<main>
  <Outlet />
</main>

<Footer />
```

### Responsibilities

* Consistent navigation across the website.
* Consistent footer content.
* Global SEO support.
* Global error handling.
* Shared responsive behavior.

---

# 8. Design System

## Color System

Colors must be managed through Tailwind configuration.

Required categories:

* Primary
* Secondary
* Accent
* Neutral
* Success
* Warning
* Error

Arbitrary color usage should be avoided.

---

## Typography

Typography must be centrally managed.

Requirements:

* Heading Font
* Body Font
* Font Sizes
* Font Weights
* Line Heights

---

## Spacing System

Use Tailwind's spacing scale consistently.

Avoid random spacing values throughout the application.

---

# 9. Global Components

## TopNavigation

Features:

* Company Logo
* Dynamic Navigation Links
* Active Route Indicator
* Mobile Navigation
* Responsive Drawer Menu

---

## Footer

Contains:

* Company Information
* Contact Information
* Quick Links
* Social Media Links
* Copyright Information

---

## HeroBanner

Reusable component supporting:

* Background Image
* Overlay
* Title
* Subtitle
* CTA Button

---

## Loader

Supports:

* Full Page Loading
* Section Loading
* Skeleton Loading

---

## Modal Component

Reusable modal for:

* Success Messages
* Image Previews
* Future Enhancements

---

## Empty State Component

Used whenever data is unavailable.

Examples:

* No Blog Posts
* No Gallery Items
* No Search Results

---

# 10. Home Page

## Purpose

Introduce Enderas Asset Management and direct visitors toward the company's services and contact channels.

## Sections

### Hero Slider

Dynamic CMS-managed slides featuring key company messaging.

---

### Company Introduction

Brief company overview with a call-to-action linking to the About page.

---

### Auction & Valuation Highlight

A prominent promotional section positioned immediately after the Hero Slider.

### Purpose

* Showcase Enderas' Property Valuation Services.
* Showcase Enderas' Asset Auction and Liquidation Services.
* Increase awareness of specialized offerings.
* Encourage visitors to request consultations and inquiries.

### Requirements

* Visually distinct design.
* Strong call-to-action buttons.
* Mobile-friendly layout.
* CMS-managed content.

### CTA Options

Buttons may link to:

* Contact Page
* Services Page
* Specific service sections

### Scope Clarification

This section is informational and promotional only.

The frontend shall NOT include:

* Auction listings
* Asset marketplace functionality
* Auction bidding functionality
* Auction management systems
* Valuation calculators
* Additional auction-specific pages

---

### Featured Services

Display selected services using reusable Service Cards.

---

### Featured Projects

Display selected properties and projects from the gallery.

---

### Statistics Section

Examples:

* Years of Experience
* Clients Served
* Assets Managed
* Valuations Completed

All statistics must be CMS-managed.

---

### Latest Blog Posts

Display recently published articles.

---

### Inquiry CTA

Lead generation section encouraging visitors to contact the company.

---

# 11. About Page

## Sections

### Hero Banner

Company introduction banner.

### Company History

Overview of the company's background and experience.

### Mission

Company mission statement.

### Vision

Company vision statement.

### Corporate Values

Display values such as:

* Competence
* Integrity
* Customer Satisfaction
* Innovativeness
* Global Partnership

### Trusted Partners

Partner and client logo showcase.

All content must be managed through the CMS.

---

# 12. Services Page

## Purpose

Provide detailed information about all company services.

## Services Offered

* Asset Management
* Property Appraisal & Valuation
* Property Liquidation & Auction Services
* Investment Advisory
* Business Consultancy
* Building Construction Consulting

## Service Information

Each service should contain:

* Title
* Description
* Icon
* Image
* CTA Button

All service content must originate from the API.

---

# 13. Gallery Page

## Purpose

Showcase managed properties and projects.

## Features

* Responsive Masonry Grid
* Lazy Loaded Images
* Lightbox Support
* Responsive Layout
* Future Category Filtering Support

All gallery content must be CMS-managed.

---

# 14. Blog Listing Page

## Features

* Search
* Pagination
* Category Filtering
* Recent Posts
* Popular Posts

All content must originate from the CMS.

---

# 15. Blog Detail Page

## Features

* Dynamic SEO Metadata
* Featured Image
* Rich Text Content
* Author Information
* Publication Date
* Related Articles
* Social Sharing Links

---

# 16. Contact Page

## Features

### Contact Information

Display:

* Phone Numbers
* Email Address
* Physical Address

### Google Maps Embed

Display company location.

### Contact Form

Fields:

* Name
* Email
* Phone
* Subject
* Message

Requirements:

* Client-side Validation
* Error Handling
* Success State
* API Integration

---

# 17. State Management

Use Zustand only when global state is required.

Examples:

* Mobile Navigation State
* Site Settings
* Theme Configuration
* Global UI State

Avoid storing page-specific API data globally.

---

# 18. API Layer

Every API domain must have a dedicated service file.

```plaintext
services/
│
├── api.js
├── blogService.js
├── galleryService.js
├── serviceService.js
├── settingsService.js
└── contactService.js
```

Components must never call Axios directly.

---

# 19. Axios Standards

A single shared Axios instance must be used.

Responsibilities:

* Base URL Configuration
* Request Interceptors
* Response Interceptors
* Error Handling
* Timeout Handling

Environment Variables:

```env
VITE_API_BASE_URL=
VITE_APP_NAME="Enderas Asset Management"
```

---

# 20. SEO Requirements

Every page must support:

* Dynamic Page Titles
* Dynamic Meta Descriptions
* Canonical URLs
* Open Graph Tags
* Twitter Cards

Blog pages must generate metadata dynamically.

---

# 21. Performance Requirements

## Code Splitting

Use:

```jsx
React.lazy()
<Suspense />
```

for route-level code splitting.

---

## Image Optimization

Requirements:

* Lazy Loading
* Responsive Images
* WebP Support
* Placeholder Images

---

## Animation Optimization

Only animate:

* Opacity
* Transform

Avoid expensive layout animations.

Target:

* Smooth 60 FPS performance.

---

# 22. Accessibility Requirements

The website must support:

* Semantic HTML
* Keyboard Navigation
* Screen Reader Compatibility
* ARIA Labels
* WCAG AA Compliance

All forms and interactive components must be accessible.

---

# 23. Error Handling

Every data-driven page must support:

## Loading State

Display loaders or skeletons.

## Error State

Display meaningful user-friendly messages.

## Empty State

Display reusable empty-state components.

## Recovery

Provide retry actions when appropriate.

---

# 24. Security Considerations

The frontend must:

* Sanitize rendered HTML content.
* Prevent unsafe script injection.
* Never expose sensitive credentials.
* Store only public configuration values in environment variables.

---

# 25. Browser Support

Minimum supported browsers:

* Chrome (Latest 2 Versions)
* Edge (Latest 2 Versions)
* Firefox (Latest 2 Versions)
* Safari (Latest 2 Versions)

---

# 26. Acceptance Criteria

The frontend is considered complete when:

* All public routes are implemented.
* All content is API-driven.
* All pages are fully responsive.
* Navigation functions correctly.
* Gallery functions correctly.
* Blog functionality is complete.
* Contact form submissions work successfully.
* SEO metadata is fully implemented.
* Accessibility requirements are met.
* Error handling is implemented.
* Performance requirements are satisfied.
* Auction and Valuation services are prominently showcased on the Home and Services pages.
* The Auction & Valuation Highlight section includes clear calls-to-action directing users to contact or service information.
* No standalone auction platform functionality is implemented.
* Customers can update website content through the admin dashboard without code changes.
* Production builds pass testing and deployment validation.

---