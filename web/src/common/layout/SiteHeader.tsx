'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiBell, FiMenu, FiMessageSquare, FiUser, FiX } from 'react-icons/fi';

const NAV_ITEMS = [
  { label: 'Giới thiệu', href: '/gioi-thieu' },
  { label: 'Dự án', href: '/du-an' },
  { label: 'Tin tức', href: '/tin-tuc' },
  { label: 'Sự kiện', href: '/su-kien' },
  { label: 'So sánh căn hộ', href: '/so-sanh-can-ho' },
  { label: 'Hướng dẫn sử dụng', href: '/huong-dan' },
];

const BrandMark = () => (
  <Link href="/du-an" className="flex items-center gap-2" aria-label="Trang chủ">
    <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden>
      <rect width="32" height="32" rx="8" fill="var(--color-brand-500)" />
      <path d="M9 21.5 16 8l7 13.5h-4.4L16 16.4l-2.6 5.1H9Z" fill="white" />
    </svg>
    <span className="text-lg font-extrabold uppercase tracking-tight text-navy-700">
      Saleplust
    </span>
  </Link>
);

const SiteHeader = () => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="site-container flex h-16 items-center justify-between gap-4">
        <BrandMark />

        <nav aria-label="Điều hướng chính" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`text-theme-sm font-semibold uppercase tracking-wide transition ${
                    isActive(item.href)
                      ? 'text-navy-700 underline decoration-brand-500 decoration-2 underline-offset-8'
                      : 'text-gray-600 hover:text-brand-600'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Tin nhắn"
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-brand-600"
          >
            <FiMessageSquare aria-hidden />
          </button>

          <button
            type="button"
            aria-label="Thông báo"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-brand-600"
          >
            <FiBell aria-hidden />
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-error-500 px-1 text-[10px] font-bold text-white">
              3
            </span>
          </button>

          <button
            type="button"
            aria-label="Tài khoản"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition hover:bg-brand-100"
          >
            <FiUser aria-hidden />
          </button>

          <button
            type="button"
            onClick={() => setIsMobileOpen((open) => !open)}
            aria-label={isMobileOpen ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={isMobileOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 lg:hidden"
          >
            {isMobileOpen ? <FiX aria-hidden /> : <FiMenu aria-hidden />}
          </button>
        </div>
      </div>

      {isMobileOpen && (
        <nav aria-label="Điều hướng di động" className="border-t border-gray-200 lg:hidden">
          <ul className="site-container flex flex-col py-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`block py-2.5 text-theme-sm font-semibold uppercase tracking-wide ${
                    isActive(item.href) ? 'text-brand-600' : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default SiteHeader;
