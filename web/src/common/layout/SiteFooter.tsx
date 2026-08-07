import Link from 'next/link';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { FaFacebookF, FaTiktok, FaYoutube } from 'react-icons/fa';

const COMPANY_LINKS = [
  { label: 'Về chúng tôi', href: '/gioi-thieu' },
  { label: 'Dịch vụ', href: '/dich-vu' },
  { label: 'Tin tức', href: '/tin-tuc' },
  { label: 'Liên hệ', href: '/lien-he' },
];

const INFO_LINKS = [
  { label: 'Hướng dẫn sử dụng', href: '/huong-dan' },
  { label: 'Điều khoản dịch vụ', href: '/dieu-khoan' },
  { label: 'Chính sách bảo mật', href: '/bao-mat' },
  { label: 'Câu hỏi thường gặp', href: '/faq' },
];

const SOCIAL_LINKS = [
  { label: 'Facebook', href: '#', icon: <FaFacebookF aria-hidden /> },
  { label: 'YouTube', href: '#', icon: <FaYoutube aria-hidden /> },
  { label: 'TikTok', href: '#', icon: <FaTiktok aria-hidden /> },
];

const SiteFooter = () => (
  <footer className="bg-navy-700 text-gray-300">
    <div className="site-container grid grid-cols-1 gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
      <div>
        <div className="mb-4 flex items-center gap-2">
          <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
            <rect width="32" height="32" rx="8" fill="white" />
            <path d="M9 21.5 16 8l7 13.5h-4.4L16 16.4l-2.6 5.1H9Z" fill="var(--color-navy-700)" />
          </svg>
          <span className="text-lg font-extrabold uppercase tracking-tight text-white">
            Saleplust
          </span>
        </div>

        <p className="mb-5 text-theme-sm leading-relaxed text-gray-400">
          Nền tảng công nghệ hỗ trợ kinh doanh bất động sản.
        </p>

        <ul className="space-y-3 text-theme-sm">
          <li className="flex items-start gap-2.5">
            <FiMail aria-hidden className="mt-0.5 shrink-0 text-brand-300" />
            <a href="mailto:info@saleplust.vn" className="transition hover:text-white">
              info@saleplust.vn
            </a>
          </li>
          <li className="flex items-start gap-2.5">
            <FiPhone aria-hidden className="mt-0.5 shrink-0 text-brand-300" />
            <a href="tel:+842471000000" className="transition hover:text-white">
              024 7100 0000
            </a>
          </li>
          <li className="flex items-start gap-2.5">
            <FiMapPin aria-hidden className="mt-0.5 shrink-0 text-brand-300" />
            <span>Cập nhật địa chỉ văn phòng tại đây.</span>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="mb-4 border-b border-white/15 pb-2 text-theme-sm font-bold uppercase tracking-wide text-white">
          Công ty
        </h2>
        <ul className="space-y-3 text-theme-sm">
          {COMPANY_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="transition hover:text-white">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="mb-4 border-b border-white/15 pb-2 text-theme-sm font-bold uppercase tracking-wide text-white">
          Thông tin
        </h2>
        <ul className="space-y-3 text-theme-sm">
          {INFO_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="transition hover:text-white">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="mb-4 border-b border-white/15 pb-2 text-theme-sm font-bold uppercase tracking-wide text-white">
          Kết nối với chúng tôi
        </h2>
        <ul className="flex items-center gap-3">
          {SOCIAL_LINKS.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-brand-500"
              >
                {social.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="border-t border-white/10">
      <div className="site-container py-5 text-theme-xs leading-relaxed text-gray-400">
        <p>© 2026 Saleplust. Bảo lưu mọi quyền.</p>
        <p>Thông tin doanh nghiệp sẽ được cập nhật sau.</p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
