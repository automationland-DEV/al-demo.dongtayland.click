'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';

export type FooterLink = { label: string; href: string };

type FooterLinkListProps = {
  title: string;
  /** Cac muc luon hien */
  links: FooterLink[];
  /** Cac muc nam sau nut "Xem them" - de trong thi khong render nut */
  moreLinks?: FooterLink[];
  /**
   * `button` = nut nen navy dac nhu cot "Danh cho moi gioi" trong ban thiet ke;
   * `text` = dong chu tran nhu cot "Thong tin khac".
   */
  moreStyle?: 'button' | 'text';
  className?: string;
};

const LinkRow = ({ link }: { link: FooterLink }) => (
  <li>
    <Link
      href={link.href}
      className="group flex items-start gap-1.5 text-theme-sm text-gray-600 transition hover:text-brand-600"
    >
      <FiChevronRight
        aria-hidden
        className="mt-1 shrink-0 text-brand-400 transition group-hover:translate-x-0.5"
      />
      <span>{link.label}</span>
    </Link>
  </li>
);


const FooterLinkList = ({
  title,
  links,
  moreLinks = [],
  moreStyle = 'text',
  className = '',
}: FooterLinkListProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasMore = moreLinks.length > 0;

  return (
    <div className={className}>
      <h2 className="mb-5 text-theme-sm font-bold uppercase tracking-wide text-navy-800">
        {title}
        <span aria-hidden className="mt-2 block h-0.5 w-9 rounded-full bg-brand-500" />
      </h2>

      <ul className="space-y-3">
        {links.map((link) => (
          <LinkRow key={link.href} link={link} />
        ))}
        {isOpen && moreLinks.map((link) => <LinkRow key={link.href} link={link} />)}
      </ul>

      {hasMore && (
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          className={
            moreStyle === 'button'
              ? 'mt-5 inline-flex items-center gap-2 rounded-lg bg-navy-800 px-5 py-2.5 text-theme-sm font-semibold text-white transition hover:bg-navy-700'
              : 'mt-4 inline-flex items-center gap-1.5 text-theme-sm text-gray-600 transition hover:text-brand-600'
          }
        >
          {isOpen ? 'Thu gọn' : 'Xem thêm'}
          <FiChevronDown
            aria-hidden
            className={`transition ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      )}
    </div>
  );
};

export default FooterLinkList;
