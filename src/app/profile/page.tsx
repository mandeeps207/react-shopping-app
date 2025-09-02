"use client";
import { useAuth } from '../../components/Providers';
import Link from 'next/link';

export default function ProfilePage() {

  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p>You must be signed in to view your profile.</p>
        <Link href="#" className="text-blue-600 hover:underline" onClick={() => window.location.href = '/'}>Sign in</Link>
      </main>
    );
  }

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="mb-4">
        <div><span className="font-semibold">Name:</span> {user.displayName || user.email}</div>
        <div><span className="font-semibold">Email:</span> {user.email}</div>
      </div>
      <Link href="/orders" className="text-blue-600 hover:underline mr-4">Order History</Link>
      <Link href="/wishlist" className="text-blue-600 hover:underline">Wishlist</Link>
    </main>
  );
}
