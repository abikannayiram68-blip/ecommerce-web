File: /project-prompts/TESTS/REQUIREMENT_TEST_MAP.md

# REQUIREMENT ↔ TEST MAP

---

## GLOBAL RULES CHECK
- Every REQ-ID has at least one positive, negative, and edge-case test
- All TEST-IDs are unique and reference their parent REQ-ID
- Coverage is 100%

---

## MAPPING

| REQ-ID | REQ Name | TEST-IDs |
|--------|----------|----------|
| REQ-001 | Google Authentication | UT-001-01, UT-001-02, UT-001-03, IT-001-01, E2E-001-01, E2E-001-02 |
| REQ-002 | Customer Profile Management | UT-002-01, UT-002-02, IT-002-01 |
| REQ-003 | Product Catalog Browsing | UT-003-01, UT-003-02, UT-003-03, IT-003-01 |
| REQ-004 | Category Navigation | UT-004-01, UT-004-02, IT-004-01 |
| REQ-005 | Product Detail Page | UT-005-01, UT-005-02, IT-005-01 |
| REQ-006 | Product Search (Keyword) | UT-006-01, UT-006-02, UT-006-03, IT-006-01 |
| REQ-007 | Typo-Tolerant Search | UT-007-01, UT-007-02, UT-007-03, IT-007-01 |
| REQ-008 | Product Filtering | UT-008-01, UT-008-02, IT-008-01 |
| REQ-009 | Product Sorting | UT-009-01, UT-009-02, IT-009-01 |
| REQ-010 | Shopping Cart Management | UT-010-01, UT-010-02, UT-010-03, IT-010-01 |
| REQ-011 | Checkout Process | UT-011-01, UT-011-02, IT-011-01, E2E-011-01 |
| REQ-012 | Order Placement | UT-012-01, UT-012-02, UT-012-03, IT-012-01 |
| REQ-013 | Order Confirmation | UT-013-01, UT-013-02, IT-013-01 |
| REQ-014 | Order History | UT-014-01, UT-014-02, IT-014-01 |
| REQ-015 | Order Tracking | UT-015-01, UT-015-02, IT-015-01 |
| REQ-016 | Wishlist Management | UT-016-01, UT-016-02, UT-016-03, IT-016-01 |
| REQ-017 | Product Reviews and Ratings | UT-017-01, UT-017-02, UT-017-03, IT-017-01 |
| REQ-018 | Recently Viewed Products | UT-018-01, UT-018-02, IT-018-01 |
| REQ-019 | Personalized Product Suggestions | UT-019-01, UT-019-02, IT-019-01 |
| REQ-020 | Smart Suggestions Engine | UT-020-01, UT-020-02, IT-020-01 |
| REQ-021 | Notifications | UT-021-01, UT-021-02, IT-021-01 |
| REQ-022 | Promotional Banners and Offers | UT-022-01, UT-022-02, IT-022-01 |
| REQ-023 | Responsive Web Experience | UT-023-01, UT-023-02, E2E-023-01 |
| REQ-024 | Admin Dashboard | UT-024-01, UT-024-02, IT-024-01 |
| REQ-025 | Product Management (Admin) | UT-025-01, UT-025-02, UT-025-03, IT-025-01 |
| REQ-026 | Category Management (Admin) | UT-026-01, UT-026-02, IT-026-01 |
| REQ-027 | Inventory Management (Admin) | UT-027-01, UT-027-02, UT-027-03, IT-027-01 |
| REQ-028 | Order Management (Admin) | UT-028-01, UT-028-02, IT-028-01 |
| REQ-029 | Customer Management (Admin) | UT-029-01, UT-029-02, IT-029-01 |
| REQ-030 | Promotions Management (Admin) | UT-030-01, UT-030-02, IT-030-01 |
| REQ-031 | Sales Reporting | UT-031-01, UT-031-02, IT-031-01 |
| REQ-032 | Analytics Dashboard | UT-032-01, UT-032-02, IT-032-01 |
| NFR-001 | Intuitive Navigation | E2E-NFR-001 |
| NFR-002 | Mobile Responsiveness | E2E-NFR-002 |
| NFR-003 | Fast Page Loading | IT-NFR-003 |
| NFR-004 | High Availability | IT-NFR-004 |
| NFR-005 | Secure Authentication | UT-NFR-005, IT-NFR-005 |
| NFR-006 | Role-Based Access Control | UT-NFR-006, IT-NFR-006 |
| NFR-007 | Privacy — Data Protection | UT-NFR-007, IT-NFR-007 |
| NFR-008 | Scalability | IT-NFR-008 |
| NFR-009 | Containerized Deployment | IT-NFR-009 |
| NFR-010 | Monitoring | IT-NFR-010 |

---

## SELF-CHECK
- 32 REQs mapped ✅
- 10 NFRs mapped ✅
- Total TEST-IDs: 120+
- No orphan REQs or NFRs ✅
