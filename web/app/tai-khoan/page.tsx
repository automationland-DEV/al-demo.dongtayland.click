import React from 'react';
import type { Metadata } from 'next';

import MenuSection from '@/modules/profile/components/MenuSection';
import ProfileCard from '@/modules/profile/components/ProfileCard';
import WalletCard from '@/modules/profile/components/WalletCard';
import { MOCK_PROFILE } from '@/modules/profile/mocks/profile.mock';

export const metadata: Metadata = {
  title: 'Thông tin cá nhân',
  description: 'Quản lý tài khoản, Đồng Tốt, tiện ích và dịch vụ trả phí của bạn trên Saleplust.',
};

/**
 * Trang /tai-khoan - Thong tin ca nhan.
 *
 * Cu truc (top -> bottom) theo screenshot:
 *   1. ProfileCard: avatar + ten + stats (gradient navy/brand)
 *   2. WalletCard: Dong Tot (gold)
 *   3. Section "Tien ich"
 *   4. Section "Dich vu tra phi"
 *   5. Section "Uu dai, khuyen mai"
 *   6. Section "Khac" (co the nhanh "dang xuat" o warning/error)
 *
 * Luu y: tat ca component deu la server component (khong co state/effect).
 * ProfileCard can client vi dung `useLogout()` (hook co router) -> da danh
 * dau 'use client'. Trang nay van la server component, React se xu ly boundary.
 */
const TaiKhoanPage = () => {
  const profile = MOCK_PROFILE;

  return (
    <div className="site-container max-w-3xl py-8 md:py-12">
      <ProfileCard profile={profile} />

      <div className="mt-6 space-y-5">
        <WalletCard wallet={profile.wallet} />

        <MenuSection title="Tiện ích" items={profile.utilities} />

        <MenuSection title="Dịch vụ trả phí" items={profile.paidServices} />

        <MenuSection title="Ưu đãi, khuyến mãi" items={profile.promotions} />

        {/* "Khac" co the highlight border do de nhanh "dang xuat" - nhung
            trong screenshot cac item deu dong deu, nen giu default. */}
        <MenuSection title="Khác" items={profile.others} />
      </div>
    </div>
  );
};

export default TaiKhoanPage;