import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { AdminPromotions } from '../pages/admin/promotions';

const mockGet = vi.fn();
const mockPost = vi.fn();

vi.mock('../api/client', () => ({
  default: {
    get: (...args: any[]) => mockGet(...args),
    post: (...args: any[]) => mockPost(...args),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

const mockPromotions = [
  { id: 1, title: 'Summer Sale', discountPercent: 20, active: true, startDate: '2026-06-01', endDate: '2026-07-01' },
];

describe('AdminPromotions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders promotions list', async () => {
    mockGet.mockResolvedValue({ data: mockPromotions });

    render(
      <BrowserRouter>
        <AdminPromotions />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Summer Sale')).toBeInTheDocument();
      expect(screen.getByText('20%')).toBeInTheDocument();
    });
  });

  it('allows creating a new promotion', async () => {
    mockGet.mockResolvedValue({ data: [] });
    mockPost.mockResolvedValue({ data: { id: 2 } });

    const { container } = render(
      <BrowserRouter>
        <AdminPromotions />
      </BrowserRouter>
    );

    const titleInput = screen.getByPlaceholderText(/promotion title/i);
    await userEvent.type(titleInput, 'Flash Sale');

    const dateInputs = container.querySelectorAll('input[type="date"]') as unknown as HTMLInputElement[];
    if (dateInputs.length >= 2) {
      fireEvent.change(dateInputs[0], { target: { value: '2026-07-01' } });
      fireEvent.change(dateInputs[1], { target: { value: '2026-07-31' } });
    }

    const createBtn = screen.getByRole('button', { name: /create promotion/i });
    await userEvent.click(createBtn);

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith('/promotions', expect.objectContaining({ title: 'Flash Sale' }));
    });
  });
});
