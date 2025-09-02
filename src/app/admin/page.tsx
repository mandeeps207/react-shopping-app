"use client";
import { useAuth } from '../../components/Providers';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getProducts, addProduct, deleteProduct } from '../../utils/productApi';
import { Product } from '../../utils/mockProducts';

export default function AdminPage() {
  const { user, loading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', price: '', category: '', image: '' });
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    if (loading || !user || user.email !== 'infocus8150@gmail.com') return;
    getProducts().then(data => {
      setProducts(data);
      setProductsLoading(false);
    });
  }, [loading, user]);

  if (loading) return null;
  if (!user) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p>You must be signed in to access the admin dashboard.</p>
        <Link href="#" className="text-blue-600 hover:underline" onClick={() => window.location.href = '/'}>Sign in</Link>
      </main>
    );
  }
  if (!user || user.email !== 'infocus8150@gmail.com') {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p>You do not have admin access.</p>
        <div className="mt-4 text-sm text-red-600 font-mono">
          <strong>Debug info:</strong>
          {user ? (
            <>
              <div>user.email: {user.email || 'N/A'}</div>
              <div>user object: <pre className="whitespace-pre-wrap">{JSON.stringify(user, null, 2)}</pre></div>
            </>
          ) : (
            <div>No user is currently signed in.</div>
          )}
        </div>
      </main>
    );
  }

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    setProducts(products.filter(p => p.id !== id));
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      name: form.name,
      price: Number(form.price),
      category: form.category,
      image: imagePreview || '',
      reviews: [],
    };
    await addProduct(newProduct);
    const updated = await getProducts();
    setProducts(updated);
    setForm({ name: '', price: '', category: '', image: '' });
    setImagePreview('');
    setShowForm(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview('');
    }
  };

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Cancel' : 'Add New Product'}
      </button>
      {showForm && (
        <form onSubmit={handleAdd} className="flex flex-col gap-2 mb-6">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
            className="border p-2 rounded"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 rounded"
          />
          {imagePreview && (
            <Image src={imagePreview} alt="Preview" width={128} height={128} className="w-32 h-32 object-cover rounded border" />
          )}
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Product</button>
        </form>
      )}
      {productsLoading ? (
        <div>Loading products...</div>
      ) : (
        <ul className="space-y-4">
          {products.map(product => (
            <li key={product.id} className="border rounded p-4 flex justify-between items-center">
              <div>
                {product.image && (
                  <Image src={product.image} alt={product.name} width={64} height={64} className="w-16 h-16 object-cover rounded mb-2" />
                )}
                <div className="font-semibold">{product.name}</div>
                <div className="text-gray-600">${product.price.toFixed(2)} | {product.category}</div>
              </div>
              <button
                onClick={() => handleDelete(product.id)}
                className="px-3 py-1 bg-red-500 text-white rounded text-xs"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

