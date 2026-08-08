/**
 * Mock data cho trang /tai-khoan. Trang nay can 1 user cung de demo UI
 * cac section (dong tot, tien ich, dich vu tra phi, khuyen mai). Sau
 * nay noi backend that, doi `MOCK_PROFILE` thanh goi /users/me.
 */

export type ProfileStat = { label: string; value: number };

export type BadgeVariant = 'new' | 'gold' | 'pro';

export type MenuItem = {
  /** Href tuyet doi (next/link). Neu undefined -> placeholder, click khong di dau. */
  href?: string;
  /** Emoji/icon dat san o he thong (tranh dung icon set lon de giu gon file). */
  emoji: string;
  /** Mau nen cho icon tile: 'brand' | 'navy' | 'warning' | 'success' | 'gray'. */
  tone: 'brand' | 'navy' | 'warning' | 'success' | 'gray';
  label: string;
  badge?: { text: string; variant: BadgeVariant };
};

export type Profile = {
  /** URL slug (khoang trang -> '-', bo dau). Dung cho trang public
      /ho-so/[slug]. */
  slug: string;
  name: string;
  /** Chu cai hien thi khi khong co avatar that. */
  initials: string;
  /** URL avatar that, neu co. Trong mock hien khong co nen se fallback initials. */
  avatar?: string;
  /** So nguoi theo doi (chi so public, khac stats private trong /tai-khoan). */
  followers: number;
  /** Chuoi hien thi "Da tham gia X thang Y ngay". */
  joinedAt: string;
  /** Dia chi dang hien thi (Quan, TP). */
  location: string;
  stats: ProfileStat[];
  wallet: {
    /** So dong tot dang co. */
    balance: number;
    /** Ten hien thi tren card. */
    title: string;
    /** Mo ta ngan duoi balance. */
    subtitle: string;
  };
  utilities: MenuItem[];
  paidServices: MenuItem[];
  promotions: MenuItem[];
  others: MenuItem[];
};

export const MOCK_PROFILE: Profile = {
  slug: 'nguyen-gia-khang',
  name: 'Nguyễn Gia Khang',
  initials: 'NK',
  // Mock chua co file avatar that - de undefined de UserAvatar fallback
  // sang gradient + initials "NK". Khi nao co file that, set URL o day.
  avatar: undefined,
  followers: 0,
  joinedAt: 'Đã tham gia 2 tháng 30 ngày',
  location: 'Quận Tân Phú, TP.HCM',
  stats: [
    { label: 'Người theo dõi', value: 12 },
    { label: 'Đang theo dõi', value: 4 },
  ],
  wallet: {
    title: 'Tài khoản Định danh',
    balance: 1250,
    subtitle: 'Đồng Tốt là đơn vị dùng để đăng tin nổi bật, tạo chuyên trang.',
  },
  // "Tien ich": cac trang quan ly noi dung cua toi
  utilities: [
    { emoji: '🔖', tone: 'brand', label: 'Tin đã lưu', href: '/tai-khoan/tin-da-luu' },
    { emoji: '🔍', tone: 'brand', label: 'Tìm kiếm đã lưu', href: '/tai-khoan/tim-kiem-da-luu' },
    { emoji: '🕘', tone: 'gray', label: 'Lịch sử xem tin', href: '/tai-khoan/lich-su' },
    { emoji: '⭐', tone: 'warning', label: 'Đánh giá từ tôi', href: '/tai-khoan/danh-gia' },
    {
      emoji: '📍',
      tone: 'success',
      label: 'Đánh giá khu vực',
      href: '/tai-khoan/danh-gia-khu-vuc',
      badge: { text: 'Tính năng mới', variant: 'new' },
    },
  ],
  // "Dich vu tra phi": cac goi tang kha nang tiep can
  paidServices: [
    {
      emoji: '🪙',
      tone: 'warning',
      label: 'Đồng Tốt',
      href: '/tai-khoan/dong-tot',
    },
    {
      emoji: '👑',
      tone: 'navy',
      label: 'Gói PRO',
      href: '/tai-khoan/goi-pro',
      badge: { text: 'PRO', variant: 'pro' },
    },
    { emoji: '🤝', tone: 'success', label: 'Kênh Đối Tác', href: '/tai-khoan/kenh-doi-tac' },
    { emoji: '💳', tone: 'gray', label: 'Lịch sử giao dịch', href: '/tai-khoan/giao-dich' },
    {
      emoji: '🏪',
      tone: 'brand',
      label: 'Cửa hàng / Chuyên trang của tôi',
      href: '/tai-khoan/chuyen-trang',
      badge: { text: 'Tạo ngay', variant: 'gold' },
    },
  ],
  // "Uu dai, khuyen mai": marketing cho user
  promotions: [
    { emoji: '🎁', tone: 'warning', label: 'Chợ Tốt ưu đãi', href: '/uu-dai' },
    { emoji: '🏷️', tone: 'brand', label: 'Ưu đãi của tôi', href: '/tai-khoan/uu-dai-cua-toi' },
  ],
  // "Khac": cai dat + tro giup + dang xuat
  others: [
    { emoji: '⚙️', tone: 'gray', label: 'Cài đặt tài khoản', href: '/cai-dat' },
    { emoji: '❓', tone: 'brand', label: 'Trợ giúp', href: '/tro-giup' },
    { emoji: '💬', tone: 'success', label: 'Đóng góp ý kiến', href: '/dong-gop-y-kien' },
    { emoji: '🚪', tone: 'gray', label: 'Đăng xuất', href: '/dang-xuat' },
  ],
};