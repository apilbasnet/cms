'use client';

import { useUser } from '@/lib/context/UserContext';
import { redirect } from 'next/navigation';

export function Protected({ children }: { children: React.ReactNode }) {
  const { user } = useUser();

  if (!user) {
    redirect('/');
  }

  return children;
}
