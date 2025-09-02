"use client";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import Link from 'next/link';
import { clearCart } from '../../store/slices/cartSlice';
import { useState } from 'react';
import { useAuth } from '../../components/Providers';
import { addOrder } from '../../utils/orderApi';
import { mockProducts } from '../../utils/mockProducts';

export default function CheckoutPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const userId = user?.email || 'guest';
    await addOrder({
      userId,
      items: cartItems.map(item => {
        const product = mockProducts.find(p => p.id === String(item.id));
        return {
          ...item,
          id: String(item.id),
          category: product?.category || '',
        };
      }),
      total,
    });
    setLoading(false);
    setSubmitted(true);
    dispatch(clearCart());
  };

  if (submitted) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-4">Thank you for your order!</h1>
        <Link href="/products" className="text-blue-600 hover:underline">Continue Shopping</Link>
      </main>
    );
  }

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
      <ul className="mb-4">
        {cartItems.map((item) => (
          <li key={item.id} className="mb-1">
            {item.name} x {item.quantity} - ${item.price.toFixed(2)}
          </li>
        ))}
      </ul>
      <p className="font-semibold mb-4">Total: ${total.toFixed(2)}</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="Name" className="border p-2 rounded" required />
        <input type="email" placeholder="Email" className="border p-2 rounded" required />
        <input type="text" placeholder="Address" className="border p-2 rounded" required />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
      <Link href="/payment" className="block mt-4 bg-purple-600 text-white px-4 py-2 rounded text-center hover:bg-purple-700 transition">
        Pay with Stripe
      </Link>
    </main>
  );
}
