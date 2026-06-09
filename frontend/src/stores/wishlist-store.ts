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
    set({ loading: true });
    try {
      const { data } = await api.post('/wishlist/items', { productId });
      set({ items: data.items || [], loading: false });
    } catch (error: any) {
      set({ loading: false });
    }
  },
  removeItem: async (productId: number) => {
    set({ loading: true });
    try {
      await api.delete(`/wishlist/items/${productId}`);
      set((state) => ({
        items: state.items.filter((item) => item.productId !== productId),
        loading: false,
      }));
    } catch (error: any) {
      set({ loading: false });
    }
  },
}));
