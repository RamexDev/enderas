# ENDERAS ASSET MANAGEMENT WEBSITE

# Admin Dashboard Software Requirements Specification (SRS)

**Project:** Enderas Asset Management Website
**Admin Version:** 1.0
**Document Status:** Approved for Development

---

# 1. Introduction

## Purpose

The Admin Dashboard is a secure content management system used by Enderas staff to manage website content without requiring technical knowledge.

The dashboard allows administrators to update content displayed on the public website while preserving the website structure and design.

The system is designed to be simple enough for non-technical staff to operate after minimal training.

---

# 2. Objectives

The Admin Dashboard must:

* Allow website content updates without developer assistance
* Provide simple content management tools
* Support image uploads and media management
* Manage blog content
* Manage services and projects
* Manage customer-facing information
* Support SEO content management
* Maintain a consistent website structure

---

# 3. Design Philosophy

The website layout and structure are controlled by developers.

Administrators manage content only.

Administrators should not be able to:

* Rearrange homepage sections
* Modify website layouts
* Alter navigation structure
* Change page structure

This prevents accidental website misconfiguration and ensures a consistent user experience.

---

# 4. User Roles

## Super Admin

Full system access.

Can:

* Manage users
* Manage website content
* Manage settings
* Manage media
* Manage permissions

---

## Editor

Content management access.

Can:

* Manage blog posts
* Manage services
* Manage gallery items
* Manage testimonials
* Manage partners
* Manage team members
* Manage FAQ items

Cannot:

* Manage users
* Manage system settings

---

# 5. Dashboard Overview

The dashboard homepage should display:

* Total Blog Posts
* Total Services
* Total Gallery Items
* Total Team Members
* Total Testimonials
* Total Contact Messages

Recent content activity should also be displayed.

---

# 6. Homepage Content Management

## Purpose

Manage homepage content displayed on the public website.

The homepage structure remains fixed.

Administrators can only edit content within predefined sections.

---

## Homepage Sections

### Company Introduction

Editable Fields:

* Title
* Description
* CTA Text
* CTA Link

---

### Auction & Valuation Highlight

Editable Fields:

* Title
* Description
* CTA Text
* CTA Link

---

### Statistics

Administrators can:

* Create Statistic
* Edit Statistic
* Delete Statistic

Fields:

* Label
* Value
* Icon

Examples:

* Years of Experience
* Assets Managed
* Clients Served
* Valuations Completed

---

### Contact CTA

Editable Fields:

* Title
* Description
* Button Text
* Button Link

---

# 7. Hero Slider Management

Administrators must be able to:

* Create Slide
* Edit Slide
* Delete Slide
* Activate/Deactivate Slide

---

## Slide Fields

* Title
* Subtitle
* Background Image
* Button Text
* Button Link

The Hero Slider section itself cannot be removed from the homepage.

---

# 8. Blog Management

## Features

Administrators must be able to:

* Create Blog Post
* Edit Blog Post
* Delete Blog Post
* Publish Blog Post
* Unpublish Blog Post

---

## Blog Fields

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

## Categories

Administrators can:

* Create Category
* Edit Category
* Delete Category

---

# 9. Services Management

Administrators must be able to:

* Create Service
* Edit Service
* Delete Service

---

## Service Fields

* Title
* Short Description
* Full Description
* Service Image
* CTA Text
* CTA Link

---

# 10. Gallery Management

## Purpose

Manage property and project images displayed on the website.

---

## Features

Administrators can:

* Upload Images
* Edit Image Information
* Delete Images

---

## Gallery Fields

* Title
* Description
* Image
* Category

---

## Gallery Categories

Administrators can:

* Create Category
* Edit Category
* Delete Category

---

# 11. Team Management

## Purpose

Manage company team members displayed on the website.

---

## Features

Administrators can:

* Create Team Member
* Edit Team Member
* Delete Team Member
* Enable/Disable Team Member

---

## Team Member Fields

* Full Name
* Email adress
* Position
* Biography
* Profile Image

---

## Homepage Visibility

The Team section may be:

* Enabled
* Disabled

When disabled, the Team section is hidden from the website.

---

# 12. Testimonials Management

## Purpose

Manage customer testimonials.

---

## Features

Administrators can:

* Create Testimonial
* Edit Testimonial
* Delete Testimonial
* Enable/Disable Testimonial

---

## Testimonial Fields

* Client Name
* Company
* Testimonial Content
* Client Image

---

## Homepage Visibility

The Testimonials section may be:

* Enabled
* Disabled

When disabled, the Testimonials section is hidden from the website.

---

# 13. FAQ Management

## Purpose

Provide answers to common customer questions.

---

## Features

Administrators can:

* Create FAQ
* Edit FAQ
* Delete FAQ
* Enable/Disable FAQ

---

## FAQ Fields

* Question
* Answer

---

## Homepage Visibility

The FAQ section may be:

* Enabled
* Disabled

When disabled, the FAQ section is hidden from the website.

---

# 15. About Page Management

Administrators must be able to edit:

* Company History
* Mission
* Vision
* Core Values
* Partners

---

## 1. Core Values

Administrators can:

* Create Value
* Edit Value
* Delete Value

Fields:

* Title
* Description

---

# 2. Partners Management

## Purpose

Manage trusted partners and client logos.

---

## Features

Administrators can:

* Create Partner
* Edit Partner
* Delete Partner
* Enable/Disable Partner

---

## Partner Fields

* Partner Name
* Logo
* Website URL


# 16. Contact Page Management

Administrators must be be able to manage:

* Address
* Phone Number
* Email Address
* Google Maps Embed URL

---

# 17. Contact Message Management

Administrators can:

* View Messages
* Mark Messages as Read
* Delete Messages

---

## Message Fields

* Name
* Email
* Phone
* Subject
* Message
* Date Submitted

---

# 18. Media Library

## Purpose

Centralized media management.

---

## Features

Administrators can:

* Upload Images
* View Images
* Search Images
* Delete Images

Images may be reused throughout the website.

---

## Supported Formats

* JPG
* JPEG
* PNG
* WEBP

---

# 19. Site Settings Management

Administrators must be able to manage:

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

# 20. SEO Management

Administrators must be able to manage SEO information for:

* Homepage
* About Page
* Services
* Blog Posts

---

## SEO Fields

* Meta Title
* Meta Description

---

# 21. Security Requirements

The Admin Dashboard must implement:

* JWT Authentication
* Role-Based Authorization
* Protected Routes
* Password Hashing
* Session Expiration

---

# 22. Audit Information

The system should store:

* Created By
* Updated By
* Created Date
* Updated Date

for major content records.

---

# 23. Future Enhancements

The architecture should support future modules including:

* Newsletter Management
* Career Opportunities
* Event Management
* Downloadable Resources
* Multi-Language Support
* Activity Logs

---

# 24. Acceptance Criteria

The Admin Dashboard is considered complete when:

* Homepage content can be managed
* Hero slides can be managed
* Blog CRUD is functional
* Service CRUD is functional
* Gallery CRUD is functional
* Team CRUD is functional
* Testimonial CRUD is functional
* Partner CRUD is functional
* FAQ CRUD is functional
* Contact messages can be managed
* Media uploads function correctly
* SEO information can be managed
* Site settings can be managed
* Team section can be enabled or disabled
* Testimonial section can be enabled or disabled
* Partner section can be enabled or disabled
* FAQ section can be enabled or disabled
* Website structure remains protected from accidental modification
* Content updates appear on the website without code changes
* Role permissions function correctly
* All pages are responsive
* Production deployment is successful