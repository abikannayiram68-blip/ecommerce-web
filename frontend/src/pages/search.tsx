import { useState } from 'react';
import api from '../api/client';
import { ProductCard } from '../components/product/product-card';

interface SearchResult {
  id: number;
  name: string;
  slug: string;
  price: number;
  categoryId: number;
  description: string;
}

export function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const doSearch = async (q?: string) => {
    const searchQuery = q ?? query;
    if (!searchQuery.trim()) return;
    setSearched(true);
    const params: Record<string, string | number> = { q: searchQuery };
    if (categoryId) params.categoryId = categoryId;
    if (minPrice) params.minPrice = +minPrice;
    if (maxPrice) params.maxPrice = +maxPrice;
    const { data } = await api.get('/search', { params });
    setResults(data.results || []);
    setSuggestion(data.suggestion);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-primary-50/20 to-surface-alt">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 p-8 shadow-xl mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Search Products</h1>
          <div className="flex gap-3">
            <input
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && doSearch()}
              className="flex-1 rounded-xl border-0 px-5 py-3 text-gray-800 placeholder-gray-400 shadow-inner focus:ring-2 focus:ring-accent-400 outline-none"
            />
            <button
              onClick={() => doSearch()}
              className="rounded-xl bg-accent-500 px-8 py-3 font-semibold text-white hover:bg-accent-600 transition-colors shadow-lg"
            >
              Search
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <div className="rounded-xl border border-primary-100 bg-surface p-5 shadow-sm h-fit">
            <h3 className="font-bold text-gray-700 mb-4">Filters</h3>
            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">Category</label>
                <select
                  value={categoryId ?? ''}
                  onChange={(e) => setCategoryId(e.target.value ? +e.target.value : undefined)}
                  className="w-full rounded-lg border border-primary-200 p-2 text-sm text-gray-700 focus:border-primary-400 outline-none"
                >
                  <option value="">All Categories</option>
                  <option value={1}>Electronics</option>
                  <option value={2}>Clothing</option>
                  <option value={3}>Accessories</option>
                  <option value={4}>Home</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">Price Range</label>
                <div className="flex gap-2">
                  <input
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    type="number"
                    className="w-full rounded-lg border border-primary-200 p-2 text-sm text-gray-700 placeholder-gray-400 focus:border-primary-400 outline-none"
                  />
                  <input
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    type="number"
                    className="w-full rounded-lg border border-primary-200 p-2 text-sm text-gray-700 placeholder-gray-400 focus:border-primary-400 outline-none"
                  />
                </div>
              </div>
              <button
                onClick={() => doSearch()}
                className="w-full rounded-lg bg-primary-600 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>

          <div>
            {!searched ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <svg className="h-16 w-16 mb-4 text-primary-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <p className="text-lg">Search for products above</p>
              </div>
            ) : (
              <>
                {suggestion && (
                  <div className="mb-4 rounded-lg bg-accent-50 border border-accent-200 p-4 text-accent-800">
                    <span>Did you mean </span>
                    <button
                      onClick={() => { setQuery(suggestion); doSearch(suggestion); }}
                      className="font-semibold underline hover:text-accent-600"
                    >
                      {suggestion}
                    </button>
                    ?
                  </div>
                )}

                {results.length === 0 ? (
                  <div className="flex flex-col items-center py-20 text-gray-400">
                    <p className="text-lg">No results found for "{query}"</p>
                    {suggestion && (
                      <p className="mt-2 text-sm">Try searching for "<span className="font-medium">{suggestion}</span>" instead</p>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
