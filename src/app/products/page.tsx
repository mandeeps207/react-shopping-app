"use client";
import Link from 'next/link';
import ProductCard from '../../components/ProductCard';

import { mockProducts, Product } from '../../utils/mockProducts';
import { useState } from 'react';

const categories = Array.from(new Set(mockProducts.map(p => p.category)));

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [category, setCategory] = useState('');

  const filtered = mockProducts.filter((product: Product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesMin = minPrice === '' || product.price >= Number(minPrice);
    const matchesMax = maxPrice === '' || product.price <= Number(maxPrice);
    const matchesCategory = category === '' || product.category === category;
    return matchesSearch && matchesMin && matchesMax && matchesCategory;
  });

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <form className="flex flex-wrap gap-4 mb-6 items-end">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Min price"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          className="border p-2 rounded w-32"
        />
        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          className="border p-2 rounded w-32"
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <p className="col-span-full text-gray-500">No products found.</p>
        ) : (
          filtered.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
              <Link href={`/products/${product.id}`} className="text-blue-600 hover:underline block mt-2">
                View Details
              </Link>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
