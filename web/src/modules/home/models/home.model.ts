/**
 * Hop dong voi backend - map sang module `banner` + `home-config` sau nay.
 *
 * Moi khoi tren trang chu (hero, vi-sao-chon...) deu la mot khoi noi dung
 * doc lap de admin co the bat/tat/tuy bien tu backend.
 */

import type { Project } from '@/modules/project/models/project.model';

/** Mot slide banner o dau trang chu */
export type HomeBannerSlide = {
  publicId: string;
  /** Tieu de lon tren anh */
  headline: string;
  /** Dong mo ta duoi tieu de */
  subtitle: string;
  /** Chu tren nut bam chinh */
  primaryCtaLabel: string;
  /** Chu tren nut phu (neu co) */
  secondaryCtaLabel?: string;
  /** URL anh bia desktop. Rong => khong render carousel. */
  desktopImageUrl: string;
  /** URL anh bia mobile (ty le doc hon). Neu rong => fallback ve desktop. */
  mobileImageUrl: string;
};

/** Mot muc trong khoi "Vi sao chon chung toi" */
export type HomeFeature = {
  publicId: string;
  icon: 'shield' | 'search' | 'support' | 'chart';
  title: string;
  description: string;
};

/** Toan bo du lieu trang chu - server se goi mot lan roi truyen xuong client */
export type HomeContent = {
  banners: HomeBannerSlide[];
  /** 6 du an noi bat hien o khoi chinh giua */
  featuredProjects: Project[];
  features: HomeFeature[];
};

export const FEATURE_ICONS = ['shield', 'search', 'support', 'chart'] as const;
