'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Pagination from '@/common/components/Pagination';
import NewsSection from '@/modules/news/components/NewsSection';
import ProjectCard from './ProjectCard';
import ProjectFilterBar, { type ProjectFilterValues } from './ProjectFilterBar';
import ProjectHighlightPanel from './ProjectHighlightPanel';
import ActiveFilterChips, { type ActiveChip } from './ActiveFilterChips';
import {
  useProjectFilterOptions,
  useProjectHighlights,
  useProjectList,
} from '../hooks/useProjects';
import {
  PROPERTY_TYPE_LABELS,
  STATUS_LABELS,
  type ProjectPropertyType,
  type ProjectQuery,
  type ProjectStatus,
} from '../models/project.model';

/**
 * URL la nguon su that duy nhat cua bo loc: refresh khong mat filter,
 * copy link gui nguoi khac ra dung ket qua, nut Back cua trinh duyet chay dung.
 */
const PARAM = {
  search: 'q',
  developer: 'cdt',
  region: 'kv',
  propertyType: 'lh',
  status: 'tt',
  page: 'trang',
  limit: 'sl',
} as const;

const ALLOWED_LIMITS = [12, 24, 48];
const DEFAULT_LIMIT = 12;

const EMPTY_OPTIONS = {
  developers: [],
  regions: [],
  propertyTypes: [],
  statuses: [],
};

const CardSkeleton = () => (
  <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-card">
    <div className="aspect-[16/10] w-full animate-pulse bg-gray-100" />
    <div className="space-y-2.5 p-4">
      <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
      <div className="h-3 w-full animate-pulse rounded bg-gray-100" />
      <div className="h-3 w-2/3 animate-pulse rounded bg-gray-100" />
    </div>
  </div>
);

const ProjectListPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // ── Doc trang thai tu URL ────────────────────────────────────────────────
  const urlSearch = searchParams.get(PARAM.search) ?? '';
  const developerId = searchParams.get(PARAM.developer);
  const regionId = searchParams.get(PARAM.region);
  const propertyType = searchParams.get(PARAM.propertyType);
  const status = searchParams.get(PARAM.status);

  const rawPage = Number(searchParams.get(PARAM.page));
  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;

  const rawLimit = Number(searchParams.get(PARAM.limit));
  const limit = ALLOWED_LIMITS.includes(rawLimit) ? rawLimit : DEFAULT_LIMIT;

  // ── O tim kiem: go den dau hien den do, 300ms sau moi ghi vao URL ────────
  const [searchInput, setSearchInput] = useState(urlSearch);
  const [lastUrlSearch, setLastUrlSearch] = useState(urlSearch);

  // Dong bo nguoc khi URL doi tu ben ngoai (nut Back, dan link moi).
  // Day la cach React khuyen dung de "chinh state khi prop doi": so sanh voi
  // gia tri truoc do luu trong state va set ngay trong than render, re hon
  // useEffect vi khong ton them mot vong commit.
  if (lastUrlSearch !== urlSearch) {
    setLastUrlSearch(urlSearch);
    if (searchInput !== urlSearch) setSearchInput(urlSearch);
  }

  const applyParams = useCallback(
    (updates: Record<string, string | null>, keepPage = false) => {
      const next = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === '') next.delete(key);
        else next.set(key, value);
      }

      // Doi bo loc thi phai ve trang 1, neu khong nguoi dung ket o trang trong
      if (!keepPage) next.delete(PARAM.page);

      const queryString = next.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    if (searchInput === urlSearch) return;
    const timer = setTimeout(
      () => applyParams({ [PARAM.search]: searchInput || null }),
      300,
    );
    return () => clearTimeout(timer);
  }, [searchInput, urlSearch, applyParams]);

  // ── Truy van ─────────────────────────────────────────────────────────────
  const query: ProjectQuery = useMemo(
    () => ({
      page,
      limit,
      search: urlSearch,
      developerId,
      regionId,
      propertyType: propertyType as ProjectPropertyType | null,
      status: status as ProjectStatus | null,
    }),
    [page, limit, urlSearch, developerId, regionId, propertyType, status],
  );

  const listQuery = useProjectList(query);
  const optionsQuery = useProjectFilterOptions();
  const highlightsQuery = useProjectHighlights();

  const options = optionsQuery.data ?? EMPTY_OPTIONS;

  const filterValues: ProjectFilterValues = {
    search: searchInput,
    developerId,
    regionId,
    propertyType,
    status,
  };

  const handleFilterChange = useCallback(
    <K extends keyof ProjectFilterValues>(key: K, value: ProjectFilterValues[K]) => {
      if (key === 'search') {
        setSearchInput(value ?? '');
        return;
      }

      const paramKey = {
        developerId: PARAM.developer,
        regionId: PARAM.region,
        propertyType: PARAM.propertyType,
        status: PARAM.status,
        search: PARAM.search,
      }[key];

      applyParams({ [paramKey]: value });
    },
    [applyParams],
  );

  // ── Chip bo loc dang bat ─────────────────────────────────────────────────
  const activeChips: ActiveChip[] = useMemo(() => {
    const labelOf = (list: { value: string; label: string }[], value: string) =>
      list.find((option) => option.value === value)?.label ?? value;

    const chips: ActiveChip[] = [];

    if (urlSearch) {
      chips.push({ param: PARAM.search, label: `Từ khóa: “${urlSearch}”` });
    }
    if (developerId) {
      chips.push({
        param: PARAM.developer,
        label: labelOf(options.developers, developerId),
      });
    }
    if (regionId) {
      chips.push({ param: PARAM.region, label: labelOf(options.regions, regionId) });
    }
    if (propertyType) {
      chips.push({
        param: PARAM.propertyType,
        label:
          PROPERTY_TYPE_LABELS[propertyType as ProjectPropertyType] ?? propertyType,
      });
    }
    if (status) {
      chips.push({
        param: PARAM.status,
        label: STATUS_LABELS[status as ProjectStatus] ?? status,
      });
    }

    return chips;
  }, [
    urlSearch,
    developerId,
    regionId,
    propertyType,
    status,
    options.developers,
    options.regions,
  ]);

  const removeChip = useCallback(
    (param: string) => {
      if (param === PARAM.search) setSearchInput('');
      applyParams({ [param]: null });
    },
    [applyParams],
  );

  const clearAllFilters = useCallback(() => {
    setSearchInput('');
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  const projects = listQuery.data?.projects ?? [];
  const total = listQuery.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const hasActiveFilter = activeChips.length > 0;

  // Chi hien khung xuong o lan tai dau; doi trang/loc thi giu ket qua cu
  // va lam mo di, tranh giat layout.
  const isFirstLoad = listQuery.isLoading;
  const isRefreshing = listQuery.isFetching && !isFirstLoad;

  return (
    <div className="site-container py-8">
      <h1 className="mb-6 text-center text-2xl font-bold uppercase tracking-wide text-gray-900">
        Danh sách dự án
      </h1>

      <div className="mb-4">
        <ProjectFilterBar
          values={filterValues}
          options={options}
          isLoadingOptions={optionsQuery.isLoading}
          activeCount={activeChips.length}
          resultCount={total}
          onClearAll={clearAllFilters}
          onChange={handleFilterChange}
        />
      </div>

      <ActiveFilterChips
        chips={activeChips}
        onRemove={removeChip}
        onClearAll={clearAllFilters}
      />

      <div className="mb-4 flex min-h-5 items-center justify-between text-theme-sm text-gray-500">
        {isFirstLoad ? (
          <span className="h-4 w-32 animate-pulse rounded bg-gray-100" />
        ) : (
          <span aria-live="polite">
            {hasActiveFilter ? 'Tìm thấy ' : 'Có '}
            <strong className="text-gray-800">{total}</strong> dự án
          </span>
        )}
        {isRefreshing && <span className="text-gray-400">Đang cập nhật...</span>}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          {listQuery.isError ? (
            <div className="rounded-lg border border-error-500/30 bg-error-50 p-8 text-center">
              <p className="mb-4 text-theme-sm text-error-600">
                Không tải được danh sách dự án.
              </p>
              <button
                type="button"
                onClick={() => listQuery.refetch()}
                className="rounded-md bg-brand-500 px-4 py-2 text-theme-sm font-semibold text-white transition hover:bg-brand-600"
              >
                Thử lại
              </button>
            </div>
          ) : isFirstLoad ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
              <p className="mb-4 text-theme-sm text-gray-500">
                {hasActiveFilter
                  ? 'Không tìm thấy dự án phù hợp với bộ lọc.'
                  : 'Chưa có dự án nào.'}
              </p>
              {hasActiveFilter && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="rounded-md border border-gray-300 px-4 py-2 text-theme-sm font-medium text-gray-700 transition hover:border-brand-400 hover:text-brand-600"
                >
                  Xóa bộ lọc
                </button>
              )}
            </div>
          ) : (
            <div
              className={`grid grid-cols-1 gap-5 transition-opacity duration-200 sm:grid-cols-2 xl:grid-cols-3 ${
                isRefreshing ? 'opacity-70' : 'opacity-100'
              }`}
            >
              {projects.map((project) => (
                <ProjectCard key={project.publicId} project={project} />
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-20">
            <ProjectHighlightPanel
              groups={highlightsQuery.data ?? []}
              isLoading={highlightsQuery.isLoading}
            />
          </div>
        </div>
      </div>

      {total > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          total={total}
          limit={limit}
          onPageChange={(nextPage) =>
            applyParams({ [PARAM.page]: nextPage > 1 ? String(nextPage) : null }, true)
          }
          onLimitChange={(nextLimit) =>
            applyParams({
              [PARAM.limit]: nextLimit === DEFAULT_LIMIT ? null : String(nextLimit),
            })
          }
        />
      )}

      <NewsSection />
    </div>
  );
};

export default ProjectListPage;
