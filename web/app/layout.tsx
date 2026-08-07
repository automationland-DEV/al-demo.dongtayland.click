import type { Metadata } from 'next';
import './globals.css';
import SiteHeader from '@/common/layout/SiteHeader';
import SiteFooter from '@/common/layout/SiteFooter';
import BackToTop from '@/common/components/BackToTop';
import QueryProvider from '@/common/providers/QueryProvider';

export const metadata: Metadata = {
  title: {
    default: 'Saleplust',
    template: '%s | Saleplust',
  },
  description: 'Nền tảng công nghệ hỗ trợ kinh doanh bất động sản.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className="flex min-h-screen flex-col">
        <QueryProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <BackToTop />
        </QueryProvider>
      </body>
    </html>
  );
}
