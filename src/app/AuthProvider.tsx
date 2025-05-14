'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app } from '@/lib/firebase';

const AuthContext = createContext<{ user: User | null }>({ user: null });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth(app);
    return onAuthStateChanged(auth, u => setUser(u));
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);