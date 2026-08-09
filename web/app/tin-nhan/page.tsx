import Link from 'next/link';

import { FiEdit3, FiMessageSquare } from 'react-icons/fi';

import InboxClient from '@/modules/tin-nhan/components/InboxClient';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hộp thư tin nhắn',
  description:
    'Tin nhắn với môi giới, chủ đầu tư và đội ngũ hỗ trợ RealtyHub — tất cả hội thoại quản lý tại một nơi.',
};

// ============================================================================
// Page
// ============================================================================

const TinNhanPage = () => (
  <main className="bg-gradient-to-b from-gray-50 to-white">
    {/* ============ 01 PAGE HEADER ============ */}
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-brand-950 to-cyan-950 py-10 text-white md:py-14">
      <div
        aria-hidden
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="site-container relative">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex-1">
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex items-center gap-2 text-theme-xs text-white/60">
                <li>
                  <Link href="/" className="transition hover:text-white">
                    Trang chủ
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/tai-khoan" className="transition hover:text-white">
                    Tài khoản
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-white/90">Tin nhắn</li>
              </ol>
            </nav>

            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-theme-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
              <FiMessageSquare aria-hidden className="h-3.5 w-3.5" />
              Hộp thư
            </span>

            <h1 className="mt-4 font-serif text-3xl font-light leading-tight md:text-4xl lg:text-5xl">
              Tin nhắn
              <span className="font-bold text-cyan-400"> của tôi</span>
            </h1>

            <p className="mt-3 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              Mọi cuộc trò chuyện với môi giới, chủ đầu tư và đội ngũ hỗ trợ — tập trung tại một nơi.
            </p>
          </div>

          <span
            aria-hidden
            className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-cyan-500/20 text-cyan-300 backdrop-blur-sm md:h-24 md:w-24"
          >
            <FiMessageSquare className="h-10 w-10 md:h-12 md:w-12" />
          </span>
        </div>
      </div>
    </section>

    {/* ============ 02 MAIN INBOX ============ */}
    <section className="site-container py-8 md:py-12">
      <InboxClient />
    </section>

    {/* ============ 03 HINT ============ */}
    <section className="site-container pb-12 md:pb-16">
      <div className="flex items-center gap-3 rounded-2xl border border-brand-100 bg-brand-50/50 px-5 py-4">
        <span
          aria-hidden
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600"
        >
          <FiEdit3 className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-gray-900">
            Cần tư vấn nhanh?
          </p>
          <p className="mt-0.5 text-theme-xs text-gray-600">
            Mở{' '}
            <span className="font-semibold text-brand-600">chatbot AI</span> ở
            góc phải màn hình để được hỗ trợ 24/7.
          </p>
        </div>
      </div>
    </section>
  </main>
);

export default TinNhanPage;
