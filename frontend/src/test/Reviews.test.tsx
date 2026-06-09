import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Reviews } from '../components/product/reviews';

const mockGet = vi.fn();
const mockPost = vi.fn();

vi.mock('../api/client', () => ({
  default: {
    get: (...args: any[]) => mockGet(...args),
    post: (...args: any[]) => mockPost(...args),
  },
}));

const mockReviews = [
  { id: 1, rating: 5, comment: 'Excellent!', userId: 1, user: { name: 'Alice' }, createdAt: '2026-01-01' },
  { id: 2, rating: 3, comment: 'Okay product', userId: 2, user: { name: 'Bob' }, createdAt: '2026-02-01' },
];

describe('Reviews', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders reviews list', async () => {
    mockGet.mockResolvedValue({ data: mockReviews });

    render(<Reviews productId={1} />);

    await waitFor(() => {
      expect(screen.getByText('Excellent!')).toBeInTheDocument();
      expect(screen.getByText('Okay product')).toBeInTheDocument();
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });
  });

  it('renders star ratings', async () => {
    mockGet.mockResolvedValue({ data: mockReviews });

    render(<Reviews productId={1} />);

    await waitFor(() => {
      const stars = screen.getAllByText('★');
      expect(stars.length).toBeGreaterThan(0);
    });
  });

  it('allows submitting a new review', async () => {
    mockGet.mockResolvedValue({ data: [] });
    mockPost.mockResolvedValue({ data: { id: 3, rating: 4, comment: 'Great!', user: { name: 'Me' } } });

    render(<Reviews productId={1} />);

    const commentInput = screen.getByPlaceholderText(/write a review/i);
    await userEvent.type(commentInput, 'Great!');

    const submitBtn = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith('/products/1/reviews', { rating: 5, comment: 'Great!' });
    });
  });
});
