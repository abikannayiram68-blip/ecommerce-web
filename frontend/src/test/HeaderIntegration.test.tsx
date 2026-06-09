import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
vi.mock('../stores/auth-store', () => ({
  useAuthStore: vi.fn(),
}));

vi.mock('../stores/cart-store', () => ({
  useCartStore: vi.fn(),
}));

vi.mock('../stores/ui-store', () => ({
  useUiStore: vi.fn(),
}));

vi.mock('../stores/notification-store', () => ({
  useNotificationStore: vi.fn(),
}));

vi.mock('../stores/wishlist-store', () => ({
  useWishlistStore: vi.fn(),
}));

vi.mock('../stores/vendor-store', () => ({
  useVendorStore: vi.fn(),
}));

import { useAuthStore } from '../stores/auth-store';
import { useCartStore } from '../stores/cart-store';
import { useUiStore } from '../stores/ui-store';
import { useNotificationStore } from '../stores/notification-store';
import { useWishlistStore } from '../stores/wishlist-store';
import { useVendorStore } from '../stores/vendor-store';

const mockAuth = useAuthStore as any;
const mockCart = useCartStore as any;
const mockUi = useUiStore as any;
const mockNotif = useNotificationStore as any;
const mockWishlist = useWishlistStore as any;
const mockVendor = useVendorStore as any;

async function renderHeader() {
  const mod = await import('../components/layout/header');
  return render(<MemoryRouter><mod.Header /></MemoryRouter>);
}

describe('Header integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUi.mockReturnValue({ toggleMobileMenu: vi.fn() });
    mockNotif.mockReturnValue({ unreadCount: 0, fetch: vi.fn() });
    mockWishlist.mockReturnValue({ items: [], fetch: vi.fn() });
    mockCart.mockReturnValue({ items: [] });
  });

  it('auto-fetches vendor profile when authenticated', async () => {
    const fetchVendor = vi.fn();
    mockAuth.mockReturnValue({ isAuthenticated: true, user: { id: 1 }, logout: vi.fn() });
    mockVendor.mockReturnValue({ vendor: { id: 1, storeName: 'My Store' }, fetchVendor, loading: false });

    await renderHeader();

    await waitFor(() => {
      expect(fetchVendor).toHaveBeenCalled();
    });
  });

  it('shows vendor dashboard link when vendor profile exists', async () => {
    mockAuth.mockReturnValue({ isAuthenticated: true, user: { id: 1, name: 'Test' }, logout: vi.fn() });
    mockVendor.mockReturnValue({ vendor: { id: 1, storeName: 'My Store' }, fetchVendor: vi.fn(), loading: false });

    await renderHeader();

    await waitFor(() => {
      expect(screen.getByText(/my store/i)).toBeDefined();
    });
  });

  it('shows register link when no vendor profile', async () => {
    mockAuth.mockReturnValue({ isAuthenticated: true, user: { id: 1 }, logout: vi.fn() });
    mockVendor.mockReturnValue({ vendor: null, fetchVendor: vi.fn(), loading: false });

    await renderHeader();

    await waitFor(() => {
      expect(screen.getByText(/become a seller/i)).toBeDefined();
    });
  });

  it('shows admin link when user is admin', async () => {
    mockAuth.mockReturnValue({ isAuthenticated: true, user: { id: 1, role: 'admin' }, logout: vi.fn() });
    mockVendor.mockReturnValue({ vendor: null, fetchVendor: vi.fn(), loading: false });

    await renderHeader();

    await waitFor(() => {
      expect(screen.getByText(/admin/i)).toBeDefined();
    });
  });

  it('does not fetch vendor when not authenticated', async () => {
    const fetchVendor = vi.fn();
    mockAuth.mockReturnValue({ isAuthenticated: false, user: null, logout: vi.fn() });
    mockVendor.mockReturnValue({ vendor: null, fetchVendor, loading: false });

    await renderHeader();

    expect(fetchVendor).not.toHaveBeenCalled();
  });

  it('shows seller link when vendor store name exists', async () => {
    mockAuth.mockReturnValue({ isAuthenticated: true, user: { id: 1, name: 'Test' }, logout: vi.fn() });
    mockVendor.mockReturnValue({ vendor: { id: 1, storeName: 'Cool Shop' }, fetchVendor: vi.fn(), loading: false });

    await renderHeader();

    await waitFor(() => {
      expect(screen.getByText(/cool shop/i)).toBeDefined();
    });
  });
});
