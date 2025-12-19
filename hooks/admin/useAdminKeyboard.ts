import { useEffect } from 'react';
import type { RefObject } from 'react';

type Params = {
  onExport: () => void;
  searchRef: RefObject<HTMLInputElement | null>;
};

export function useAdminKeyboard({ onExport, searchRef }: Params) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        searchRef.current?.focus(); // safe
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        onExport();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onExport, searchRef]);
}
