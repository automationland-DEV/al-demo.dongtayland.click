/** Hop dong voi backend - map sang module `blog` + `categories-blog` sau nay */
export type NewsCategory = 'tin-tuc-du-an' | 'phan-tich-nhan-dinh';

export type NewsArticle = {
  publicId: string;
  slug: string;
  title: string;
  category: NewsCategory;
  thumbnailUrl: string;
  publishedAt: string;
};

export const NEWS_CATEGORY_LABELS: Record<NewsCategory, string> = {
  'tin-tuc-du-an': 'Tin tức dự án',
  'phan-tich-nhan-dinh': 'Phân tích - Nhận định',
};
