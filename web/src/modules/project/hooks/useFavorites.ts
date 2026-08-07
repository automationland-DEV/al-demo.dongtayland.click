'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * Danh sach du an da luu (icon trai tim tren card).
 *
 * Luu o localStorage nen doi bo loc, sang trang khac hay tai lai deu khong mat.
 * Dung useSyncExternalStore thay vi useState + useEffect: hook nay co san
 * snapshot rieng cho phia server nen khong gay hydration mismatch.
 *
 * Khi co dang nhap that: doi hai ham read/write sang goi API, va merge
 * danh sach dang o localStorage vao tai khoan ngay sau khi login.
 */
const STORAGE_KEY = 'saleplust:favorite-projects';

const EMPTY: string[] = [];

const listeners = new Set<() => void>();

// Cache theo chuoi JSON tho: getSnapshot buoc phai tra ve cung mot tham chieu
// khi du lieu khong doi, neu khong React se render lai vo han.
let cachedRaw: string | null = null;
let cachedValue: string[] = EMPTY;

const readSnapshot = (): string[] => {
  if (typeof window === 'undefined') return EMPTY;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedValue;

  cachedRaw = raw;
  try {
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    cachedValue = Array.isArray(parsed) ? (parsed as string[]) : EMPTY;
  } catch {
    // localStorage bi ghi hong -> coi nhu chua luu gi
    cachedValue = EMPTY;
  }
  return cachedValue;
};

const getServerSnapshot = () => EMPTY;

const subscribe = (onChange: () => void) => {
  listeners.add(onChange);
  // Dong bo giua nhieu tab dang mo
  window.addEventListener('storage', onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener('storage', onChange);
  };
};

const write = (next: string[]) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  listeners.forEach((listener) => listener());
};

export const useFavorites = () => {
  const favorites = useSyncExternalStore(subscribe, readSnapshot, getServerSnapshot);

  const toggle = useCallback((publicId: string) => {
    const current = readSnapshot();
    write(
      current.includes(publicId)
        ? current.filter((id) => id !== publicId)
        : [...current, publicId],
    );
  }, []);

  const isFavorite = useCallback(
    (publicId: string) => favorites.includes(publicId),
    [favorites],
  );

  return { favorites, isFavorite, toggle };
};
