# ENDERAS ASSET MANAGEMENT WEBSITE

# Admin CMS Technical Specification

## Version 1.0

**Project:** Enderas Asset Management Website
**Document Status:** Approved for Development

---

# 1. Admin CMS Overview

The Admin CMS is a secure internal web application used by Enderas staff to manage website content.

The CMS allows administrators to update website content without modifying code.

The website structure and layout remain fixed and controlled by developers.

Administrators manage content only.

---

# 2. Objectives

The CMS must allow administrators to:

* Manage homepage content
* Manage hero slides
* Manage services
* Manage gallery items
* Manage blog posts
* Manage team members
* Manage testimonials
* Manage FAQs
* Manage partners
* Manage company information
* Manage contact information
* Manage SEO metadata
* Manage uploaded media

---

# 3. Technology Stack

| Category         | Technology       |
| ---------------- | ---------------- |
| Framework        | React            |
| Build Tool       | Vite             |
| Routing          | React Router DOM |
| API Client       | Axios            |
| Styling          | Tailwind CSS     |
| Forms            | React Hook Form  |
| Validation       | Zod              |
| State Management | Zustand          |
| Notifications    | Sonner           |

---

# 4. Application Structure

```plaintext
admin/

src/

├── assets/
├── components/
├── layouts/
├── pages/
├── routes/
├── services/
├── hooks/
├── store/
├── utils/
├── constants/

├── App.jsx
└── main.jsx
```

---

# 5. Authentication

## Login Route

```plaintext
/login
```

---

## Features

* Email
* Password
* Remember Me
* Login Button

---

## API

```http
POST /auth/login
```

---

## Authentication Flow

Login

↓

JWT Token Returned

↓

Token Stored

↓

Protected Routes Enabled

---

Unauthenticated users must always be redirected to Login.

---

# 6. User Roles

## Super Admin

Can:

* Manage Users
* Manage Website Content
* Manage Settings
* Manage Media
* Manage Permissions

---

## Editor

Can:

* Manage Homepage Content
* Manage Blog Posts
* Manage Services
* Manage Gallery
* Manage Team Members
* Manage Testimonials
* Manage FAQs
* Manage Partners
* Manage Contact Messages

Cannot:

* Manage Users
* Manage Site Settings

---

# 7. Admin Layout

## Structure

```plaintext
Sidebar

Header

Content Area
```

---

## Requirements

* Fixed desktop sidebar
* Mobile collapsible sidebar
* Responsive layout
* Breadcrumb navigation
* User menu

---

# 8. Dashboard

## Route

```plaintext
/dashboard
```

---

## Statistics Cards

Display:

* Total Blog Posts
* Total Services
* Total Gallery Items
* Total Team Members
* Total Testimonials
* Total Contact Messages

---

## Recent Activity

Display:

* Recent Posts
* Recent Gallery Uploads
* Recent Contact Messages

---

## Quick Actions

* Create Blog Post
* Upload Media
* Add Service
* Add Gallery Item

---

# 9. Sidebar Navigation

## Dashboard

Dashboard

---

## Website Content

Homepage

Hero Slides

Services

Gallery

Blog Posts

Blog Categories

Team Members

Testimonials

FAQs

Partners

Core Values

---

## Communication

Messages

---

## Media

Media Library

---

## Settings

Contact Information

SEO Settings

Site Settings

---

## Administration

Users

(Super Admin Only)

---

## Account

Profile

Logout

---

# 10. Homepage Management

## Route

```plaintext
/content/homepage
```

---

## Editable Sections

### Company Introduction

Fields:

* Title
* Description
* CTA Text
* CTA Link

---

### Auction & Valuation Highlight

Fields:

* Title
* Description
* CTA Text
* CTA Link

---

### Statistics

Fields:

* Label
* Value
* Icon

Actions:

* Create
* Edit
* Delete

---

### Contact CTA

Fields:

* Title
* Description
* Button Text
* Button Link

---

## Visibility Controls

Administrators may enable or disable:

* Team Section
* Testimonials Section
* FAQ Section

Administrators may NOT rearrange homepage sections.

---

# 11. Hero Slider Management

## Route

```plaintext
/content/hero-slides
```

---

## Features

* Create Slide
* Edit Slide
* Delete Slide
* Activate Slide
* Deactivate Slide

---

## Fields

* Title
* Subtitle
* Background Image
* Button Text
* Button Link

---

# 12. Services Management

## Route

```plaintext
/services
```

---

## Features

* Create Service
* Edit Service
* Delete Service

---

## Fields

* Title
* Short Description
* Full Description
* Service Image
* CTA Text
* CTA Link
* SEO Title
* SEO Description

---

# 13. Gallery Management

## Route

```plaintext
/gallery
```

---

## Features

* Upload Image
* Edit Image Information
* Delete Image

---

## Fields

* Title
* Description
* Image
* Category

---

## Gallery Categories

Actions:

* Create
* Edit
* Delete

---

# 14. Blog Management

## Route

```plaintext
/posts
```

---

## Features

* Create Post
* Edit Post
* Delete Post
* Publish Post
* Unpublish Post

---

## Fields

* Title
* Slug
* Excerpt
* Content
* Featured Image
* Categories
* SEO Title
* SEO Description
* Status

---

## Status Options

* Draft
* Published

---

# 15. Blog Categories

## Route

```plaintext
/posts/categories
```

---

## Features

* Create Category
* Edit Category
* Delete Category

---

## Fields

* Name
* Slug

---

# 16. Team Management

## Route

```plaintext
/team
```

---

## Features

* Create Team Member
* Edit Team Member
* Delete Team Member
* Enable Team Member
* Disable Team Member

---

## Fields

* Full Name
* Email Address
* Position
* Biography
* Profile Image

---

# 17. Testimonials Management

## Route

```plaintext
/Testimonials
```

---

## Features

* Create Testimonial
* Edit Testimonial
* Delete Testimonial
* Enable Testimonial
* Disable Testimonial

---

## Fields

* Client Name
* Company
* Testimonial Content
* Client Image

---

# 18. FAQ Management

## Route

```plaintext
/faqs
```

---

## Features

* Create FAQ
* Edit FAQ
* Delete FAQ
* Enable FAQ
* Disable FAQ

---

## Fields

* Question
* Answer

---

# 19. About Page Management

## Route

```plaintext
/about-content
```

---

## Editable Fields

### Company History

### Mission

### Vision

---

# 20. Core Values Management

## Route

```plaintext
/core-values
```

---

## Features

* Create Value
* Edit Value
* Delete Value

---

## Fields

* Title
* Description

---

# 21. Partners Management

## Route

```plaintext
/partners
```

---

## Features

* Create Partner
* Edit Partner
* Delete Partner
* Enable Partner
* Disable Partner

---

## Fields

* Partner Name
* Logo
* Website URL

---

# 22. Contact Information Management

## Route

```plaintext
/contact-information
```

---

## Editable Fields

* Address
* Phone Number
* Email Address
* Google Maps Embed URL

---

# 23. Contact Messages

## Route

```plaintext
/messages
```

---

## Features

* View Message
* Mark Message as Read
* Delete Message

---

## Message Fields

* Name
* Email
* Phone
* Subject
* Message
* Date Submitted

---

# 24. Media Library

## Route

```plaintext
/media
```

---

## Features

* Upload Images
* Browse Images
* Search Images
* Delete Images

---

## Supported Formats

* JPG
* JPEG
* PNG
* WEBP

---

## Table Columns

* Preview
* File Name
* File Size
* Upload Date
* Actions

---

# 25. Site Settings

## Route

```plaintext
/settings
```

---

## General Settings

* Company Name
* Company Logo
* Favicon
* Footer Text
* Copyright Text

---

## Social Media Links

* Facebook
* LinkedIn
* Instagram
* Twitter/X
* YouTube

---

# 26. SEO Management

## Editable SEO Areas

* Homepage
* About Page
* Services
* Blog Posts

---

## SEO Fields

* Meta Title
* Meta Description

---

# 27. User Management

## Route

```plaintext
/users
```

---

## Super Admin Only

Features:

* Create User
* Edit User
* Disable User
* Delete User

---

## Fields

* Name
* Email
* Password
* Role
* Status

---

# 28. Profile Management

## Route

```plaintext
/profile
```

---

## Features

* Update Profile
* Change Password

---

# 29. Reusable Components

* AdminLayout
* Sidebar
* Header
* StatCard
* DataTable
* FormInput
* TextArea
* RichTextEditor
* ImageUploader
* MediaPicker
* Modal
* ConfirmationDialog
* Pagination
* SearchInput
* StatusBadge

---

# 30. Validation Requirements

All forms must support:

* Required Field Validation
* Email Validation
* URL Validation
* Image Validation
* Slug Validation

Client-side and server-side validation are both required.

---

# 31. Responsive Requirements

The CMS must support:

* Desktop
* Tablet
* Mobile

Requirements:

* Responsive Sidebar
* Responsive Tables
* Responsive Forms
* Responsive Dashboard

---

# 32. Notifications

Supported Notifications:

* Success
* Error
* Warning
* Information

Recommended Library:

* Sonner

---

# 33. Error Handling

The CMS must display:

* API Errors
* Validation Errors
* Permission Errors
* Empty States
* Loading States

---

# 34. Environment Variables

```env
VITE_API_BASE_URL=
VITE_APP_NAME="Enderas CMS"
```

No hardcoded URLs are permitted.

---

# 35. Completion Criteria

The Admin CMS is considered complete when:

✓ Authentication works

✓ Dashboard statistics display correctly

✓ Homepage content management works

✓ Hero Slider management works

✓ Services CRUD works

✓ Gallery CRUD works

✓ Blog CRUD works

✓ Blog Category CRUD works

✓ Team CRUD works

✓ Testimonials CRUD works

✓ FAQ CRUD works

✓ Core Values CRUD works

✓ Partner CRUD works

✓ Contact information management works

✓ Contact messages management works

✓ Media uploads work

✓ SEO management works

✓ Site settings work

✓ User management works

✓ Role permissions function correctly

✓ Responsive design is complete

✓ API integration is complete

✓ Production deployment succeeds

---

# 36. Development Priority Order

## Phase 1

* Authentication
* Admin Layout
* Dashboard

---

## Phase 2

* Homepage Management
* Hero Slides
* Services
* Gallery
* Media Library

---

## Phase 3

* Blog Posts
* Blog Categories
* Rich Text Editor

---

## Phase 4

* Team
* Testimonials
* FAQs
* Partners
* Core Values

---

## Phase 5

* Contact Information
* Messages
* Site Settings
* User Management

---

## Phase 6

* Testing
* Optimization
* Deployment

---

# 37. Final Deliverables

* Public Website
* Backend API
* Admin CMS
* Database Migrations
* Database Seeders
* API Documentation
* Environment Configuration
* Deployment Documentation
* Production Build
