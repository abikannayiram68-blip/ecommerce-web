import { useEffect } from 'react';
import { useNotificationStore } from '../stores/notification-store';
import { Badge } from '../components/ui/badge';

const typeStyles: Record<string, string> = {
  order: 'border-l-4 border-l-primary-500',
  promo: 'border-l-4 border-l-accent-400',
  system: 'border-l-4 border-l-secondary-400',
};

const typeLabels: Record<string, string> = {
  order: 'Order',
  promo: 'Promotion',
  system: 'System',
};

export function NotificationsPage() {
  const { notifications, unreadCount, fetch, markRead } = useNotificationStore();

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-primary-50/20 to-surface-alt">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
            <p className="text-gray-500 mt-1">Stay updated with your orders and promotions</p>
          </div>
          {unreadCount > 0 && (
            <Badge variant="secondary" size="md">
              {unreadCount} unread
            </Badge>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <svg className="h-16 w-16 mb-4 text-primary-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
            <p className="text-lg font-medium">No notifications</p>
            <p className="text-sm mt-1">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => !n.read && markRead(n.id)}
                className={`rounded-xl bg-surface p-5 shadow-sm transition-all hover:shadow-md cursor-pointer ${typeStyles[n.type] || 'border-l-4 border-l-primary-500'} ${!n.read ? 'bg-primary-50/30' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={n.type === 'promo' ? 'accent' : 'primary'} size="sm">
                      {typeLabels[n.type] || n.type}
                    </Badge>
                    {!n.read && <span className="h-2 w-2 rounded-full bg-secondary-500" />}
                  </div>
                  <span className="text-xs text-gray-400">{new Date(n.createdAt).toLocaleDateString()}</span>
                </div>
                <h4 className="font-semibold text-gray-800">{n.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{n.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
