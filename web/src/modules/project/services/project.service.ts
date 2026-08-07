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
  MOCK_DEVELOPERS,
  MOCK_PROJECTS,
  MOCK_REGIONS,
} from '../mocks/projects.mock';
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

export const ProjectService = {
  /** Danh sach du an da loc + phan trang */
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

  /** Panel cot phai: cao tang / thap tang ban chay + moi nhat */
  highlights: async (): Promise<ProjectHighlightGroup[]> => {
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

      return picked.map(({ publicId, slug, name }) => ({ publicId, slug, name }));
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
        projects: newest.slice(0, 5).map(({ publicId, slug, name }) => ({ publicId, slug, name })),
      },
    ]);
  },
};
