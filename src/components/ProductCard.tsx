"use client";
import { Product } from '../utils/mockProducts';

import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';
import { RootState } from '../store';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const isWishlisted = wishlist.some(item => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, id: Number(product.id), quantity: 1 }));
  };

  const handleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow flex flex-col items-start">
      <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
      <p className="mb-2">${product.price.toFixed(2)}</p>
      <div className="flex gap-2">
        <button
          onClick={handleAddToCart}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Add to Cart
        </button>
        <button
          onClick={handleWishlist}
          className={`px-3 py-2 rounded border ${isWishlisted ? 'bg-pink-500 text-white' : 'bg-white text-pink-500 border-pink-500'} transition`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          {isWishlisted ? '♥' : '♡'}
        </button>
      </div>
    </div>
  );
}
