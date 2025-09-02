"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [status, router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      <form method="post" action="/api/auth/callback/credentials" className="flex flex-col gap-4 w-80">
        <input name="username" type="text" placeholder="Username" className="border p-2 rounded" required />
        <input name="password" type="password" placeholder="Password" className="border p-2 rounded" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Sign In</button>
      </form>
    </main>
  );
}
