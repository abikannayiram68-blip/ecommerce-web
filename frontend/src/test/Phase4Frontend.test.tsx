import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Phase 4 Frontend pages and routing', () => {
  describe('Admin analytics page', () => {
    it('should render AnalyticsDashboard page component', async () => {
      const mod = await import('../pages/admin/analytics');
      const el = render(<MemoryRouter><mod.AnalyticsDashboard /></MemoryRouter>);
      expect(el.container.querySelector('h1')).toBeTruthy();
    });

    it('should render SalesReports page component', async () => {
      const mod = await import('../pages/admin/reports');
      const el = render(<MemoryRouter><mod.SalesReports /></MemoryRouter>);
      expect(el.container.querySelector('h1')).toBeTruthy();
    });
  });

  describe('AI Assistant page', () => {
    it('should render AIAssistant page component', async () => {
      const mod = await import('../pages/ai-assistant');
      const el = render(<MemoryRouter><mod.AIAssistant /></MemoryRouter>);
      expect(el.container.querySelector('h1')).toBeTruthy();
    });
  });

  describe('Loyalty and Referral pages', () => {
    it('should render Loyalty page component', async () => {
      const mod = await import('../pages/loyalty');
      const el = render(<MemoryRouter><mod.LoyaltyPage /></MemoryRouter>);
      expect(el.container.querySelector('h1')).toBeTruthy();
    });

    it('should render Referral page component', async () => {
      const mod = await import('../pages/referrals');
      const el = render(<MemoryRouter><mod.ReferralPage /></MemoryRouter>);
      expect(el.container.querySelector('h1')).toBeTruthy();
    });
  });

  describe('Admin nav links in admin dashboard', () => {
    it('should have link to analytics page in admin dashboard', async () => {
      const mod = await import('../pages/admin/dashboard');
      const el = render(<MemoryRouter><mod.AdminDashboard /></MemoryRouter>);
      expect(el.container.innerHTML).toContain('analytics');
    });

    it('should have link to reports page in admin dashboard', async () => {
      const mod = await import('../pages/admin/dashboard');
      const el = render(<MemoryRouter><mod.AdminDashboard /></MemoryRouter>);
      expect(el.container.innerHTML).toContain('reports');
    });
  });
});
