"use client";
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Link from 'next/link';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_12345'); // Replace with your real Stripe public key

export default function PaymentPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const stripe = await stripePromise;
    // In a real app, create a Checkout Session on your server and redirect
    alert('This is a mock. Integrate with your backend for real payments.');
    setLoading(false);
    // Example: await stripe.redirectToCheckout({ sessionId: 'your-session-id' });
  };

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Payment</h1>
      <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
      <ul className="mb-4">
        {cartItems.map((item) => (
          <li key={item.id} className="mb-1">
            {item.name} x {item.quantity} - ${item.price.toFixed(2)}
          </li>
        ))}
      </ul>
      <p className="font-semibold mb-4">Total: ${total.toFixed(2)}</p>
      <button
        onClick={handleCheckout}
        className="bg-purple-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Pay with Stripe'}
      </button>
      <Link href="/cart" className="block mt-6 text-blue-600 hover:underline">
        Back to Cart
      </Link>
    </main>
  );
}
