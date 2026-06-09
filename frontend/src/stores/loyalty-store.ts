import { create } from 'zustand'
import api from '../api/client'

interface LoyaltyState {
  loyalty: any | null
  loading: boolean
  error: string | null
  fetchLoyalty: (userId: number) => Promise<void>
  setLoyalty: (data: any) => void
}

export const useLoyaltyStore = create<LoyaltyState>((set) => ({
  loyalty: null,
  loading: false,
  error: null,
  fetchLoyalty: async (userId: number) => {
    set({ loading: true, error: null })
    try {
      const { data } = await api.get(`/loyalty/${userId}`)
      set({ loyalty: data, loading: false })
    } catch {
      set({ error: 'Failed to fetch loyalty data', loading: false })
    }
  },
  setLoyalty: (data) => set({ loyalty: data }),
}))
