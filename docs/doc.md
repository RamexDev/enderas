# ENDERAS ASSET MANAGEMENT WEBSITE

# Project Overview & System Architecture Document

## Version 1.0

**Project Status:** Approved for Development

---

# 1. Project Overview

## Purpose

The Enderas Asset Management Website is a complete digital platform consisting of:

* Public Corporate Website
* Admin Content Management System (CMS)
* REST API Backend
* MySQL Database

The platform is designed to present Enderas Asset Management's services, projects, expertise, and industry insights while allowing authorized staff to manage website content without requiring technical knowledge.

All editable website content must be managed through the Admin CMS.

The website structure, layout, and navigation remain controlled by developers to ensure consistency and prevent accidental misconfiguration.

---

# 2. Project Objectives

The system must:

* Present Enderas as a professional asset management company
* Showcase services and business offerings
* Promote auction and valuation services
* Display company projects and gallery content
* Publish blog articles and industry insights
* Generate customer inquiries through contact forms
* Allow non-technical staff to manage content
* Support search engine optimization (SEO)
* Maintain a consistent website structure
* Provide a scalable foundation for future growth

---

# 3. System Architecture

The platform consists of four major components.

## Public Website

The public-facing website used by visitors.

Functions include:

* Viewing company information
* Browsing services
* Viewing gallery content
* Reading blog articles
* Viewing team members
* Viewing testimonials
* Viewing FAQs
* Contacting the company

---

## Admin CMS

A secure internal dashboard used by authorized staff.

Functions include:

* Homepage content management
* Hero slider management
* Blog management
* Service management
* Gallery management
* Team management
* Testimonial management
* FAQ management
* Partner management
* Media management
* SEO management
* Contact message management
* User management

---

## Backend API

Central business logic layer.

Functions include:

* Authentication
* Authorization
* Content management
* Media management
* Contact management
* SEO management
* Data validation
* File uploads

---

## Database

Persistent storage layer.

Stores:

* Users
* Services
* Blog Posts
* Categories
* Gallery Items
* Team Members
* Testimonials
* FAQ Items
* Partners
* Homepage Content
* Site Settings
* Contact Messages
* Media Files
* SEO Information

---

# 4. Technology Stack

## Backend

* Node.js
* Express.js
* JavaScript (ES Modules)
* Sequelize ORM
* MySQL
* JWT Authentication

---

## Public Website

* React
* Vite
* Tailwind CSS
* Axios
* React Router DOM
* React Helmet Async

---

## Admin CMS

* React
* Vite
* Tailwind CSS
* Axios
* React Router DOM
* React Hook Form
* React Quill or Tiptap

---

## Database

* MySQL

---

# 5. Public Website Structure

The website contains six primary public pages.

---

## Home

The homepage acts as the primary landing page.

Sections include:

### Hero Slider

Dynamic slides managed through the CMS.

### Company Introduction

Company overview and call-to-action.

### Auction & Valuation Highlight

Promotional section for valuation and auction services.

### Featured Services

Selected company services.

### Featured Gallery

Selected projects and properties.

### Statistics

Business statistics and achievements.

### Testimonials

Customer testimonials.

Visibility can be enabled or disabled from the CMS.

### FAQ

Frequently asked questions.

Visibility can be enabled or disabled from the CMS.

### Contact CTA

Inquiry generation section.

### Latest Blog Posts

Recently published articles.

---

## About Page

Contains:

* Company History
* Mission
* Vision
* Core Values
* Partners
* Team Members

The Team section may be enabled or disabled from the CMS.

---

## Services Page

Displays all company services.

Each service contains:

* Title
* Short Description
* Full Description
* Image
* Call-To-Action

---

## Gallery Page

Displays project and property images.

Each item contains:

* Image
* Title
* Description
* Category

---

## Blog Page

Displays published articles.

Features:

* Search
* Categories
* Pagination

---

## Contact Page

Contains:

* Contact Information
* Contact Form
* Google Maps Location

---

# 6. Content Management Philosophy

The platform follows a CMS-driven architecture.

Administrators manage content only.

Administrators cannot:

* Modify layouts
* Rearrange page structure
* Change navigation architecture
* Create arbitrary pages
* Modify frontend code

This ensures:

* Consistent branding
* Reduced operational errors
* Easier training
* Long-term maintainability

---

# 7. User Roles

## Super Admin

Full system access.

Can:

* Manage Users
* Manage Settings
* Manage Content
* Manage Media
* Manage Permissions

---

## Editor

Content management access.

Can:

* Manage Blog Posts
* Manage Services
* Manage Gallery
* Manage Team Members
* Manage Testimonials
* Manage Partners
* Manage FAQ Items
* Manage Homepage Content

Cannot:

* Manage Users
* Manage Site Settings

---

# 8. Content Modules

The following content modules are managed through the CMS.

---

## Homepage Content

Editable Sections:

* Company Introduction
* Auction & Valuation Highlight
* Statistics
* Contact CTA

---

## Hero Slider

Administrators can:

* Create Slides
* Edit Slides
* Delete Slides
* Activate/Deactivate Slides

---

## Blog

Administrators can:

* Create Posts
* Edit Posts
* Delete Posts
* Publish Posts
* Unpublish Posts

---

## Services

Administrators can:

* Create Services
* Edit Services
* Delete Services

---

## Gallery

Administrators can:

* Upload Images
* Edit Gallery Items
* Delete Gallery Items

---

## Team Members

Administrators can:

* Create Members
* Edit Members
* Delete Members
* Enable/Disable Members

---

## Testimonials

Administrators can:

* Create Testimonials
* Edit Testimonials
* Delete Testimonials
* Enable/Disable Testimonials

---

## FAQ

Administrators can:

* Create FAQ Items
* Edit FAQ Items
* Delete FAQ Items
* Enable/Disable FAQ Items

---

## Partners

Administrators can:

* Create Partners
* Edit Partners
* Delete Partners
* Enable/Disable Partners

---

# 9. Media Management

A centralized media library must be available.

Features:

* Upload Images
* Search Images
* Preview Images
* Delete Images
* Reuse Images Across Modules

Supported Formats:

* JPG
* JPEG
* PNG
* WEBP

Media may be used by:

* Hero Slides
* Services
* Blog Posts
* Gallery Items
* Team Members
* Testimonials
* Partners
* Site Settings

---

# 10. SEO Requirements

The platform must support SEO management.

Editable SEO Content:

* Homepage
* About Page
* Services
* Blog Posts

Fields:

* Meta Title
* Meta Description

The public website must generate:

* Page Titles
* Meta Descriptions
* Open Graph Tags
* Canonical URLs

---

# 11. Security Requirements

The system must implement:

* JWT Authentication
* Password Hashing (bcrypt)
* Role-Based Authorization
* Protected API Routes
* Input Validation
* File Upload Validation
* Session Expiration
* Rate Limiting
* Secure HTTP Headers

---

# 12. Audit Requirements

Major content records should store:

* Created By
* Updated By
* Created Date
* Updated Date

This improves accountability and traceability.

---

# 13. Deployment Requirements

The entire system must support:

* Development Environment
* Staging Environment
* Production Environment

Configuration must be handled through environment variables.

No hardcoded:

* URLs
* Database Credentials
* API Endpoints
* Secrets

---

# 14. Future Expansion Support

The architecture should support future modules without major restructuring.

Potential future additions include:

* Newsletter Management
* Career Opportunities
* Events Management
* Downloadable Resources
* Multi-Language Support
* Activity Logs
* Analytics Dashboard

---

# 15. Project Completion Criteria

The project is considered complete when:

✓ Public Website is fully functional

✓ Admin CMS is fully functional

✓ Backend API is fully functional

✓ Authentication and authorization work correctly

✓ Homepage content is manageable

✓ Hero slider management works

✓ Blog CRUD works

✓ Service CRUD works

✓ Gallery CRUD works

✓ Team CRUD works

✓ Testimonial CRUD works

✓ FAQ CRUD works

✓ Partner CRUD works

✓ Media management works

✓ Contact messages can be managed

✓ SEO management works

✓ Site settings work

✓ User management works

✓ Role permissions function correctly

✓ Website is fully responsive

✓ Content updates appear without code changes

✓ Production deployment is successful

---

# 16. Final Deliverables

The completed project shall include:

* Public Website Application
* Admin CMS Application
* Backend API
* MySQL Database Schema
* Database Migrations
* Seed Data
* API Documentation
* Environment Configuration Files
* Deployment Documentation
* Production Build
