File: /project-prompts/TESTS/UNIT_TESTS.md

# UNIT TESTS

---

## REQ-001: Google Authentication

### UT-001-01 — Positive: Google login with valid token
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-001 |
| **Input** | Valid Google OAuth token { id_token: "valid_google_token", provider: "google" } |
| **Expected Output** | { success: true, user: { id, email, name, avatar }, token: "jwt_token" } |

### UT-001-02 — Negative: Google login with expired/invalid token
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-001 |
| **Input** | Expired OAuth token { id_token: "expired_token", provider: "google" } |
| **Expected Output** | { success: false, error: "INVALID_TOKEN", status: 401 } |

### UT-001-03 — Edge: Google login with already-registered email
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-001 |
| **Input** | Valid Google token with email matching existing user |
| **Expected Output** | { success: true, user: { existing_user_id }, isNew: false, token: "jwt_token" } |

---

## REQ-002: Customer Profile Management

### UT-002-01 — Positive: Update profile fields
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-002 |
| **Input** | { userId: 1, name: "John Updated", phone: "+1234567890" } |
| **Expected Output** | { success: true, user: { id: 1, name: "John Updated", phone: "+1234567890" } } |

### UT-002-02 — Negative: Update profile with invalid email format
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-002 |
| **Input** | { userId: 1, email: "not-an-email" } |
| **Expected Output** | { success: false, error: "INVALID_EMAIL_FORMAT" } |

---

## REQ-003: Product Catalog Browsing

### UT-003-01 — Positive: Get paginated products
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-003 |
| **Input** | { page: 1, limit: 20 } |
| **Expected Output** | { products: [...], total: N, page: 1, totalPages: M } |

### UT-003-02 — Negative: Get products with negative page number
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-003 |
| **Input** | { page: -1, limit: 20 } |
| **Expected Output** | { success: false, error: "INVALID_PAGE_NUMBER" } |

### UT-003-03 — Edge: Get products when catalog empty
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-003 |
| **Input** | { page: 1, limit: 20 } (no products exist) |
| **Expected Output** | { products: [], total: 0, page: 1, totalPages: 0 } |

---

## REQ-004: Category Navigation

### UT-004-01 — Positive: Get products by category
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-004 |
| **Input** | { categoryId: 5, page: 1 } |
| **Expected Output** | { products: [...], category: { id: 5, name: "Electronics" } } |

### UT-004-02 — Negative: Get products for non-existent category
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-004 |
| **Input** | { categoryId: 99999 } |
| **Expected Output** | { success: false, error: "CATEGORY_NOT_FOUND", status: 404 } |

---

## REQ-005: Product Detail Page

### UT-005-01 — Positive: Get product by ID
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-005 |
| **Input** | { productId: 42 } |
| **Expected Output** | { product: { id: 42, name, description, price, images, specs, stock, category } } |

### UT-005-02 — Negative: Get non-existent product
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-005 |
| **Input** | { productId: 99999 } |
| **Expected Output** | { success: false, error: "PRODUCT_NOT_FOUND", status: 404 } |

---

## REQ-006: Product Search

### UT-006-01 — Positive: Search by keyword
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-006 |
| **Input** | { query: "wireless headphones" } |
| **Expected Output** | { products: [...], total: N, suggestedKeywords: [] } |

### UT-006-02 — Negative: Empty search query
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-006 |
| **Input** | { query: "" } |
| **Expected Output** | { success: false, error: "EMPTY_SEARCH_QUERY" } |

### UT-006-03 — Edge: Search with special characters
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-006 |
| **Input** | { query: "@#$%^&*()" } |
| **Expected Output** | { products: [], total: 0, sanitizedQuery: "" } |

---

## REQ-007: Typo-Tolerant Search

### UT-007-01 — Positive: Misspelled search returns correct products
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-007 |
| **Input** | { query: "headfones" } |
| **Expected Output** | { products: [{ name: "Wireless Headphones" }, ...], suggestion: "headphones" } |

### UT-007-02 — Negative: Query with no close matches
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-007 |
| **Input** | { query: "xyzabc123nonexistent" } |
| **Expected Output** | { products: [], suggestion: null } |

### UT-007-03 — Edge: Single-character query
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-007 |
| **Input** | { query: "a" } |
| **Expected Output** | { products: [...matching_starting_with_a], suggestion: null } |

---

## REQ-008: Product Filtering

### UT-008-01 — Positive: Filter by price range
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-008 |
| **Input** | { minPrice: 10, maxPrice: 100 } |
| **Expected Output** | { products: [...], total: N } (all products between $10 and $100) |

### UT-008-02 — Negative: minPrice > maxPrice
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-008 |
| **Input** | { minPrice: 200, maxPrice: 50 } |
| **Expected Output** | { success: false, error: "INVALID_PRICE_RANGE" } |

---

## REQ-009: Product Sorting

### UT-009-01 — Positive: Sort by price ascending
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-009 |
| **Input** | { sortBy: "price", sortOrder: "asc" } |
| **Expected Output** | { products: [...N] } where products[N].price >= products[N-1].price |

### UT-009-02 — Negative: Invalid sort field
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-009 |
| **Input** | { sortBy: "invalid_field" } |
| **Expected Output** | { success: false, error: "INVALID_SORT_FIELD" } |

---

## REQ-010: Shopping Cart Management

### UT-010-01 — Positive: Add item to cart
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-010 |
| **Input** | { userId: 1, productId: 10, quantity: 2 } |
| **Expected Output** | { success: true, cart: { items: [{ productId: 10, quantity: 2 }], total: X } } |

### UT-010-02 — Negative: Add out-of-stock item to cart
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-010 |
| **Input** | { userId: 1, productId: 99, quantity: 1 } (stock = 0) |
| **Expected Output** | { success: false, error: "OUT_OF_STOCK" } |

### UT-010-03 — Edge: Add quantity exceeding stock
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-010 |
| **Input** | { userId: 1, productId: 10, quantity: 999 } (stock = 50) |
| **Expected Output** | { success: false, error: "INSUFFICIENT_STOCK", availableStock: 50 } |

---

## REQ-011: Checkout Process

### UT-011-01 — Positive: Validate checkout payload
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-011 |
| **Input** | { userId: 1, cartId: 5, shippingAddress: {...}, paymentMethod: "stripe" } |
| **Expected Output** | { success: true, validationPassed: true, estimatedTotal: X } |

### UT-011-02 — Negative: Checkout with empty cart
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-011 |
| **Input** | { userId: 1, cartId: 5 } where cart has 0 items |
| **Expected Output** | { success: false, error: "EMPTY_CART" } |

---

## REQ-012: Order Placement

### UT-012-01 — Positive: Create order successfully
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-012 |
| **Input** | { userId: 1, items: [{ productId: 10, qty: 1 }], total: 49.99 } |
| **Expected Output** | { success: true, order: { id, status: "confirmed", total: 49.99, createdAt } } |

### UT-012-02 — Negative: Duplicate order submission
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-012 |
| **Input** | Same payload sent twice with idempotency key |
| **Expected Output** | First: { success: true, order: {...} } Second: { success: false, error: "DUPLICATE_ORDER" } |

### UT-012-03 — Edge: Concurrent checkout for last item
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-012 |
| **Input** | Two simultaneous checkout requests for product with stock=1 |
| **Expected Output** | One succeeds { success: true }, one fails { success: false, error: "OUT_OF_STOCK" } |

---

## REQ-013: Order Confirmation

### UT-013-01 — Positive: Generate confirmation data
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-013 |
| **Input** | { orderId: 100 } (order successfully placed) |
| **Expected Output** | { confirmation: { orderId: 100, orderNumber: "ORD-100", items: [...], total, estimatedDelivery } } |

### UT-013-02 — Negative: Confirmation for non-existent order
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-013 |
| **Input** | { orderId: 99999 } |
| **Expected Output** | { success: false, error: "ORDER_NOT_FOUND" } |

---

## REQ-014: Order History

### UT-014-01 — Positive: Get user order history
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-014 |
| **Input** | { userId: 1, page: 1, limit: 10 } |
| **Expected Output** | { orders: [...], total: N, page: 1 } |

### UT-014-02 — Negative: View another user's orders
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-014 |
| **Input** | { userId: 1, requestedUserId: 2 } |
| **Expected Output** | { success: false, error: "UNAUTHORIZED" } |

---

## REQ-015: Order Tracking

### UT-015-01 — Positive: Get order status
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-015 |
| **Input** | { orderId: 100 } (user owns this order) |
| **Expected Output** | { order: { id: 100, status: "shipped", trackingNumber: "TRACK-123", updatedAt } } |

### UT-015-02 — Negative: Track order without owning it
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-015 |
| **Input** | User A requests order belonging to User B |
| **Expected Output** | { success: false, error: "UNAUTHORIZED" } |

---

## REQ-016: Wishlist Management

### UT-016-01 — Positive: Add item to wishlist
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-016 |
| **Input** | { userId: 1, productId: 10 } |
| **Expected Output** | { success: true, wishlist: { items: [{ productId: 10 }] } } |

### UT-016-02 — Negative: Add duplicate item to wishlist
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-016 |
| **Input** | { userId: 1, productId: 10 } (already in wishlist) |
| **Expected Output** | { success: false, error: "ALREADY_IN_WISHLIST" } |

### UT-016-03 — Edge: Archived product in wishlist
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-016 |
| **Input** | Get wishlist containing an archived product |
| **Expected Output** | { wishlist: { items: [{ productId: 10, available: false, message: "No longer available" }] } } |

---

## REQ-017: Product Reviews and Ratings

### UT-017-01 — Positive: Submit review for purchased product
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-017 |
| **Input** | { userId: 1, productId: 10, rating: 5, comment: "Great product!" } |
| **Expected Output** | { success: true, review: { id, rating: 5, status: "pending_approval" } } |

### UT-017-02 — Negative: Submit review without purchase
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-017 |
| **Input** | { userId: 1, productId: 10, rating: 4 } (user never purchased this product) |
| **Expected Output** | { success: false, error: "MUST_PURCHASE_FIRST" } |

### UT-017-03 — Edge: Invalid rating value
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-017 |
| **Input** | { userId: 1, productId: 10, rating: 6 } (rating out of 1-5 range) |
| **Expected Output** | { success: false, error: "INVALID_RATING" } |

---

## REQ-018: Recently Viewed Products

### UT-018-01 — Positive: Get recently viewed products
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-018 |
| **Input** | { userId: 1, limit: 10 } |
| **Expected Output** | { recentlyViewed: [{ productId, viewedAt }, ...] } (ordered by most recent) |

### UT-018-02 — Edge: Recently viewed exceeds limit
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-018 |
| **Input** | User viewed 50 products; request limit: 10 |
| **Expected Output** | { recentlyViewed: [10 most recent] } |

---

## REQ-019: Personalized Product Suggestions

### UT-019-01 — Positive: Get suggestions for user with browsing history
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-019 |
| **Input** | { userId: 1 } (user has browsing history) |
| **Expected Output** | { recommendations: [{ productId, score, reason }, ...] } |

### UT-019-02 — Edge: Get suggestions for new user with no history
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-019 |
| **Input** | { userId: 99 } (new user, no history) |
| **Expected Output** | { recommendations: [trending_or_popular_products], source: "default" } |

---

## REQ-020: Smart Suggestions Engine

### UT-020-01 — Positive: Combined recommendations
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-020 |
| **Input** | { userId: 1 } (user has wishlist, search history, purchases) |
| **Expected Output** | { recommendations: [{ productId, source: "wishlist|purchase|trending", score }] } |

### UT-020-02 — Edge: Empty data sources
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-020 |
| **Input** | { userId: 1 } (no wishlist, no history, no purchases) |
| **Expected Output** | { recommendations: [trending_products], source: "trending" } |

---

## REQ-021: Notifications

### UT-021-01 — Positive: Get user notifications
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-021 |
| **Input** | { userId: 1 } |
| **Expected Output** | { notifications: [{ id, type, message, read: false, createdAt }] } |

### UT-021-02 — Positive: Mark notification as read
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-021 |
| **Input** | { userId: 1, notificationId: 5 } |
| **Expected Output** | { success: true, notification: { id: 5, read: true } } |

---

## REQ-022: Promotional Banners and Offers

### UT-022-01 — Positive: Get active promotions
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-022 |
| **Input** | { currentDate: "2026-06-08" } |
| **Expected Output** | { promotions: [{ id, title, bannerUrl, startDate, endDate }] } (only active ones) |

### UT-022-02 — Edge: No active promotions
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-022 |
| **Input** | { currentDate: "2026-06-08" } (no active promos) |
| **Expected Output** | { promotions: [] } |

---

## REQ-023: Responsive Web Experience

### UT-023-01 — Positive: API returns viewport-appropriate data
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-023 |
| **Input** | Request with header { "User-Agent": "mobile" } |
| **Expected Output** | { success: true, data: {...} } (no layout-specific response from API) |

### UT-023-02 — Positive: All API endpoints respond correctly
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-023 |
| **Input** | All public endpoints with standard headers |
| **Expected Output** | Each returns 200 with valid JSON body |

---

## REQ-024: Admin Dashboard

### UT-024-01 — Positive: Get dashboard summary
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-024 |
| **Input** | { adminId: 1 } (authenticated admin) |
| **Expected Output** | { dashboard: { totalOrders, totalRevenue, totalCustomers, totalProducts, lowStockCount } } |

### UT-024-02 — Negative: Non-admin requests dashboard
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-024 |
| **Input** | { userId: 1 } (regular customer) |
| **Expected Output** | { success: false, error: "FORBIDDEN", status: 403 } |

---

## REQ-025: Product Management (Admin)

### UT-025-01 — Positive: Create product
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-025 |
| **Input** | { adminId: 1, name: "New Product", price: 29.99, categoryId: 5, stock: 100 } |
| **Expected Output** | { success: true, product: { id, name: "New Product", price: 29.99, status: "active" } } |

### UT-025-02 — Negative: Create product with missing required fields
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-025 |
| **Input** | { adminId: 1, name: "" } (empty name) |
| **Expected Output** | { success: false, error: "VALIDATION_ERROR", fields: ["name"] } |

### UT-025-03 — Negative: Non-admin creates product
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-025 |
| **Input** | { userId: 5, role: "customer", name: "Product" } |
| **Expected Output** | { success: false, error: "FORBIDDEN", status: 403 } |

---

## REQ-026: Category Management (Admin)

### UT-026-01 — Positive: Create category
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-026 |
| **Input** | { adminId: 1, name: "New Category", description: "..." } |
| **Expected Output** | { success: true, category: { id, name: "New Category" } } |

### UT-026-02 — Negative: Create duplicate category name
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-026 |
| **Input** | { adminId: 1, name: "Electronics" } (already exists) |
| **Expected Output** | { success: false, error: "CATEGORY_ALREADY_EXISTS" } |

---

## REQ-027: Inventory Management (Admin)

### UT-027-01 — Positive: Update stock quantity
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-027 |
| **Input** | { adminId: 1, productId: 10, stock: 200 } |
| **Expected Output** | { success: true, product: { id: 10, stock: 200 } } |

### UT-027-02 — Negative: Update stock to negative value
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-027 |
| **Input** | { adminId: 1, productId: 10, stock: -5 } |
| **Expected Output** | { success: false, error: "INVALID_STOCK_VALUE" } |

### UT-027-03 — Edge: Low stock alert threshold
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-027 |
| **Input** | { adminId: 1 } products with stock <= 10 |
| **Expected Output** | { lowStockProducts: [{ productId, name, stock: <=10 }], count: N } |

---

## REQ-028: Order Management (Admin)

### UT-028-01 — Positive: Update order status
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-028 |
| **Input** | { adminId: 1, orderId: 100, status: "shipped", trackingNumber: "TRK-123" } |
| **Expected Output** | { success: true, order: { id: 100, status: "shipped", trackingNumber: "TRK-123" } } |

### UT-028-02 — Negative: Invalid status transition
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-028 |
| **Input** | { adminId: 1, orderId: 100, status: "delivered" } (current: "pending") |
| **Expected Output** | { success: false, error: "INVALID_STATUS_TRANSITION" } |

---

## REQ-029: Customer Management (Admin)

### UT-029-01 — Positive: Get customer details
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-029 |
| **Input** | { adminId: 1, customerId: 5 } |
| **Expected Output** | { customer: { id: 5, name, email, totalOrders, totalSpent, registeredAt } } |

### UT-029-02 — Negative: Get non-existent customer
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-029 |
| **Input** | { adminId: 1, customerId: 99999 } |
| **Expected Output** | { success: false, error: "CUSTOMER_NOT_FOUND" } |

---

## REQ-030: Promotions Management (Admin)

### UT-030-01 — Positive: Create promotion
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-030 |
| **Input** | { adminId: 1, name: "Summer Sale", discount: 20, type: "percentage", startDate, endDate } |
| **Expected Output** | { success: true, promotion: { id, name: "Summer Sale", discount: 20 } } |

### UT-030-02 — Negative: Create promotion with past end date
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-030 |
| **Input** | { adminId: 1, name: "Old Sale", endDate: "2020-01-01" } |
| **Expected Output** | { success: false, error: "INVALID_DATE_RANGE" } |

---

## REQ-031: Sales Reporting

### UT-031-01 — Positive: Generate sales report
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-031 |
| **Input** | { adminId: 1, startDate: "2026-01-01", endDate: "2026-06-08" } |
| **Expected Output** | { report: { totalRevenue, totalOrders, avgOrderValue, period } } |

### UT-031-02 — Negative: Start date after end date
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-031 |
| **Input** | { startDate: "2026-12-01", endDate: "2026-01-01" } |
| **Expected Output** | { success: false, error: "INVALID_DATE_RANGE" } |

---

## REQ-032: Analytics Dashboard

### UT-032-01 — Positive: Get analytics data
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-032 |
| **Input** | { adminId: 1 } |
| **Expected Output** | { analytics: { conversionRate, topProducts, customerSegments, revenueByMonth } } |

### UT-032-02 — Edge: No data period
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-032 |
| **Input** | { adminId: 1, period: "before_launch" } |
| **Expected Output** | { analytics: { conversionRate: 0, topProducts: [], revenueByMonth: [] } } |

---

## NFR TESTS

### UT-NFR-005: JWT token validation
| Field | Value |
|-------|-------|
| **REQ-ID** | NFR-005 |
| **Input** | Request with tampered JWT token { Authorization: "Bearer tampered.jwt.here" } |
| **Expected Output** | { status: 401, error: "INVALID_TOKEN" } |

### UT-NFR-006: Role-based access enforcement
| Field | Value |
|-------|-------|
| **REQ-ID** | NFR-006 |
| **Input** | Customer user calls admin-only endpoint POST /admin/products |
| **Expected Output** | { status: 403, error: "FORBIDDEN" } |

### UT-NFR-007: Data exposure check
| Field | Value |
|-------|-------|
| **REQ-ID** | NFR-007 |
| **Input** | API response for GET /users/:id |
| **Expected Output** | Response must NOT include passwordHash, ssn, or paymentDetails fields |
