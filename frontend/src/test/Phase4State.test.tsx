import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act } from '@testing-library/react';

describe('Phase 4 State stores', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('analytics-store', () => {
    it('should have initial state with null analytics, null error, not loading', async () => {
      const mod = await import('../stores/analytics-store');
      const state = mod.useAnalyticsStore.getState();
      expect(state.analytics).toBeNull();
      expect(state.error).toBeNull();
      expect(state.loading).toBe(false);
    });

    it('should provide fetchAnalytics action as a function', async () => {
      const mod = await import('../stores/analytics-store');
      expect(typeof mod.useAnalyticsStore.getState().fetchAnalytics).toBe('function');
    });

    it('should allow setting analytics data', async () => {
      const mod = await import('../stores/analytics-store');
      act(() => mod.useAnalyticsStore.getState().setAnalytics({ conversionRate: 5.2, segments: [{ name: 'Premium', count: 120 }] }));
      const state = mod.useAnalyticsStore.getState();
      expect(state.analytics).toEqual({ conversionRate: 5.2, segments: [{ name: 'Premium', count: 120 }] });
    });
  });

  describe('loyalty-store', () => {
    it('should have initial state with null loyalty, null error, not loading', async () => {
      const mod = await import('../stores/loyalty-store');
      const state = mod.useLoyaltyStore.getState();
      expect(state.loyalty).toBeNull();
      expect(state.error).toBeNull();
      expect(state.loading).toBe(false);
    });

    it('should provide fetchLoyalty action as a function', async () => {
      const mod = await import('../stores/loyalty-store');
      expect(typeof mod.useLoyaltyStore.getState().fetchLoyalty).toBe('function');
    });

    it('should store loyalty balance', async () => {
      const mod = await import('../stores/loyalty-store');
      act(() => mod.useLoyaltyStore.getState().setLoyalty({ balance: 250, tier: 'Gold' }));
      const state = mod.useLoyaltyStore.getState();
      expect(state.loyalty).toEqual({ balance: 250, tier: 'Gold' });
    });
  });

  describe('referral-store', () => {
    it('should have initial state with null referrals, null rewards, not loading', async () => {
      const mod = await import('../stores/referral-store');
      const state = mod.useReferralStore.getState();
      expect(state.referrals).toBeNull();
      expect(state.rewards).toBeNull();
      expect(state.loading).toBe(false);
    });

    it('should provide fetchReferrals action as a function', async () => {
      const mod = await import('../stores/referral-store');
      expect(typeof mod.useReferralStore.getState().fetchReferrals).toBe('function');
    });

    it('should store referral rewards', async () => {
      const mod = await import('../stores/referral-store');
      act(() => mod.useReferralStore.getState().setRewards({ totalRewards: 500, referralCount: 3 }));
      const state = mod.useReferralStore.getState();
      expect(state.rewards).toEqual({ totalRewards: 500, referralCount: 3 });
    });
  });

  describe('ai-assistant-store', () => {
    it('should have initial state with null messages, null error, not loading', async () => {
      const mod = await import('../stores/ai-assistant-store');
      const state = mod.useAIAssistantStore.getState();
      expect(state.messages).toEqual([]);
      expect(state.error).toBeNull();
      expect(state.loading).toBe(false);
    });

    it('should provide sendMessage action as a function', async () => {
      const mod = await import('../stores/ai-assistant-store');
      expect(typeof mod.useAIAssistantStore.getState().sendMessage).toBe('function');
    });

    it('should add user message to history', async () => {
      const mod = await import('../stores/ai-assistant-store');
      act(() => mod.useAIAssistantStore.getState().addMessage('user', 'Hello AI'));
      const state = mod.useAIAssistantStore.getState();
      expect(state.messages).toHaveLength(1);
      expect(state.messages[0]).toEqual({ role: 'user', content: 'Hello AI' });
    });
  });
});
