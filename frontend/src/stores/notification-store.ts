import { create } from 'zustand';
import api from '../api/client';

interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  fetch: () => Promise<void>;
  markRead: (id: number) => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  fetch: async () => {
    try {
      const { data } = await api.get('/notifications');
      const list: Notification[] = data;
      set({ notifications: list, unreadCount: list.filter((n) => !n.read).length });
    } catch { /* ignore */ }
  },
  markRead: async (id: number) => {
    try {
      await api.put(`/notifications/${id}/read`);
      set((s) => {
        const notifications = s.notifications.map((n) => n.id === id ? { ...n, read: true } : n);
        return { notifications, unreadCount: notifications.filter((n) => !n.read).length };
      });
    } catch { /* ignore */ }
  },
}));
