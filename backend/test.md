# Enderas Backend API — Postman Testing Guide

This guide walks through testing every API endpoint with [Postman](https://www.postman.com/). Import the collection variables below, then follow each section in order.

## Prerequisites

1. **Backend running** — `npm run dev` (or `npm start` for production)
2. **Database migrated and seeded**:
   ```bash
   npm run migrate
   npm run seed
   ```
3. **Postman** installed (desktop or web)

## Environment Variables (Postman)

Create a Postman Environment named `Enderas Local` with these variables:

| Variable       | Initial Value                    | Description                          |
| -------------- | -------------------------------- | ------------------------------------ |
| `baseUrl`      | `http://localhost:5000/api/v1`   | API base URL                         |
| `accessToken`  | *(empty)*                        | Set automatically after login        |
| `refreshToken` | *(empty)*                        | Set automatically after login        |
| `adminEmail`   | `admin@enderas.com`              | Super admin email from `.env`        |
| `adminPassword`| *(your seeded password)*         | From console output or `.env`        |

---

## 1. Health Check

Verify the server and database are running.

```
GET {{baseUrl}}/health
```

**Expected (200):**
```json
{
  "status": "ok",
  "database": "connected",
  "uptime": 12.34,
  "timestamp": "2026-06-18T10:00:00.000Z"
}
```

---

## 2. Authentication

### 2.1 Login

```
POST {{baseUrl}}/auth/login
Content-Type: application/json

{
  "email": "{{adminEmail}}",
  "password": "{{adminPassword}}"
}
```

**Expected (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJ...",
    "refreshToken": "eyJ...",
    "user": { "id": 1, "email": "admin@enderas.com", "role": "super_admin" }
  }
}
```

**Postman script** (Tests tab — saves tokens automatically):
```javascript
if (pm.response.code === 200) {
  const data = pm.response.json().data;
  pm.environment.set('accessToken', data.accessToken);
  pm.environment.set('refreshToken', data.refreshToken);
}
```

### 2.2 Get Current User

```
GET {{baseUrl}}/auth/me
Authorization: Bearer {{accessToken}}
```

### 2.3 Refresh Token

```
POST {{baseUrl}}/auth/refresh
Content-Type: application/json

{
  "refresh_token": "{{refreshToken}}"
}
```

Update `accessToken` and `refreshToken` from the response.

### 2.4 Change Password

```
POST {{baseUrl}}/auth/change-password
Authorization: Bearer {{accessToken}}
Content-Type: application/json

{
  "old_password": "{{adminPassword}}",
  "new_password": "NewSecurePass123!@#"
}
```

### 2.5 Logout

```
POST {{baseUrl}}/auth/logout
Content-Type: application/json

{
  "refresh_token": "{{refreshToken}}"
}
```

---

## 3. Public Endpoints (No Auth)

### 3.1 Homepage

```
GET {{baseUrl}}/public/home
```

Returns homepage content, hero slides, statistics, services, gallery, team, testimonials, and FAQs.

### 3.2 About Page

```
GET {{baseUrl}}/public/about
```

Returns about page, core values, and partners.

### 3.3 Services

```
GET {{baseUrl}}/public/services?page=1&limit=10
```

```
GET {{baseUrl}}/public/services/asset-management
```

### 3.4 Gallery

```
GET {{baseUrl}}/public/gallery?page=1&limit=12
GET {{baseUrl}}/public/gallery?category=properties
```

### 3.5 Blog Posts

```
GET {{baseUrl}}/public/posts?page=1&limit=10
GET {{baseUrl}}/public/posts?search=asset
```

```
GET {{baseUrl}}/public/posts/the-importance-of-effective-asset-management
```

### 3.6 Contact Page

```
GET {{baseUrl}}/public/contact
```

### 3.7 Submit Contact Form

```
POST {{baseUrl}}/public/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+251 911 000 000",
  "subject": "Service Inquiry",
  "message": "I would like to learn more about asset management services."
}
```

**Expected (201):** `{ "success": true, "message": "Message sent successfully" }`

> Rate limited to 3 submissions per hour per IP.

### 3.8 Site Settings

```
GET {{baseUrl}}/public/settings
```

---

## 4. Admin Endpoints (Auth Required)

Add to all admin requests:
```
Authorization: Bearer {{accessToken}}
```

### 4.1 Dashboard

```
GET {{baseUrl}}/dashboard
```

### 4.2 Users (super_admin only)

```
GET {{baseUrl}}/users
GET {{baseUrl}}/users/1
```

```
POST {{baseUrl}}/users
Content-Type: application/json

{
  "name": "Editor User",
  "email": "editor@enderas.com",
  "password": "EditorPass123!@#",
  "role": "editor"
}
```

```
PUT {{baseUrl}}/users/2
PATCH {{baseUrl}}/users/2/status
DELETE {{baseUrl}}/users/2
```

### 4.3 Homepage

```
GET {{baseUrl}}/home-page
PUT {{baseUrl}}/home-page
```

```json
{
  "company_intro_title": "Welcome to Enderas",
  "company_intro_description": "Updated intro text.",
  "show_team": true,
  "show_testimonials": true,
  "show_faq": true
}
```

### 4.4 Statistics

```
GET {{baseUrl}}/statistics
POST {{baseUrl}}/statistics
```

```json
{ "label": "Years experience", "value": "12+", "icon": "calendar" }
```

```
PUT {{baseUrl}}/statistics/:id
DELETE {{baseUrl}}/statistics/:id
```

### 4.5 Hero Slides

```
GET {{baseUrl}}/hero-slides
POST {{baseUrl}}/hero-slides
```

```json
{
  "title": "Empowering Asset Solutions",
  "subtitle": "Your partner in success",
  "image": "https://example.com/banner.jpg",
  "button_text": "Learn More",
  "button_link": "/about",
  "is_active": true
}
```

```
PUT {{baseUrl}}/hero-slides/:id
PATCH {{baseUrl}}/hero-slides/:id/status
DELETE {{baseUrl}}/hero-slides/:id
```

### 4.6 Services

```
GET {{baseUrl}}/services
GET {{baseUrl}}/services/:id
POST {{baseUrl}}/services
```

```json
{
  "title": "Asset Management",
  "short_description": "Strategic asset planning.",
  "description": "Full description here.",
  "is_active": true
}
```

```
PUT {{baseUrl}}/services/:id
PATCH {{baseUrl}}/services/:id/status
DELETE {{baseUrl}}/services/:id
```

### 4.7 Gallery

```
GET {{baseUrl}}/gallery-categories
POST {{baseUrl}}/gallery-categories
```

```json
{ "name": "Properties", "slug": "properties" }
```

```
GET {{baseUrl}}/gallery
POST {{baseUrl}}/gallery
```

```json
{
  "title": "Simien Garden",
  "description": "Prime property",
  "image": "https://example.com/image.jpg",
  "category_id": "<uuid>"
}
```

### 4.8 Team Members

```
GET {{baseUrl}}/team-members
POST {{baseUrl}}/team-members
```

```json
{
  "full_name": "Jane Doe",
  "position": "Managing Director",
  "email": "jane@enderas.com",
  "biography": "20 years of experience.",
  "is_active": true
}
```

```
PATCH {{baseUrl}}/team-members/:id/status
DELETE {{baseUrl}}/team-members/:id
```

### 4.9 Testimonials

```
GET {{baseUrl}}/testimonials
POST {{baseUrl}}/testimonials
```

```json
{
  "client_name": "Client Name",
  "company": "Company Ltd",
  "content": "Excellent service from Enderas.",
  "is_active": true
}
```

### 4.10 FAQs

```
GET {{baseUrl}}/faqs
POST {{baseUrl}}/faqs
```

```json
{
  "question": "What services do you offer?",
  "answer": "Asset management, appraisal, consultancy, and more.",
  "is_active": true
}
```

### 4.11 About Page

```
GET {{baseUrl}}/about-page
PUT {{baseUrl}}/about-page
```

```json
{
  "history": "Founded in 2007...",
  "mission": "Our mission statement.",
  "vision": "Our vision statement."
}
```

```
GET {{baseUrl}}/core-values
POST {{baseUrl}}/core-values
GET {{baseUrl}}/partners
POST {{baseUrl}}/partners
```

### 4.12 Contact CMS

```
GET {{baseUrl}}/contact-page
PUT {{baseUrl}}/contact-page
```

```json
{
  "address": "NB Business Center, Addis Ababa",
  "phone": "+251 935401131",
  "email": "info@enderas.org"
}
```

```
GET {{baseUrl}}/contact-messages
GET {{baseUrl}}/contact-messages/:id
PATCH {{baseUrl}}/contact-messages/:id/read
PATCH {{baseUrl}}/contact-messages/:id/archive
```

### 4.13 Blog (super_admin or editor)

```
GET {{baseUrl}}/categories
POST {{baseUrl}}/categories
```

```json
{ "name": "Asset Management", "slug": "asset-management" }
```

```
GET {{baseUrl}}/posts
POST {{baseUrl}}/posts
```

```json
{
  "title": "New Blog Post",
  "excerpt": "Short summary",
  "content": "<p>Full HTML content</p>",
  "status": "draft"
}
```

```
PATCH {{baseUrl}}/posts/:id/publish
PATCH {{baseUrl}}/posts/:id/unpublish
DELETE {{baseUrl}}/posts/:id
```

### 4.14 Media Upload

```
POST {{baseUrl}}/media/upload
Authorization: Bearer {{accessToken}}
Content-Type: multipart/form-data

file: [select image file]
entity_type: gallery
```

Allowed types: JPG, JPEG, PNG, WEBP. Max 5 MB.

```
GET {{baseUrl}}/media
DELETE {{baseUrl}}/media/:id
```

### 4.15 Site Settings

```
GET {{baseUrl}}/settings
PUT {{baseUrl}}/settings
```

```json
{
  "site_name": "Enderas Asset Management",
  "site_description": "Your Partner in Success",
  "copyright_text": "Copyright © Enderas Asset Management"
}
```

---

## 5. Error Response Reference

| Status | Meaning                                      |
| ------ | -------------------------------------------- |
| 400    | Validation error — check `errors` array      |
| 401    | Missing or invalid/expired token             |
| 403    | Insufficient permissions or disabled account |
| 404    | Resource or route not found                  |
| 409    | Duplicate resource (e.g. slug already exists)|
| 429    | Rate limit exceeded (login or contact form) |
| 500    | Internal server error                        |

**Validation error example:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "type": "field", "msg": "Title is required", "path": "title", "location": "body" }
  ]
}
```

---

## 6. Recommended Test Sequence

1. Health check → confirm database connected
2. Login → save tokens
3. Public home → confirm seeded content from `docs/existing`
4. Public services → verify 5 services from seeder
5. Public posts → verify 3 blog posts
6. Admin dashboard → confirm auth works
7. Create/update/delete a test service
8. Submit contact form → verify in admin contact messages
9. Upload a test image → verify in media list
10. Refresh token → confirm rotation works
11. Logout → confirm refresh token invalidated

---

## 7. Automated Tests

Run the full test suite (unit + integration) without Postman:

```bash
npm test
```

Tests use an in-memory SQLite database and do not require MySQL.
