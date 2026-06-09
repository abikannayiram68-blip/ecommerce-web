import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Phase 4 Integration', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('Analytics page uses analytics-store', () => {
    it('should render AnalyticsDashboard with store integration', async () => {
      const pageMod = await import('../pages/admin/analytics');
      render(<MemoryRouter><pageMod.AnalyticsDashboard /></MemoryRouter>);
      expect(document.querySelector('h1')?.textContent).toContain('Analytics Dashboard');
    });
  });

  describe('Header has Phase 4 nav links when authenticated', () => {
    it('should have AI Assistant link in header when authenticated', async () => {
      const authMod = await import('../stores/auth-store');
      authMod.useAuthStore.getState().login('test-token', { id: 1, name: 'Test' });
      const headerMod = await import('../components/layout/header');
      render(<MemoryRouter initialEntries={['/']}><headerMod.Header /></MemoryRouter>);
      expect(document.body.innerHTML.toLowerCase()).toMatch(/ai.?assistant|ai-assistant/);
    });

    it('should have Loyalty link in header when authenticated', async () => {
      const authMod = await import('../stores/auth-store');
      authMod.useAuthStore.getState().login('test-token', { id: 1, name: 'Test' });
      const headerMod = await import('../components/layout/header');
      render(<MemoryRouter initialEntries={['/']}><headerMod.Header /></MemoryRouter>);
      expect(document.body.innerHTML.toLowerCase()).toMatch(/loyalty/);
    });

    it('should have Referral link in header when authenticated', async () => {
      const authMod = await import('../stores/auth-store');
      authMod.useAuthStore.getState().login('test-token', { id: 1, name: 'Test' });
      const headerMod = await import('../components/layout/header');
      render(<MemoryRouter initialEntries={['/']}><headerMod.Header /></MemoryRouter>);
      expect(document.body.innerHTML.toLowerCase()).toMatch(/refer/);
    });

    it('should NOT have Phase 4 links when not authenticated', async () => {
      const authMod = await import('../stores/auth-store');
      authMod.useAuthStore.getState().logout();
      const headerMod = await import('../components/layout/header');
      render(<MemoryRouter initialEntries={['/']}><headerMod.Header /></MemoryRouter>);
      const html = document.body.innerHTML.toLowerCase();
      expect(html).not.toMatch(/ai.?assistant|ai-assistant/);
      expect(html).not.toMatch(/loyalty/);
      expect(html).not.toMatch(/refer/);
    });
  });
});
