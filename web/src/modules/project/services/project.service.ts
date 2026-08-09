/**
 * Lop truy xuat du lieu du an.
 *
 * HIEN TAI: doc tu mock trong bo nho, loc/phan trang ngay tai client.
 * KHI CO BACKEND: giu nguyen chu ky ham, thay than ham bang goi axios:
 *
 *   const res = await api.get(apiRoutes.PROJECT.GET_ALL(query));
 *   return unwrapApiData<PaginatedProjects>(res.data);
 *
 * Khong component hay hook nao duoc doc mock truc tiep - moi thu di qua day,
 * nen viec doi sang API that chi cham vao dung file nay.
 */
import {
  getPhaseDetail,
  getProjectDetail,
  getProjectUnits,
} from '../mocks/project-detail.mock';
import {
  MOCK_DEVELOPERS,
  MOCK_PROJECTS,
  MOCK_REGIONS,
} from '../mocks/projects.mock';
import type {
  PaginatedUnits,
  PhaseDetail,
  ProjectDetail,
  ProjectUnit,
  UnitQuery,
} from '../models/project-detail.model';
import {
  PROPERTY_TYPE_LABELS,
  STATUS_LABELS,
  type FilterOption,
  type PaginatedProjects,
  type Project,
  type ProjectHighlightGroup,
  type ProjectQuery,
} from '../models/project.model';

/** Do tre gia lap de trang thai loading hien ra dung nhu khi goi API that */
const NETWORK_DELAY_MS = 250;

const delay = <T,>(value: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), NETWORK_DELAY_MS));

/** Bo dau tieng Viet de tim kiem khong phan biet dau */
const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd');

const matchesQuery = (project: Project, query: ProjectQuery): boolean => {
  if (query.developerId && project.developerId !== query.developerId) return false;
  if (query.regionId && project.regionId !== query.regionId) return false;
  if (query.propertyType && project.propertyType !== query.propertyType) return false;
  if (query.status && project.status !== query.status) return false;

  const keyword = normalize(query.search.trim());
  if (!keyword) return true;

  const haystack = normalize(
    `${project.name} ${project.tagline} ${project.address} ${project.developerName}`,
  );
  return haystack.includes(keyword);
};

/** Khong sua mang goc: bang hang duoc cache va dung lai giua cac lan goi */
const sortUnits = (units: ProjectUnit[], sort: UnitQuery['sort']): ProjectUnit[] => {
  switch (sort) {
    case 'gia-tang':
      return [...units].sort((a, b) => a.listedPrice - b.listedPrice);
    case 'gia-giam':
      return [...units].sort((a, b) => b.listedPrice - a.listedPrice);
    case 'dien-tich-tang':
      return [...units].sort((a, b) => a.landArea - b.landArea);
    case 'dien-tich-giam':
      return [...units].sort((a, b) => b.landArea - a.landArea);
    default:
      return units;
  }
};

export const ProjectService = {
  /**
   * Tra ve toan bo du lieu cua mot du an theo publicId. Dung cho trang
   * "Yeu thich" - can day du field de render card, khong phai Pick.
   * Tra ve null neu khong tim thay (du an bi xoa khoi data sau khi user
   * da luu).
   *
   * KHI CO BACKEND: GET /projects/by-ids?ids=a,b,c (hoac POST voi body)
   */
  byIds: async (publicIds: string[]): Promise<Project[]> => {
    if (publicIds.length === 0) return [];
    const idSet = new Set(publicIds);
    const projects = MOCK_PROJECTS.filter((project) => idSet.has(project.publicId));
    return delay(projects);
  },

  /**
   * Danh sach du an da loc + phan trang
   */
  list: async (query: ProjectQuery): Promise<PaginatedProjects> => {
    const matched = MOCK_PROJECTS.filter((project) => matchesQuery(project, query));
    const start = (query.page - 1) * query.limit;
    const projects = matched.slice(start, start + query.limit);

    return delay({
      projects,
      total: matched.length,
      page: query.page,
      limit: query.limit,
      hasMore: start + projects.length < matched.length,
    });
  },

  /** Cac lua chon cho thanh filter - sau nay la 1 endpoint /projects/filters */
  filterOptions: async (): Promise<{
    developers: FilterOption[];
    regions: FilterOption[];
    propertyTypes: FilterOption[];
    statuses: FilterOption[];
  }> =>
    delay({
      developers: MOCK_DEVELOPERS,
      regions: MOCK_REGIONS,
      propertyTypes: Object.entries(PROPERTY_TYPE_LABELS).map(([value, label]) => ({
        value,
        label,
      })),
      statuses: Object.entries(STATUS_LABELS).map(([value, label]) => ({
        value,
        label,
      })),
    }),

  /** Khoi cuoi trang danh sach: cao tang / thap tang ban chay + moi nhat */
  highlights: async (): Promise<ProjectHighlightGroup[]> => {
    /**
     * Phep chieu dung chung cho ca ba nhom - de mot cho de khong xay ra canh
     * nhom nay co anh con nhom kia thi khong.
     */
    const toHighlight = ({ publicId, slug, name, thumbnailUrl }: Project) => ({
      publicId,
      slug,
      name,
      thumbnailUrl,
    });

    /** Uu tien du an hot, bo trung, lay toi da `size` phan tu */
    const pick = (list: Project[], size: number) => {
      const seen = new Set<string>();
      const picked: Project[] = [];

      for (const project of [...list].sort(
        (a, b) => Number(b.isHot) - Number(a.isHot),
      )) {
        if (seen.has(project.publicId)) continue;
        seen.add(project.publicId);
        picked.push(project);
        if (picked.length === size) break;
      }

      return picked.map(toHighlight);
    };

    const bySegment = (segment: Project['segment']) =>
      MOCK_PROJECTS.filter((project) => project.segment === segment);

    const newest = [...MOCK_PROJECTS].sort(
      (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
    );

    return delay([
      { key: 'cao-tang', title: 'Dự án cao tầng', projects: pick(bySegment('cao-tang'), 5) },
      { key: 'thap-tang', title: 'Dự án thấp tầng', projects: pick(bySegment('thap-tang'), 5) },
      {
        key: 'moi-nhat',
        title: 'Dự án mới nhất',
        projects: newest.slice(0, 5).map(toHighlight),
      },
    ]);
  },

  /**
   * Chi tiet mot du an. Tra ve null khi khong co slug do - trang goi
   * notFound() de Next tra dung 404 thay vi trang trong.
   *
   * KHI CO BACKEND: GET /projects/:slug
   */
  detail: async (slug: string): Promise<ProjectDetail | null> =>
    delay(getProjectDetail(slug)),

  /**
   * Chi tiet mot phan khu trong du an.
   *
   * KHI CO BACKEND: GET /projects/:slug/phases/:phaseSlug
   */
  phase: async (projectSlug: string, phaseSlug: string): Promise<PhaseDetail | null> =>
    delay(getPhaseDetail(projectSlug, phaseSlug)),

  /**
   * Bang hang cua mot du an. Tach khoi `detail` vi mot du an co the co hang
   * nghin can - loc, sap xep va phan trang deu se do backend lam.
   *
   * KHI CO BACKEND: GET /projects/:slug/units?page=&limit=&sort=...
   */
  units: async (slug: string, query: UnitQuery): Promise<PaginatedUnits> => {
    const all = getProjectUnits(slug);

    // Bo loc lay tu chinh bang hang nen khong bao gio hien lua chon rong ket qua
    const facets = {
      phaseNames: [...new Set(all.map((unit) => unit.phaseName))],
      propertyTypeLabels: [...new Set(all.map((unit) => unit.propertyTypeLabel))],
      directions: [...new Set(all.map((unit) => unit.direction))],
    };

    const matched = all.filter((unit) => {
      if (query.phaseName && unit.phaseName !== query.phaseName) return false;
      if (query.propertyTypeLabel && unit.propertyTypeLabel !== query.propertyTypeLabel)
        return false;
      if (query.direction && unit.direction !== query.direction) return false;
      if (query.status && unit.status !== query.status) return false;
      return true;
    });

    const sorted = sortUnits(matched, query.sort);
    const start = (query.page - 1) * query.limit;

    return delay({
      units: sorted.slice(start, start + query.limit),
      total: sorted.length,
      page: query.page,
      limit: query.limit,
      facets,
    });
  },
};
