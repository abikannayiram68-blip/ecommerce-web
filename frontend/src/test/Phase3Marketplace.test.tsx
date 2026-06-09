import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

vi.mock('../api/client', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
  },
}));

import api from '../api/client';

const mockGet = api.get as any;
const mockPost = api.post as any;
beforeEach(() => {
  vi.clearAllMocks();
});

function Wrapper({ children }: { children: React.ReactNode }) {
  return <BrowserRouter>{children}</BrowserRouter>;
}

describe('VendorRegistration page', () => {
  it('renders registration form', async () => {
    const VendorRegistration = (await import('../pages/vendor/register')).default;
    render(<Wrapper><VendorRegistration /></Wrapper>);
    expect(screen.getByText(/become a seller/i)).toBeDefined();
    expect(screen.getByLabelText(/store name/i)).toBeDefined();
  });

  it('submits registration form successfully', async () => {
    mockPost.mockResolvedValue({ data: { id: 1, storeName: 'My Store', status: 'pending' } });
    const VendorRegistration = (await import('../pages/vendor/register')).default;
    render(<Wrapper><VendorRegistration /></Wrapper>);

    await userEvent.type(screen.getByLabelText(/store name/i), 'My Store');
    await userEvent.type(screen.getByLabelText(/email/i), 'store@test.com');
    await userEvent.type(screen.getByLabelText(/slug/i), 'my-store');
    await userEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith('/vendors/register', {
        storeName: 'My Store',
        email: 'store@test.com',
        slug: 'my-store',
        description: '',
      });
    });
    expect(screen.getByText(/registration successful/i)).toBeDefined();
  });

  it('shows validation errors for empty form', async () => {
    const VendorRegistration = (await import('../pages/vendor/register')).default;
    render(<Wrapper><VendorRegistration /></Wrapper>);
    await userEvent.click(screen.getByRole('button', { name: /register/i }));
    expect(screen.getByText(/store name is required/i)).toBeDefined();
  });
});

describe('VendorDashboard page', () => {
  it('renders dashboard with stats', async () => {
    mockGet.mockResolvedValue({
      data: {
        id: 1,
        storeName: 'My Store',
        totalSales: 5000,
        totalPayout: 2000,
        rating: 4.5,
        reviewCount: 42,
        vendorProducts: [{ id: 1, status: 'active' }, { id: 2, status: 'active' }],
      },
    });
    const VendorDashboard = (await import('../pages/vendor/dashboard')).default;
    render(<Wrapper><VendorDashboard /></Wrapper>);
    await waitFor(() => {
      expect(mockGet).toHaveBeenCalledWith('/vendors/my/dashboard');
    });
    expect(screen.getByText(/my store/i)).toBeDefined();
    expect(screen.getByText(/\$5,000/)).toBeDefined();
  });

  it('shows not registered message when API fails', async () => {
    mockGet.mockRejectedValue(new Error('Not found'));
    const VendorDashboard = (await import('../pages/vendor/dashboard')).default;
    render(<Wrapper><VendorDashboard /></Wrapper>);
    await waitFor(() => {
      expect(screen.getByText(/not registered as a vendor/i)).toBeDefined();
    });
  });
});

describe('Storefront page', () => {
  it('renders store info and products', async () => {
    mockGet.mockResolvedValueOnce({
      data: { id: 1, storeName: 'Cool Store', description: 'Best store ever', rating: 4.2 },
    });
    mockGet.mockResolvedValueOnce({
      data: { products: [{ id: 1, product: { name: 'Widget', price: 19.99 } }], total: 1 },
    });
    const Storefront = (await import('../pages/stores/storefront')).default;
    render(
      <MemoryRouter initialEntries={['/stores/cool-store']}>
        <Routes>
          <Route path="/stores/:slug" element={<Storefront />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/cool store/i)).toBeDefined();
    });
    expect(screen.getByText(/widget/i)).toBeDefined();
  });

  it('shows empty products message when no products', async () => {
    mockGet.mockResolvedValueOnce({
      data: { id: 1, storeName: 'Empty Store', description: '', rating: 0, reviewCount: 0 },
    });
    mockGet.mockResolvedValueOnce({
      data: { products: [], total: 0 },
    });
    const Storefront = (await import('../pages/stores/storefront')).default;
    render(
      <MemoryRouter initialEntries={['/stores/empty-store']}>
        <Routes>
          <Route path="/stores/:slug" element={<Storefront />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/empty store/i)).toBeDefined();
    });
    expect(screen.getByText(/no products available/i)).toBeDefined();
  });
});

describe('AdminMarketplace page', () => {
  it('renders admin marketplace overview', async () => {
    mockGet.mockResolvedValue({ data: { payouts: [{ id: 1, amount: 100, status: 'pending' }], total: 1 } });
    const AdminMarketplace = (await import('../pages/admin/marketplace')).default;
    render(<Wrapper><AdminMarketplace /></Wrapper>);
    await waitFor(() => {
      expect(screen.getByText(/marketplace management/i)).toBeDefined();
    });
    await waitFor(() => {
      expect(screen.getByText(/\$100/)).toBeDefined();
    });
  });

  it('switches to commissions tab and shows plans', async () => {
    mockGet.mockResolvedValueOnce({ data: { payouts: [], total: 0 } });
    mockGet.mockResolvedValueOnce({ data: [] });
    mockGet.mockResolvedValueOnce({
      data: [{ id: 1, name: 'Standard', rate: 5, minPayout: 10, isDefault: true }],
    });
    const AdminMarketplace = (await import('../pages/admin/marketplace')).default;
    render(<Wrapper><AdminMarketplace /></Wrapper>);
    await waitFor(() => expect(screen.getByText(/marketplace management/i)).toBeDefined());
    await userEvent.click(screen.getByRole('button', { name: /commissions/i }));
    await waitFor(() => {
      expect(screen.getByText(/standard/i)).toBeDefined();
      expect(screen.getByText(/default/i)).toBeDefined();
      expect(screen.getByText(/5%/)).toBeDefined();
    });
  });
});

describe('VendorPayouts page', () => {
  it('renders payout history list', async () => {
    mockGet.mockResolvedValue({
      data: { payouts: [{ id: 1, amount: 200, status: 'completed', createdAt: '2025-01-15T00:00:00.000Z' }], total: 1 },
    });
    const VendorPayouts = (await import('../pages/vendor/payouts')).default;
    render(<Wrapper><VendorPayouts /></Wrapper>);
    await waitFor(() => {
      expect(mockGet).toHaveBeenCalledWith('/payouts/my');
    });
    await waitFor(() => {
      expect(screen.getByText(/\$200/)).toBeDefined();
    });
  });

  it('shows empty state when no payouts', async () => {
    mockGet.mockResolvedValue({ data: { payouts: [], total: 0 } });
    const VendorPayouts = (await import('../pages/vendor/payouts')).default;
    render(<Wrapper><VendorPayouts /></Wrapper>);
    await waitFor(() => {
      expect(screen.getByText(/no payouts yet/i)).toBeDefined();
    });
  });

  it('submits payout request', async () => {
    mockGet.mockResolvedValue({ data: { payouts: [], total: 0 } });
    mockPost.mockResolvedValue({ data: { id: 1, amount: 150, status: 'pending' } });
    const VendorPayouts = (await import('../pages/vendor/payouts')).default;
    render(<Wrapper><VendorPayouts /></Wrapper>);
    await waitFor(() => expect(screen.getByText(/payout history/i)).toBeDefined());
    await userEvent.type(screen.getByPlaceholderText(/amount/i), '150');
    await userEvent.click(screen.getByRole('button', { name: /request/i }));
    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith('/payouts/request', { amount: 150 });
    });
  });
});
