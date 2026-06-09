import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth-store';
import { useCartStore } from '../../stores/cart-store';
import { useUiStore } from '../../stores/ui-store';
import { useNotificationStore } from '../../stores/notification-store';
import { useWishlistStore } from '../../stores/wishlist-store';
import { useVendorStore } from '../../stores/vendor-store';
import { useEffect } from 'react';

export function Header() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { items } = useCartStore();
  const { toggleMobileMenu } = useUiStore();
  const { unreadCount, fetch: fetchNotifs } = useNotificationStore();
  const { items: wishlistItems, fetch: fetchWishlist } = useWishlistStore();
  const { vendor, fetchVendor } = useVendorStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifs();
      fetchWishlist();
      fetchVendor();
    }
  }, [isAuthenticated, fetchNotifs, fetchWishlist, fetchVendor]);

  return (
    <header className="border-b border-primary-100 bg-white shadow-sm sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
            ShopHub
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/products" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">Products</Link>
            <Link to="/search" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">Search</Link>
            <Link to="/orders" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">Orders</Link>

            {isAuthenticated && (
              <>
                <Link to="/ai-assistant" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                  AI Assistant
                </Link>
                <Link to="/loyalty" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                  Loyalty
                </Link>
                <Link to="/referrals" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                  Referrals
                </Link>
              </>
            )}
            {vendor ? (
              <Link to="/vendor/dashboard" className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
                {vendor.storeName}
              </Link>
            ) : isAuthenticated ? (
              <Link to="/vendor/register" className="text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors">
                Become a Seller
              </Link>
            ) : null}

            <Link to="/wishlist" className="relative text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-secondary-500 text-[10px] font-bold text-white">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link to="/notifications" className="relative text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-secondary-500 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 text-[10px] font-bold text-white">
                  {items.length}
                </span>
              )}
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="text-sm font-medium text-gray-600 hover:text-primary-600">Admin</Link>
                )}
                <Link to="/profile" className="text-sm font-medium text-gray-600 hover:text-primary-600">{user?.name || 'Profile'}</Link>
                <button onClick={logout} className="text-sm font-medium text-secondary-600 hover:text-secondary-700 transition-colors">Logout</button>
              </>
            ) : (
              <Link to="/login" className="rounded-lg bg-gradient-to-r from-primary-600 to-secondary-500 px-5 py-2 text-sm font-medium text-white hover:opacity-90 transition-all shadow-sm">
                Sign In
              </Link>
            )}
            <button onClick={toggleMobileMenu} className="md:hidden text-gray-600 hover:text-primary-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
