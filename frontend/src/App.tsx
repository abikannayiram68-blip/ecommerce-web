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
import VendorProducts from './pages/vendor/products'
import { AnalyticsDashboard } from './pages/admin/analytics'
import { SalesReports } from './pages/admin/reports'
import { AdminUsers } from './pages/admin/users'
import { AdminInventory } from './pages/admin/inventory'
import { AIAssistant } from './pages/ai-assistant'
import { LoyaltyPage } from './pages/loyalty'
import { ReferralPage } from './pages/referrals'
import { LoginPage } from './pages/login'
import { RegisterPage } from './pages/register'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-surface text-gray-900">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<ProductListing />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/search" element={<SearchPage />} />

            <Route path="/cart" element={<AuthGuard><Cart /></AuthGuard>} />
            <Route path="/checkout" element={<AuthGuard><Checkout /></AuthGuard>} />
            <Route path="/order-confirmation/:id" element={<AuthGuard><OrderConfirmation /></AuthGuard>} />
            <Route path="/orders" element={<AuthGuard><OrderHistory /></AuthGuard>} />
            <Route path="/wishlist" element={<AuthGuard><Wishlist /></AuthGuard>} />
            <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
            <Route path="/notifications" element={<AuthGuard><NotificationsPage /></AuthGuard>} />

            <Route path="/vendor/register" element={<AuthGuard><VendorRegistration /></AuthGuard>} />
            <Route path="/vendor/dashboard" element={<AuthGuard><VendorDashboard /></AuthGuard>} />
            <Route path="/vendor/products" element={<AuthGuard><VendorProducts /></AuthGuard>} />

            <Route path="/admin" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
            <Route path="/admin/promotions" element={<AdminGuard><AdminPromotions /></AdminGuard>} />
            <Route path="/admin/analytics" element={<AdminGuard><AnalyticsDashboard /></AdminGuard>} />
            <Route path="/admin/reports" element={<AdminGuard><SalesReports /></AdminGuard>} />
            <Route path="/admin/users" element={<AdminGuard><AdminUsers /></AdminGuard>} />
            <Route path="/admin/inventory" element={<AdminGuard><AdminInventory /></AdminGuard>} />
            <Route path="/ai-assistant" element={<AuthGuard><AIAssistant /></AuthGuard>} />
            <Route path="/loyalty" element={<AuthGuard><LoyaltyPage /></AuthGuard>} />
            <Route path="/referrals" element={<AuthGuard><ReferralPage /></AuthGuard>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
