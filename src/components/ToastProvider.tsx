"use client";
import { useState, useCallback, createContext, useContext } from 'react';

const ToastContext = createContext<(msg: string) => void>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {message && (
        <div className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in">
          {message}
        </div>
      )}
    </ToastContext.Provider>
  );
}
