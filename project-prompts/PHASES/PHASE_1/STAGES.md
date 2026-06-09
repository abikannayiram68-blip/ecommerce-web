File: /project-prompts/PHASES/PHASE_1/STAGES.md

# PHASE 1 — Stages

## Stage 1: Setup
**REQ-IDs:** N/A (infrastructure)
**TEST-IDs:** IT-NFR-009

| Step | Action |
|------|--------|
| 1 | Initialize NestJS backend project |
| 2 | Initialize React + Vite frontend project |
| 3 | Create docker-compose.yml (MySQL 8.0, Redis 7, API) |
| 4 | Create Dockerfile (multi-stage backend) |
| 5 | Configure .env.example and environment variables |
| 6 | Set up GitHub Actions CI workflow |

**TDD:** Write IT-NFR-009 → Run (fail) → Implement docker-compose → Run (pass) → Refactor

---

## Stage 2: Architecture
**REQ-IDs:** REQ-001 to REQ-015, REQ-023 to REQ-029
**TEST-IDs:** IT-NFR-004

| Step | Action |
|------|--------|
| 1 | Create app.module.ts with all Phase 1 modules |
| 2 | Configure global pipes, filters, interceptors |
| 3 | Set up database.module.ts (Sequelize) |
| 4 | Configure redis.module.ts |
| 5 | Create common/ (guards, decorators, dto, interfaces) |
| 6 | Create health check endpoint |

**TDD:** Write IT-NFR-004 → Run (fail) → Implement modules → Run (pass) → Refactor

---

## Stage 3: Database
**REQ-IDs:** REQ-001, REQ-003, REQ-004, REQ-010, REQ-012, REQ-014
**TEST-IDs:** IT-003-01, IT-004-01, IT-010-01, IT-012-01, IT-027-01

| Step | Action |
|------|--------|
| 1 | Create models: User, Product, Category, ProductImage |
| 2 | Create models: CartItem, Order, OrderItem, OrderStatusHistory |
| 3 | Define model associations and indexes |
| 4 | Create database migrations |
| 5 | Create seed data script |

**TDD:** Write UT-003-01 → Run (fail) → Implement models → Run (pass) → Refactor

---

## Stage 4: Backend
**REQ-IDs:** REQ-001 to REQ-006, REQ-008 to REQ-015, REQ-024 to REQ-029
**TEST-IDs:** UT-001-01 to UT-001-03, UT-002-01, UT-002-02, UT-003-01 to UT-003-03, UT-004-01, UT-004-02, UT-005-01, UT-005-02, UT-006-01 to UT-006-03, UT-008-01, UT-008-02, UT-009-01, UT-009-02, UT-010-01 to UT-010-03, UT-011-01, UT-011-02, UT-012-01 to UT-012-03, UT-013-01, UT-013-02, UT-014-01, UT-014-02, UT-015-01, UT-015-02, UT-024-01, UT-024-02, UT-025-01 to UT-025-03, UT-026-01, UT-026-02, UT-027-01 to UT-027-03, UT-028-01, UT-028-02, UT-029-01, UT-029-02

| Step | Action |
|------|--------|
| 1 | Auth module (Google OAuth + JWT strategy) |
| 2 | Users module (profile CRUD) |
| 3 | Categories module (list, get by slug) |
| 4 | Products module (catalog, detail, search, filter, sort) |
| 5 | Cart module (add, update, remove, clear) |
| 6 | Orders module (create, confirm, history, track) |
| 7 | Admin module (dashboard, products, categories, inventory, orders, customers) |

**TDD:** For each module: Write UT → Run (fail) → Implement → Run (pass) → Refactor

---

## Stage 5: Frontend
**REQ-IDs:** REQ-001, REQ-003 to REQ-006, REQ-008 to REQ-014, REQ-023 to REQ-025
**TEST-IDs:** E2E-001-01, E2E-011-01, E2E-023-01

| Step | Action |
|------|--------|
| 1 | Landing page, Login page (Google Sign-In) |
| 2 | Home dashboard, Product listing page |
| 3 | Product detail page, Shopping cart page |
| 4 | Checkout page, Order confirmation page |
| 5 | Order history, Customer profile |
| 6 | Admin dashboard, Admin product/category management |
| 7 | Admin inventory, orders, customer list |

**TDD:** Write E2E-001-01 → Run (fail) → Implement pages → Run (pass) → Refactor

---

## Stage 6: State
**REQ-IDs:** REQ-010
**TEST-IDs:** IT-010-01

| Step | Action |
|------|--------|
| 1 | Create auth-store (user, token, login/logout) |
| 2 | Create cart-store (items, add, update, remove, clear, total) |
| 3 | Create ui-store (sidebar, modals, loading) |
| 4 | Add Zustand persist middleware for cart |

**TDD:** Write store unit test → Run (fail) → Implement stores → Run (pass) → Refactor

---

## Stage 7: Auth
**REQ-IDs:** REQ-001
**TEST-IDs:** UT-001-01 to UT-001-03, IT-001-01, E2E-001-01, E2E-001-02, UT-NFR-005, UT-NFR-006

| Step | Action |
|------|--------|
| 1 | Implement GoogleStrategy (passport) |
| 2 | Implement JwtStrategy |
| 3 | Create AuthGuard, RolesGuard |
| 4 | Create CurrentUser, Public decorators |
| 5 | Implement Google login button component |
| 6 | Set up protected route wrapper |

**TDD:** Write UT-001-01 → Run (fail) → Implement auth → Run (pass) → Refactor

---

## Stage 8: Integration
**REQ-IDs:** All Phase 1
**TEST-IDs:** IT-001-01 to IT-029-01, E2E-001-01, E2E-011-01

| Step | Action |
|------|--------|
| 1 | Create API client (axios instance + interceptors) |
| 2 | Wire auth API to auth-store |
| 3 | Wire products, cart, orders APIs |
| 4 | Wire admin APIs |
| 5 | Implement error handling and loading states |
| 6 | Test full purchase flow end-to-end |

**TDD:** Write E2E-011-01 → Run (fail) → Wire integrations → Run (pass) → Refactor

---

## Stage 9: Testing
**TEST-IDs:** All Phase 1 UT, IT, E2E

| Step | Action |
|------|--------|
| 1 | Run all unit tests → fix failures |
| 2 | Run all integration tests → fix failures |
| 3 | Run all E2E tests → fix failures |
| 4 | Generate coverage report (> 80%) |
| 5 | Verify edge cases EC-001 to EC-010 are covered |

---

## Stage 10: Deployment
**REQ-IDs:** NFR-009
**TEST-IDs:** IT-NFR-009

| Step | Action |
|------|--------|
| 1 | Create production Dockerfile (multi-stage) |
| 2 | Create production docker-compose.yml (health checks) |
| 3 | Create Nginx config (reverse proxy, static files) |
| 4 | Create GitHub Actions deploy workflow |
| 5 | Configure SSL and environment variables |
| 6 | Test deployment on staging environment |

**TDD:** Write IT-NFR-009 → Run (fail) → Implement deployment → Run (pass) → Refactor
