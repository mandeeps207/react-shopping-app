"use client";
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

import { useAuth } from './Providers';
import { signInWithGoogle, signOutUser } from '../utils/firebaseAuth';

export default function Header() {
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const { user, loading } = useAuth();

  return (
    <header className="w-full flex items-center justify-between px-8 py-4 bg-white shadow mb-8">
      <div className="flex items-center gap-6">
        <Link href="/" className="text-xl font-bold text-blue-700">Shop</Link>
        <Link href="/products" className="hover:underline">Products</Link>
      </div>
      <div className="flex items-center gap-6">
        <Link href="/wishlist" className="hover:underline">Wishlist</Link>
        <Link href="/cart" className="relative">
          <span className="material-icons align-middle">shopping_cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
              {cartCount}
            </span>
          )}
        </Link>
        {loading ? null : user ? (
          <>
            <Link href="/profile" className="hover:underline">Profile</Link>
            <Link href="/orders" className="hover:underline">Orders</Link>
            <span className="text-gray-700">{user.displayName || user.email}</span>
            <button onClick={() => signOutUser()} className="text-blue-600 hover:underline">Sign out</button>
          </>
        ) : (
          <button onClick={() => signInWithGoogle()} className="text-blue-600 hover:underline">Sign in</button>
        )}
      </div>
    </header>
  );
}
