import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { SearchPage } from '../pages/search';

const mockGet = vi.fn();

vi.mock('../api/client', () => ({
  default: {
    get: (...args: any[]) => mockGet(...args),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

const mockResults = [
  { id: 1, name: 'Wireless Headphones', slug: 'wireless-headphones', price: 79.99, categoryId: 1, description: 'Great sound' },
  { id: 2, name: 'Phone Case', slug: 'phone-case', price: 19.99, categoryId: 3, description: 'Protective case' },
];

describe('SearchPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders search input and performs search', async () => {
    mockGet.mockResolvedValue({ data: { query: 'headphones', results: mockResults, suggestion: null } });

    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(/search products/i);
    await userEvent.type(input, 'headphones');

    const searchBtn = screen.getByRole('button', { name: /search/i });
    await userEvent.click(searchBtn);

    await waitFor(() => {
      expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
    });
    expect(mockGet).toHaveBeenCalledWith('/search', expect.objectContaining({ params: { q: 'headphones' } }));
  });

  it('displays suggestion when typo detected', async () => {
    mockGet.mockResolvedValue({ data: { query: 'headfones', results: [], suggestion: 'headphones' } });

    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(/search products/i);
    await userEvent.type(input, 'headfones');

    const searchBtn = screen.getByRole('button', { name: /search/i });
    await userEvent.click(searchBtn);

    await waitFor(() => {
      expect(screen.getByText(/did you mean/i)).toBeInTheDocument();
      expect(screen.getAllByText('headphones').length).toBeGreaterThan(0);
    });
  });

  it('renders filter sidebar', () => {
    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/category/i)).toBeInTheDocument();
    expect(screen.getByText(/price range/i)).toBeInTheDocument();
  });
});
