import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NotificationsPage } from '../pages/notifications';

const mockGet = vi.fn();
const mockPut = vi.fn();

vi.mock('../api/client', () => ({
  default: {
    get: (...args: any[]) => mockGet(...args),
    put: (...args: any[]) => mockPut(...args),
  },
}));

const mockNotifications = [
  { id: 1, type: 'order', title: 'Order Shipped', message: 'Your order #123 has shipped.', read: false, createdAt: '2026-06-01' },
  { id: 2, type: 'promo', title: 'Sale!', message: '20% off everything.', read: true, createdAt: '2026-05-01' },
];

describe('NotificationsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders list of notifications', async () => {
    mockGet.mockResolvedValue({ data: mockNotifications });

    render(
      <BrowserRouter>
        <NotificationsPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Order Shipped')).toBeInTheDocument();
      expect(screen.getByText('Sale!')).toBeInTheDocument();
    });
  });

  it('shows unread badge', async () => {
    mockGet.mockResolvedValue({ data: mockNotifications });

    render(
      <BrowserRouter>
        <NotificationsPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/1 unread/i)).toBeInTheDocument();
    });
  });

  it('shows empty state when no notifications', async () => {
    mockGet.mockResolvedValue({ data: [] });

    render(
      <BrowserRouter>
        <NotificationsPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/no notifications/i)).toBeInTheDocument();
    });
  });
});
