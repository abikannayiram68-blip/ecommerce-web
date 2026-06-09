import { create } from 'zustand';

interface UiState {
  isMobileMenuOpen: boolean;
  isCartOpen: boolean;
  toggleMobileMenu: () => void;
  toggleCart: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  isMobileMenuOpen: false,
  isCartOpen: false,
  toggleMobileMenu: () => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),
  toggleCart: () => set((s) => ({ isCartOpen: !s.isCartOpen })),
}));
