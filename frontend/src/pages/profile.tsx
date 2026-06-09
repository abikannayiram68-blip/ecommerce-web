import { useAuthStore } from '../stores/auth-store';

export function Profile() {
  const { user } = useAuthStore();
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
      <div className="mt-8 rounded-lg border p-6">
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </div>
    </div>
  );
}
