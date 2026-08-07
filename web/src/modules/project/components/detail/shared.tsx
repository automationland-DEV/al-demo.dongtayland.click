/**
 * Cac manh giao dien lap lai nhieu lan tren trang chi tiet du an.
 *
 * Gom o mot cho vi thiet ke dung lai chung: tieu de can giua, panel xanh ngoc,
 * khung anh bo goc, nut play. Sua o day la sua ca 11 tab.
 */
import type { ReactNode } from 'react';
import { FiPlay } from 'react-icons/fi';
import PlaceholderThumb from '@/common/components/PlaceholderThumb';

/** Tieu de can giua kem dong mo ta - dung cho Mat bang, San pham, Tien ich... */
export const SectionHeading = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <div className="mb-6 text-center">
    <h2 className="text-xl font-bold text-jade-600">{title}</h2>
    {subtitle && <p className="mt-1 text-theme-sm text-gray-500">{subtitle}</p>}
  </div>
);

/** Panel nen xanh ngoc, chiem tron chieu ngang khu noi dung */
export const JadePanel = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => (
  <section
    className={`overflow-hidden rounded-xl bg-gradient-to-br from-jade-600 via-jade-500 to-jade-600 p-6 shadow-panel sm:p-8 ${className}`}
  >
    {children}
  </section>
);

/** Tieu de vang trong panel xanh, co gach chan ngan ben duoi */
export const PanelTitle = ({ children }: { children: ReactNode }) => (
  <h2 className="mb-4 inline-block border-b-2 border-gold-400 pb-1.5 text-lg font-bold text-gold-300">
    {children}
  </h2>
);

/**
 * Khung anh bo goc giu ti le co dinh.
 * `src` rong -> PlaceholderThumb ve nen gradient co nhan, khong gia lam anh that.
 */
export const MediaFrame = ({
  seed,
  src,
  alt,
  label,
  ratio = 'aspect-[16/9]',
  className = '',
}: {
  seed: string;
  src?: string;
  alt: string;
  label?: string;
  ratio?: string;
  className?: string;
}) => (
  <div className={`relative ${ratio} w-full overflow-hidden rounded-lg bg-gray-100 ${className}`}>
    <PlaceholderThumb seed={seed} src={src || undefined} alt={alt} label={label} />
  </div>
);

/** Lop phu nut play cho cac o video */
export const PlayOverlay = ({ label }: { label: string }) => (
  <span className="absolute inset-0 flex items-center justify-center">
    <span
      className="flex h-14 w-14 items-center justify-center rounded-full bg-jade-700/80 text-white shadow-card-hover transition group-hover:scale-110 group-hover:bg-jade-600"
      aria-hidden
    >
      <FiPlay className="ml-0.5 text-xl" />
    </span>
    <span className="sr-only">{label}</span>
  </span>
);

/** Cham chi so trang cho cac bang chuyen */
export const CarouselDots = ({
  count,
  current,
  onSelect,
  label,
}: {
  count: number;
  current: number;
  onSelect: (index: number) => void;
  label: string;
}) => {
  if (count <= 1) return null;

  return (
    <div className="mt-5 flex items-center justify-center gap-2" role="tablist" aria-label={label}>
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          type="button"
          role="tab"
          aria-selected={index === current}
          aria-label={`Trang ${index + 1}`}
          onClick={() => onSelect(index)}
          className={`h-2 rounded-full transition-all ${
            index === current ? 'w-6 bg-jade-500' : 'w-2 bg-gray-300 hover:bg-gray-400'
          }`}
        />
      ))}
    </div>
  );
};

/** Trang thai rong dung chung cho cac tab chua co du lieu */
export const TabEmptyState = ({ message }: { message: string }) => (
  <div className="rounded-lg border border-dashed border-gray-300 bg-white p-12 text-center">
    <p className="text-theme-sm text-gray-500">{message}</p>
  </div>
);
