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
    default: 'RealtyHub',
    template: '%s | RealtyHub',
  },
  description: 'Nền tảng công nghệ hỗ trợ kinh doanh bất động sản.',
  /**
   * Favicon / icon cho trinh duyet va home screen.
   *
   * Next 16 tu dong nhan file app/icon.png va app/apple-icon.png - ta copy
   * tu public/images/home/icon_realtyhub.png. Neu muon nhieu size, dat
   * app/icon-16.png, app/icon-32.png,... Next se tu generate tag <link>
   * voi size tuong ung. O day chi dung 1 file PNG cho don gian, browser
   * se scale xuong 16x16 / 32x32 khi can.
   *
   * `shortcut` giu tuong thich voi trinh duyet rat cu (IE11, Edge cu).
   */
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/icon.png',
    apple: '/apple-icon.png',
  },
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
