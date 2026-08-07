'use client';

import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';
import PlaceholderThumb from '@/common/components/PlaceholderThumb';
import { MOCK_NEWS } from '../mocks/news.mock';
import { NEWS_CATEGORY_LABELS, type NewsArticle } from '../models/news.model';

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Ho_Chi_Minh',
  }).format(new Date(iso));

const NewsCard = ({ article }: { article: NewsArticle }) => (
  <article className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-card transition hover:shadow-card-hover">
    <div className="relative aspect-[16/9] w-full overflow-hidden">
      <Link href={`/tin-tuc/${article.slug}`} className="block h-full w-full">
        <PlaceholderThumb
          seed={article.publicId}
          src={article.thumbnailUrl || undefined}
          alt={`Ảnh bài viết ${article.title}`}
        />
      </Link>
      <span className="absolute left-2 top-2 rounded-full bg-accent-500 px-2.5 py-1 text-[11px] font-semibold text-white">
        {NEWS_CATEGORY_LABELS[article.category]}
      </span>
    </div>

    <div className="flex flex-1 flex-col gap-2 p-3">
      <h3 className="line-clamp-2 text-theme-sm font-semibold leading-snug text-gray-800">
        <Link href={`/tin-tuc/${article.slug}`} className="transition hover:text-brand-600">
          {article.title}
        </Link>
      </h3>

      <div className="mt-auto flex items-center justify-between pt-2 text-theme-xs text-gray-500">
        <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        <Link
          href={`/tin-tuc/${article.slug}`}
          className="font-medium text-gray-700 underline underline-offset-2 transition hover:text-brand-600"
        >
          Đọc thêm
        </Link>
      </div>
    </div>
  </article>
);

const NewsSection = () => (
  <section className="pb-12 pt-4">
    <div className="mb-5 flex items-end justify-between gap-4">
      <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900">Tin tức</h2>
      <Link
        href="/tin-tuc"
        className="inline-flex items-center gap-1 text-theme-sm font-medium text-brand-600 transition hover:text-brand-700"
      >
        Xem thêm bài viết
        <FiChevronRight aria-hidden />
      </Link>
    </div>

    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {MOCK_NEWS.map((article) => (
        <NewsCard key={article.publicId} article={article} />
      ))}
    </div>
  </section>
);

export default NewsSection;
