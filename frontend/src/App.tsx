import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/layout/header'
import { AuthGuard } from './components/auth/auth-guard'
import { AdminGuard } from './components/auth/admin-guard'
import { Landing } from './pages/landing'
import { Home } from './pages/home'
import { ProductListing } from './pages/product-listing'
import { ProductDetail } from './pages/product-detail'
import { Cart } from './pages/cart'
import { Checkout } from './pages/checkout'
import { OrderConfirmation } from './pages/order-confirmation'
import { OrderHistory } from './pages/order-history'
import { Wishlist } from './pages/wishlist'
import { Profile } from './pages/profile'
import { AdminDashboard } from './pages/admin/dashboard'
import { SearchPage } from './pages/search'
import { NotificationsPage } from './pages/notifications'
import { AdminPromotions } from './pages/admin/promotions'
import VendorRegistration from './pages/vendor/register'
import VendorDashboard from './pages/vendor/dashboard'
import VendorPayouts from './pages/vendor/payouts'
import VendorProducts from './pages/vendor/products'
import Storefront from './pages/stores/storefront'
import AdminMarketplace from './pages/admin/marketplace'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-surface text-gray-900">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<ProductListing />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/stores/:slug" element={<Storefront />} />

            <Route path="/cart" element={<AuthGuard><Cart /></AuthGuard>} />
            <Route path="/checkout" element={<AuthGuard><Checkout /></AuthGuard>} />
            <Route path="/order-confirmation/:id" element={<AuthGuard><OrderConfirmation /></AuthGuard>} />
            <Route path="/orders" element={<AuthGuard><OrderHistory /></AuthGuard>} />
            <Route path="/wishlist" element={<AuthGuard><Wishlist /></AuthGuard>} />
            <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
            <Route path="/notifications" element={<AuthGuard><NotificationsPage /></AuthGuard>} />

            <Route path="/vendor/register" element={<AuthGuard><VendorRegistration /></AuthGuard>} />
            <Route path="/vendor/dashboard" element={<AuthGuard><VendorDashboard /></AuthGuard>} />
            <Route path="/vendor/payouts" element={<AuthGuard><VendorPayouts /></AuthGuard>} />
            <Route path="/vendor/products" element={<AuthGuard><VendorProducts /></AuthGuard>} />

            <Route path="/admin" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
            <Route path="/admin/promotions" element={<AdminGuard><AdminPromotions /></AdminGuard>} />
            <Route path="/admin/marketplace" element={<AdminGuard><AdminMarketplace /></AdminGuard>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
