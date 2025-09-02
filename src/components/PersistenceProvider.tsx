"use client";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist } from '../store/slices/wishlistSlice';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { Product } from '../utils/mockProducts';

type CartItem = Product & { quantity: number };

export default function PersistenceProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  const wishlist = useSelector((state: RootState) => state.wishlist.items);

  // Load from localStorage on mount
  useEffect(() => {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      try {
        const items: CartItem[] = JSON.parse(cartData);
  items.forEach((item) => dispatch(addToCart({ ...item, id: Number(item.id) })));
      } catch {}
    }
    const wishlistData = localStorage.getItem('wishlist');
    if (wishlistData) {
      try {
        const items: Product[] = JSON.parse(wishlistData);
        items.forEach((item) => dispatch(addToWishlist(item)));
      } catch {}
    }
    // eslint-disable-next-line
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  return <>{children}</>;
}
