import { create } from 'zustand'
import api from '../api/client'

interface ReferralState {
  referrals: any[] | null
  rewards: any | null
  loading: boolean
  error: string | null
  fetchReferrals: (userId: number) => Promise<void>
  setRewards: (data: any) => void
}

export const useReferralStore = create<ReferralState>((set) => ({
  referrals: null,
  rewards: null,
  loading: false,
  error: null,
  fetchReferrals: async (userId: number) => {
    set({ loading: true, error: null })
    try {
      const [refRes, rewRes] = await Promise.all([
        api.get(`/referrals/${userId}`),
        api.get(`/referrals/${userId}/rewards`),
      ])
      set({ referrals: refRes.data, rewards: rewRes.data, loading: false })
    } catch {
      set({ error: 'Failed to fetch referral data', loading: false })
    }
  },
  setRewards: (data) => set({ rewards: data }),
}))
