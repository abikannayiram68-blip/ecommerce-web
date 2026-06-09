File: /project-prompts/SYSTEM_DESIGN.md

# SYSTEM DESIGN — Single Vendor E-Commerce Platform

---

## GLOBAL RULES CHECK
- Fully aligned with REQUIREMENTS.md
- All components covered: Architecture, Tech Stack, Database, APIs, Folder Structure

---

## 1. ARCHITECTURE

### High-Level Architecture Diagram (Text)

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                          │
│  ┌─────────────────┐  ┌──────────────────────────────┐  │
│  │  React SPA       │  │  Admin Dashboard (React)     │  │
│  │  (Storefront)    │  │  (Role: Admin)               │  │
│  └────────┬─────────┘  └──────────────┬───────────────┘  │
│           │                            │                  │
│      Zustand State Management          │                  │
└───────────┼────────────────────────────┼──────────────────┘
            │ HTTPS/API                  │ HTTPS/API
            ▼                            ▼
┌─────────────────────────────────────────────────────────┐
│                  API GATEWAY (NestJS)                    │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Guards: JWT Auth, RBAC, Rate Limiting           │   │
│  │  Interceptors: Logging, Transform, Cache         │   │
│  └──────────────────────────────────────────────────┘   │
└───────────┬────────────────────────────────────┬─────────┘
            │                                    │
            ▼                                    ▼
┌──────────────────────┐          ┌──────────────────────┐
│   USER SERVICE        │          │   PRODUCT SERVICE     │
│   - Auth (Google OAuth)│          │   - Catalog           │
│   - Profile            │          │   - Categories        │
│   - Session/JWT        │          │   - Search            │
└──────────┬───────────┘          └──────────┬───────────┘
           │                                  │
           ▼                                  ▼
┌──────────────────────┐          ┌──────────────────────┐
│   ORDER SERVICE       │          │   CART SERVICE        │
│   - Order Creation    │          │   - Cart CRUD         │
│   - Status Workflow   │          │   - Price Calc        │
│   - History           │          └──────────────────────┘
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐          ┌──────────────────────┐
│   INVENTORY SERVICE   │          │   RECOMMENDATION      │
│   - Stock Management  │          │   SERVICE              │
│   - Low Stock Alerts  │          │   - Personalization   │
└──────────────────────┘          │   - Analytics         │
                                  └──────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                 DATA LAYER                                │
│  ┌──────────────────┐  ┌──────────────────┐             │
│  │  MySQL (Primary)  │  │  PostgreSQL       │             │
│  │  - Users, Orders  │  │  (Phase 2: Search)│             │
│  │  - Products, Cart │  └──────────────────┘             │
│  └──────────────────┘                                    │
│  ┌──────────────────┐  ┌──────────────────┐             │
│  │  Redis (Cache)    │  │  Redis (BullMQ)  │             │
│  │  - Sessions       │  │  - Job Queue     │             │
│  │  - Product Cache  │  └──────────────────┘             │
│  └──────────────────┘                                    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│              INFRASTRUCTURE                               │
│  Docker → Docker Compose → GitHub Actions                │
│  Monitoring: Grafana + Prometheus                        │
└─────────────────────────────────────────────────────────┘
```

### Architectural Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| API Pattern | Modular Monolith (NestJS) | Single vendor; microservices overhead unjustified; NestJS modules provide clean separation |
| Frontend State | Zustand | Lightweight, no boilerplate, scales well for e-commerce state |
| ORM | Sequelize | TypeScript-first, mature migration support, MySQL-native |
| Auth | JWT + Google OAuth | Stateless, scalable, industry standard |
| Search (Phase 2) | PostgreSQL Full-Text + Trigram | Avoids additional Elasticsearch infra cost |

---

## 2. TECH STACK

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Backend Runtime | Node.js | 20 LTS | JavaScript runtime |
| Backend Framework | NestJS | 10.x | Modular API framework |
| Primary Database | MySQL | 8.0 | Transactional data |
| ORM | Sequelize | 6.x | Database access & migrations |
| Search Database | PostgreSQL | 15 (Phase 2) | Full-text & trigram search |
| Cache | Redis | 7.x | Session store, cache, queue |
| Queue | BullMQ | 5.x | Background job processing |
| Frontend | React | 18.x | UI library |
| Styling | Tailwind CSS | 3.x | Utility-first CSS |
| UI Components | Shadcn/UI | latest | Accessible component library |
| State Management | Zustand | 4.x | Client state management |
| Auth | Google OAuth 2.0 + JWT | — | Authentication |
| Containerization | Docker + Docker Compose | latest | Deployment consistency |
| CI/CD | GitHub Actions | — | Automated testing & deploy |
| Monitoring | Grafana + Prometheus | latest (Phase 5) | Observability |

---

## 3. DATABASE SCHEMA

### Entity Relationship Overview

```
users ──1:N──> orders
users ──1:N──> reviews
users ──1:N──> wishlist_items
users ──1:N──> cart_items
users ──1:N──> recently_viewed
users ──1:N──> notifications

categories ──1:N──> products
products ────1:N──> order_items
products ────1:N──> cart_items
products ────1:N──> wishlist_items
products ────1:N──> reviews
products ────1:N──> recently_viewed
products ────1:N──> product_images

orders ────1:N──> order_items
orders ────1:N──> order_status_history
```

### Tables

**users**
| Column | Type | Constraints |
|--------|------|-------------|
| id | INT | PK, AUTO_INCREMENT |
| google_id | VARCHAR(255) | UNIQUE, NULLABLE |
| email | VARCHAR(255) | UNIQUE, NOT NULL |
| password_hash | VARCHAR(255) | NULLABLE |
| name | VARCHAR(255) | NOT NULL |
| avatar | VARCHAR(500) | NULLABLE |
| phone | VARCHAR(20) | NULLABLE |
| role | ENUM('customer','admin','vendor') | DEFAULT 'customer' |
| is_active | BOOLEAN | DEFAULT true |
| created_at | TIMESTAMP | DEFAULT NOW() |
| updated_at | TIMESTAMP | ON UPDATE NOW() |

**categories**
| Column | Type | Constraints |
|--------|------|-------------|
| id | INT | PK, AUTO_INCREMENT |
| name | VARCHAR(255) | UNIQUE, NOT NULL |
| slug | VARCHAR(255) | UNIQUE, NOT NULL |
| description | TEXT | NULLABLE |
| image | VARCHAR(500) | NULLABLE |
| is_active | BOOLEAN | DEFAULT true |
| created_at | TIMESTAMP | DEFAULT NOW() |
| updated_at | TIMESTAMP | ON UPDATE NOW() |

**products**
| Column | Type | Constraints |
|--------|------|-------------|
| id | INT | PK, AUTO_INCREMENT |
| name | VARCHAR(255) | NOT NULL |
| slug | VARCHAR(255) | UNIQUE, NOT NULL |
| description | TEXT | NULLABLE |
| price | DECIMAL(10,2) | NOT NULL |
| compare_price | DECIMAL(10,2) | NULLABLE |
| stock | INT | NOT NULL, DEFAULT 0 |
| sku | VARCHAR(100) | UNIQUE |
| category_id | INT | FK → categories.id |
| is_active | BOOLEAN | DEFAULT true |
| is_featured | BOOLEAN | DEFAULT false |
| average_rating | DECIMAL(2,1) | DEFAULT 0.0 |
| review_count | INT | DEFAULT 0 |
| created_at | TIMESTAMP | DEFAULT NOW() |
| updated_at | TIMESTAMP | ON UPDATE NOW() |

**product_images**
| Column | Type | Constraints |
|--------|------|-------------|
| id | INT | PK, AUTO_INCREMENT |
| product_id | INT | FK → products.id |
| url | VARCHAR(500) | NOT NULL |
| alt_text | VARCHAR(255) | NULLABLE |
| is_primary | BOOLEAN | DEFAULT false |
| sort_order | INT | DEFAULT 0 |

**cart_items**
| Column | Type | Constraints |
|--------|------|-------------|
| id | INT | PK, AUTO_INCREMENT |
| user_id | INT | FK → users.id |
| product_id | INT | FK → products.id |
| quantity | INT | NOT NULL, > 0 |
| created_at | TIMESTAMP | DEFAULT NOW() |
| UNIQUE | (user_id, product_id) | |

**orders**
| Column | Type | Constraints |
|--------|------|-------------|
| id | INT | PK, AUTO_INCREMENT |
| order_number | VARCHAR(50) | UNIQUE, NOT NULL |
| user_id | INT | FK → users.id |
| status | ENUM('pending','confirmed','processing','shipped','delivered','cancelled') | DEFAULT 'pending' |
| subtotal | DECIMAL(10,2) | NOT NULL |
| discount | DECIMAL(10,2) | DEFAULT 0.00 |
| total | DECIMAL(10,2) | NOT NULL |
| shipping_address | JSON | NOT NULL |
| payment_method | VARCHAR(50) | NULLABLE |
| payment_status | ENUM('pending','paid','failed','refunded') | DEFAULT 'pending' |
| tracking_number | VARCHAR(100) | NULLABLE |
| notes | TEXT | NULLABLE |
| created_at | TIMESTAMP | DEFAULT NOW() |
| updated_at | TIMESTAMP | ON UPDATE NOW() |

**order_items**
| Column | Type | Constraints |
|--------|------|-------------|
| id | INT | PK, AUTO_INCREMENT |
| order_id | INT | FK → orders.id |
| product_id | INT | FK → products.id |
| product_name | VARCHAR(255) | NOT NULL |
| product_price | DECIMAL(10,2) | NOT NULL |
| quantity | INT | NOT NULL |
| subtotal | DECIMAL(10,2) | NOT NULL |

**order_status_history**
| Column | Type | Constraints |
|--------|------|-------------|
| id | INT | PK, AUTO_INCREMENT |
| order_id | INT | FK → orders.id |
| from_status | VARCHAR(50) | NULLABLE |
| to_status | VARCHAR(50) | NOT NULL |
| changed_by | INT | FK → users.id |
| created_at | TIMESTAMP | DEFAULT NOW() |

**wishlist_items**
| Column | Type | Constraints |
|--------|------|-------------|
| id | INT | PK, AUTO_INCREMENT |
| user_id | INT | FK → users.id |
| product_id | INT | FK → products.id |
| created_at | TIMESTAMP | DEFAULT NOW() |
| UNIQUE | (user_id, product_id) | |

**reviews**
| Column | Type | Constraints |
|--------|------|-------------|
| id | INT | PK, AUTO_INCREMENT |
| user_id | INT | FK → users.id |
| product_id | INT | FK → products.id |
| rating | TINYINT | NOT NULL, 1-5 |
| comment | TEXT | NULLABLE |
| status | ENUM('pending','approved','rejected') | DEFAULT 'pending' |
| created_at | TIMESTAMP | DEFAULT NOW() |
| UNIQUE | (user_id, product_id) | |

**recently_viewed**
| Column | Type | Constraints |
|--------|------|-------------|
| id | INT | PK, AUTO_INCREMENT |
| user_id | INT | FK → users.id |
| product_id | INT | FK → products.id |
| viewed_at | TIMESTAMP | DEFAULT NOW() |

**notifications**
| Column | Type | Constraints |
|--------|------|-------------|
| id | INT | PK, AUTO_INCREMENT |
| user_id | INT | FK → users.id |
| type | ENUM('order_update','promotion','recommendation','system') | NOT NULL |
| title | VARCHAR(255) | NOT NULL |
| message | TEXT | NOT NULL |
| is_read | BOOLEAN | DEFAULT false |
| created_at | TIMESTAMP | DEFAULT NOW() |

**promotions**
| Column | Type | Constraints |
|--------|------|-------------|
| id | INT | PK, AUTO_INCREMENT |
| name | VARCHAR(255) | NOT NULL |
| code | VARCHAR(50) | UNIQUE |
| type | ENUM('percentage','fixed') | NOT NULL |
| value | DECIMAL(10,2) | NOT NULL |
| min_order_amount | DECIMAL(10,2) | NULLABLE |
| usage_limit | INT | NULLABLE |
| used_count | INT | DEFAULT 0 |
| start_date | TIMESTAMP | NOT NULL |
| end_date | TIMESTAMP | NOT NULL |
| is_active | BOOLEAN | DEFAULT true |
| created_at | TIMESTAMP | DEFAULT NOW() |

**product_specifications**
| Column | Type | Constraints |
|--------|------|-------------|
| id | INT | PK, AUTO_INCREMENT |
| product_id | INT | FK → products.id |
| key | VARCHAR(100) | NOT NULL |
| value | VARCHAR(500) | NOT NULL |

---

## 4. API ENDPOINTS

### Authentication Module
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | No | Email/Password Registration |
| POST | /api/auth/login | No | Email/Password Login |
| POST | /api/auth/google | No | Google OAuth login/register |
| POST | /api/auth/refresh | Yes | Refresh JWT token |
| POST | /api/auth/logout | Yes | Invalidate session |

### User Module
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/users/profile | Yes | Get current user profile |
| PUT | /api/users/profile | Yes | Update profile |
| GET | /api/users/orders | Yes | Get user order history |
| GET | /api/users/notifications | Yes | Get user notifications |
| PUT | /api/users/notifications/:id/read | Yes | Mark notification read |

### Product Module
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/products | No | List products (paginated, filterable, sortable) |
| GET | /api/products/:slug | No | Get product detail |
| GET | /api/products/search | No | Search products |
| GET | /api/categories | No | List categories |
| GET | /api/categories/:slug | No | Get category with products |

### Cart Module
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/cart | Yes | Get current user cart |
| POST | /api/cart/items | Yes | Add item to cart |
| PUT | /api/cart/items/:id | Yes | Update item quantity |
| DELETE | /api/cart/items/:id | Yes | Remove item from cart |
| DELETE | /api/cart | Yes | Clear cart |

### Order Module
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/orders | Yes | Place order |
| GET | /api/orders/:id | Yes | Get order detail |
| GET | /api/orders/:id/confirmation | Yes | Get order confirmation |
| GET | /api/orders/:id/tracking | Yes | Get order tracking |

### Wishlist Module
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/wishlist | Yes | Get wishlist |
| POST | /api/wishlist/items | Yes | Add to wishlist |
| DELETE | /api/wishlist/items/:productId | Yes | Remove from wishlist |
| POST | /api/wishlist/items/:productId/move-to-cart | Yes | Move to cart |

### Review Module
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/products/:productId/reviews | No | Get product reviews |
| POST | /api/products/:productId/reviews | Yes | Submit review |
| PUT | /api/reviews/:id | Yes (Admin) | Moderate review |

### Recommendation Module
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/recommendations | Yes | Get personalized suggestions |
| GET | /api/products/:id/related | No | Get related/similar products |
| GET | /api/products/trending | No | Get trending products |
| GET | /api/products/recently-viewed | Yes | Get recently viewed |

### Admin Module
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/admin/dashboard | Admin | Get dashboard summary |
| POST | /api/admin/products | Admin | Create product |
| PUT | /api/admin/products/:id | Admin | Update product |
| DELETE | /api/admin/products/:id | Admin | Archive product |
| POST | /api/admin/categories | Admin | Create category |
| PUT | /api/admin/categories/:id | Admin | Update category |
| DELETE | /api/admin/categories/:id | Admin | Delete category |
| PUT | /api/admin/products/:id/inventory | Admin | Update stock |
| GET | /api/admin/products/low-stock | Admin | Get low stock alerts |
| GET | /api/admin/orders | Admin | List all orders |
| PUT | /api/admin/orders/:id/status | Admin | Update order status |
| GET | /api/admin/customers | Admin | List customers |
| GET | /api/admin/customers/:id | Admin | Get customer detail |
| POST | /api/admin/promotions | Admin | Create promotion |
| PUT | /api/admin/promotions/:id | Admin | Update promotion |
| DELETE | /api/admin/promotions/:id | Admin | Delete promotion |
| GET | /api/admin/reports/sales | Admin | Sales report |
| GET | /api/admin/analytics | Admin | Analytics data |

---

## 5. FOLDER STRUCTURE

```
ecommerce-platform/
├── docker-compose.yml
├── Dockerfile
├── .env.example
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── grafana/
├── nginx/
├── prometheus/
├── requirements/
├── scripts/
│
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── nest-cli.json
│   │
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   │
│   │   ├── common/
│   │   │   ├── guards/
│   │   │   │   ├── jwt-auth.guard.ts
│   │   │   │   ├── roles.guard.ts
│   │   │   │   └── throttle.guard.ts
│   │   │   ├── decorators/
│   │   │   │   ├── current-user.decorator.ts
│   │   │   │   ├── roles.decorator.ts
│   │   │   │   └── public.decorator.ts
│   │   │   ├── interceptors/
│   │   │   │   ├── transform.interceptor.ts
│   │   │   │   └── logging.interceptor.ts
│   │   │   ├── filters/
│   │   │   │   └── http-exception.filter.ts
│   │   │   ├── dto/
│   │   │   │   └── pagination.dto.ts
│   │   │   └── interfaces/
│   │   │       ├── jwt-payload.interface.ts
│   │   │       └── user-request.interface.ts
│   │   │
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── auth.module.ts
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── strategies/
│   │   │   │   │   ├── google.strategy.ts
│   │   │   │   │   ├── jwt.strategy.ts
│   │   │   │   │   └── local.strategy.ts
│   │   │   │   └── dto/
│   │   │   │       ├── google-login.dto.ts
│   │   │   │       ├── register.dto.ts
│   │   │   │       └── login.dto.ts
│   │   │   │
│   │   │   ├── users/
│   │   │   │   ├── users.module.ts
│   │   │   │   ├── users.controller.ts
│   │   │   │   ├── users.service.ts
│   │   │   │   ├── entities/
│   │   │   │   │   └── user.entity.ts
│   │   │   │   └── dto/
│   │   │   │       ├── create-user.dto.ts
│   │   │   │       └── update-profile.dto.ts
│   │   │   │
│   │   │   ├── products/
│   │   │   │   ├── products.module.ts
│   │   │   │   ├── products.controller.ts
│   │   │   │   ├── products.service.ts
│   │   │   │   ├── entities/
│   │   │   │   │   ├── product.entity.ts
│   │   │   │   │   ├── product-image.entity.ts
│   │   │   │   │   └── product-specification.entity.ts
│   │   │   │   └── dto/
│   │   │   │       ├── create-product.dto.ts
│   │   │   │       ├── update-product.dto.ts
│   │   │   │       └── search-product.dto.ts
│   │   │   │
│   │   │   ├── categories/
│   │   │   │   ├── categories.module.ts
│   │   │   │   ├── categories.controller.ts
│   │   │   │   ├── categories.service.ts
│   │   │   │   ├── entities/
│   │   │   │   │   └── category.entity.ts
│   │   │   │   └── dto/
│   │   │   │       ├── create-category.dto.ts
│   │   │   │       └── update-category.dto.ts
│   │   │   │
│   │   │   ├── cart/
│   │   │   │   ├── cart.module.ts
│   │   │   │   ├── cart.controller.ts
│   │   │   │   ├── cart.service.ts
│   │   │   │   ├── entities/
│   │   │   │   │   └── cart-item.entity.ts
│   │   │   │   └── dto/
│   │   │   │       ├── add-cart-item.dto.ts
│   │   │   │       └── update-cart-item.dto.ts
│   │   │   │
│   │   │   ├── orders/
│   │   │   │   ├── orders.module.ts
│   │   │   │   ├── orders.controller.ts
│   │   │   │   ├── orders.service.ts
│   │   │   │   ├── entities/
│   │   │   │   │   ├── order.entity.ts
│   │   │   │   │   ├── order-item.entity.ts
│   │   │   │   │   └── order-status-history.entity.ts
│   │   │   │   └── dto/
│   │   │   │       ├── create-order.dto.ts
│   │   │   │       └── update-order-status.dto.ts
│   │   │   │
│   │   │   ├── wishlist/
│   │   │   │   ├── wishlist.module.ts
│   │   │   │   ├── wishlist.controller.ts
│   │   │   │   ├── wishlist.service.ts
│   │   │   │   ├── entities/
│   │   │   │   │   └── wishlist-item.entity.ts
│   │   │   │   └── dto/
│   │   │   │       └── add-wishlist-item.dto.ts
│   │   │   │
│   │   │   ├── reviews/
│   │   │   │   ├── reviews.module.ts
│   │   │   │   ├── reviews.controller.ts
│   │   │   │   ├── reviews.service.ts
│   │   │   │   ├── entities/
│   │   │   │   │   └── review.entity.ts
│   │   │   │   └── dto/
│   │   │   │       ├── create-review.dto.ts
│   │   │   │       └── moderate-review.dto.ts
│   │   │   │
│   │   │   ├── notifications/
│   │   │   │   ├── notifications.module.ts
│   │   │   │   ├── notifications.controller.ts
│   │   │   │   ├── notifications.service.ts
│   │   │   │   └── entities/
│   │   │   │       └── notification.entity.ts
│   │   │   │
│   │   │   ├── promotions/
│   │   │   │   ├── promotions.module.ts
│   │   │   │   ├── promotions.controller.ts
│   │   │   │   ├── promotions.service.ts
│   │   │   │   ├── entities/
│   │   │   │   │   └── promotion.entity.ts
│   │   │   │   └── dto/
│   │   │   │       ├── create-promotion.dto.ts
│   │   │   │       └── update-promotion.dto.ts
│   │   │   │
│   │   │   ├── recommendations/
│   │   │   │   ├── recommendations.module.ts
│   │   │   │   ├── recommendations.controller.ts
│   │   │   │   └── recommendations.service.ts
│   │   │   │
│   │   │   ├── admin/
│   │   │   │   ├── admin.module.ts
│   │   │   │   ├── admin.controller.ts
│   │   │   │   ├── admin.service.ts
│   │   │   │   └── dto/
│   │   │   │       └── dashboard.dto.ts
│   │   │   │
│   │   │   └── search/
│   │   │       ├── search.module.ts
│   │   │       ├── search.controller.ts
│   │   │       └── search.service.ts
│   │   │
│   │   ├── database/
│   │   │   ├── database.module.ts
│   │   │   ├── database.config.ts
│   │   │   └── migrations/
│   │   │
│   │   └── redis/
│   │       ├── redis.module.ts
│   │       ├── redis.service.ts
│   │       └── bullmq.config.ts
│   │
│   ├── test/
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   │
│   └── uploads/
│
├── frontend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── components.json
│   ├── vite.config.ts
│   │
│   ├── public/
│   │   └── images/
│   │
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── index.css
│   │   │
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   ├── auth.ts
│   │   │   ├── products.ts
│   │   │   ├── cart.ts
│   │   │   ├── orders.ts
│   │   │   └── admin.ts
│   │   │
│   │   ├── stores/
│   │   │   ├── auth-store.ts
│   │   │   ├── cart-store.ts
│   │   │   └── ui-store.ts
│   │   │
│   │   ├── hooks/
│   │   │   ├── use-auth.ts
│   │   │   ├── use-cart.ts
│   │   │   └── use-products.ts
│   │   │
│   │   ├── components/
│   │   │   ├── ui/          (Shadcn/UI components)
│   │   │   ├── layout/
│   │   │   │   ├── header.tsx
│   │   │   │   ├── footer.tsx
│   │   │   │   ├── navbar.tsx
│   │   │   │   └── sidebar.tsx
│   │   │   ├── product/
│   │   │   │   ├── product-card.tsx
│   │   │   │   ├── product-grid.tsx
│   │   │   │   ├── product-detail.tsx
│   │   │   │   ├── product-search.tsx
│   │   │   │   └── product-filters.tsx
│   │   │   ├── cart/
│   │   │   │   ├── cart-item.tsx
│   │   │   │   └── cart-summary.tsx
│   │   │   ├── order/
│   │   │   │   ├── order-card.tsx
│   │   │   │   └── order-tracking.tsx
│   │   │   ├── auth/
│   │   │   │   ├── google-login-button.tsx
│   │   │   │   ├── login-form.tsx
│   │   │   │   └── register-form.tsx
│   │   │   └── admin/
│   │   │       ├── admin-sidebar.tsx
│   │   │       ├── stats-card.tsx
│   │   │       ├── product-form.tsx
│   │   │       └── order-table.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── landing.tsx
│   │   │   ├── home.tsx
│   │   │   ├── product-listing.tsx
│   │   │   ├── product-detail.tsx
│   │   │   ├── search-results.tsx
│   │   │   ├── cart.tsx
│   │   │   ├── checkout.tsx
│   │   │   ├── order-confirmation.tsx
│   │   │   ├── order-history.tsx
│   │   │   ├── wishlist.tsx
│   │   │   ├── profile.tsx
│   │   │   ├── notifications.tsx
│   │   │   └── admin/
│   │   │       ├── dashboard.tsx
│   │   │       ├── products.tsx
│   │   │       ├── categories.tsx
│   │   │       ├── inventory.tsx
│   │   │       ├── orders.tsx
│   │   │       ├── customers.tsx
│   │   │       ├── promotions.tsx
│   │   │       ├── reports.tsx
│   │   │       └── analytics.tsx
│   │   │
│   │   ├── lib/
│   │   │   ├── utils.ts
│   │   │   └── constants.ts
│   │   │
│   │   └── types/
│   │       ├── product.ts
│   │       ├── user.ts
│   │       ├── order.ts
│   │       └── api.ts
│   │
│   └── test/
│       ├── unit/
│       └── e2e/
│
└── project-prompts/
    ├── REQUIREMENTS.md
    ├── SYSTEM_DESIGN.md
    ├── TESTS/
    │   ├── REQUIREMENT_TEST_MAP.md
    │   ├── UNIT_TESTS.md
    │   ├── INTEGRATION_TESTS.md
    │   └── E2E_TESTS.md
    ├── MEMORY/
    └── PHASES/
```

---

## SELF-CHECK

| Criterion | Status |
|-----------|--------|
| Architecture defined | ✅ Modular monolith with service separation |
| Tech stack documented | ✅ All technologies with versions |
| Database schema complete | ✅ 15 tables covering all entities |
| API endpoints listed | ✅ 50+ endpoints with auth requirements |
| Folder structure detailed | ✅ Full backend + frontend structure |
| Aligned with REQUIREMENTS.md | ✅ All 32 REQs addressable via API/schema |
