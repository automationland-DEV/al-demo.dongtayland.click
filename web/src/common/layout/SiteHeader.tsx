'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FiBell, FiChevronDown, FiMenu, FiMessageSquare, FiX } from 'react-icons/fi';
import AccountMenu from '@/common/components/AccountMenu';
import FavoriteButton from '@/common/layout/FavoriteButton';

const NAV_ITEMS = [
  { label: 'Giới thiệu', href: '/gioi-thieu' },
  { label: 'giỏ hàng', href: '/gio-hang' },
  { label: 'Đào tạo', href: '/dao-tao' },
  { label: 'Tiện ích', href: '/tien-ich' },
  { label: 'Tin tức', href: '/tin-tuc' },
    { label: 'Sự kiện', href: '/su-kien' },
];

/** Nhom "Khac" hien thi dropdown o desktop. 3 muc con nay cu cung duoc
    an tu header (chi truy cap qua dropdown) de tranh lap 2 lan. */
const MORE_MENU = {
  label: 'mục Khác',
  children: [
    { label: 'Trở thành môi giới', href: '/tro-thanh-moi-gioi' },
    { label: 'So sánh chính sách', href: '/so-sanh-chinh-sach' },
    { label: 'Liên hệ chúng tôi', href: '/lien-he-chung-toi' },
    { label: 'Góp ý & phản hồi', href: '/gop-y-va-phan-hoi' },
    { label: 'Hướng dẫn sử dụng', href: '/huong-dan' },
  ],
};

const BrandMark = () => (
  <Link href="/" className="flex items-center" aria-label="Trang chủ">
    <Image
      src="/images/home/realtyhub_new.svg"
      alt="RealtyHub"
      priority
      width={180}
      height={60}
      className="h-12 w-auto"
    />
  </Link>
);

const SiteHeader = () => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const moreRef = useRef<HTMLLIElement>(null);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const isMoreActive = MORE_MENU.children.some((c) => isActive(c.href));

  // Trang chu: header trong suot de banner noi bat; cuon xuong thi chuyen
  // sang solid (trang + border) de noi dung ben duoi doc duoc. Cac trang
  // khac luon solid, khong lang nghe scroll.
  useEffect(() => {
    if (pathname !== '/') return undefined;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 24);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  // Dong dropdown "Khac" khi:
  //  - click ra ngoai
  //  - nhan Esc
  //  - chuyen trang (pathname thay doi)
  useEffect(() => {
    if (!isMoreOpen) return undefined;
    const onClick = (e: MouseEvent) => {
      if (!moreRef.current?.contains(e.target as Node)) setIsMoreOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMoreOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [isMoreOpen]);

  const variant: 'solid' | 'transparent' =
    pathname === '/' && !isScrolled ? 'transparent' : 'solid';
  const isTransparent = variant === 'transparent';
  const headerColor = isTransparent
    ? 'bg-transparent border-transparent'
    : 'bg-white border-gray-200';
  const navColor = isTransparent
    ? {
        active: 'text-white underline decoration-white decoration-2 underline-offset-8',
        idle: 'text-white/85 hover:text-white',
        mobile: 'text-white',
        mobileActive: 'text-white',
      }
    : {
        active: 'text-navy-700 underline decoration-brand-500 decoration-2 underline-offset-8',
        idle: 'text-gray-600 hover:text-brand-600',
        mobile: 'text-gray-700',
        mobileActive: 'text-brand-600',
      };
  const iconColor = isTransparent
    ? 'text-white/90 hover:bg-white/15 hover:text-white'
    : 'text-gray-500 hover:bg-gray-100 hover:text-brand-600';
  const mobilePanelClass = isTransparent
    ? 'border-t border-white/20 bg-black/40 backdrop-blur-md'
    : 'border-t border-gray-200 bg-white';

  // Mau dropdown "Khac" - mo phong theo tone header (trang / den).
  const moreBtnActive = isMoreActive
    ? navColor.active
    : navColor.idle;
  const dropdownPanelClass = isTransparent
    ? 'border border-white/20 bg-black/80 backdrop-blur-md'
    : 'border border-gray-200 bg-white shadow-theme-lg';
  const dropdownItemClass = isTransparent
    ? 'text-white/85 hover:bg-white/10 hover:text-white'
    : 'text-gray-700 hover:bg-brand-50 hover:text-brand-600';
  const dropdownItemActiveClass = isTransparent
    ? 'bg-white/10 text-white'
    : 'bg-brand-50 text-brand-600';

  return (
    <header className={`sticky top-0 z-40 border-b transition-colors ${headerColor}`}>
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
                    isActive(item.href) ? navColor.active : navColor.idle
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {/* Dropdown "Khac" - desktop */}
            <li className="relative" ref={moreRef}>
              <button
                type="button"
                onClick={() => setIsMoreOpen((open) => !open)}
                aria-haspopup="menu"
                aria-expanded={isMoreOpen}
                aria-current={isMoreActive ? 'page' : undefined}
                className={`inline-flex items-center gap-1 text-theme-sm font-semibold uppercase tracking-wide transition ${moreBtnActive}`}
              >
                {MORE_MENU.label}
                <FiChevronDown
                  aria-hidden
                  className={`h-4 w-4 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isMoreOpen && (
                <div
                  role="menu"
                  aria-label={MORE_MENU.label}
                  className={`absolute right-0 top-full z-50 mt-3 min-w-56 overflow-hidden rounded-xl py-2 ${dropdownPanelClass}`}
                >
                  {MORE_MENU.children.map((child) => {
                    const active = isActive(child.href);
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        role="menuitem"
                        aria-current={active ? 'page' : undefined}
                        onClick={() => setIsMoreOpen(false)}
                        className={`block px-4 py-2.5 text-theme-sm font-medium transition ${
                          active ? dropdownItemActiveClass : dropdownItemClass
                        }`}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <Link
            href="/tin-nhan"
            aria-label="Tin nhắn"
            className={`flex h-9 w-9 items-center justify-center rounded-full transition ${iconColor}`}
          >
            <FiMessageSquare aria-hidden />
          </Link>

          {/* Icon yeu thich: badge so du an da luu. Component tu handle
              SSR (khong badge lan dau) + hydrate sau mount. */}
          <FavoriteButton iconClass={iconColor} />

          <Link
            href="/thong-bao"
            aria-label="Thông báo"
            className={`relative flex h-9 w-9 items-center justify-center rounded-full transition ${iconColor}`}
          >
            <FiBell aria-hidden />
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-error-500 px-1 text-[10px] font-bold text-white">
              3
            </span>
          </Link>

          {/* Account popover: avatar + ten neu da dang nhap, hoac nut "Dang nhap"
              neu chua. Click mo menu xo ra voi cac tuy chon tai khoan. */}
          <AccountMenu />

          <button
            type="button"
            onClick={() => setIsMobileOpen((open) => !open)}
            aria-label={isMobileOpen ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={isMobileOpen}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition lg:hidden ${iconColor}`}
          >
            {isMobileOpen ? <FiX aria-hidden /> : <FiMenu aria-hidden />}
          </button>
        </div>
      </div>

      {isMobileOpen && (
        <nav
          aria-label="Điều hướng di động"
          className={`lg:hidden ${mobilePanelClass}`}
        >
          <ul className="site-container flex flex-col py-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`block py-2.5 text-theme-sm font-semibold uppercase tracking-wide ${
                    isActive(item.href) ? navColor.mobileActive : navColor.mobile
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {/* Nhom "Khac" mobile - de mo dropdown noi truc tiep, dung <details>
                de khong can them state rieng. Mac dinh mo neu co muc con dang active. */}
            <li>
              <details
                open={isMoreActive || isMoreOpen}
                className="group"
              >
                <summary
                  className={`flex cursor-pointer items-center justify-between py-2.5 text-theme-sm font-semibold uppercase tracking-wide ${
                    isMoreActive ? navColor.mobileActive : navColor.mobile
                  }`}
                >
                  {MORE_MENU.label}
                  <FiChevronDown
                    aria-hidden
                    className="h-4 w-4 transition-transform group-open:rotate-180"
                  />
                </summary>
                <ul className="mb-1 ml-4 flex flex-col border-l border-current/20 pl-3">
                  {MORE_MENU.children.map((child) => {
                    const active = isActive(child.href);
                    return (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={() => setIsMobileOpen(false)}
                          aria-current={active ? 'page' : undefined}
                          className={`block py-2 text-theme-sm font-medium ${
                            active ? navColor.mobileActive : navColor.mobile
                          }`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </details>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default SiteHeader;