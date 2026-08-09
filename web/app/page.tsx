import type { Metadata } from 'next';
import HomePage from '@/modules/home/components/HomePage';
import { HomeService } from '@/modules/home/services/home.service';

export const metadata: Metadata = {
  title: 'Trang chủ',
  description:
    'Nền tảng công nghệ dành riêng cho môi giới, cung cấp thông tin dự án và công cụ hỗ trợ bán hàng, giúp tư vấn nhanh và chốt giao dịch hiệu quả.',
};

/**
 * Route trang chu - server component.
 *
 * Doc noi dung tu server mot lan roi truyen xuong client (initialContent) de
 * HTML tra ve da co hero + du an noi bat, khong phai doi client goi lai.
 * Client hook chi refresh khi can (staleTime 5 phut).
 */
export default async function HomeRoute() {
  const content = await HomeService.content();
  return <HomePage initialContent={content} />;
}
