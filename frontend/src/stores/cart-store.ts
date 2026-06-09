import { create } from 'zustand';
import api from '../api/client';

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: any;
}

interface CartState {
  items: CartItem[];
  total: number;
  loading: boolean;
  fetchCart: () => Promise<void>;
  addItem: (productId: number, quantity?: number) => Promise<void>;
  updateItem: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  total: 0,
  loading: false,
  fetchCart: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get('/cart');
      set({ items: data.items, total: data.total });
    } finally {
      set({ loading: false });
    }
  },
  addItem: async (productId, quantity = 1) => {
    await api.post('/cart/items', { productId, quantity });
    await get().fetchCart();
  },
  updateItem: async (itemId, quantity) => {
    await api.put(`/cart/items/${itemId}`, { quantity });
    await get().fetchCart();
  },
  removeItem: async (itemId) => {
    await api.delete(`/cart/items/${itemId}`);
    await get().fetchCart();
  },
  clearCart: async () => {
    await api.delete('/cart');
    set({ items: [], total: 0 });
  },
}));
