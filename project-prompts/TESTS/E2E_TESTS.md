File: /project-prompts/TESTS/E2E_TESTS.md

# END-TO-END TESTS

---

### E2E-001-01: Complete Google auth → catalog → cart → checkout flow
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-001, REQ-003, REQ-005, REQ-010, REQ-011, REQ-012, REQ-013 |
| **Steps** | 1. Visit landing page<br>2. Click "Sign in with Google"<br>3. Complete OAuth flow → redirected to home<br>4. Browse product catalog<br>5. Click product → view detail page<br>6. Add to cart<br>7. View cart → update quantity<br>8. Proceed to checkout<br>9. Confirm order<br>10. View confirmation page |
| **Expected Output** | Order confirmed with order number; cart empty; confirmation shows items + total |

### E2E-001-02: First-time registration via Google
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-001 |
| **Steps** | 1. Click "Sign in with Google"<br>2. Grant permissions for new Google account<br>3. Redirect to complete profile |
| **Expected Output** | New user created; redirected to home dashboard; profile has Google data pre-filled |

### E2E-011-01: Full purchase flow with stock validation
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-011, REQ-012, REQ-027 |
| **Steps** | 1. Login<br>2. Browse and add 3 items to cart<br>3. Go to checkout<br>4. Enter shipping details<br>5. Submit order |
| **Expected Output** | Order placed successfully; inventory decremented; confirmation page shown; email notification sent |

### E2E-023-01: Responsive layout on mobile viewport
| Field | Value |
|-------|-------|
| **REQ-ID** | REQ-023 |
| **Steps** | 1. Open app in 375px width viewport<br>2. Navigate: landing → catalog → product detail → cart → checkout |
| **Expected Output** | All pages render without horizontal scroll; all interactive elements tappable; layout adapts (hamburger menu, stacked cards) |

### E2E-NFR-001: New user completes purchase on first visit
| Field | Value |
|-------|-------|
| **REQ-ID** | NFR-001 |
| **Steps** | 1. New user visits site for first time<br>2. Registers via Google (1 click)<br>3. Searches "shoes"<br>4. Filters by size and price<br>5. Adds to cart<br>6. Checks out |
| **Expected Output** | User completes full purchase in under 3 minutes without external help |

### E2E-NFR-002: Mobile purchase flow
| Field | Value |
|-------|-------|
| **REQ-ID** | NFR-002 |
| **Steps** | 1. Open on mobile device (375x812)<br>2. Browse, search, add to cart, checkout |
| **Expected Output** | All steps functional; touch targets >= 44px; forms usable on mobile keyboard |
