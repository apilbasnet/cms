'use client';

import { createContext, use, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loading } from '@/components/loading';
import { User, users } from '../api/user.api';

interface IUser {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

const UserContext = createContext<IUser | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    users
      .me()
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!user) {
      router.replace('/');
    } else {
      router.replace('/dashboard');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const logout = useCallback(async () => {
    // await supabase.auth.signOut();
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  if (loading) return <Loading />;

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = use(UserContext);
  if (!ctx) throw new Error('useUser must be used within a UserProvider');

  return ctx;
}
