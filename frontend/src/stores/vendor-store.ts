import { create } from 'zustand'
import api from '../api/client'

interface VendorState {
  vendor: any | null
  loading: boolean
  fetchVendor: () => Promise<void>
  clearVendor: () => void
}

export const useVendorStore = create<VendorState>((set) => ({
  vendor: null,
  loading: false,
  fetchVendor: async () => {
    set({ loading: true })
    try {
      const { data } = await api.get('/vendors/my/profile')
      set({ vendor: data, loading: false })
    } catch {
      set({ vendor: null, loading: false })
    }
  },
  clearVendor: () => set({ vendor: null }),
}))
