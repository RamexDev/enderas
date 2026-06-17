# Enderas Asset Management Website

# Backend Technical Specification

## Version 1.0

---

# 1. Backend Overview

The backend serves as the central API layer for both:

* Public Website
* Admin Dashboard

Responsibilities:

* Authentication
* Content Management
* Blog Management
* Gallery Management
* Services Management
* Media Management
* Contact Management
* Site Settings Management

The backend must expose REST APIs consumed by both frontend applications.

---

# 2. Technology Stack

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

helmet
cors
express-rate-limit

---

# 3. Project Structure

backend/

src/

config/

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

# 4. Folder Responsibilities

## controllers

Handle:

* Request parsing
* Service invocation
* Returning responses

Must NOT contain business logic.

---

## services

Handle:

* Business rules
* Database interactions
* Data transformations

All business logic belongs here.

---

## models

Contains Sequelize models and associations.

---

## routes

Route definitions only.

---

## middleware

Contains:

* JWT Authentication
* Authorization
* Validation
* Error Handling

---

## validations

Request validation schemas.

---

## utils

Reusable helper functions.

Examples:

* Pagination
* Slug Generation
* Response Helpers

---

# 5. Environment Variables

Required:

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

---

# 6. API Standards

Base URL

/api/v1

---

Response Format

Success

{
"success": true,
"message": "Success",
"data": {}
}

---

Error

{
"success": false,
"message": "Validation Error",
"errors": []
}

---

# 7. Authentication

JWT Authentication.

Protected routes require:

Authorization: Bearer TOKEN

---

Authentication Flow

Login

↓

Validate Credentials

↓

Generate JWT

↓

Return User + Token

↓

Frontend Stores Token

↓

Protected Requests Include Token

---

# 8. User Roles

## Super Admin

Full Access

Can:

* Manage Users
* Manage Settings
* Manage Content

---

## Editor

Can:

* Manage Services
* Manage Blog Posts
* Manage Gallery
* Manage Pages

Cannot:

* Manage Users
* Manage Settings

---

# 9. Database Schema

---

## users

id

name

email

password

role

is_active

created_at

updated_at

---

## pages

Used for About Page and Contact Page content.

Fields:

id

slug

title

content

meta_title

meta_description

created_at

updated_at

---

## services

id

title

slug

short_description

description

image

display_order

is_active

created_at

updated_at

---

## gallery_items

id

title

description

image

category

display_order

created_at

updated_at

---

## posts

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

---

## categories

id

name

slug

created_at

updated_at

---

## post_categories

post_id

category_id

---

## media

id

filename

original_name

path

mime_type

file_size

uploaded_by

created_at

---

## contact_messages

id

name

email

phone

subject

message

is_read

created_at

---

## site_settings

id

site_name

site_description

logo

phone

email

address

facebook_url

linkedin_url

twitter_url

footer_text

updated_at

---

# 10. Sequelize Relationships

User

hasMany Posts

---

Post

belongsTo User

---

Post

belongsToMany Categories

---

Category

belongsToMany Posts

---

# 11. API Endpoints

# Authentication

POST /auth/login

GET /auth/me

POST /auth/change-password

---

# Users

GET /users

GET /users/:id

POST /users

PUT /users/:id

DELETE /users/:id

PATCH /users/:id/status

---

# Services

GET /services

GET /services/:id

GET /services/slug/:slug

POST /services

PUT /services/:id

DELETE /services/:id

PATCH /services/:id/order

---

Request Example

POST /services

{
"title":"Portfolio Management",
"shortDescription":"Professional asset management.",
"description":"Full service portfolio management.",
"image":"media-id"
}

---

# Gallery

GET /gallery

GET /gallery/:id

POST /gallery

PUT /gallery/:id

DELETE /gallery/:id

PATCH /gallery/:id/order

---

Request Example

POST /gallery

{
"title":"Investment Seminar",
"description":"Annual investor conference.",
"image":"media-id",
"category":"Events"
}

---

# Blog Categories

GET /categories

POST /categories

PUT /categories/:id

DELETE /categories/:id

---

# Blog Posts

GET /posts

GET /posts/:id

GET /posts/slug/:slug

POST /posts

PUT /posts/:id

DELETE /posts/:id

PATCH /posts/:id/publish

PATCH /posts/:id/unpublish

---

Create Post Example

{
"title":"Market Outlook 2026",
"excerpt":"Economic outlook for investors.",
"content":"Post content...",
"featuredImage":"media-id",
"categoryIds":[1,2]
}

---

# Pages

GET /pages

GET /pages/:slug

POST /pages

PUT /pages/:id

DELETE /pages/:id

---

Examples:

about

contact

---

# Media

GET /media

GET /media/:id

POST /media/upload

DELETE /media/:id

---

Upload Rules

Allowed:

jpg

jpeg

png

webp

Maximum Size:

Defined by MAX_FILE_SIZE

---

# Contact

Public Endpoint

POST /contact

Request

{
"name":"John Doe",
"email":"[john@example.com](mailto:john@example.com)",
"phone":"123456789",
"subject":"Inquiry",
"message":"Hello"
}

---

Admin Endpoints

GET /contact-messages

GET /contact-messages/:id

PATCH /contact-messages/:id/read

DELETE /contact-messages/:id

---

# Site Settings

GET /settings

PUT /settings

---

Settings Example

{
"siteName":"Enderas Asset Management",
"siteDescription":"Investment and Asset Management Firm",
"phone":"+251...",
"email":"[info@example.com](mailto:info@example.com)",
"address":"Addis Ababa",
"facebookUrl":"",
"linkedinUrl":"",
"footerText":"© Enderas Asset Management"
}

---

# 12. Validation Rules

All requests must be validated.

Examples:

Email Validation

Password Validation

Slug Validation

Image Validation

Required Fields Validation

---

# 13. Security Requirements

Must Implement:

JWT Authentication

Password Hashing (bcrypt)

Helmet

Rate Limiting

Input Validation

SQL Injection Protection

File Validation

CORS

---

# 14. Error Handling

Centralized Error Middleware.

No try/catch duplication across controllers.

Controllers should forward errors to middleware.

---

# 15. Pagination

Supported On:

Posts

Gallery

Media

Contact Messages

Format:

?page=1

?limit=10

Response:

{
"data": [],
"meta": {
"page":1,
"limit":10,
"total":50,
"totalPages":5
}
}

---

# 16. Deployment Requirements

Application must support:

Development

Staging

Production

using only environment variables.

No hardcoded URLs.

No hardcoded database names.

No hardcoded credentials.

---

# 17. Backend Completion Criteria

Backend is considered complete when:

* Authentication works
* Services CRUD works
* Gallery CRUD works
* Blog CRUD works
* Contact Form works
* Media Upload works
* Site Settings work
* Admin Authentication works
* API Documentation is completed
* Deployment is environment-based
