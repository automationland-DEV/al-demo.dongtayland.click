import Link from 'next/link';
import {
  FiBookOpen,
  FiBookmark,
  FiCalendar,
  FiCompass,
  FiGrid,
  FiHeart,
  FiHome,
  FiMap,
  FiStar,
} from 'react-icons/fi';

type QuickUtility = {
  label: string;
  href: string;
  icon: React.ComponentType<{ 'aria-hidden'?: boolean; className?: string }>;
  /** Mau toa nen icon - xoay vong giua brand/jade/accent/gold de tao nhip cho grid */
  tone: 'brand' | 'jade' | 'accent' | 'gold';
};

/**
 * 8 tien ich xuat hien ngay duoi Hero - truy cap nhanh cac chuc nang hay dung
 * cua nguoi mua nha. Moi o di den trang da co (hoac not-yet-built, khi do no
 * van la link noi - khong phai nut).
 *
 * Icon dung react-icons (da co trong repo) - khong them dependency moi.
 */
const UTILITIES: QuickUtility[] = [

  {
    label: 'La bàn',
    href: '/la-ban',
    icon: FiCompass,
    tone: 'jade',
  },
  {
    label: 'Yêu thích',
    href: '/yeu-thich',
    icon: FiHeart,
    tone: 'accent',
  },
  {
    label: 'Tin tức',
    href: '/tin-tuc',
    icon: FiBookmark,
    tone: 'gold',
  },
  {
    label: 'Sự kiện',
    href: '/su-kien',
    icon: FiCalendar,
    tone: 'brand',
  },
  {
    label: 'Phong thủy',
    href: '/phong-thuy',
    icon: FiStar,
    tone: 'gold',
  },
  {
    label: 'Khu vực',
    href: '/khu-vuc',
    icon: FiMap,
    tone: 'accent',
  },
  {
    label: 'Hướng dẫn',
    href: '/huong-dan',
    icon: FiBookOpen,
    tone: 'gold',
  },
  {
    label: 'Xem thêm',
    href: '/tien-ich',
    icon: FiGrid,
    tone: 'brand',
  }
];

const TONE_CLASSES: Record<QuickUtility['tone'], string> = {
  brand: 'bg-brand-50 text-brand-600 group-hover:bg-brand-500 group-hover:text-white',
  jade: 'bg-jade-50 text-jade-600 group-hover:bg-jade-500 group-hover:text-white',
  accent: 'bg-accent-50 text-accent-600 group-hover:bg-accent-500 group-hover:text-white',
  gold: 'bg-gold-200 text-gold-500 group-hover:bg-gold-500 group-hover:text-white',
};

/**
 * Khoi 8 o tien ich nam ngay duoi Hero, can trang va co card boi nen trang
 * de noi bat giua Hero (nen dam) va FeaturedProjects (nen xam).
 *
 * Tren mobile (<sm): grid 4 cot, nho gon trong tam nhin.
 * Tren tablet (sm): grid 4 cot, them khoang tho.
 * Tren desktop (lg): grid 8 cot mot hang de moi o deu rat rong.
 */
const QuickUtilities = () => (
  <section className="site-container -mt-10 md:-mt-14 lg:-mt-16">
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-card md:p-6">
      <h2 className="sr-only">Tiện ích nhanh</h2>
      <ul className="grid grid-cols-4 gap-3 md:gap-4 lg:grid-cols-8">
        {UTILITIES.map(({ label, href, icon: Icon, tone }) => (
          <li key={href}>
            <Link
              href={href}
              className="group flex flex-col items-center gap-2 rounded-xl px-2 py-3 transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 md:gap-3 md:py-4"
            >
              <span
                className={`inline-flex h-12 w-12 items-center justify-center rounded-xl text-xl transition md:h-14 md:w-14 md:text-2xl ${TONE_CLASSES[tone]}`}
              >
                <Icon aria-hidden />
              </span>
              <span className="text-center text-theme-xs font-semibold leading-tight text-gray-700 group-hover:text-brand-600 md:text-theme-sm">
                {label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default QuickUtilities;
