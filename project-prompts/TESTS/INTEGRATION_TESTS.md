File: /project-prompts/TESTS/INTEGRATION_TESTS.md

# INTEGRATION TESTS

---

### IT-001-01: Google Auth → JWT → Protected API access
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-001 |
| **Input** | 1. POST /auth/google with valid token → receive JWT<br>2. GET /profile with Bearer JWT |
| **Expected Output** | Profile returns 200 with user data |

### IT-002-01: Profile update reflects in order history
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-002 |
| **Input** | 1. Update profile name<br>2. Place order<br>3. View order history |
| **Expected Output** | Order confirmation uses updated name |

### IT-003-01: Catalog pagination with filters
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-003, REQ-008 |
| **Input** | GET /products?page=1&limit=10&categoryId=5&minPrice=10 |
| **Expected Output** | 10 products in category 5, all >= $10 |

### IT-004-01: Category navigation + product count
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-004 |
| **Input** | 1. GET /categories → get list<br>2. GET /products?categoryId={firstCategory.id} |
| **Expected Output** | All returned products have matching categoryId |

### IT-005-01: Product detail includes reviews
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-005, REQ-017 |
| **Input** | GET /products/10 (product has reviews) |
| **Expected Output** | Response includes product + reviews array with ratings |

### IT-006-01: Search results respect category filter
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-006, REQ-008 |
| **Input** | GET /products/search?q=phone&categoryId=3 |
| **Expected Output** | Only products in category 3 matching "phone" |

### IT-007-01: Typo-tolerant search returns same results as correct spelling
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-007 |
| **Input** | 1. GET /products/search?q=headphones<br>2. GET /products/search?q=headfones |
| **Expected Output** | Both return same product set (or overlapping) |

### IT-008-01: Combined filter + sort
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-008, REQ-009 |
| **Input** | GET /products?minPrice=10&maxPrice=500&sortBy=price&sortOrder=desc |
| **Expected Output** | Products sorted descending by price, all within $10-$500 |

### IT-009-01: Sort consistency across pages
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-009 |
| **Input** | GET /products?sortBy=price&sortOrder=asc&page=1 and page=2 |
| **Expected Output** | Last product on page 1 has price <= first product on page 2 |

### IT-010-01: Cart total recalculates on item update
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-010 |
| **Input** | 1. Add item (price=10, qty=1) → total=10<br>2. Update qty=3 → total=30 |
| **Expected Output** | Cart total = 30 after update |

### IT-011-01: Checkout validates stock for all items
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-011, REQ-012 |
| **Input** | Checkout with 3 items where 1 goes out of stock before submission |
| **Expected Output** | Order fails with "OUT_OF_STOCK" for the unavailable item; cart preserved |

### IT-012-01: Order creation decrements inventory
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-012, REQ-027 |
| **Input** | 1. Check product stock=50<br>2. Place order with qty=3<br>3. Check product stock |
| **Expected Output** | Stock = 47 after order |

### IT-013-01: Confirmation page matches order data
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-013 |
| **Input** | 1. Place order → get orderId<br>2. GET /orders/{orderId}/confirmation |
| **Expected Output** | Confirmation total matches order total; items match cart contents |

### IT-014-01: Order history shows all user orders
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-014 |
| **Input** | 1. Place 3 orders<br>2. GET /orders/history |
| **Expected Output** | 3 orders returned, ordered by most recent first |

### IT-015-01: Admin status update triggers user notification
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-015, REQ-021, REQ-028 |
| **Input** | 1. Admin updates order status to "shipped"<br>2. User calls GET /notifications |
| **Expected Output** | User has notification: "Order #X has been shipped" |

### IT-016-01: Moving wishlist item to cart
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-016, REQ-010 |
| **Input** | 1. Add product to wishlist<br>2. POST /wishlist/10/move-to-cart |
| **Expected Output** | Product removed from wishlist, added to cart |

### IT-017-01: Approved review appears on product page
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-017 |
| **Input** | 1. Admin approves review<br>2. GET /products/10 (public) |
| **Expected Output** | Review visible in product details |

### IT-018-01: Recently viewed updates on product visit
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-018 |
| **Input** | 1. GET /products/10<br>2. GET /products/recently-viewed |
| **Expected Output** | Product 10 appears as most recent |

### IT-019-01: Recommendations exclude purchased products
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-019 |
| **Input** | User purchased product 10; GET /recommendations |
| **Expected Output** | Product 10 NOT in recommendations list |

### IT-020-01: Smart suggestions combine multiple sources
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-020 |
| **Input** | User has wishlist items + search history + purchase history |
| **Expected Output** | Recommendations array has items with sources from wishlist, history, purchases |

### IT-021-01: BullMQ processes notification queue
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-021 |
| **Input** | Trigger order status change |
| **Expected Output** | Notification created via BullMQ job within 5 seconds |

### IT-022-01: Promotions visible on landing page
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-022 |
| **Input** | GET /promotions/active |
| **Expected Output** | Returns all promotions where current date is between startDate and endDate |

### IT-024-01: Admin dashboard aggregates real data
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-024 |
| **Input** | 1. Create 5 products, 3 orders<br>2. GET /admin/dashboard |
| **Expected Output** | totalProducts >= 5, totalOrders >= 3 |

### IT-025-01: Archived product hidden from catalog
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-025 |
| **Input** | 1. Admin archives product 10<br>2. GET /products (public) |
| **Expected Output** | Product 10 not returned in catalog |

### IT-026-01: Category deletion cascades to products
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-026 |
| **Input** | 1. Admin deletes category 5<br>2. GET /products?categoryId=5 |
| **Expected Output** | Empty result; products in category 5 become "uncategorized" |

### IT-027-01: Order placement triggers inventory update
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-027, REQ-012 |
| **Input** | 1. Check stock(product 10) = 50<br>2. Place order with product 10, qty=2<br>3. Check stock(product 10) |
| **Expected Output** | Stock = 48 |

### IT-028-01: Order status workflow enforced
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-028 |
| **Input** | 1. Admin tries: pending → delivered (skip shipped)<br>2. Admin tries: pending → shipped → delivered |
| **Expected Output** | 1. Error: "INVALID_STATUS_TRANSITION"<br>2. Success |

### IT-029-01: Customer profile shows purchase history
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-029 |
| **Input** | GET /admin/customers/5 (customer has 3 orders) |
| **Expected Output** | Customer data includes lastOrderDate, totalOrders: 3 |

### IT-030-01: Promotion applies to cart total
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-030, REQ-010 |
| **Input** | 1. Admin creates 20% off promotion<br>2. User adds items to cart<br>3. Apply promotion code |
| **Expected Output** | Cart total = subtotal * 0.8 |

### IT-031-01: Sales report matches order data
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-031 |
| **Input** | 1. Place 3 orders with totals 10, 20, 30<br>2. GET /admin/reports/sales?period=today |
| **Expected Output** | totalRevenue = 60, totalOrders = 3 |

### IT-032-01: Analytics data matches sales report
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-032, REQ-031 |
| **Input** | GET /admin/analytics and GET /admin/reports/sales for same period |
| **Expected Output** | Revenue numbers match across both endpoints |

### IT-NFR-003: Response time under load
| Field | Value |
|-------|-------|
| **REQ-ID** | NFR-003 |
| **Input** | 100 concurrent GET /products requests |
| **Expected Output** | 95th percentile response time < 500ms |

### IT-NFR-004: Health check endpoint
| Field | Value |
|-------|-------|
| **REQ-ID** | NFR-004 |
| **Input** | GET /health |
| **Expected Output** | { status: "ok", uptime, db: "connected", redis: "connected" } |

### IT-NFR-005: Token expiration flow
| Field | Value |
|-------|-------|
| **REQ-ID** | NFR-005 |
| **Input** | 1. Login → get JWT with short expiry<br>2. Wait for expiry<br>3. Use expired token |
| **Expected Output** | 401 with "TOKEN_EXPIRED" |

### IT-NFR-006: RBAC enforcement on all admin routes
| Field | Value |
|-------|-------|
| **REQ-ID** | NFR-006 |
| **Input** | Customer tries all POST/PUT/DELETE /admin/* endpoints |
| **Expected Output** | All return 403 |

### IT-NFR-007: PII not exposed in API responses
| Field | Value |
|-------|-------|
| **REQ-ID** | NFR-007 |
| **Input** | Audit all API response bodies |
| **Expected Output** | No response contains passwordHash, plaintext passwords, or full payment card numbers |

### IT-NFR-008: Concurrent user simulation
| Field | Value |
|-------|-------|
| **REQ-ID** | NFR-008 |
| **Input** | 500 concurrent virtual users browsing, searching, and purchasing |
| **Expected Output** | All requests complete; no 5xx errors; error rate < 1% |

### IT-NFR-009: Docker compose services start
| Field | Value |
|-------|-------|
| **REQ-ID** | NFR-009 |
| **Input** | docker-compose up -d |
| **Expected Output** | All services (api, db, redis, worker) report "healthy" within 60 seconds |

### IT-NFR-010: Metrics endpoint returns data
| Field | Value |
|-------|-------|
| **REQ-ID** | NFR-010 |
| **Input** | GET /metrics (Prometheus endpoint) |
| **Expected Output** | Returns valid Prometheus-formatted metrics including http_requests_total, db_query_duration_seconds |
