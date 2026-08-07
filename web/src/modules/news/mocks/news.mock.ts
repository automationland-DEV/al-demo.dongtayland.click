/** Du lieu mau - tieu de hu cau, thay bang API `blog` khi lam backend */
import type { NewsArticle } from '../models/news.model';

export const MOCK_NEWS: NewsArticle[] = [
  {
    publicId: 'news-001',
    slug: 'gia-tri-bat-dong-san-khong-chi-nam-o-khoang-cach',
    title: 'Giá trị bất động sản không chỉ nằm ở khoảng cách',
    category: 'phan-tich-nhan-dinh',
    thumbnailUrl: '/images/news/news-001.jpg',
    publishedAt: '2026-08-07T02:00:00.000Z',
  },
  {
    publicId: 'news-002',
    slug: 'khoi-cong-phan-khu-thap-tang-tai-khu-dong',
    title: 'Khởi công phân khu thấp tầng đầu tiên tại khu Đông',
    category: 'tin-tuc-du-an',
    thumbnailUrl: '/images/news/news-002.jpg',
    publishedAt: '2026-08-07T03:30:00.000Z',
  },
  {
    publicId: 'news-003',
    slug: 'ban-giao-toa-thap-dau-tien-cua-metro-star-tower',
    title: 'Bàn giao tòa tháp đầu tiên của Metro Star Tower',
    category: 'tin-tuc-du-an',
    thumbnailUrl: '/images/news/news-003.jpg',
    publishedAt: '2026-08-07T04:15:00.000Z',
  },
  {
    publicId: 'news-004',
    slug: 'xu-huong-can-ho-ven-song-nam-2026',
    title: 'Xu hướng căn hộ ven sông sẽ dẫn dắt thị trường 2026',
    category: 'phan-tich-nhan-dinh',
    thumbnailUrl: '/images/news/news-004.jpg',
    publishedAt: '2026-08-06T08:00:00.000Z',
  },
  {
    publicId: 'news-005',
    slug: 'green-harbor-ha-long-cat-noc-phan-khu-ven-vinh',
    title: 'Green Harbor Hạ Long cất nóc phân khu ven vịnh',
    category: 'tin-tuc-du-an',
    thumbnailUrl: '/images/news/news-005.jpg',
    publishedAt: '2026-08-06T09:20:00.000Z',
  },
  {
    publicId: 'news-006',
    slug: 'nam-loi-the-cua-bat-dong-san-nghi-duong-mien-trung',
    title: 'Năm lợi thế của bất động sản nghỉ dưỡng miền Trung',
    category: 'phan-tich-nhan-dinh',
    thumbnailUrl: '/images/news/news-006.jpg',
    publishedAt: '2026-08-06T10:45:00.000Z',
  },
  {
    publicId: 'news-007',
    slug: 'lotus-park-hung-yen-mo-ban-dot-hai',
    title: 'Lotus Park Hưng Yên mở bán đợt hai từ giữa tháng 8',
    category: 'tin-tuc-du-an',
    thumbnailUrl: '/images/news/news-007.jpg',
    publishedAt: '2026-08-05T07:10:00.000Z',
  },
  {
    publicId: 'news-008',
    slug: 'chinh-sach-thanh-toan-moi-cho-nguoi-mua-lan-dau',
    title: 'Chính sách thanh toán mới dành cho người mua lần đầu',
    category: 'tin-tuc-du-an',
    thumbnailUrl: '/images/news/news-008.jpg',
    publishedAt: '2026-08-05T11:00:00.000Z',
  },
];
