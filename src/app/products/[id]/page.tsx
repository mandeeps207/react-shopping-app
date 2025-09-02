"use client";

import Link from 'next/link';
import { mockProducts } from '../../../utils/mockProducts';
import { useAuth } from '../../../components/Providers';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../store/slices/cartSlice';
import { use } from 'react';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const product = mockProducts.find(p => String(p.id) === id);
  const dispatch = useDispatch();
  const { user, loading } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!product) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link href="/products" className="text-blue-600 hover:underline">Back to Products</Link>
      </main>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, id: Number(product.id), quantity: 1 }));
  };

  // Calculate average rating
  const reviews = product.reviews || [];
  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, send review to backend here
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p className="mb-2">Price: ${product.price.toFixed(2)}</p>
      {avgRating && (
        <div className="mb-2">Average Rating: <span className="font-semibold">{avgRating} / 5</span> ({reviews.length} review{reviews.length !== 1 && 's'})</div>
      )}
      <button
        className="px-4 py-2 bg-green-600 text-white rounded"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <ul className="mb-4">
            {reviews.map((r, i) => (
              <li key={i} className="mb-2 border-b pb-2">
                <span className="font-semibold">{r.user}</span> - <span>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                <div>{r.comment}</div>
              </li>
            ))}
          </ul>
        )}
  {user ? (
          <form onSubmit={handleReviewSubmit} className="flex flex-col gap-2 mt-4 max-w-md">
            <label className="font-semibold">Your Rating:</label>
            <select value={rating} onChange={e => setRating(Number(e.target.value))} className="border p-2 rounded w-24">
              {[5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Your review..."
              className="border p-2 rounded"
              required
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-2">Submit Review</button>
            {submitted && <span className="text-green-600 mt-2">Thank you for your review! (Mock only)</span>}
          </form>
        ) : (
          <p className="text-gray-500 mt-4">Sign in to leave a review.</p>
        )}
      </div>
      <div className="mt-6">
        <Link href="/products" className="text-blue-600 hover:underline mr-4">Back to Products</Link>
        <Link href="/cart" className="text-blue-600 hover:underline">Go to Cart</Link>
      </div>
    </main>
  );
}
