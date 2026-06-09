File: /project-prompts/MEMORY/DECISIONS.md

# DECISIONS LOG

## ADR-001: Modular Monolith over Microservices
- **Context:** Single-vendor platform, small team
- **Decision:** Use NestJS modular monolith
- **Rationale:** Lower operational complexity, no need for service mesh, NestJS modules provide sufficient separation
- **Date:** 2026-06-08

## ADR-002: MySQL as Primary Database
- **Context:** Transactional e-commerce data
- **Decision:** Use MySQL 8.0 with Sequelize ORM
- **Rationale:** Mature, reliable, well-supported by Sequelize; sufficient for single-vendor scale
- **Date:** 2026-06-08

## ADR-003: PostgreSQL for Search (Phase 2)
- **Context:** Full-text and typo-tolerant search
- **Decision:** Use PostgreSQL Full-Text + Trigram search instead of Elasticsearch
- **Rationale:** Avoids additional infrastructure cost; PG trigram supports typo-tolerance natively
- **Date:** 2026-06-08

## ADR-004: Google OAuth as Primary Auth
- **Context:** Simplified customer onboarding
- **Decision:** Google OAuth only (no email/password registration)
- **Rationale:** Reduces registration friction, eliminates password management complexity
- **Date:** 2026-06-08

## ADR-005: Zustand over Redux
- **Context:** Frontend state management
- **Decision:** Use Zustand
- **Rationale:** Minimal boilerplate, sufficient for e-commerce state patterns, excellent TypeScript support
- **Date:** 2026-06-08

## ADR-006: Shadcn/UI Component Library
- **Context:** UI component system
- **Decision:** Use Shadcn/UI with Tailwind CSS
- **Rationale:** Accessible, customizable via Tailwind, no external dependency at runtime
- **Date:** 2026-06-08

## ADR-007: BullMQ for Background Jobs
- **Context:** Async task processing (notifications, alerts)
- **Decision:** Use BullMQ with Redis
- **Rationale:** Mature, Redis-backed, supports delayed jobs and scheduling
- **Date:** 2026-06-08

## ADR-008: Phase-Based Delivery
- **Context:** Incremental value delivery
- **Decision:** 4-phase implementation plan (MVP → Enhancement → Marketplace → Ecosystem)
- **Rationale:** Each phase is independently deployable; Phase 1 generates revenue earliest
- **Date:** 2026-06-08

## ADR-009: Passport.js for Auth
- **Context:** Google OAuth + JWT authentication
- **Decision:** Use @nestjs/passport with Google and JWT strategies
- **Rationale:** Well-integrated with NestJS, extensible, community-standard
- **Date:** 2026-06-08

## ADR-010: Zustand for Frontend State
- **Context:** Client-side state management
- **Decision:** Use Zustand (3 stores: auth, cart, UI)
- **Rationale:** Minimal boilerplate, built-in persist middleware, TypeScript support
- **Date:** 2026-06-08

## ADR-011: MySQL with Sequelize
- **Context:** Primary database
- **Decision:** MySQL 8.0 with Sequelize ORM (auto-load models, synchronize schema)
- **Rationale:** Mature ORM with NestJS integration, auto-migration for dev, good transaction support
- **Date:** 2026-06-08

## ADR-012: Containerized Deployment with Health Checks
- **Context:** Production deployment infrastructure
- **Decision:** Docker Compose with health checks on all services (api, db, redis, nginx)
- **Rationale:** Ensures service dependency ordering, self-healing, and monitoring readiness
- **Date:** 2026-06-08

## ADR-013: Health Check Endpoint
- **Context:** Service health monitoring
- **Decision:** Dedicated /api/health endpoint returning status + timestamp
- **Rationale:** Needed for Docker HEALTHCHECK, k8s readiness probes, and monitoring integrations
- **Date:** 2026-06-08

## ADR-014: MySQL FULLTEXT for Search
- **Context:** Full-text and typo-tolerant search
- **Decision:** Use MySQL FULLTEXT index on Product (name, description) with Sequelize
- **Rationale:** Single database (MySQL), no extra infrastructure, Sequelize native FULLTEXT index support
- **Date:** 2026-06-08

## ADR-015: BullMQ for Background Jobs
- **Context:** Async notification processing
- **Decision:** Use @nestjs/bullmq with Redis as job queue backend
- **Rationale:** Native NestJS integration, Redis-backed, supports delayed/scheduled jobs
- **Date:** 2026-06-08

## ADR-016: QueueModule Wrapper
- **Context:** BullMQ configuration isolation
- **Decision:** Wrap BullModule.forRoot() in a custom QueueModule with notifications queue registered
- **Rationale:** Keeps BullMQ dependency contained; easy to swap or reconfigure
- **Date:** 2026-06-08

## ADR-017: Separate PostgreSQL Connection for Search
- **Context:** Search module needs full-text search and trigram support
- **Decision:** Add dedicated Sequelize connection with postgres dialect in SearchModule
- **Rationale:** MySQL (primary DB) lacks full-text search features; PostgreSQL trigram provides built-in typo tolerance
- **Date:** 2026-06-08

## ADR-018: RecentlyViewed as Separate Entity
- **Context:** Tracking recently viewed products
- **Decision:** Create RecentlyViewed entity in RecommendationsModule with 20-item limit per user
- **Rationale:** Simple relational model; auto-cleanup on insert when limit exceeded
- **Date:** 2026-06-08
