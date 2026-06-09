import { create } from 'zustand';
import api from '../api/client';

interface WishlistItem {
  id: number;
  productId: number;
  product?: { id: number; name: string; slug: string; price: number };
}

interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
  fetch: () => Promise<void>;
  addItem: (productId: number) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
}

export const useWishlistStore = create<WishlistState>((set) => ({
  items: [],
  loading: false,
  fetch: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get('/wishlist');
      set({ items: data.items || [], loading: false });
    } catch {
      set({ loading: false });
    }
  },
  addItem: async (productId: number) => {
    try {
      const { data } = await api.post('/wishlist', { productId });
      set((s) => ({ items: [...s.items, data] }));
    } catch { /* ignore */ }
  },
  removeItem: async (productId: number) => {
    try {
      await api.delete(`/wishlist/${productId}`);
      set((s) => ({ items: s.items.filter((i) => i.productId !== productId) }));
    } catch { /* ignore */ }
  },
}));
