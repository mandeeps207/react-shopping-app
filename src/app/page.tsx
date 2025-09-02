
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 gap-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to the React Shopping App</h1>
      <p className="mb-8 text-lg text-gray-600">Browse products, add to cart, and enjoy a modern shopping experience built with Next.js!</p>
      <div className="flex gap-6">
        <Link href="/products" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">View Products</Link>
        <Link href="/cart" className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition">Go to Cart</Link>
      </div>
    </main>
  );
}
