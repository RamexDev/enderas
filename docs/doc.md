# Enderas Website Rebuild & Content Management System

## Technical Architecture Document

---

# 1. Project Overview

## Objective

Rebuild the Enderas website as a modern, scalable, enterprise-grade platform consisting of:

1. Public Website
2. Admin Management System (CMS)
3. REST API Backend
4. MySQL Database

The platform must allow administrators to manage all website content dynamically without requiring code changes.

---

# 2. Technology Stack

## Backend

* Node.js
* Express.js
* JavaScript (No TypeScript)
* Sequelize ORM
* MySQL
* JWT Authentication

## Frontend

* Vite
* React
* React Router
* Axios
* React Query (optional)
* Zustand or Context API

## Admin Panel

* React + Vite
* Shared API with frontend
* Role-based access control

## Database

* MySQL
* Sequelize ORM
* Migrations
* Seeders

---

# 3. High-Level Architecture

Frontend Website
↓
REST API
↓
Service Layer
↓
Sequelize ORM
↓
MySQL Database

Admin Panel
↓
REST API
↓
Service Layer
↓
Database

---

# 4. Monorepo Structure

project-root/

backend/
frontend/
admin/
docs/

---

# 5. Backend Structure

backend/

src/

config/
database.js
env.js

controllers/

services/

models/

routes/

middleware/

validations/

utils/

constants/

migrations/

seeders/

uploads/

app.js
server.js

---

# 6. Environment Variables

All configurable values must come from .env.

## Required Variables

PORT=
NODE_ENV=

DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=

JWT_SECRET=
JWT_EXPIRES_IN=

CLIENT_URL=
ADMIN_URL=
API_BASE_URL=

UPLOAD_PATH=
MAX_FILE_SIZE=

EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASSWORD=

CLOUD_STORAGE_KEY=
CLOUD_STORAGE_SECRET=

LOG_LEVEL=

No values may be hardcoded.

---

# 7. Authentication & Authorization

## Authentication

JWT-based authentication

Features:

* Login
* Logout
* Refresh Token
* Password Reset
* Change Password

## Authorization

Roles:

### Super Admin

* Full access

### Content Manager

* Manage content
* Manage media
* Manage pages

### Editor

* Create and edit content

### Viewer

* Read-only dashboard

---

# 8. Database Design

## Users

* id (UUID)
* name
* email
* password
* role
* isActive
* timestamps

---

## Roles

* id
* name
* permissions

---

## Pages

Dynamic page management.

Fields:

* id
* title
* slug
* metaTitle
* metaDescription
* content
* status
* publishedAt
* timestamps

---

## Media

* id
* fileName
* originalName
* filePath
* mimeType
* fileSize
* uploadedBy
* timestamps

---

## News

* id
* title
* slug
* excerpt
* content
* featuredImage
* status
* publishedAt

---

## Events

* id
* title
* description
* startDate
* endDate
* location
* image

---

## Programs

* id
* title
* slug
* description
* image
* status

---

## Team Members

* id
* name
* position
* bio
* image
* socialLinks

---

## Partners

* id
* name
* logo
* website

---

## Testimonials

* id
* name
* position
* quote
* image

---

## Contact Messages

* id
* name
* email
* phone
* subject
* message
* status

---

## Settings

Global website configuration.

Fields:

* id
* siteName
* logo
* favicon
* address
* email
* phone
* socialLinks
* footerText

---

# 9. Sequelize Relationships

User
→ uploads many Media

Page
→ has many Media

News
→ has many Media

Program
→ has many Media

Event
→ has many Media

Role
→ has many Users

---

# 10. Backend Layer Responsibilities

## Controllers

Responsibilities:

* Request handling
* Input validation trigger
* Call service layer
* Return response

No business logic.

---

## Services

Responsibilities:

* Business rules
* Database operations
* Complex workflows

All business logic belongs here.

---

## Middleware

* Authentication
* Authorization
* Validation
* Error handling
* Rate limiting
* Logging

---

## Utilities

* Response helper
* JWT helper
* File helper
* Slug generator
* Pagination helper

---

# 11. API Design

Base URL

/api/v1

## Authentication

POST /auth/login

POST /auth/logout

POST /auth/refresh-token

POST /auth/forgot-password

POST /auth/reset-password

---

## Pages

GET /pages

GET /pages/:slug

POST /pages

PUT /pages/:id

DELETE /pages/:id

---

## News

GET /news

GET /news/:slug

POST /news

PUT /news/:id

DELETE /news/:id

---

## Programs

GET /programs

POST /programs

PUT /programs/:id

DELETE /programs/:id

---

## Events

GET /events

POST /events

PUT /events/:id

DELETE /events/:id

---

## Team Members

GET /team

POST /team

PUT /team/:id

DELETE /team/:id

---

## Media

GET /media

POST /media

DELETE /media/:id

---

## Contact

POST /contact

GET /contact

---

## Settings

GET /settings

PUT /settings

---

# 12. Security Requirements

Must Implement:

* bcrypt password hashing
* JWT authentication
* Helmet
* CORS
* Rate limiting
* Input sanitization
* Validation middleware
* SQL injection protection
* Secure file uploads
* XSS protection

---

# 13. Frontend Website Structure

frontend/

src/

api/

components/

layouts/

pages/

hooks/

services/

utils/

assets/

routes/

store/

---

# 14. Public Website Pages

Home

About Us

Programs

Projects

Events

News

Resources

Partners

Team

Contact

Privacy Policy

Terms

404 Page

---

# 15. Admin Panel Structure

admin/

src/

pages/

components/

layouts/

routes/

api/

services/

store/

hooks/

utils/

---

# 16. Admin Dashboard Features

## Dashboard

* Statistics
* Recent activities
* Contact message count
* Content summary

## User Management

* Create users
* Edit users
* Assign roles
* Disable users

## Page Management

* Create page
* Edit page
* Publish page

## News Management

* Create article
* Edit article
* Publish article

## Program Management

* CRUD programs

## Event Management

* CRUD events

## Team Management

* CRUD team members

## Media Library

* Upload images
* Delete images
* Organize files

## Contact Messages

* View messages
* Mark as resolved

## Website Settings

* Logo
* Contact info
* Footer content
* Social media links
* SEO defaults

---

# 17. SEO Requirements

Dynamic:

* Meta title
* Meta description
* Open Graph tags
* Twitter cards
* Sitemap generation
* Robots.txt

---

# 18. Scalability Considerations

Future Ready For:

* Multiple languages
* Multiple administrators
* Multiple websites
* CDN integration
* Cloud storage
* Audit logs
* Notification system
* Analytics integration

---

# 19. Deployment

Frontend

* Vercel
* Netlify
* Nginx

Backend

* VPS
* Docker
* Render
* Railway

Database

* MySQL Server
* Managed MySQL

All deployments must use environment variables.

No source code modification should be required between environments.

---

# 20. Success Criteria

The completed platform must:

* Fully reproduce Enderas website functionality
* Allow all content to be managed from Admin CMS
* Require zero hardcoded content
* Support environment-based deployment
* Follow enterprise-grade architecture
* Be maintainable by multiple developers
* Be scalable for future organizational growth
