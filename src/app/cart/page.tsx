"use client";
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { removeFromCart, clearCart } from '../../store/slices/cartSlice';

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="mb-4">
            {cartItems.map((item) => (
              <li key={item.id} className="mb-2 flex items-center gap-2">
                {item.name} x {item.quantity} - ${item.price.toFixed(2)}
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded text-xs"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p className="font-semibold">Total: ${total.toFixed(2)}</p>
          <div className="flex gap-4 mt-4">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
            <Link href="/checkout" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
              Checkout
            </Link>
          </div>
        </div>
      )}
      <Link href="/products" className="block mt-6 text-blue-600 hover:underline">
        Continue Shopping
      </Link>
    </main>
  );
}
