'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

/**
 * Mock auth cho web (chua noi backend).
 *
 * User duoc luu trong localStorage key `user` duoi dang JSON.
 * Con trang admin doc cookie `token` rieng - web khong chia se auth
 * voi admin (khong co SSO). Day la mot lua chon co y: web la kenh
 * public, moi gioi dang nhap de luu yeu thich / nhan lead - admin la
 * noi backend staff quan tri noi dung. Sau nay noi backend that, chi
 * can doi ham `readUser` o day.
 *
 * Dev muon test nhanh: mo DevTools, go
 *   localStorage.setItem('user', JSON.stringify({...}))
 * roi F5. Cac role SUPER_ADMIN / ADMIN se hien thi menu "Trang quan tri".
 */

export type UserRole = 'USER' | 'STAFF' | 'ADMIN' | 'SUPER_ADMIN';

export type CurrentUser = {
  name: string;
  email: string;
  /** URL tuyet doi hoac duong dan tu public/. Neu khong co se fallback chu cai dau. */
  avatar?: string;
  /** Role de phan quyen: USER/STAFF xem web; ADMIN/SUPER_ADMIN moi hien menu admin. */
  role: UserRole;
};

const STORAGE_KEY = 'user';

/** Doc user tu localStorage. Tra ve null neu chua dang nhap hoac JSON loi. */
export const readUser = (): CurrentUser | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CurrentUser>;
    if (!parsed?.name || !parsed?.email || !parsed?.role) return null;
    return parsed as CurrentUser;
  } catch {
    return null;
  }
};

/** Xoa user (logout). An toan goi nhieu lan. */
export const clearUser = () => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
};

/**
 * Hook theo doi user hien tai. Re-render component khi:
 *   - mount (doc localStorage qua lazy initializer - tranh setState trong effect)
 *   - storage event tu tab khac (1 user dang nhap o tab A, tab B tu cap nhat)
 *   - custom event `user:change` (noi bo trong cung tab khi set/clear)
 */
export const useCurrentUser = (): CurrentUser | null => {
  // Lazy initializer chi chay 1 lan o client khi hydration; can vo cung
  // quan trong vi localStorage chi ton tai o browser, server render se
  // tra ve null (SSR mismatch, nhung thuc te hook chi chay o client
  // component, nen OK).
  const [user, setUser] = useState<CurrentUser | null>(() => readUser());

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setUser(readUser());
    };
    const onLocal = () => setUser(readUser());
    window.addEventListener('storage', onStorage);
    window.addEventListener('user:change', onLocal);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('user:change', onLocal);
    };
  }, []);

  return user;
};

/** Hook logout tien ich: clear user + cookie token + redirect ve trang chu. */
export const useLogout = () => {
  const router = useRouter();
  return () => {
    clearUser();
    // Cookie `token` co the da duoc backend set khi SSO - xoa de tranh
    // tham chieu treo. Web chua dung cookie, nhung clear neu co.
    document.cookie = 'token=; Path=/; Max-Age=0; SameSite=Lax';
    window.dispatchEvent(new Event('user:change'));
    router.push('/');
    router.refresh();
  };
};

/** Mot so role co quyen truy cap admin panel. */
export const hasAdminAccess = (role: UserRole | undefined): boolean =>
  role === 'ADMIN' || role === 'SUPER_ADMIN';

/**
 * Tao URL slug tu ten user (khong dau, gach ngang, lowercase).
 * Vi du: "Nguyen Gia Khang" -> "nguyen-gia-khang".
 * Dung de di den trang profile public /ho-so/[slug].
 *
 * Khong can thay the chinh xac vi ta chi can unique-enough cho mock.
 * Khi noi backend that, slug den tu server.
 */
export const slugifyName = (name: string): string =>
  name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // bo dau
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'user';