import Link from 'next/link';

import type { MenuItem as MenuItemType } from '../mocks/profile.mock';
import { TONE_TILE } from './ProfileCard';

const BADGE_STYLES: Record<string, string> = {
  // Badge "Tinh nang moi" - xanh nhat
  new: 'bg-success-50 text-success-700 border-success-500/30',
  // Badge "Tao ngay" - vang gold
  gold: 'bg-warning-500 text-white border-warning-600',
  // Badge "PRO" - den, in dam
  pro: 'bg-navy-800 text-white border-navy-800',
};

/**
 * Mot dong item: tile icon (emoji) + label + arrow, co the kem badge.
 * Click vao: neu co `href` -> next/link; neu khong -> button vo hieu (placeholder).
 */
const MenuItem = ({ item }: { item: MenuItemType }) => {
  const inner = (
    <>
      {/* Tile icon emoji */}
      <span
        aria-hidden
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${TONE_TILE[item.tone] ?? TONE_TILE.gray}`}
      >
        {item.emoji}
      </span>

      {/* Label + badge */}
      <span className="flex flex-1 items-center gap-2">
        <span className="flex-1 text-theme-sm font-semibold text-gray-800">
          {item.label}
        </span>
        {item.badge && (
          <span
            className={`shrink-0 rounded-md border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${BADGE_STYLES[item.badge.variant] ?? BADGE_STYLES.new}`}
          >
            {item.badge.text}
          </span>
        )}
      </span>

      {/* Arrow ben phai */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
        className="h-4 w-4 shrink-0 text-gray-400"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </>
  );

  const className =
    'group flex w-full items-center gap-3 px-4 py-3 transition hover:bg-gray-50 active:bg-gray-100';

  if (item.href) {
    return (
      <Link href={item.href} className={className}>
        {inner}
      </Link>
    );
  }
  return <div className={className}>{inner}</div>;
};

/**
 * Section: card trang boc mot list menu items. Co title section (khong
 * bat buoc) + divider giua cac item.
 */
const MenuSection = ({
  title,
  items,
  /** Mau vien: mac dinh trang, co the set 'warning'/'error' de nhan manh. */
  variant = 'default',
}: {
  title?: string;
  items: MenuItemType[];
  variant?: 'default' | 'warning' | 'error';
}) => {
  const borderClass =
    variant === 'warning'
      ? 'border-warning-500/30'
      : variant === 'error'
        ? 'border-error-500/30'
        : 'border-gray-200';

  return (
    <section className={`overflow-hidden rounded-2xl border bg-white shadow-theme-sm ${borderClass}`}>
      {title && (
        <h2 className="px-4 pt-3.5 text-[11px] font-bold uppercase tracking-wider text-gray-500">
          {title}
        </h2>
      )}
      <ul className="divide-y divide-gray-100">
        {items.map((item, idx) => (
          <li key={`${item.label}-${idx}`}>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MenuSection;