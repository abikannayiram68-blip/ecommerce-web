# PHASE 3 — Stages (Marketplace Module)

## Stage 1: Setup
**REQ-IDs:** REQ-024, REQ-042
**TEST-IDs:** IT-033-01, IT-042-01

| Step | Action |
|------|--------|
| 1    | Configure MinIO product-bucket env configurations |
| 2    | Set up multi-currency environment base rates config |

---

## Stage 2: Architecture
**REQ-IDs:** REQ-033 to REQ-044
**TEST-IDs:** IT-033-01 to IT-044-01

| Step | Action |
|------|--------|
| 1    | Add VendorModule, BillingModule, DisputeModule |
| 2    | Add PayoutModule, MessageModule |
| 3    | Extend Guards to include multi-tenant Vendor roles |

---

## Stage 3: Database
**REQ-IDs:** REQ-033, REQ-035 to REQ-037, REQ-040 to REQ-043
**TEST-IDs:** UT-033-01, UT-035-01, UT-036-01, UT-037-01, UT-040-01, UT-041-01, UT-042-01, UT-043-01

| Step | Action |
|------|--------|
| 1    | Create Vendor and VendorProduct models |
| 2    | Create CommissionPlan and Payout models |
| 3    | Create Dispute and VendorMessage models |
| 4    | Create Currency and TaxRate models |

---

## Stage 4: Backend
**REQ-IDs:** REQ-033 to REQ-044
**TEST-IDs:** UT-033-01 to UT-033-03, UT-035-01 to UT-035-03, UT-036-01 to UT-036-02, UT-037-01 to UT-037-02, UT-040-01 to UT-040-02, UT-041-01 to UT-041-03, UT-042-01, UT-043-01, UT-044-01

| Step | Action |
|------|--------|
| 1    | Vendor Onboarding Service + registration logic |
| 2    | Vendor-specific product overrides & stock management |
| 3    | Commission calculation engine & payouts processing |
| 4    | Dispute ticket tracking & resolution routes |
| 5    | Dynamic international taxation & currency exchange middleware |
| 6    | Extensible customer feedback aggregating to Vendor Store rating |

**TDD:** For each module: Write UT → Run (fail) → Implement → Run (pass) → Refactor

---

## Stage 5: Frontend
**REQ-IDs:** REQ-033 to REQ-035, REQ-038 to REQ-041, REQ-044

| Step | Action |
|------|--------|
| 1    | Seller registration and onboard forms |
| 2    | Seller Dashboard (products list, inventory, metrics) |
| 3    | Dedicated Vendor Profile storefront view |
| 4    | Admin control portal (Vendor approval & commission settings) |
| 5    | Raise Dispute tickets modal |
| 6    | Chat console (Vendor Messages interface) |

---

## Stage 6: State
**REQ-IDs:** REQ-033 to REQ-035, REQ-040, REQ-041

| Step | Action |
|------|--------|
| 1    | Vendor store (profile, analytics state, loading) |
| 2    | Vendor product store (inventory listing, product creation) |
| 3    | Dispute & message state (active channels, messages thread) |

---

## Stage 7: Auth
**REQ-IDs:** REQ-033, REQ-035, REQ-039
**TEST-IDs:** UT-NFR-006-Phase3

| Step | Action |
|------|--------|
| 1    | Extend RBAC checks to scope queries per active Vendor ID |
| 2    | Enforce Admin authentication checks on marketplace payout controls |

---

## Stage 8: Integration
**TEST-IDs:** IT-033-01, IT-035-01, IT-036-01, IT-038-01, IT-040-01, IT-041-01, IT-042-01, IT-043-01

| Step | Action |
|------|--------|
| 1    | Wire seller onboarding form to backend endpoints |
| 2    | Link Vendor Dashboard actions with image upload to MinIO |
| 3    | Integrate checkout payment flow with Commission calculation |
| 4    | Wire Multi-currency and Tax rate selectors in Checkout view |
| 5    | Connect dispute tickets and chat triggers |

---

## Stage 9: Testing

| Step | Action |
|------|--------|
| 1    | Run all Phase 3 unit tests |
| 2    | Run all Phase 3 integration tests |
| 3    | Verify authorization boundary tests (no cross-vendor editing) |
| 4    | Validate commission calculation precision |

---

## Stage 10: Deployment

| Step | Action |
|------|--------|
| 1    | Generate DB migration script for new schema tables |
| 2    | Verify MinIO production bucket permissions |
| 3    | Update local Docker-compose config |
| 4    | Re-run CI build validation jobs |
