File: /project-prompts/MEMORY/GLOBAL_CONTEXT.md

# GLOBAL CONTEXT

## Project
Single Vendor E-Commerce Platform

## Tech Stack
- Backend: Node.js + NestJS + MySQL (Sequelize) + Redis
- Frontend: React + Tailwind CSS + Shadcn/UI + Zustand
- Search (Phase 2): PostgreSQL Full-Text + Trigram
- Background Jobs: BullMQ
- Infrastructure: Docker + Docker Compose + GitHub Actions
- Monitoring: Grafana + Prometheus (Phase 5)

## Architecture
Modular monolith (NestJS) with service modules:
- Auth (Google OAuth + JWT)
- Users
- Products
- Categories
- Cart
- Orders
- Wishlist
- Reviews
- Notifications
- Promotions
- Recommendations
- Search
- Admin

## Phases
1. Customer Shopping Foundation (Core)
2. Product Discovery & Customer Engagement
3. Personalization & Recommendation Engine
4. Business Intelligence & Growth Optimization
5. Performance, Security & Scalability

## Output Directories
- /project-prompts/REQUIREMENTS.md
- /project-prompts/SYSTEM_DESIGN.md
- /project-prompts/TESTS/
- /project-prompts/MEMORY/
- /project-prompts/PHASES/

## Current Status
Phase 1 (MVP) complete — all 10 stages delivered ✅
Phase 2 (Enhancement) complete — all 10 stages delivered ✅
Phase 3 (Marketplace) complete — all 10 stages delivered ✅
Phase 4 (Ecosystem) complete — all 10 stages delivered ✅

- 185 tests passing (152 backend + 32 frontend + 1 deployment integration)

- 32 REQs, 10 NFRs, 6 CONs, 10 ECs, 8 Assumptions captured
- 120+ TEST-IDs across unit, integration, e2e
- System design completed (architecture, schema, APIs, folder structure)
- 43 tests passing (back-end)
- Docker Compose with health checks for api, db, redis, nginx
- MySQL FULLTEXT index on Product (name, description) for search
- BullMQ + @nestjs/bullmq installed for background job processing
- SearchModule, QueueModule, RecentlyViewed entity registered
- CI + Deploy workflows on GitHub Actions
- Both backend and frontend build successfully
