"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from '../../../utils/firebaseAuth';
import { useAuth } from '../../../components/Providers';


export default function SignInPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [googleEnabled, setGoogleEnabled] = useState(true);

  if (!loading && user) {
    router.replace('/');
    return null;
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Authentication failed');
      }
    }
  };

  function isAuthErrorWithCode(error: unknown): error is { code: string } {
    return typeof error === 'object' && error !== null && 'code' in error && typeof (error as { code: unknown }).code === 'string';
  }

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await signInWithGoogle();
    } catch (err: unknown) {
      if (isAuthErrorWithCode(err) && err.code === 'auth/operation-not-allowed') {
        setGoogleEnabled(false);
        setError('Google sign-in is not enabled.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Google sign-in failed');
      }
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
      {googleEnabled && (
        <button
          onClick={handleGoogleSignIn}
          className="mb-4 bg-red-600 text-white px-4 py-2 rounded"
        >
          Sign in with Google
        </button>
      )}
      <form onSubmit={handleEmailAuth} className="flex flex-col gap-4 w-80">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>
      <button
        className="mt-4 text-blue-600 hover:underline"
        onClick={() => setIsSignUp(s => !s)}
      >
        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
      </button>
    </main>
  );
}
