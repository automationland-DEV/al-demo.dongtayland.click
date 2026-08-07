'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Pagination from '@/common/components/Pagination';
import NewsSection from '@/modules/news/components/NewsSection';
import ProjectCard from './ProjectCard';
import ProjectFilterBar, { type ProjectFilterValues } from './ProjectFilterBar';
import ProjectHighlightPanel from './ProjectHighlightPanel';
import {
  useProjectFilterOptions,
  useProjectHighlights,
  useProjectList,
} from '../hooks/useProjects';
import {
  DEFAULT_PROJECT_QUERY,
  type ProjectPropertyType,
  type ProjectQuery,
  type ProjectStatus,
} from '../models/project.model';

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
  const [filters, setFilters] = useState<ProjectFilterValues>({
    search: '',
    developerId: null,
    regionId: null,
    propertyType: null,
    status: null,
  });
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(DEFAULT_PROJECT_QUERY.limit);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Cho nguoi dung go xong roi moi goi API
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(filters.search), 300);
    return () => clearTimeout(timer);
  }, [filters.search]);

  const query: ProjectQuery = useMemo(
    () => ({
      page,
      limit,
      search: debouncedSearch,
      developerId: filters.developerId,
      regionId: filters.regionId,
      propertyType: filters.propertyType as ProjectPropertyType | null,
      status: filters.status as ProjectStatus | null,
    }),
    [
      page,
      limit,
      debouncedSearch,
      filters.developerId,
      filters.regionId,
      filters.propertyType,
      filters.status,
    ],
  );

  const listQuery = useProjectList(query);
  const optionsQuery = useProjectFilterOptions();
  const highlightsQuery = useProjectHighlights();

  // Doi bo loc hay so dong/trang thi phai ve trang 1, neu khong nguoi dung
  // co the dung o mot trang khong con ton tai sau khi loc.
  const handleFilterChange = useCallback(
    <K extends keyof ProjectFilterValues>(key: K, value: ProjectFilterValues[K]) => {
      setFilters((previous) => ({ ...previous, [key]: value }));
      setPage(1);
    },
    [],
  );

  const handleLimitChange = useCallback((nextLimit: number) => {
    setLimit(nextLimit);
    setPage(1);
  }, []);

  const handleToggleFavorite = useCallback((publicId: string) => {
    setFavorites((previous) => {
      const next = new Set(previous);
      if (next.has(publicId)) {
        next.delete(publicId);
      } else {
        next.add(publicId);
      }
      return next;
    });
  }, []);

  const hasActiveFilter =
    Boolean(debouncedSearch) ||
    Boolean(filters.developerId) ||
    Boolean(filters.regionId) ||
    Boolean(filters.propertyType) ||
    Boolean(filters.status);

  const resetFilters = () => {
    setFilters({
      search: '',
      developerId: null,
      regionId: null,
      propertyType: null,
      status: null,
    });
    setPage(1);
  };

  const projects = listQuery.data?.projects ?? [];
  const total = listQuery.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="site-container py-8">
      <h1 className="mb-6 text-center text-2xl font-bold uppercase tracking-wide text-gray-900">
        Danh sách dự án
      </h1>

      <div className="mb-6">
        <ProjectFilterBar
          values={filters}
          options={optionsQuery.data ?? EMPTY_OPTIONS}
          isLoadingOptions={optionsQuery.isLoading}
          onChange={handleFilterChange}
        />
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
          ) : listQuery.isLoading ? (
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
                  onClick={resetFilters}
                  className="rounded-md border border-gray-300 px-4 py-2 text-theme-sm font-medium text-gray-700 transition hover:border-brand-400 hover:text-brand-600"
                >
                  Xóa bộ lọc
                </button>
              )}
            </div>
          ) : (
            <div
              className={`grid grid-cols-1 gap-5 transition-opacity sm:grid-cols-2 xl:grid-cols-3 ${
                listQuery.isFetching ? 'opacity-60' : 'opacity-100'
              }`}
            >
              {projects.map((project) => (
                <ProjectCard
                  key={project.publicId}
                  project={project}
                  isFavorite={favorites.has(project.publicId)}
                  onToggleFavorite={handleToggleFavorite}
                />
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
          onPageChange={setPage}
          onLimitChange={handleLimitChange}
        />
      )}

      <NewsSection />
    </div>
  );
};

export default ProjectListPage;
