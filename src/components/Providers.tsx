"use client";
import { Provider } from 'react-redux';
import { store } from '../store';

import PersistenceProvider from './PersistenceProvider';
import ToastProvider from './ToastProvider';
import { createContext, useEffect, useState, useContext } from 'react';
import { onAuthChange } from '../utils/firebaseAuth';


import { User } from 'firebase/auth';
interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ToastProvider>
        <PersistenceProvider>
          <AuthProvider>{children}</AuthProvider>
        </PersistenceProvider>
      </ToastProvider>
    </Provider>
  );
}
