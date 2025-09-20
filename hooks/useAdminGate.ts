'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAdminGate() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const ok = typeof window !== 'undefined' && localStorage.getItem('isAdmin');
    if (ok) setIsAdmin(true);
    else router.replace('/admin/login');
    setReady(true);
  }, [router]);

  return { ready, isAdmin };
}
