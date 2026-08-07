/**
 * Du lieu mau de dung FE truoc khi co API.
 * Ten du an, chu dau tu, mo ta deu la hu cau.
 *
 * Noi dung nam trong projects.seed.json - cung file ma
 * scripts/generate-mock-images.mjs doc de sinh anh, nen anh va du lieu
 * khong bao gio lech slug.
 *
 * Khi backend san sang: xoa thu muc mocks/, khong sua file nao khac ngoai
 * services/project.service.ts.
 */
import seedData from './projects.seed.json';
import type {
  FilterOption,
  Project,
  ProjectPropertyType,
  ProjectSegment,
  ProjectStatus,
} from '../models/project.model';

export const MOCK_DEVELOPERS: FilterOption[] = [
  { value: 'cdt-an-khang', label: 'Tập đoàn An Khang' },
  { value: 'cdt-bao-minh', label: 'Bảo Minh Group' },
  { value: 'cdt-dong-duong', label: 'Đông Dương Land' },
  { value: 'cdt-thai-binh-duong', label: 'Thái Bình Dương Holdings' },
  { value: 'cdt-truong-son', label: 'Trường Sơn Invest' },
];

export const MOCK_REGIONS: FilterOption[] = [
  { value: 'kv-ha-noi', label: 'Hà Nội' },
  { value: 'kv-hcm', label: 'TP. Hồ Chí Minh' },
  { value: 'kv-da-nang', label: 'Đà Nẵng' },
  { value: 'kv-hung-yen', label: 'Hưng Yên' },
  { value: 'kv-quang-ninh', label: 'Quảng Ninh' },
  { value: 'kv-hai-phong', label: 'Hải Phòng' },
];

type Seed = {
  slug: string;
  name: string;
  tagline: string;
  address: string;
  segment: ProjectSegment;
  status: ProjectStatus;
  propertyType: ProjectPropertyType;
  developerIndex: number;
  regionIndex: number;
  isHot: boolean;
};

const SEEDS = seedData as Seed[];

/** Ngay dang gia lap - lui dan tu 07/08/2026 de thu tu "moi nhat" on dinh */
const publishedAtFor = (index: number) => {
  const base = new Date('2026-08-07T09:00:00.000Z');
  base.setDate(base.getDate() - index * 3);
  return base.toISOString();
};

export const MOCK_PROJECTS: Project[] = SEEDS.map((seed, index) => {
  const developer = MOCK_DEVELOPERS[seed.developerIndex];
  const region = MOCK_REGIONS[seed.regionIndex];

  return {
    publicId: `prj-${String(index + 1).padStart(3, '0')}`,
    slug: seed.slug,
    name: seed.name,
    tagline: seed.tagline,
    address: seed.address,
    segment: seed.segment,
    status: seed.status,
    propertyType: seed.propertyType,
    developerId: developer.value,
    developerName: developer.label,
    regionId: region.value,
    regionName: region.label,
    thumbnailUrl: `/images/projects/${seed.slug}.jpg`,
    detailUrl: `/du-an/${seed.slug}`,
    isHot: seed.isHot,
    publishedAt: publishedAtFor(index),
  };
});
