File: /project-prompts/PHASES/PHASE_2/STAGES.md

# PHASE 2 — Stages

## Stage 1: Setup
**REQ-IDs:** REQ-007, REQ-021
**TEST-IDs:** IT-007-01, IT-021-01

| Step | Action |
|------|--------|
| 1 | Add PostgreSQL 15 Docker service |
| 2 | Install BullMQ + Redis queue config |
| 3 | Set up PostgreSQL connection in backend |

**TDD:** Write IT-007-01 → Run (fail) → Setup → Run (pass) → Refactor

---

## Stage 2: Architecture
**REQ-IDs:** REQ-007, REQ-016, REQ-017, REQ-018, REQ-021, REQ-022, REQ-030
**TEST-IDs:** IT-007-01, IT-016-01, IT-017-01, IT-018-01, IT-021-01, IT-022-01, IT-030-01

| Step | Action |
|------|--------|
| 1 | Add SearchModule, NotificationsModule, WishlistModule |
| 2 | Add ReviewsModule, PromotionsModule |
| 3 | Configure BullMQ queue module |
| 4 | Configure PostgreSQL search module |

---

## Stage 3: Database
**REQ-IDs:** REQ-016, REQ-017, REQ-018, REQ-021, REQ-022, REQ-030
**TEST-IDs:** UT-016-01, UT-017-01, UT-018-01, UT-021-01, UT-022-01, UT-030-01

| Step | Action |
|------|--------|
| 1 | Create Review, WishlistItem, Notification, Promotion models |
| 2 | Add PostgreSQL trigram extension |
| 3 | Add full-text search index on products |
| 4 | Create RecentlyViewed model |

---

## Stage 4: Backend
**REQ-IDs:** REQ-007, REQ-016 to REQ-022, REQ-030
**TEST-IDs:** UT-007-01 to UT-007-03, UT-016-01 to UT-016-03, UT-017-01 to UT-017-03, UT-018-01, UT-018-02, UT-019-01, UT-019-02, UT-020-01, UT-020-02, UT-021-01, UT-021-02, UT-022-01, UT-022-02, UT-030-01, UT-030-02

| Step | Action |
|------|--------|
| 1 | SearchService (PostgreSQL full-text + trigram) |
| 2 | WishlistService + WishlistController |
| 3 | ReviewsService + ReviewsController |
| 4 | NotificationsService + BullMQ worker |
| 5 | PromotionsService + PromotionsController |
| 6 | RecentlyViewed tracking logic |
| 7 | RecommendationsService (personalized + trending) |

**TDD:** For each module: Write UT → Run (fail) → Implement → Run (pass) → Refactor

---

## Stage 5: Frontend
**REQ-IDs:** REQ-007, REQ-016 to REQ-022, REQ-030

| Step | Action |
|------|--------|
| 1 | Search results page (suggestions, typo correction) |
| 2 | Wishlist page + heart icon on product cards |
| 3 | Product reviews component on detail page |
| 4 | Notification center page |
| 5 | Promotional banners on landing page |
| 6 | Personalized recommendations section |
| 7 | Admin promotions management page |

---

## Stage 6: State
**REQ-IDs:** REQ-016, REQ-021, REQ-007

| Step | Action |
|------|--------|
| 1 | Wishlist store (items, add, remove, moveToCart) |
| 2 | Notifications store (list, markRead, unreadCount) |
| 3 | Search store (query, results, suggestions, loading) |

---

## Stage 7: Auth
**REQ-IDs:** REQ-017, REQ-030
**TEST-IDs:** UT-NFR-006

| Step | Action |
|------|--------|
| 1 | Add review moderation role check (admin) |
| 2 | Extend RBAC for promotions management |

---

## Stage 8: Integration
**TEST-IDs:** IT-007-01, IT-016-01, IT-017-01, IT-018-01, IT-019-01, IT-020-01, IT-021-01, IT-022-01, IT-030-01

| Step | Action |
|------|--------|
| 1 | Wire search API to search page |
| 2 | Wire wishlist API to store |
| 3 | Wire review submission flow |
| 4 | Wire notification API + BullMQ |
| 5 | Wire recommendations API |
| 6 | Wire promotion display |

---

## Stage 9: Testing

| Step | Action |
|------|--------|
| 1 | Run all Phase 2 unit tests |
| 2 | Run all Phase 2 integration tests |
| 3 | Test typo-tolerant search accuracy |
| 4 | Test notification delivery via BullMQ |
| 5 | Test recommendation relevance |

---

## Stage 10: Deployment

| Step | Action |
|------|--------|
| 1 | Add PostgreSQL service to docker-compose |
| 2 | Add BullMQ worker to Docker setup |
| 3 | Update GitHub Actions workflow |
| 4 | Add database migration commands to deploy script |
