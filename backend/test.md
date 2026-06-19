# Postman Testing Guide

Complete step-by-step guide for manually testing every API endpoint with Postman.

## Environment Setup

Create a Postman environment with these variables:

| Variable | Initial Value |
|----------|---------------|
| `base_url` | `http://localhost:5000/api/v1` |
| `admin_url` | `http://localhost:5000` |
| `access_token` | (leave empty — populated by login) |
| `refresh_token` | (leave empty — populated by login) |
| `user_id` | (leave empty) |
| `service_id` | (leave empty) |
| `post_id` | (leave empty) |
| `contact_message_id` | (leave empty) |
| `gallery_id` | (leave empty) |
| `media_id` | (leave empty) |

## Test Sequence (Recommended Order)

Run tests in this order — later tests depend on IDs created by earlier ones.

---

## 1. Health Check

Verify the server is running and database is connected.

```
GET {{base_url}}/health
```

**Expected Response (200):**
```json
{
  "status": "ok",
  "database": "connected",
  "uptime": 123.45,
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```

---

## 2. Authentication

### 2.1 Login

Authenticate as the super admin user created during seeding.

```
POST {{base_url}}/auth/login
Content-Type: application/json

{
  "email": "admin@enderas.com",
  "password": "your-super-admin-password"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJ...",
    "refreshToken": "eyJ...",
    "user": {
      "id": 1,
      "name": "Super Admin",
      "email": "admin@enderas.com",
      "role": "super_admin"
    }
  }
}
```

**Postman Setup:**
- Go to the **Tests** tab and add:
```javascript
const response = pm.response.json();
pm.collectionVariables.set('access_token', response.data.accessToken);
pm.collectionVariables.set('refresh_token', response.data.refreshToken);
pm.collectionVariables.set('user_id', String(response.data.user.id));
```

> **Note:** If you didn't set `SUPER_ADMIN_PASSWORD` in `.env`, check the terminal output for the auto-generated password on first `npm run seed`.

### 2.2 Get Current User

```
GET {{base_url}}/auth/me
Authorization: Bearer {{access_token}}
```

**Expected Response (200):** Returns current user profile.

### 2.3 Refresh Token

```
POST {{base_url}}/auth/refresh
Content-Type: application/json

{
  "refresh_token": "{{refresh_token}}"
}
```

**Expected Response (200):** Returns new access + refresh tokens. Update your Postman variables with the new tokens.

### 2.4 Logout

```
POST {{base_url}}/auth/logout
Content-Type: application/json

{
  "refresh_token": "{{refresh_token}}"
}
```

**Expected Response (200):** Token invalidated. You'll need to login again before hitting admin endpoints.

### 2.5 Change Password

```
POST {{base_url}}/auth/change-password
Authorization: Bearer {{access_token}}
Content-Type: application/json

{
  "current_password": "current-password",
  "new_password": "NewPass123!@#",
  "confirm_password": "NewPass123!@#"
}
```

**Expected Response (200):** Password updated. Login again with the new password.

---

## 3. Public Endpoints (No Auth Required)

### 3.1 Get Homepage

```
GET {{base_url}}/public/home
```

Returns homepage data including hero slides, statistics, and featured content.

### 3.2 Get About Page

```
GET {{base_url}}/public/about
```

Returns about page with core values and partners.

### 3.3 List Services

```
GET {{base_url}}/public/services
GET {{base_url}}/public/services?page=1&limit=5
```

Returns paginated active services.

### 3.4 Get Service by Slug

```
GET {{base_url}}/public/services/asset-management
```

Replace `asset-management` with an actual slug from the list response.

### 3.5 List Gallery

```
GET {{base_url}}/public/gallery
GET {{base_url}}/public/gallery?category=1
```

Returns paginated gallery items, optionally filtered by category.

### 3.6 List Blog Posts

```
GET {{base_url}}/public/posts
GET {{base_url}}/public/posts?page=1&limit=5
```

Returns paginated published posts.

### 3.7 Get Blog Post by Slug

```
GET {{base_url}}/public/posts/understanding-asset-management
```

Replace with an actual slug from the posts list.

### 3.8 Get Contact Page

```
GET {{base_url}}/public/contact
```

Returns contact page settings (email, phone, address).

### 3.9 Submit Contact Form

```
POST {{base_url}}/public/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1-555-1234567",
  "subject": "General Inquiry",
  "message": "I would like to learn more about your asset management services."
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1-555-1234567",
    "subject": "General Inquiry",
    "message": "I would like to learn more about your asset management services.",
    "is_read": false,
    "is_archived": false,
    "createdAt": "2026-01-01T00:00:00.000Z"
  }
}
```

**Postman Setup (Tests tab):**
```javascript
const response = pm.response.json();
pm.collectionVariables.set('contact_message_id', String(response.data.id));
```

**Validation Tests:**
| Scenario | Request Body | Expected Status |
|----------|-------------|-----------------|
| Missing name | `{ "email": "test@test.com", "subject": "S", "message": "M" }` | 400 |
| Invalid email | `{ "name": "T", "email": "bad", "subject": "S", "message": "M" }` | 400 |
| Invalid phone | `{ "name": "T", "email": "t@t.com", "phone": "abc", "subject": "S", "message": "M" }` | 400 |
| HTML injection | `{ "name": "<script>alert('xss')</script>", "email": "t@t.com", "subject": "<b>Hi</b>", "message": "<p>test</p>" }` | 201 (tags stripped) |

### 3.10 Get Site Settings

```
GET {{base_url}}/public/settings
```

Returns public site settings.

---

## 4. Admin — Dashboard

### 4.1 Get Dashboard

```
GET {{base_url}}/dashboard
Authorization: Bearer {{access_token}}
```

**Expected Response (200):** Returns aggregate statistics (user count, service count, etc.).

---

## 5. Admin — Users (super_admin only)

### 5.1 List Users

```
GET {{base_url}}/users
Authorization: Bearer {{access_token}}
GET {{base_url}}/users?page=1&limit=5
```

### 5.2 Create User

```
POST {{base_url}}/users
Authorization: Bearer {{access_token}}
Content-Type: application/json

{
  "name": "Editor User",
  "email": "editor@enderas.com",
  "password": "EditorPass123!@#",
  "role": "editor"
}
```

**Postman Setup (Tests tab):**
```javascript
const response = pm.response.json();
pm.collectionVariables.set('user_id', String(response.data.id));
```

### 5.3 Get User

```
GET {{base_url}}/users/{{user_id}}
Authorization: Bearer {{access_token}}
```

### 5.4 Update User

```
PUT {{base_url}}/users/{{user_id}}
Authorization: Bearer {{access_token}}
Content-Type: application/json

{
  "name": "Editor User Updated",
  "role": "editor"
}
```

### 5.5 Toggle User Status

```
PATCH {{base_url}}/users/{{user_id}}/status
Authorization: Bearer {{access_token}}
```

Toggles `is_active` between true/false.

### 5.6 Delete User

```
DELETE {{base_url}}/users/{{user_id}}
Authorization: Bearer {{access_token}}
```

---

## 6. Admin — Homepage

### 6.1 Get Home Page

```
GET {{base_url}}/home-page
Authorization: Bearer {{access_token}}
```

### 6.2 Update Home Page

```
PUT {{base_url}}/home-page
Authorization: Bearer {{access_token}}
Content-Type: application/json

{
  "hero_title": "Enderas Asset Management",
  "hero_subtitle": "Professional asset management solutions"
}
```

### 6.3 Statistics CRUD

```
# List
GET {{base_url}}/statistics
Authorization: Bearer {{access_token}}

# Create
POST {{base_url}}/statistics
Authorization: Bearer {{access_token}}
Content-Type: application/json

{
  "label": "Projects Completed",
  "value": 500,
  "suffix": "+"
}

# Update (replace :id with actual ID)
PUT {{base_url}}/statistics/:id
Authorization: Bearer {{access_token}}
Content-Type: application/json

{
  "value": 550
}

# Delete
DELETE {{base_url}}/statistics/:id
Authorization: Bearer {{access_token}}
```

### 6.4 Hero Slides CRUD

```
# List
GET {{base_url}}/hero-slides
Authorization: Bearer {{access_token}}

# Create
POST {{base_url}}/hero-slides
Authorization: Bearer {{access_token}}
Content-Type: application/json

{
  "title": "New Slide",
  "subtitle": "Slide subtitle",
  "is_active": true
}

# Toggle status
PATCH {{base_url}}/hero-slides/:id/status
Authorization: Bearer {{access_token}}
```

---

## 7. Admin — Services

### 7.1 List Services

```
GET {{base_url}}/services
Authorization: Bearer {{access_token}}
```

### 7.2 Create Service

```
POST {{base_url}}/services
Authorization: Bearer {{access_token}}
Content-Type: application/json

{
  "title": "Consulting Services",
  "short_description": "Expert consulting for asset management",
  "is_active": true
}
```

**Postman Setup (Tests tab):**
```javascript
const response = pm.response.json();
pm.collectionVariables.set('service_id', String(response.data.id));
```

### 7.3 Get Service

```
GET {{base_url}}/services/{{service_id}}
Authorization: Bearer {{access_token}}
```

### 7.4 Update Service

```
PUT {{base_url}}/services/{{service_id}}
Authorization: Bearer {{access_token}}
Content-Type: application/json

{
  "title": "Consulting Services (Updated)",
  "short_description": "Updated description"
}
```

### 7.5 Toggle Service Status

```
PATCH {{base_url}}/services/{{service_id}}/status
Authorization: Bearer {{access_token}}
```

Toggles `is_active`. Verify that inactive services disappear from `GET /public/services`.

### 7.6 Delete Service

```
DELETE {{base_url}}/services/{{service_id}}
Authorization: Bearer {{access_token}}
```

---

## 8. Admin — Contact Messages

### 8.1 List Messages

```
GET {{base_url}}/contact-messages
Authorization: Bearer {{access_token}}
GET {{base_url}}/contact-messages?page=1&limit=10
GET {{base_url}}/contact-messages?archived=true
```

The `archived=true` filter shows only archived messages. Default is `archived=false`.

### 8.2 Get Message

```
GET {{base_url}}/contact-messages/{{contact_message_id}}
Authorization: Bearer {{access_token}}
```

### 8.3 Mark as Read

```
PATCH {{base_url}}/contact-messages/{{contact_message_id}}/read
Authorization: Bearer {{access_token}}
```

**Expected Response (200):** `is_read` changes to `true`.

### 8.4 Mark as Unread

```
PATCH {{base_url}}/contact-messages/{{contact_message_id}}/unread
Authorization: Bearer {{access_token}}
```

**Expected Response (200):** `is_read` changes to `false`.

### 8.5 Archive Message

```
PATCH {{base_url}}/contact-messages/{{contact_message_id}}/archive
Authorization: Bearer {{access_token}}
```

**Expected Response (200):** `is_archived` changes to `true`. Message no longer appears in the default list (without `?archived=true`).

### 8.6 Unarchive Message

```
PATCH {{base_url}}/contact-messages/{{contact_message_id}}/unarchive
Authorization: Bearer {{access_token}}
```

**Expected Response (200):** `is_archived` changes to `false`. Message reappears in the default list.

### 8.7 Delete Message

```
DELETE {{base_url}}/contact-messages/{{contact_message_id}}
Authorization: Bearer {{access_token}}
```

**Expected Response (200):** Message permanently removed.

### 8.8 Error Scenarios

| Scenario | Request | Expected Status |
|----------|---------|-----------------|
| Get unknown | `GET .../contact-messages/99999` | 404 |
| Read unknown | `PATCH .../contact-messages/99999/read` | 404 |
| Unread unknown | `PATCH .../contact-messages/99999/unread` | 404 |
| Archive unknown | `PATCH .../contact-messages/99999/archive` | 404 |
| Unarchive unknown | `PATCH .../contact-messages/99999/unarchive` | 404 |
| Delete unknown | `DELETE .../contact-messages/99999` | 404 |
| Already deleted | `DELETE .../contact-messages/{deleted_id}` | 404 |

---

## 9. Admin — Blog

### 9.1 List Posts

```
GET {{base_url}}/posts
Authorization: Bearer {{access_token}}
```

### 9.2 Create Post

```
POST {{base_url}}/posts
Authorization: Bearer {{access_token}}
Content-Type: application/json

{
  "title": "My New Blog Post",
  "content": "<p>This is the full blog post content.</p>",
  "excerpt": "A brief excerpt",
  "category_id": 1,
  "is_published": false
}
```

**Postman Setup (Tests tab):**
```javascript
const response = pm.response.json();
pm.collectionVariables.set('post_id', String(response.data.id));
```

### 9.3 Get Post

```
GET {{base_url}}/posts/{{post_id}}
Authorization: Bearer {{access_token}}
```

### 9.4 Update Post

```
PUT {{base_url}}/posts/{{post_id}}
Authorization: Bearer {{access_token}}
Content-Type: application/json

{
  "title": "Updated Blog Post Title"
}
```

### 9.5 Publish / Unpublish

```
PATCH {{base_url}}/posts/{{post_id}}/publish
Authorization: Bearer {{access_token}}

PATCH {{base_url}}/posts/{{post_id}}/unpublish
Authorization: Bearer {{access_token}}
```

Verify published posts appear in `GET /public/posts` and unpublished ones don't.

### 9.6 Delete Post

```
DELETE {{base_url}}/posts/{{post_id}}
Authorization: Bearer {{access_token}}
```

### 9.7 Categories

```
# List
GET {{base_url}}/categories
Authorization: Bearer {{access_token}}

# Create
POST {{base_url}}/categories
Authorization: Bearer {{access_token}}
Content-Type: application/json

{
  "name": "News"
}

# Update
PUT {{base_url}}/categories/1
Authorization: Bearer {{access_token}}
Content-Type: application/json

{
  "name": "Industry News"
}

# Delete
DELETE {{base_url}}/categories/1
Authorization: Bearer {{access_token}}
```

---

## 10. Admin — Gallery

### 10.1 List Gallery Items

```
GET {{base_url}}/gallery
Authorization: Bearer {{access_token}}
```

### 10.2 Create Gallery Item

```
POST {{base_url}}/gallery
Authorization: Bearer {{access_token}}
Content-Type: application/json

{
  "title": "Office Building",
  "category_id": 1,
  "is_active": true
}
```

### 10.3 Update / Delete Gallery Items

```
PUT {{base_url}}/gallery/:id
DELETE {{base_url}}/gallery/:id
```

### 10.4 Gallery Categories

```
GET  {{base_url}}/gallery-categories
POST {{base_url}}/gallery-categories
PUT  {{base_url}}/gallery-categories/:id
DEL  {{base_url}}/gallery-categories/:id
```

---

## 11. Admin — Other Resources

All follow the same CRUD pattern with JWT auth.

### Team Members

```
GET    {{base_url}}/team-members
POST   {{base_url}}/team-members
PUT    {{base_url}}/team-members/:id
DELETE {{base_url}}/team-members/:id
PATCH  {{base_url}}/team-members/:id/status
```

### Testimonials

```
GET    {{base_url}}/testimonials
POST   {{base_url}}/testimonials
PUT    {{base_url}}/testimonials/:id
DELETE {{base_url}}/testimonials/:id
PATCH  {{base_url}}/testimonials/:id/status
```

### FAQs

```
GET    {{base_url}}/faqs
POST   {{base_url}}/faqs
PUT    {{base_url}}/faqs/:id
DELETE {{base_url}}/faqs/:id
```

### About Page

```
GET  {{base_url}}/about-page
PUT  {{base_url}}/about-page
GET  {{base_url}}/core-values
POST {{base_url}}/core-values
PUT  {{base_url}}/core-values/:id
DEL  {{base_url}}/core-values/:id
GET  {{base_url}}/partners
POST {{base_url}}/partners
PUT  {{base_url}}/partners/:id
DEL  {{base_url}}/partners/:id
PATCH {{base_url}}/partners/:id/status
```

### Contact Page Settings

```
GET {{base_url}}/contact-page
Authorization: Bearer {{access_token}}

PUT {{base_url}}/contact-page
Authorization: Bearer {{access_token}}
Content-Type: application/json

{
  "email": "contact@enderas.com",
  "phone": "+1-555-0000",
  "address": "123 Business Ave"
}
```

### Site Settings

```
GET {{base_url}}/settings
Authorization: Bearer {{access_token}}

PUT {{base_url}}/settings
Authorization: Bearer {{access_token}}
Content-Type: application/json

{
  "site_name": "Enderas Asset Management",
  "site_description": "Professional asset management"
}
```

---

## 12. Admin — Media Uploads

### 12.1 Upload File

```
POST {{base_url}}/media/upload
Authorization: Bearer {{access_token}}
Content-Type: multipart/form-data

Body (form-data):
  Key: file
  Value: (select an image file from your computer)
```

**Expected Response (201):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "filename": "original-filename.jpg",
    "url": "/uploads/...",
    "mime_type": "image/jpeg",
    "size": 123456
  }
}
```

**Postman Setup (Tests tab):**
```javascript
const response = pm.response.json();
pm.collectionVariables.set('media_id', String(response.data.id));
```

### 12.2 List Media

```
GET {{base_url}}/media
Authorization: Bearer {{access_token}}
GET {{base_url}}/media?page=1&limit=20
```

### 12.3 Delete Media

```
DELETE {{base_url}}/media/{{media_id}}
Authorization: Bearer {{access_token}}
```

---

## 13. Error Responses

All endpoints return a consistent error format:

### 400 — Validation Error
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "type": "field", "value": "", "msg": "Name is required", "path": "name", "location": "body" }
  ]
}
```

### 401 — Unauthorized
```json
{
  "success": false,
  "message": "Authentication required — no bearer token"
}
```

### 403 — Forbidden
```json
{
  "success": false,
  "message": "Forbidden: insufficient permissions"
}
```

### 404 — Not Found
```json
{
  "success": false,
  "message": "Message not found"
}
```

### 409 — Conflict
```json
{
  "success": false,
  "message": "Resource already exists",
  "errors": [
    { "field": "email", "message": "email already exists" }
  ]
}
```

### 429 — Rate Limited
```json
{
  "success": false,
  "message": "Too many login attempts, please try again later"
}
```

### 503 — Service Unavailable
```json
{
  "status": "error",
  "database": "disconnected",
  "uptime": 123.45,
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```

---

## Postman Collection Variables Quick Reference

Make sure these are set in your Postman collection after each relevant response:

| Variable | Set By | Used By |
|----------|--------|---------|
| `access_token` | Login, Refresh | All admin endpoints |
| `refresh_token` | Login, Refresh | Refresh, Logout |
| `user_id` | Create User | Get/Update/Delete User |
| `service_id` | Create Service | Get/Update/Delete/Status Service |
| `post_id` | Create Post | Get/Update/Publish/Delete Post |
| `contact_message_id` | Submit Contact Form | Get/Read/Archive/Delete Message |
| `gallery_id` | Create Gallery Item | Update/Delete Gallery |
| `media_id` | Upload Media | Delete Media |
