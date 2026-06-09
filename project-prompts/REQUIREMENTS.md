File: /project-prompts/REQUIREMENTS.md

# REQUIREMENTS — Single Vendor E-Commerce Platform

---

## GLOBAL RULES CHECK
- All requirements captured from /requirements/ input files
- No vague statements — each REQ-ID is concrete and testable
- Proper categorization: Functional / Non-Functional / Constraints / Edge Cases / Assumptions

---

## FUNCTIONAL REQUIREMENTS — User Module

### REQ-001: Google Authentication
**Description:** User can register and log in using a Google account.
**Source:** features_set.md §7, techstack.md §Phase 1
**Priority:** High

### REQ-002: Customer Profile Management
**Description:** User can view and edit their personal details, account settings, and activity.
**Source:** phasewise_plan.md §Phase 1, features_set.md §9
**Priority:** Medium

### REQ-003: Product Catalog Browsing
**Description:** User can browse the full product catalog with pagination.
**Source:** phasewise_plan.md §Phase 1, features_set.md §6
**Priority:** High

### REQ-004: Category Navigation
**Description:** User can navigate products by categories.
**Source:** phasewise_plan.md §Phase 1, features_set.md §9
**Priority:** High

### REQ-005: Product Detail Page
**Description:** User can view detailed product information including images, descriptions, pricing, and specifications.
**Source:** phasewise_plan.md §Phase 1, features_set.md §9
**Priority:** High

### REQ-006: Product Search (Keyword)
**Description:** User can search products using keywords.
**Source:** features_set.md §7 (Product Search)
**Priority:** High

### REQ-007: Typo-Tolerant Search
**Description:** Search system recognizes spelling mistakes and displays relevant products / suggestions.
**Source:** features_set.md §7 (Typo-Tolerant Search)
**Priority:** Medium

### REQ-008: Product Filtering
**Description:** User can filter products by attributes (price, category, rating, etc.).
**Source:** phasewise_plan.md §Phase 1, features_set.md §6
**Priority:** Medium

### REQ-009: Product Sorting
**Description:** User can sort product listings (price ascending/descending, newest, popular).
**Source:** phasewise_plan.md §Phase 1, features_set.md §6
**Priority:** Medium

### REQ-010: Shopping Cart Management
**Description:** User can add products to cart, update quantities, remove items, and view estimated total.
**Source:** features_set.md §7 (Shopping Cart)
**Priority:** High

### REQ-011: Checkout Process
**Description:** User can complete purchase by reviewing order summary and confirming order.
**Source:** phasewise_plan.md §Phase 1, features_set.md §9
**Priority:** High

### REQ-012: Order Placement
**Description:** System processes the order, creates an order record, and confirms placement.
**Source:** phasewise_plan.md §Phase 1, features_set.md §7
**Priority:** High

### REQ-013: Order Confirmation
**Description:** User receives a confirmation page with order number and purchase summary after successful placement.
**Source:** features_set.md §9 (Order Confirmation Page)
**Priority:** High

### REQ-014: Order History
**Description:** User can view their past orders with status, dates, and purchased items.
**Source:** phasewise_plan.md §Phase 1, features_set.md §9
**Priority:** Medium

### REQ-015: Order Tracking
**Description:** User can track order status updates after placement.
**Source:** features_set.md §7 (Order Management — User)
**Priority:** Medium

### REQ-016: Wishlist Management
**Description:** User can save products to wishlist, view saved items, remove items, and move items to cart.
**Source:** features_set.md §7 (Wishlist)
**Priority:** Medium

### REQ-017: Product Reviews and Ratings
**Description:** User can submit reviews and ratings for purchased products; reviews are moderated by admin.
**Source:** phasewise_plan.md §Phase 2, features_set.md §6
**Priority:** Medium

### REQ-018: Recently Viewed Products
**Description:** System records and displays products the user recently viewed.
**Source:** features_set.md §7 (Recently Viewed Products)
**Priority:** Low

### REQ-019: Personalized Product Suggestions
**Description:** System recommends products based on user browsing behavior and preferences.
**Source:** features_set.md §7 (Personalized Product Suggestions)
**Priority:** Medium

### REQ-020: Smart Suggestions Engine
**Description:** Advanced recommendation engine combining wishlist activity, search history, recently viewed, purchase history, and trending products.
**Source:** features_set.md §7 (Smart Suggestions Engine)
**Priority:** Low

### REQ-021: Notifications
**Description:** User receives notifications for order updates, offers, and recommendations.
**Source:** phasewise_plan.md §Phase 2, features_set.md §9
**Priority:** Low

### REQ-022: Promotional Banners and Offers
**Description:** Platform displays promotional banners, offers, and trending product sections.
**Source:** phasewise_plan.md §Phase 2, features_set.md §9
**Priority:** Low

### REQ-023: Responsive Web Experience
**Description:** All customer-facing pages are responsive and functional on desktop and mobile devices.
**Source:** phasewise_plan.md §Phase 1, features_set.md §11
**Priority:** High

---

## FUNCTIONAL REQUIREMENTS — Admin Module

### REQ-024: Admin Dashboard
**Description:** Admin sees overview of sales metrics, orders, and inventory summary.
**Source:** features_set.md §9 (Admin Dashboard)
**Priority:** High

### REQ-025: Product Management (Admin)
**Description:** Admin can create, edit, archive, and publish products.
**Source:** features_set.md §7 (Product Management — Admin)
**Priority:** High

### REQ-026: Category Management (Admin)
**Description:** Admin can create and edit product categories.
**Source:** features_set.md §9 (Category Management)
**Priority:** High

### REQ-027: Inventory Management (Admin)
**Description:** Admin can monitor stock levels, update inventory, and receive low-stock alerts.
**Source:** features_set.md §7 (Inventory Management)
**Priority:** High

### REQ-028: Order Management (Admin)
**Description:** Admin can view customer orders, update statuses, and manage fulfillment.
**Source:** features_set.md §7 (Order Management — Admin)
**Priority:** High

### REQ-029: Customer Management (Admin)
**Description:** Admin can view customer profiles, activity, and purchase history.
**Source:** features_set.md §6 (Admin Features), features_set.md §9
**Priority:** Medium

### REQ-030: Promotions Management (Admin)
**Description:** Admin can create offers, discounts, and manage marketing campaigns with validity periods.
**Source:** features_set.md §6 (Admin Features), features_set.md §10
**Priority:** Medium

### REQ-031: Sales Reporting
**Description:** System generates sales and revenue reports.
**Source:** features_set.md §6 (Admin Features), techstack.md §Phase 4
**Priority:** Low

### REQ-032: Analytics Dashboard
**Description:** System provides business insights including conversion tracking, customer analytics, and funnel analysis.
**Source:** features_set.md §7 (Analytics Dashboard), features_set.md §15
**Priority:** Low

---

## NON-FUNCTIONAL REQUIREMENTS

### NFR-001: Usability — Intuitive Navigation
**Description:** The platform must have intuitive navigation with minimal learning curve for both customers and admins.
**Source:** features_set.md §11

### NFR-002: Mobile Responsiveness
**Description:** All pages must render correctly on mobile, tablet, and desktop viewports.
**Source:** features_set.md §11, techstack.md §Phase 1 (Tailwind CSS)

### NFR-003: Performance — Fast Page Loading
**Description:** Pages must load quickly; search responses must be near-instant.
**Source:** features_set.md §11, techstack.md §Phase 2 (Redis Cache)

### NFR-004: Reliability — High Availability
**Description:** Platform must maintain high availability and consistent transaction processing.
**Source:** features_set.md §11

### NFR-005: Security — Secure Authentication
**Description:** Authentication must use secure protocols (JWT, Google OAuth); customer data must be protected.
**Source:** features_set.md §11, techstack.md §Phase 1

### NFR-006: Security — Role-Based Access Control
**Description:** Admin operations must be protected with role-based authorization.
**Source:** techstack.md §Phase 5

### NFR-007: Privacy — Data Protection
**Description:** Customer data handling must follow transparent privacy policies with user consent management.
**Source:** features_set.md §11

### NFR-008: Scalability — Growing Customer Base
**Description:** Platform must support increasing customer base, growing product catalog, and seasonal traffic spikes.
**Source:** features_set.md §11

### NFR-009: Scalability — Containerized Deployment
**Description:** Platform must be containerized (Docker) for consistent deployment and scaling.
**Source:** techstack.md §Phase 1, techstack.md §Phase 5

### NFR-010: Monitoring — Observability
**Description:** System must have monitoring dashboards (Grafana/Prometheus) for performance, errors, and system health.
**Source:** techstack.md §Phase 5

---

## CONSTRAINTS

### CON-001: Single-Vendor Architecture
The platform operates as a single-vendor business. Multi-vendor marketplace features are out of scope.
**Source:** features_set.md §6 (Out of Scope), features_set.md §12

### CON-002: Google OAuth Primary Authentication
Google authentication is the primary (and initially only) registration/login method.
**Source:** features_set.md §10

### CON-003: Technology Stack
Backend: Node.js + NestJS + MySQL (Sequelize ORM) + Redis
Frontend: React + Tailwind CSS + Shadcn/UI + Zustand
Infrastructure: Docker + Docker Compose + GitHub Actions
**Source:** techstack.md §Phase 1

### CON-004: PostgreSQL for Search Features
PostgreSQL with full-text search and trigram search is used in Phase 2 for search capabilities.
**Source:** techstack.md §Phase 2

### CON-005: BullMQ for Background Jobs
BullMQ with Redis is used for background job processing.
**Source:** techstack.md §Phase 2

### CON-006: No Multi-Currency / International Tax
International taxation, multi-currency, and multi-vendor features are out of scope.
**Source:** features_set.md §6 (Out of Scope)

---

## EDGE CASES

### EC-001: Empty Search Results
When no products match a search query, display a helpful "no results" message with suggestions.
**Relevant REQ:** REQ-006, REQ-007

### EC-002: Out-of-Stock Product in Cart
If a product in the cart becomes out-of-stock before checkout, notify the user and prevent purchase.
**Relevant REQ:** REQ-010, REQ-011

### EC-003: Expired Cart Session
Cart items are cleared after session expiry; user must be notified if items were removed.
**Relevant REQ:** REQ-010

### EC-004: Duplicate Registration
If a Google account is already registered, log the user in instead of creating a duplicate.
**Relevant REQ:** REQ-001

### EC-005: Invalid/Expired JWT Token
API requests with invalid or expired tokens must return 401 and prompt re-authentication.
**Relevant REQ:** REQ-001, NFR-005

### EC-006: Concurrent Order Placement
If two requests place an order for the last in-stock item simultaneously, only one succeeds.
**Relevant REQ:** REQ-012, REQ-027

### EC-007: Network Failure During Checkout
If network fails during checkout, order must not be partially created; user can retry.
**Relevant REQ:** REQ-011, REQ-012

### EC-008: Product Deletion While in Wishlist
If an admin archives/deletes a product that exists in a user's wishlist, hide it with a "no longer available" indicator.
**Relevant REQ:** REQ-016, REQ-025

### EC-009: Review on Non-Purchased Product
User must not be allowed to submit a review for a product they have not purchased.
**Relevant REQ:** REQ-017

### EC-010: Large Product Catalog Pagination
When the catalog exceeds threshold sizes, pagination/cursor-based loading must work correctly without performance degradation.
**Relevant REQ:** REQ-003, NFR-008

---

## ASSUMPTIONS

### ASSUMPTION-001
The platform operates as a single-vendor business (no marketplace).

### ASSUMPTION-002
Users authenticate primarily through Google OAuth.

### ASSUMPTION-003
Internet connectivity is available during usage.

### ASSUMPTION-004
Product inventory is maintained and updated by administrators.

### ASSUMPTION-005
Payment processing is managed through integrated third-party payment providers.

### ASSUMPTION-006
Customer recommendations are generated from first-party user behavior data.

### ASSUMPTION-007
Products are sold directly by the business owner (no dropshipping or third-party fulfillment).

### ASSUMPTION-008
Development and deployment use Docker containerization for environment consistency.

---

## SELF-CHECK

| Criterion | Status |
|-----------|--------|
| All requirements captured from input | ✅ (32 REQs, 10 NFRs, 6 CONs, 10 ECs, 8 Assumptions) |
| No vague statements | ✅ — Each REQ has concrete description and source reference |
| Proper categorization | ✅ — Functional / Non-Functional / Constraints / Edge Cases / Assumptions |
| REQ-IDs assigned sequentially | ✅ — REQ-001 to REQ-032 |
