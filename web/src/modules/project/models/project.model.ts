/**
 * Cac kieu du lieu nay la HOP DONG voi backend sau nay.
 * Khi lam API that, entity + DTO ben backend phai khop y het file nay,
 * va chi can doi than ham trong services/project.service.ts.
 */

/** Nhom du an - quyet dinh mau nhan tren anh card */
export type ProjectSegment = 'cao-tang' | 'thap-tang';

/** Trang thai ban hang */
export type ProjectStatus = 'dang-mo-ban' | 'sap-mo-ban' | 'da-ban-giao';

/** Loai hinh bat dong san */
export type ProjectPropertyType =
  | 'can-ho'
  | 'biet-thu'
  | 'nha-pho'
  | 'shophouse'
  | 'dat-nen';

export type Project = {
  publicId: string;
  slug: string;
  name: string;
  /** Cau mo ta ngan hien duoi ten tren card */
  tagline: string;
  /** Dia chi hien canh icon ghim */
  address: string;
  segment: ProjectSegment;
  status: ProjectStatus;
  propertyType: ProjectPropertyType;
  /** publicId cua chu dau tu */
  developerId: string;
  developerName: string;
  /** publicId cua khu vuc */
  regionId: string;
  regionName: string;
  /** URL anh bia. Rong => ProjectThumb tu sinh anh placeholder. */
  thumbnailUrl: string;
  /** Link chi tiet du an (trang ngoai hoac noi bo) */
  detailUrl: string;
  isHot: boolean;
  publishedAt: string;
};

/** Mot lua chon trong cac o filter */
export type FilterOption = {
  value: string;
  label: string;
};

/** Tham so truy van danh sach du an */
export type ProjectQuery = {
  page: number;
  limit: number;
  search: string;
  developerId: string | null;
  regionId: string | null;
  propertyType: ProjectPropertyType | null;
  status: ProjectStatus | null;
};

/** Dang tra ve chuan cua danh sach - giong PaginatedBlogs ben backend */
export type PaginatedProjects = {
  projects: Project[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
};

/**
 * Du lieu khoi "Du an ban chay" duoi trang danh sach.
 *
 * Chi lay dung nhung truong khoi nay ve len: du an dung dau moi nhom hien
 * duoi dang the anh lon nen can `thumbnailUrl`. Day van la mot phep chieu
 * gon - dung tra ca ban ghi Project ve cho mot danh sach 5 dong.
 */
export type ProjectHighlightGroup = {
  key: string;
  title: string;
  projects: Pick<Project, 'publicId' | 'slug' | 'name' | 'thumbnailUrl'>[];
};

export const SEGMENT_LABELS: Record<ProjectSegment, string> = {
  'cao-tang': 'Dự án cao tầng',
  'thap-tang': 'Dự án thấp tầng',
};

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  'dang-mo-ban': 'Đang mở bán',
  'sap-mo-ban': 'Sắp mở bán',
  'da-ban-giao': 'Đã bàn giao',
};

export const PROPERTY_TYPE_LABELS: Record<ProjectPropertyType, string> = {
  'can-ho': 'Căn hộ',
  'biet-thu': 'Biệt thự',
  'nha-pho': 'Nhà phố',
  shophouse: 'Shophouse',
  'dat-nen': 'Đất nền',
};

export const DEFAULT_PROJECT_QUERY: ProjectQuery = {
  page: 1,
  limit: 12,
  search: '',
  developerId: null,
  regionId: null,
  propertyType: null,
  status: null,
};
