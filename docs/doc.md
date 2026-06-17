# Enderas Asset Management Website Rebuild

## Project Overview & Architecture Document

### Version 1.0

---

# 1. Project Overview

## Objective

Rebuild the existing Enderas Asset Management website using a modern technology stack while preserving its content structure and visual identity.

The new platform shall consist of:

* Public Website
* Admin Management Panel
* REST API Backend
* MySQL Database

All website content must be manageable through the Admin Panel without modifying source code.

The system must be scalable, maintainable, and deployment-friendly.

---

# 2. Project Goals

### Primary Goals

* Rebuild existing website
* Improve maintainability
* Centralize content management
* Eliminate hardcoded content
* Modernize technology stack
* Improve performance
* Improve SEO structure
* Enable future expansion

### Secondary Goals

* Better content editing workflow
* Easier image management
* Improved responsiveness
* Simplified deployment

---

# 3. Technology Stack

## Backend

* Node.js
* Express.js
* JavaScript (No TypeScript)
* Sequelize ORM
* MySQL
* JWT Authentication

## Frontend Website

* React
* Vite
* Axios
* React Router

## Admin Panel

* React
* Vite
* Axios

## Database

* MySQL

---

# 4. Website Structure

## Public Pages

### Home

Landing page containing:

* Hero Section
* Company Introduction
* Services Overview
* Featured Gallery Items
* Latest Blog Posts
* Call To Action

---

### Services

Displays all company services.

Each service contains:

* Title
* Description
* Image
* Display Order

---

### Gallery

Displays company gallery.

Gallery items contain:

* Image
* Title
* Description
* Category

---

### Blog

Displays all published articles.

Features:

* Pagination
* Search
* Categories
* Featured Image

---

### Blog Details

Single article page.

Contains:

* Article Content
* Author
* Publish Date
* Related Posts

---

### About

Company information page.

Contains:

* Company Overview
* Mission
* Vision
* Team Section

---

### Contact

Contains:

* Contact Information
* Contact Form
* Location Information

---

# 5. System Components

## Public Website

Used by visitors.

Functions:

* View website content
* Browse gallery
* Read blog posts
* Contact company

---

## Admin Panel

Used by administrators.

Functions:

* Manage website content
* Manage blog posts
* Manage gallery
* Manage services
* Manage media
* Manage settings

---

## Backend API

Central data layer.

Functions:

* Authentication
* Content management
* Data storage
* Media management

---

# 6. User Roles

## Super Admin

Full system access.

Can:

* Manage users
* Manage settings
* Manage content
* Manage media

---

## Editor

Can:

* Manage blog posts
* Manage gallery
* Manage services
* Manage pages

Cannot:

* Manage users
* Manage system settings

---

# 7. Content Management Philosophy

No website content shall be hardcoded.

All editable content must originate from database records.

Examples:

* Homepage hero content
* Service descriptions
* Gallery images
* About page content
* Contact information
* Blog content
* Footer content

---

# 8. Media Management

All uploaded assets managed centrally.

Supported Types:

* JPG
* JPEG
* PNG
* WEBP

Media can be reused across:

* Services
* Gallery
* Blog
* About Page

---

# 9. SEO Requirements

Each page must support:

* Meta Title
* Meta Description

Blog posts must support:

* Custom SEO Title
* Custom SEO Description

---

# 10. Deployment Requirements

Environment Variables Required:

PORT
NODE_ENV

DB_HOST
DB_PORT
DB_NAME
DB_USER
DB_PASSWORD

JWT_SECRET
JWT_EXPIRES_IN

CLIENT_URL
API_BASE_URL

All deployments must be configurable using only .env values.

No source code changes should be required when changing environments.

---

# 11. Success Criteria

The project will be considered complete when:

* All 6 public pages are rebuilt
* All content is manageable through Admin Panel
* Blog functionality is fully operational
* Gallery functionality is operational
* Services management is operational
* Authentication is secure
* Website is responsive
* Application is deployable through environment configuration
* Codebase follows clean architecture principles

---

# 12. Future Expansion Support

Architecture should allow future addition of:

* Testimonials
* Team Management
* Newsletter
* Multi-language support
* Analytics Dashboard
* Additional Pages

without major restructuring.
