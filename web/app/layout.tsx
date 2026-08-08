import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import SiteHeader from '@/common/layout/SiteHeader';
import SiteFooter from '@/common/layout/SiteFooter';
import BackToTop from '@/common/components/BackToTop';
import ChatWidget from '@/modules/chat/components/ChatWidget';
import QueryProvider from '@/common/providers/QueryProvider';


const openSans = Open_Sans({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-open-sans',
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
    // data-scroll-behavior: globals.css dat scroll-behavior:smooth cho <html>,
    // khien ca cu nhay ve dau trang khi doi route cung bi lam muot - trang giat
    // mot nhip va thoang hien nham phan noi dung. Thuoc tinh nay bao cho Next
    // biet smooth la co y, de no tat tam trong luc chuyen trang roi bat lai.
    <html
      lang="vi"
      className={openSans.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col" suppressHydrationWarning>
        <QueryProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <BackToTop />
          <ChatWidget />
        </QueryProvider>
      </body>
    </html>
  );
}
