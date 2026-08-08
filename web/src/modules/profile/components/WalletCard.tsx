import type { Profile } from '../mocks/profile.mock';

/**
 * Card "Dong Tot" hien thi so du + nut nap ngay.
 * Mau vang gold de noi bat, phan tach voi phan con lai cua trang (trang/blue).
 * Coin icon SVG inline de khong phu thuoc react-icons them icon moi.
 */
const CoinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2" />
    <circle cx="12" cy="12" r="7.5" fill="currentColor" />
    <text
      x="12"
      y="16"
      textAnchor="middle"
      fontSize="9"
      fontWeight="bold"
      fill="white"
    >
      ₫
    </text>
  </svg>
);

const WalletCard = ({ wallet }: { wallet: Profile['wallet'] }) => {
  return (
    <section className="rounded-2xl border border-warning-500/30 bg-gradient-to-r from-warning-50 via-warning-50 to-warning-100/60 p-5 shadow-theme-sm md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <CoinIcon className="h-5 w-5 text-warning-600" />
            <span className="text-theme-xs font-semibold uppercase tracking-wide text-warning-700">
              {wallet.title}
            </span>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-warning-700 md:text-4xl">
              {wallet.balance.toLocaleString('vi-VN')}
            </span>
            <span className="text-theme-sm font-bold text-warning-600">đồng</span>
          </div>

          <p className="mt-2 text-theme-xs text-gray-600">{wallet.subtitle}</p>
        </div>

        <button
          type="button"
          className="shrink-0 rounded-full bg-gradient-to-r from-warning-500 to-warning-600 px-5 py-2.5 text-theme-sm font-bold text-white shadow-theme-md transition hover:from-warning-600 hover:to-warning-700"
        >
          Nạp ngay
        </button>
      </div>
    </section>
  );
};

export default WalletCard;