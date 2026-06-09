import { create } from 'zustand'
import api from '../api/client'

interface AnalyticsState {
  analytics: any | null
  loading: boolean
  error: string | null
  fetchAnalytics: () => Promise<void>
  setAnalytics: (data: any) => void
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  analytics: null,
  loading: false,
  error: null,
  fetchAnalytics: async () => {
    set({ loading: true, error: null })
    try {
      const [convRes, segRes] = await Promise.all([
        api.get('/analytics/conversion'),
        api.get('/analytics/segments'),
      ])
      set({
        analytics: { ...convRes.data, segments: segRes.data.segments || [] },
        loading: false,
      })
    } catch {
      set({ error: 'Failed to fetch analytics', loading: false })
    }
  },
  setAnalytics: (data) => set({ analytics: data }),
}))
