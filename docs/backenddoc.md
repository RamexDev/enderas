# ENDERAS ASSET MANAGEMENT WEBSITE

# Backend Technical Specification

**Project:** Enderas Asset Management Website
**Backend Version:** 1.0
**Document Status:** Approved for Development

---

# 1. Backend Overview

The backend serves as the central API layer for:

* Public Website
* Admin Dashboard

The system is designed as a content management backend that allows administrators to manage website content without modifying code.

The backend must expose REST APIs consumed by both frontend applications.

---

# 2. Core Responsibilities

The backend is responsible for:

* Authentication & Authorization
* Homepage Content Management
* Hero Slider Management
* Services Management
* Gallery Management
* Blog Management
* Team Management
* Testimonials Management
* FAQ Management
* About Page Management
* Partners Management
* Contact Page Management
* Contact Message Management
* Media Management
* Site Settings Management
* SEO Management

---

# 3. Technology Stack

## Runtime

Node.js

---

## Framework

Express.js

---

## Language

JavaScript (ES Modules)

No TypeScript.

---

## Database

MySQL

---

## ORM

Sequelize

---

## Authentication

JWT

---

## Validation

express-validator

---

## File Uploads

multer

---

## Password Hashing

bcrypt

---

## Security

* helmet
* cors
* express-rate-limit

---

# 4. Project Structure

```plaintext
backend/

src/
├── config/
├── controllers/
├── services/
├── models/
├── routes/
├── middleware/
├── validations/
├── utils/
├── constants/
├── migrations/
├── seeders/
├── uploads/

├── app.js
└── server.js
```

---

# 5. Architecture Rules

## Controllers

Responsible for:

* Parsing requests
* Calling services
* Returning responses

Controllers must not contain business logic.

---

## Services

Responsible for:

* Business logic
* Data processing
* Database operations

---

## Models

Responsible for:

* Database schema
* Associations
* Constraints

---

## Routes

Responsible only for endpoint registration.

---

## Middleware

Contains:

* Authentication
* Authorization
* Validation
* Error Handling
* Upload Processing

---

# 6. Environment Variables

```env
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
API_BASE_URL=

UPLOAD_PATH=
MAX_FILE_SIZE=
```

---

# 7. API Standards

## Base URL

```plaintext
/api/v1
```

---

## Success Response

```json
{
  "success": true,
  "message": "Success",
  "data": {}
}
```

---

## Error Response

```json
{
  "success": false,
  "message": "Validation Error",
  "errors": []
}
```

---

# 8. Authentication & Authorization

JWT Authentication.

Protected endpoints require:

```http
Authorization: Bearer TOKEN
```

---

## Roles

### Super Admin

Can:

* Manage Users
* Manage Settings
* Manage Content
* Manage Media

---

### Editor

Can:

* Manage Homepage Content
* Manage Blog
* Manage Services
* Manage Gallery
* Manage Team
* Manage Testimonials
* Manage FAQ
* Manage Partners

Cannot:

* Manage Users
* Manage Site Settings

---

# 9. Database Schema

---

## users

```plaintext
id
name
email
password
role
is_active
created_at
updated_at
```

---

## home_page

Stores homepage content.

```plaintext
id

company_intro_title
company_intro_description
company_intro_cta_text
company_intro_cta_link

auction_title
auction_description
auction_cta_text
auction_cta_link

contact_cta_title
contact_cta_description
contact_cta_button_text
contact_cta_button_link

show_team
show_testimonials
show_faq

meta_title
meta_description

updated_at
```

Single Record Table

---

## statistics

```plaintext
id
label
value
icon

created_at
updated_at
```

---

## hero_slides

```plaintext
id

title
subtitle

image

button_text
button_link

is_active

created_at
updated_at
```

---

## services

```plaintext
id

title
slug

short_description
description

image

cta_text
cta_link

meta_title
meta_description

is_active

created_at
updated_at
```

---

## gallery_categories

```plaintext
id

name
slug

created_at
updated_at
```

---

## gallery_items

```plaintext
id

title
description

image

category_id

created_at
updated_at
```

---

## team_members

```plaintext
id

full_name
email
position
biography

profile_image

is_active

created_at
updated_at
```

---

## testimonials

```plaintext
id

client_name
company

content

client_image

is_active

created_at
updated_at
```

---

## faqs

```plaintext
id

question
answer

is_active

created_at
updated_at
```

---

## about_page

```plaintext
id

history
mission
vision

meta_title
meta_description

updated_at
```

Single Record Table

---

## core_values

```plaintext
id

title
description

created_at
updated_at
```

---

## partners

```plaintext
id

name

logo

website_url

is_active

created_at
updated_at
```

---

## contact_page

```plaintext
id

address
phone
email

google_map_embed

meta_title
meta_description

updated_at
```

Single Record Table

---

## posts

```plaintext
id

title
slug

excerpt
content

featured_image

status

meta_title
meta_description

author_id

published_at

created_at
updated_at
```

---

## categories

```plaintext
id

name
slug

created_at
updated_at
```

---

## post_categories

```plaintext
post_id
category_id
```

---

## contact_messages

```plaintext
id

name
email
phone

subject
message

is_read

created_at
```

---

## media

```plaintext
id

filename
original_name

path

mime_type
file_size

uploaded_by

created_at
```

---

## site_settings

```plaintext
id

site_name
site_description

logo
favicon

footer_text
copyright_text

facebook_url
linkedin_url
instagram_url
twitter_url
youtube_url

updated_at
```

Single Record Table

---

# 10. Database Relationships

User hasMany Posts

Post belongsTo User

Post belongsToMany Categories

Category belongsToMany Posts

GalleryCategory hasMany GalleryItems

GalleryItem belongsTo GalleryCategory

---

# 11. Public API Endpoints

These endpoints are consumed by the public website.

---

## Homepage

```http
GET /public/home
```

Returns:

* Homepage Content
* Hero Slides
* Statistics
* Featured Services
* Featured Gallery Items
* Team Members (if enabled)
* Testimonials (if enabled)
* FAQs (if enabled)

---

## About

```http
GET /public/about
```

Returns:

* About Content
* Core Values
* Partners

---

## Services

```http
GET /public/services
GET /public/services/:slug
```

---

## Gallery

```http
GET /public/gallery
```

Supports:

```http
?page=
&limit=
&category=
```

---

## Blog

```http
GET /public/posts
GET /public/posts/:slug
```

Supports:

```http
?search=
?category=
?page=
&limit=
```

---

## Contact

```http
GET /public/contact
POST /contact
```

---

## Site Settings

```http
GET /public/settings
```

---

# 12. Admin API Endpoints

## Authentication

```http
POST /auth/login
GET /auth/me
POST /auth/change-password
```

---

## Users

```http
GET /users
POST /users
PUT /users/:id
DELETE /users/:id
PATCH /users/:id/status
```

---

## Homepage

```http
GET /home-page
PUT /home-page
```

---

## Statistics

```http
GET /statistics
POST /statistics
PUT /statistics/:id
DELETE /statistics/:id
```

---

## Hero Slides

```http
GET /hero-slides
POST /hero-slides
PUT /hero-slides/:id
DELETE /hero-slides/:id
PATCH /hero-slides/:id/status
```

---

## Services

```http
GET /services
POST /services
PUT /services/:id
DELETE /services/:id
```

---

## Gallery Categories

```http
GET /gallery-categories
POST /gallery-categories
PUT /gallery-categories/:id
DELETE /gallery-categories/:id
```

---

## Gallery Items

```http
GET /gallery
POST /gallery
PUT /gallery/:id
DELETE /gallery/:id
```

---

## Team Members

```http
GET /team-members
POST /team-members
PUT /team-members/:id
DELETE /team-members/:id
PATCH /team-members/:id/status
```

---

## Testimonials

```http
GET /testimonials
POST /testimonials
PUT /testimonials/:id
DELETE /testimonials/:id
PATCH /testimonials/:id/status
```

---

## FAQs

```http
GET /faqs
POST /faqs
PUT /faqs/:id
DELETE /faqs/:id
PATCH /faqs/:id/status
```

---

## About Page

```http
GET /about-page
PUT /about-page
```

---

## Core Values

```http
GET /core-values
POST /core-values
PUT /core-values/:id
DELETE /core-values/:id
```

---

## Partners

```http
GET /partners
POST /partners
PUT /partners/:id
DELETE /partners/:id
PATCH /partners/:id/status
```

---

## Contact Page

```http
GET /contact-page
PUT /contact-page
```

---

## Blog Categories

```http
GET /categories
POST /categories
PUT /categories/:id
DELETE /categories/:id
```

---

## Blog Posts

```http
GET /posts
POST /posts
PUT /posts/:id
DELETE /posts/:id
PATCH /posts/:id/publish
PATCH /posts/:id/unpublish
```

---

## Contact Messages

```http
GET /contact-messages
GET /contact-messages/:id
PATCH /contact-messages/:id/read
DELETE /contact-messages/:id
```

---

## Media

```http
GET /media
POST /media/upload
DELETE /media/:id
```

---

## Site Settings

```http
GET /settings
PUT /settings
```

---

# 13. File Upload Rules

Allowed formats:

* JPG
* JPEG
* PNG
* WEBP

Maximum file size:

```env
MAX_FILE_SIZE
```

---

# 14. Validation Requirements

All requests must be validated.

Includes:

* Required Fields
* Email Validation
* Password Validation
* Slug Validation
* File Validation
* File Size Validation

---

# 15. Pagination

Supported on:

* Blog Posts
* Gallery Items
* Media
* Contact Messages

Format:

```http
?page=1
&limit=10
```

Response:

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

---

# 16. Security Requirements

Must implement:

* JWT Authentication
* Role-Based Authorization
* Password Hashing
* Helmet
* CORS
* Rate Limiting
* Input Validation
* SQL Injection Protection
* File Upload Validation

---

# 17. Error Handling

Use centralized error middleware.

Requirements:

* Consistent responses
* Proper HTTP status codes
* Error logging support

Controllers should forward errors to middleware.

---

# 18. Audit Information

The following fields should be stored where applicable:

```plaintext
created_by
updated_by
created_at
updated_at
```

---

# 19. Deployment Requirements

The application must support:

* Development
* Staging
* Production

using environment variables only.

No hardcoded:

* URLs
* Database Names
* Credentials
* File Paths

---

# 20. Backend Completion Criteria

The backend is considered complete when:

* Authentication functions correctly
* User management functions correctly
* Homepage content management functions correctly
* Hero slider management functions correctly
* Statistics management functions correctly
* Services CRUD functions correctly
* Gallery CRUD functions correctly
* Team CRUD functions correctly
* Testimonials CRUD functions correctly
* FAQ CRUD functions correctly
* Blog CRUD functions correctly
* Contact form submissions function correctly
* Contact message management functions correctly
* Media uploads function correctly
* About page management functions correctly
* Partner management functions correctly
* Site settings management functions correctly
* SEO metadata management functions correctly
* Role permissions are enforced
* API documentation is completed
* Production deployment is successful
* All frontend content is delivered through API endpoints