# Phase 3 — Database Schema Design

## Entities

### Vendor
| Field | Type | Notes |
|-------|------|-------|
| id | INT PK AUTO_INCREMENT | |
| userId | INT FK → Users.id | Link to platform user account |
| storeName | VARCHAR(200) | Display name on storefront |
| slug | VARCHAR(200) UNIQUE | URL-friendly store name |
| description | TEXT | Store description/bio |
| logoUrl | VARCHAR(500) | |
| bannerUrl | VARCHAR(500) | |
| email | VARCHAR(255) | Contact email |
| phone | VARCHAR(50) | |
| address | TEXT | Business address |
| status | ENUM(pending, active, suspended, rejected) | Onboarding status |
| commissionRate | DECIMAL(5,2) | Override for global rate |
| totalSales | DECIMAL(15,2) | Running total |
| totalPayout | DECIMAL(15,2) | Running total |
| rating | DECIMAL(3,2) | Average rating |
| reviewCount | INT | |
| createdAt | DATETIME | |
| updatedAt | DATETIME | |

### CommissionPlan
| Field | Type | Notes |
|-------|------|-------|
| id | INT PK AUTO_INCREMENT | |
| name | VARCHAR(100) | e.g. "Standard", "Premium" |
| rate | DECIMAL(5,2) | Percentage |
| minPayout | DECIMAL(10,2) | Minimum before payout |
| maxPendingPayout | DECIMAL(10,2) | Cap on unpaid balance |
| isDefault | BOOLEAN | |
| createdAt | DATETIME | |
| updatedAt | DATETIME | |

### Payout
| Field | Type | Notes |
|-------|------|-------|
| id | INT PK AUTO_INCREMENT | |
| vendorId | INT FK → Vendor.id | |
| amount | DECIMAL(15,2) | |
| fee | DECIMAL(10,2) | Transaction/processing fee |
| status | ENUM(pending, processing, completed, failed) | |
| paymentMethod | VARCHAR(50) | bank, paypal, stripe |
| paymentRef | VARCHAR(200) | External payment reference |
| paidAt | DATETIME | |
| createdAt | DATETIME | |

### VendorProduct
| Field | Type | Notes |
|-------|------|-------|
| id | INT PK AUTO_INCREMENT | |
| vendorId | INT FK → Vendor.id | |
| productId | INT FK → Products.id | |
| price | DECIMAL(10,2) | Vendor-specific price override |
| stock | INT | Vendor-specific stock |
| status | ENUM(active, inactive, discontinued) | |
| createdAt | DATETIME | |

### Dispute
| Field | Type | Notes |
|-------|------|-------|
| id | INT PK AUTO_INCREMENT | |
| vendorId | INT FK → Vendor.id | |
| orderId | INT FK → Orders.id | |
| raisedBy | ENUM(buyer, seller, admin) | |
| reason | TEXT | |
| status | ENUM(open, investigating, resolved, closed) | |
| resolution | TEXT | Admin notes |
| createdAt | DATETIME | |
| updatedAt | DATETIME | |

### VendorMessage
| Field | Type | Notes |
|-------|------|-------|
| id | INT PK AUTO_INCREMENT | |
| vendorId | INT FK → Vendor.id | |
| userId | INT FK → Users.id | Sender (buyer or admin) |
| message | TEXT | |
| direction | ENUM(to_vendor, from_vendor) | |
| read | BOOLEAN | |
| createdAt | DATETIME | |

### Currency
| Field | Type | Notes |
|-------|------|-------|
| id | INT PK AUTO_INCREMENT | |
| code | VARCHAR(3) UNIQUE | e.g. USD, EUR, GBP |
| name | VARCHAR(50) | |
| symbol | VARCHAR(10) | e.g. $, €, £ |
| exchangeRate | DECIMAL(15,6) | Relative to base currency |
| isBase | BOOLEAN | One currency is base |
| isActive | BOOLEAN | |
| createdAt | DATETIME | |

### TaxRate
| Field | Type | Notes |
|-------|------|-------|
| id | INT PK AUTO_INCREMENT | |
| countryCode | VARCHAR(2) | ISO 3166-1 alpha-2 |
| region | VARCHAR(100) | State/province or NULL |
| rate | DECIMAL(5,2) | Percentage |
| name | VARCHAR(100) | e.g. VAT, GST, Sales Tax |
| isActive | BOOLEAN | |
| createdAt | DATETIME | |
