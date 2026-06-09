import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

vi.mock('../stores/auth-store', () => ({
  useAuthStore: vi.fn(),
}));

import { useAuthStore } from '../stores/auth-store';

const mockUseAuthStore = useAuthStore as any;

function TestPage() {
  return <div>Protected Content</div>;
}

function HomePage() {
  return <div>Home Page</div>;
}

function renderWithGuard(Guard: React.ComponentType<{ children: React.ReactNode }>, initialRoute: string) {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/protected" element={<Guard><TestPage /></Guard>} />
        <Route path="/vendor/register" element={<div>Vendor Register</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe('AuthGuard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children when authenticated', async () => {
    mockUseAuthStore.mockReturnValue({ isAuthenticated: true, user: { id: 1 } });
    const { AuthGuard } = await import('../components/auth/auth-guard');
    renderWithGuard(AuthGuard, '/protected');
    expect(screen.getByText('Protected Content')).toBeDefined();
  });

  it('redirects to / when not authenticated', async () => {
    mockUseAuthStore.mockReturnValue({ isAuthenticated: false, user: null });
    const { AuthGuard } = await import('../components/auth/auth-guard');
    renderWithGuard(AuthGuard, '/protected');
    expect(screen.getByText('Home Page')).toBeDefined();
  });
});

describe('AdminGuard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children when user is admin', async () => {
    mockUseAuthStore.mockReturnValue({ isAuthenticated: true, user: { role: 'admin' } });
    const { AdminGuard } = await import('../components/auth/admin-guard');
    renderWithGuard(AdminGuard, '/protected');
    expect(screen.getByText('Protected Content')).toBeDefined();
  });

  it('redirects to / when user is not admin', async () => {
    mockUseAuthStore.mockReturnValue({ isAuthenticated: true, user: { role: 'customer' } });
    const { AdminGuard } = await import('../components/auth/admin-guard');
    renderWithGuard(AdminGuard, '/protected');
    expect(screen.getByText('Home Page')).toBeDefined();
  });

  it('redirects to / when not authenticated', async () => {
    mockUseAuthStore.mockReturnValue({ isAuthenticated: false, user: null });
    const { AdminGuard } = await import('../components/auth/admin-guard');
    renderWithGuard(AdminGuard, '/protected');
    expect(screen.getByText('Home Page')).toBeDefined();
  });
});

describe('VendorGuard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children when user has vendor profile', async () => {
    mockUseAuthStore.mockReturnValue({ isAuthenticated: true, user: { id: 1 } });
    const { VendorGuard } = await import('../components/auth/vendor-guard');
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vendor/register" element={<div>Vendor Register</div>} />
          <Route path="/protected" element={
            <VendorGuard vendorId={42}><TestPage /></VendorGuard>
          } />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Protected Content')).toBeDefined();
  });

  it('redirects to /vendor/register when no vendor profile', async () => {
    mockUseAuthStore.mockReturnValue({ isAuthenticated: true, user: { id: 1 } });
    const { VendorGuard } = await import('../components/auth/vendor-guard');
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vendor/register" element={<div>Vendor Register</div>} />
          <Route path="/protected" element={
            <VendorGuard vendorId={null}><TestPage /></VendorGuard>
          } />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Vendor Register')).toBeDefined();
  });
});
