"use client";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import Link from 'next/link';
import { removeFromWishlist, clearWishlist } from '../../store/slices/wishlistSlice';

export default function WishlistPage() {
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <>
          <ul className="mb-4">
            {wishlist.map(item => (
              <li key={item.id} className="mb-2 flex items-center gap-2">
                {item.name} - ${item.price.toFixed(2)}
                <button
                  onClick={() => dispatch(removeFromWishlist(Number(item.id)))}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded text-xs"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => dispatch(clearWishlist())}
          >
            Clear Wishlist
          </button>
        </>
      )}
      <Link href="/products" className="block mt-6 text-blue-600 hover:underline">
        Continue Shopping
      </Link>
    </main>
  );
}
