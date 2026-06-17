# Enderas Asset Management Website

# Admin CMS Technical Specification

## Version 1.0

---

# 1. Admin CMS Overview

The Admin CMS is a secure internal application used to manage all website content.

The CMS eliminates the need to edit code when updating content.

All website content displayed on the public website must originate from the CMS.

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

## API Communication

Axios

---

## Styling

Tailwind CSS

Recommended for:

* Faster development
* Consistent UI
* Responsive layouts

---

# 3. Admin Application Structure

admin/

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

App.jsx

main.jsx

---

# 4. Authentication

## Login Page

Route:

/login

---

Features

Email

Password

Remember Me

Login Button

---

API

POST /auth/login

---

On Success

Store JWT Token

Redirect to Dashboard

---

On Failure

Display Error Message

---

# 5. Protected Routes

All admin routes require authentication.

Flow:

Login

↓

JWT Token Stored

↓

Protected Route Check

↓

Access Granted

---

Unauthenticated Users

↓

Redirect to Login

---

# 6. Admin Layout

Structure

Sidebar

↓

Header

↓

Content Area

---

Sidebar remains visible on desktop.

Collapsible on mobile.

---

# 7. Dashboard

Route

/dashboard

---

Purpose

Provide overview of website content.

---

Statistics Cards

Total Blog Posts

Total Gallery Items

Total Services

Unread Messages

---

Recent Activity

Recently Created Posts

Recently Added Images

Recent Messages

---

Quick Actions

Create Post

Upload Media

Add Gallery Item

Add Service

---

# 8. Sidebar Navigation

Dashboard

---

Content

Services

Gallery

Blog Posts

Pages

---

Media

Media Library

---

Communication

Messages

---

Settings

Site Settings

Users

---

Profile

Logout

---

# 9. Services Management

Route

/services

---

Purpose

Manage company services.

---

Table Columns

Title

Status

Display Order

Created Date

Actions

---

Actions

Create

Edit

Delete

---

Create Service Form

Title

Short Description

Description

Image

Display Order

Active Status

---

API

GET /services

POST /services

PUT /services/:id

DELETE /services/:id

---

# 10. Gallery Management

Route

/gallery

---

Purpose

Manage gallery images.

---

Table Columns

Image

Title

Category

Created Date

Actions

---

Actions

Create

Edit

Delete

---

Create Gallery Item Form

Title

Description

Category

Image

Display Order

---

API

GET /gallery

POST /gallery

PUT /gallery/:id

DELETE /gallery/:id

---

# 11. Blog Management

Route

/posts

---

Purpose

Manage website articles.

---

Blog Table

Title

Status

Category

Published Date

Actions

---

Actions

Create

Edit

Publish

Unpublish

Delete

---

Create Post Form

Title

Slug

Excerpt

Content

Featured Image

Categories

Meta Title

Meta Description

Status

---

Supported Status

Draft

Published

---

API

GET /posts

POST /posts

PUT /posts/:id

DELETE /posts/:id

PATCH /posts/:id/publish

PATCH /posts/:id/unpublish

---

# 12. Blog Editor

Recommended Editor

React Quill

or

Tiptap

---

Features

Rich Text

Headings

Lists

Links

Images

Quotes

Tables

---

Image uploads must use Media Library.

---

# 13. Category Management

Route

/posts/categories

---

Purpose

Manage blog categories.

---

Fields

Name

Slug

---

Actions

Create

Edit

Delete

---

API

GET /categories

POST /categories

PUT /categories/:id

DELETE /categories/:id

---

# 14. Pages Management

Route

/pages

---

Purpose

Manage static pages.

---

Managed Pages

About

Contact

---

Page Fields

Title

Content

Meta Title

Meta Description

---

API

GET /pages

PUT /pages/:id

---

# 15. Homepage Management

Route

/pages/home

---

Purpose

Manage homepage sections.

---

Editable Sections

Hero Section

Company Introduction

Homepage CTA

---

Hero Fields

Title

Subtitle

Button Text

Button URL

Background Image

---

Introduction Fields

Title

Content

Image

---

CTA Fields

Title

Description

Button Text

Button URL

---

# 16. Media Library

Route

/media

---

Purpose

Centralized asset management.

---

Features

Upload Images

Browse Images

Delete Images

Search Images

Copy Image URL

---

Supported Formats

JPG

JPEG

PNG

WEBP

---

Table Columns

Preview

File Name

Size

Upload Date

Actions

---

API

GET /media

POST /media/upload

DELETE /media/:id

---

# 17. Contact Messages

Route

/messages

---

Purpose

View contact form submissions.

---

Table Columns

Name

Email

Subject

Date

Status

Actions

---

Status

Unread

Read

---

Actions

View

Mark Read

Delete

---

API

GET /contact-messages

GET /contact-messages/:id

PATCH /contact-messages/:id/read

DELETE /contact-messages/:id

---

# 18. Site Settings

Route

/settings

---

Purpose

Manage global website settings.

---

Sections

General

Contact Information

Social Media

SEO

---

General Settings

Site Name

Site Description

Logo

Footer Text

---

Contact Settings

Phone

Email

Address

---

Social Media

Facebook URL

LinkedIn URL

Twitter URL

---

SEO Defaults

Default Meta Title

Default Meta Description

---

API

GET /settings

PUT /settings

---

# 19. User Management

Route

/users

---

Visible Only To

Super Admin

---

Purpose

Manage admin accounts.

---

Table Columns

Name

Email

Role

Status

Actions

---

Actions

Create

Edit

Disable

Delete

---

Create User Form

Name

Email

Password

Role

Status

---

Roles

Super Admin

Editor

---

API

GET /users

POST /users

PUT /users/:id

DELETE /users/:id

PATCH /users/:id/status

---

# 20. Profile Management

Route

/profile

---

Purpose

Allow logged-in user to manage account.

---

Fields

Name

Email

Password

---

Actions

Update Profile

Change Password

---

API

GET /auth/me

POST /auth/change-password

---

# 21. Reusable Components

AdminLayout

Sidebar

Header

StatCard

DataTable

FormInput

TextArea

RichTextEditor

ImageUploader

Modal

ConfirmationDialog

Pagination

SearchInput

StatusBadge

---

# 22. Form Validation

Required Fields

Email Validation

Image Validation

URL Validation

Slug Validation

---

All forms must validate before submission.

---

# 23. Responsive Requirements

Desktop

Tablet

Mobile

---

Requirements

Responsive Sidebar

Responsive Tables

Responsive Forms

Responsive Dashboard

---

# 24. Error Handling

Display API Errors

Display Validation Errors

Display Success Messages

Graceful Empty States

---

# 25. Notifications

Success Notifications

Error Notifications

Warning Notifications

---

Recommended Library

React Hot Toast

or

Sonner

---

# 26. Environment Variables

VITE_API_BASE_URL

VITE_APP_NAME

---

No hardcoded URLs allowed.

---

# 27. Admin CMS Completion Criteria

The CMS is considered complete when:

✓ Authentication works

✓ Dashboard statistics display correctly

✓ Services CRUD works

✓ Gallery CRUD works

✓ Blog CRUD works

✓ Category CRUD works

✓ Homepage editing works

✓ About page editing works

✓ Contact page editing works

✓ Media uploads work

✓ Contact messages can be managed

✓ Site settings can be updated

✓ User management works

✓ Responsive design is complete

✓ API integration is complete

✓ Deployment is environment-based

---

# 28. Development Priority Order

Phase 1

Authentication

Admin Layout

Dashboard

---

Phase 2

Services Management

Gallery Management

Media Library

---

Phase 3

Blog Management

Categories

Rich Text Editor

---

Phase 4

Pages Management

Homepage Management

Settings

---

Phase 5

Contact Messages

User Management

Final Testing

---

# 29. Final Deliverables

Backend API

Public Website

Admin CMS

Database Migrations

Seeders

API Documentation

Environment Configuration

Deployment Documentation

Production Build
