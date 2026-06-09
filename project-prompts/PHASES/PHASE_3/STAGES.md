File: /project-prompts/PHASES/PHASE_3/STAGES.md

# PHASE 3 — Stages

## Stage 1: Setup

| Step | Action |
|------|--------|
| 1 | Design seller database schema (vendors, commissions, payouts) |
| 2 | Plan multi-currency and international tax handling |
| 3 | Set up seller-related environment configs |

---

## Stage 2: Architecture

| Step | Action |
|------|--------|
| 1 | Add VendorModule, CommissionModule, PayoutModule |
| 2 | Add MarketplaceModule (global admin controls) |
| 3 | Add VendorStorefrontModule |
| 4 | Add MultiCurrencyModule, TaxModule |

---

## Stage 3: Database

| Step | Action |
|------|--------|
| 1 | Create Vendor, VendorStore, VendorProduct models |
| 2 | Create CommissionPlan, Payout, PayoutHistory models |
| 3 | Create Dispute, VendorMessage models |
| 4 | Add currency and tax rate tables |

---

## Stage 4: Backend

| Step | Action |
|------|--------|
| 1 | Vendor registration and onboarding flow |
| 2 | Seller dashboard (products, orders, revenue) |
| 3 | Commission calculation engine |
| 4 | Payout and settlement system |
| 5 | Vendor-specific storefront API |
| 6 | Marketplace admin controls |
| 7 | Multi-currency pricing and conversion |
| 8 | International tax calculation |
| 9 | Dispute resolution system |
| 10 | Vendor messaging system |

---

## Stage 5: Frontend

| Step | Action |
|------|--------|
| 1 | Seller registration page |
| 2 | Seller dashboard (products, orders, analytics) |
| 3 | Vendor storefront pages |
| 4 | Marketplace admin panel |
| 5 | Multi-currency checkout UI |

---

## Stage 6: State
| Step | Action |
|------|--------|
| 1 | Create vendor-store (profile, products, orders, revenue) |
| 2 | Extend cart-store for multi-currency |

---

## Stage 7: Auth
| Step | Action |
|------|--------|
| 1 | Add seller role to RBAC |
| 2 | Vendor-scoped authorization (sellers see only their data) |

---

## Stage 8: Integration

| Step | Action |
|------|--------|
| 1 | Wire seller registration → approval flow |
| 2 | Wire commission → payout pipeline |
| 3 | Test multi-vendor order placement |
| 4 | Test multi-currency checkout |

---

## Stage 9: Testing

| Step | Action |
|------|--------|
| 1 | Unit tests for commission calculation |
| 2 | Integration tests for seller onboarding |
| 3 | E2E tests for multi-vendor purchase flow |
| 4 | Test currency conversion accuracy |

---

## Stage 10: Deployment

| Step | Action |
|------|--------|
| 1 | Update Docker services for any new dependencies |
| 2 | Deploy database migrations |
| 3 | Update CI/CD pipeline |
| 4 | Configure multi-currency payment providers |
