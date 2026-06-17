# Enderas Asset Management Website

# Frontend Technical Specification

## Version 1.0

---

# 1. Frontend Overview

The frontend application is the public-facing website accessed by visitors.

Its purpose is to:

* Present company information
* Display services
* Showcase gallery items
* Publish blog content
* Provide contact information
* Generate leads through contact forms

The frontend consumes data exclusively from the Backend API.

No content should be hardcoded.

---

# 2. Technology Stack

## Framework

React

---

## Build Tool

Vite

---

## Routing

React Router DOM

---

## API Client

Axios

---

## Styling

Recommended:

Tailwind CSS

or

SCSS Modules

---

## State Management

React Context API

or

Zustand

No Redux required for this project.

---

# 3. Project Structure

frontend/

src/

assets/

components/

layouts/

pages/

routes/

services/

hooks/

contexts/

utils/

constants/

styles/

App.jsx

main.jsx

---

# 4. Folder Responsibilities

## assets

Contains:

* Images
* Icons
* Fonts

Static assets only.

---

## components

Reusable UI components.

Examples:

Navbar

Footer

Button

SectionTitle

BlogCard

GalleryCard

ServiceCard

Loader

Pagination

---

## layouts

Page layouts.

Examples:

MainLayout

---

## pages

Route pages.

Examples:

HomePage

ServicesPage

GalleryPage

BlogPage

BlogDetailsPage

AboutPage

ContactPage

---

## routes

Application routing configuration.

---

## services

Axios API functions.

Examples:

blogService.js

galleryService.js

contactService.js

settingsService.js

---

## hooks

Custom React hooks.

---

## contexts

Global application state.

Examples:

SiteSettingsContext

---

# 5. Website Routes

Home

/

---

Services

/services

---

Gallery

/gallery

---

Blog

/blog

---

Single Blog

/blog/:slug

---

About

/about

---

Contact

/contact

---

404

*

---

# 6. Layout Structure

MainLayout

Contains:

Navbar

↓

Page Content

↓

Footer

---

All public pages use MainLayout.

---

# 7. Global Components

## Navbar

Features:

* Logo
* Navigation Links
* Mobile Menu

Navigation:

Home

Services

Gallery

Blog

About

Contact

---

## Footer

Contains:

Company Name

Quick Links

Contact Information

Social Media Links

Copyright

---

## Page Banner

Reusable hero banner.

Used on:

Services

Gallery

Blog

About

Contact

---

## Loading Component

Displayed while fetching data.

---

## Error Component

Displayed when API request fails.

---

# 8. Home Page

Route:

/

Purpose:

Landing page introducing company.

---

Sections

## Hero Section

Displays:

Headline

Subheadline

Call-To-Action Button

Background Image

Managed from Admin.

---

## Company Introduction

Short company overview.

Managed from Admin.

---

## Featured Services

Displays latest services.

Data Source:

GET /services

---

## Featured Gallery

Displays selected gallery items.

Data Source:

GET /gallery

---

## Latest Blog Posts

Displays latest posts.

Data Source:

GET /posts

Limit:

3

---

## Contact CTA

Call-to-action section.

Managed from Admin.

---

# 9. Services Page

Route

/services

---

Purpose

Display all company services.

---

Data Source

GET /services

---

Service Card Fields

Image

Title

Description

---

Grid Layout

Responsive:

Desktop

Tablet

Mobile

---

# 10. Gallery Page

Route

/gallery

---

Purpose

Show company gallery.

---

Data Source

GET /gallery

---

Gallery Item

Image

Title

Description

Category

---

Future Support

Image Lightbox

Category Filtering

---

# 11. Blog Page

Route

/blog

---

Purpose

Display published articles.

---

Data Source

GET /posts

---

Features

Pagination

Category Filtering

Search

Featured Images

---

Blog Card

Featured Image

Title

Excerpt

Publish Date

Read More Button

---

# 12. Blog Details Page

Route

/blog/:slug

---

Purpose

Display full article.

---

Data Source

GET /posts/slug/:slug

---

Displays

Title

Featured Image

Publish Date

Content

Author

Related Posts

---

# 13. About Page

Route

/about

---

Purpose

Display company information.

---

Data Source

GET /pages/about

---

Sections

Company Overview

Mission

Vision

Values

---

Content fully managed from Admin.

---

# 14. Contact Page

Route

/contact

---

Purpose

Provide communication channels.

---

Data Source

GET /pages/contact

GET /settings

---

Displays

Phone

Email

Address

Contact Form

---

Form Submission

POST /contact

---

Success Message

Thank you for contacting us.

---

# 15. API Layer Structure

services/

authService.js

blogService.js

serviceService.js

galleryService.js

contactService.js

settingsService.js

pageService.js

---

Example

blogService.js

Responsible for:

Get Posts

Get Single Post

Search Posts

---

# 16. Axios Configuration

Single Axios Instance.

Example:

api.js

Base URL from:

VITE_API_BASE_URL

No hardcoded URLs.

---

# 17. Environment Variables

VITE_API_BASE_URL=

VITE_APP_NAME=

---

Example

VITE_API_BASE_URL=https://api.domain.com/api/v1

---

# 18. Responsive Requirements

Breakpoints

Mobile

Tablet

Desktop

---

Website must be fully responsive.

---

Requirements

Responsive Navigation

Responsive Gallery

Responsive Blog

Responsive Contact Form

Responsive Footer

---

# 19. SEO Requirements

Every page must support:

Page Title

Meta Description

Open Graph Tags

---

Blog Posts

Dynamic SEO metadata.

---

# 20. Performance Requirements

Lazy Load Images

Code Splitting

Route-Based Lazy Loading

Optimized Images

Minimal Bundle Size

---

# 21. Error Handling

API Failure

Display User-Friendly Message

---

404 Page

Display Not Found Screen

---

Network Errors

Graceful Error UI

---

# 22. Accessibility Requirements

Semantic HTML

Keyboard Navigation

Alt Text for Images

Accessible Forms

Proper Heading Structure

---

# 23. Frontend Completion Criteria

Frontend is complete when:

* All 6 pages are implemented
* API integration is complete
* Responsive design is complete
* SEO support is implemented
* Contact form works
* Blog functionality works
* Gallery functionality works
* Services display correctly
* About page content loads dynamically
* Site settings load dynamically
