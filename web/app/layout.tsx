import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SiteHeader from '@/common/layout/SiteHeader';
import SiteFooter from '@/common/layout/SiteFooter';
import BackToTop from '@/common/components/BackToTop';
import QueryProvider from '@/common/providers/QueryProvider';

// globals.css khai bao --font-sans la Inter; khong nap o day thi trang roi ve
// Helvetica/Arial va lech han voi thiet ke.
const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  // Goc de Next dung khi doi anh openGraph tuong doi (vd /images/projects/x.jpg)
  // thanh URL tuyet doi. Thieu no thi Next canh bao va tam lay localhost.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
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
    // suppressHydrationWarning: cac extension trinh duyet (Bitdefender...) chen
    // thuoc tinh vao <html>/<body> truoc khi React hydrate -> bao lech gia.
    <html lang="vi" className={inter.variable} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col" suppressHydrationWarning>
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
