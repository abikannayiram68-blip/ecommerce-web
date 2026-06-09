import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Wishlist } from '../pages/wishlist';

const mockGet = vi.fn();
const mockPost = vi.fn();
const mockDelete = vi.fn();

vi.mock('../api/client', () => ({
  default: {
    get: (...args: any[]) => mockGet(...args),
    post: (...args: any[]) => mockPost(...args),
    delete: (...args: any[]) => mockDelete(...args),
  },
}));

const mockWishlist = [
  { id: 1, productId: 1, product: { id: 1, name: 'Headphones', slug: 'headphones', price: 79.99 } },
  { id: 2, productId: 2, product: { id: 2, name: 'Keyboard', slug: 'keyboard', price: 49.99 } },
];

describe('Wishlist', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders wishlist items', async () => {
    mockGet.mockResolvedValue({ data: { items: mockWishlist } });

    render(
      <BrowserRouter>
        <Wishlist />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Headphones')).toBeInTheDocument();
      expect(screen.getByText('Keyboard')).toBeInTheDocument();
    });
  });

  it('shows empty wishlist message', async () => {
    mockGet.mockResolvedValue({ data: { items: [] } });

    render(
      <BrowserRouter>
        <Wishlist />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/wishlist is empty/i)).toBeInTheDocument();
    });
  });
});
