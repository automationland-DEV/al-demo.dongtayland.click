'use client';

import { useLogout } from '@/common/auth/userStore';
import UserAvatar from '@/common/components/UserAvatar';

import type { Profile } from '../mocks/profile.mock';

const TONE_TILE: Record<string, string> = {
  brand: 'bg-brand-50 text-brand-700',
  navy: 'bg-navy-50 text-navy-700',
  warning: 'bg-warning-50 text-warning-700',
  success: 'bg-success-50 text-success-700',
  gray: 'bg-gray-100 text-gray-700',
};

/**
 * Header trang profile: avatar (co nut edit overlay) + ten + stats
 * (nguoi theo doi / dang theo doi) + nut dang xuat nhanh.
 */
const ProfileCard = ({ profile }: { profile: Profile }) => {
  const logout = useLogout();

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-700 via-navy-800 to-brand-600 px-6 py-8 text-white shadow-theme-lg md:px-10 md:py-10">
      {/* Pattern cham tron mo phong nen */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)',
          backgroundSize: '20px 20px',
        }}
      />
      {/* Vong tron blur lam accent */}
      <div
        aria-hidden
        className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-brand-400/30 blur-3xl"
      />

      <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center">
        {/* Avatar co nut edit overlay */}
        <div className="group relative shrink-0">
          <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-white/30 md:h-28 md:w-28">
            <UserAvatar
              name={profile.name}
              src={profile.avatar}
              size={112}
              className="!h-full !w-full !rounded-full"
            />
          </div>
          {/* Nut edit overlay */}
          <button
            type="button"
            aria-label="Đổi ảnh đại diện"
            className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white text-navy-700 shadow-theme-md transition hover:scale-105 hover:bg-gray-50"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 0l.172.172a2 2 0 010 2.828L12 17H9v-3z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7l1 1" />
            </svg>
          </button>
        </div>

        {/* Ten + stats */}
        <div className="flex-1">
          <h1 className="text-2xl font-extrabold md:text-3xl">{profile.name}</h1>
          <p className="mt-1 text-theme-xs text-white/70">Đã tham gia RealtyHub từ 2024</p>

          <div className="mt-4 flex gap-8">
            {profile.stats.map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <div className="text-2xl font-extrabold leading-none md:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-theme-xs text-white/75">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Nut dang xuat nhanh o goc phai (desktop) */}
        <button
          type="button"
          onClick={logout}
          className="hidden rounded-full border border-white/30 bg-white/10 px-4 py-2 text-theme-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 md:inline-flex"
        >
          Đăng xuất
        </button>
      </div>

      {/* Nut dang xuat mobile */}
      <div className="relative mt-4 md:hidden">
        <button
          type="button"
          onClick={logout}
          className="w-full rounded-full border border-white/30 bg-white/10 px-4 py-2 text-theme-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
        >
          Đăng xuất
        </button>
      </div>
    </section>
  );
};

// Re-export TONE_TILE cho cac component khac dung chung
export { TONE_TILE };

export default ProfileCard;