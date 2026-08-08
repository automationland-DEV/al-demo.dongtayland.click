'use client';

import { useEffect, useState } from 'react';
import {
  FiBriefcase,
  FiHome,
  FiMapPin,
  FiSearch,
  FiSliders,
  FiTag,
  FiX,
} from 'react-icons/fi';
import FilterSelect from '@/common/components/FilterSelect';
import type { FilterOption } from '../models/project.model';

export type ProjectFilterValues = {
  search: string;
  developerId: string | null;
  regionId: string | null;
  propertyType: string | null;
  status: string | null;
};

type ProjectFilterBarProps = {
  values: ProjectFilterValues;
  options: {
    developers: FilterOption[];
    regions: FilterOption[];
    propertyTypes: FilterOption[];
    statuses: FilterOption[];
  };
  isLoadingOptions: boolean;
  /** So o loc dang bat - hien tren huy hieu nut "Bo loc" o mobile */
  activeCount: number;
  /** So du an khop bo loc hien tai - hien tren nut dong sheet */
  resultCount: number;
  onClearAll: () => void;
  onChange: <K extends keyof ProjectFilterValues>(
    key: K,
    value: ProjectFilterValues[K],
  ) => void;
};

/** Bon o loc dung chung cho ca thanh ngang (desktop) va sheet (mobile) */
type SelectConfig = {
  /** 'search' co o nhap rieng, khong nam trong nhom nay */
  key: Exclude<keyof ProjectFilterValues, 'search'>;
  label: string;
  icon: React.ReactNode;
  options: FilterOption[];
};

const ProjectFilterBar = ({
  values,
  options,
  isLoadingOptions,
  activeCount,
  resultCount,
  onClearAll,
  onChange,
}: ProjectFilterBarProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Sheet la lop phu toan man hinh: khoa cuon nen va cho Escape dong lai.
  // FilterSelect bat Escape o pha capture nen menu dang mo se "an" phim nay,
  // Escape thu nhat dong menu, thu hai moi dong sheet.
  useEffect(() => {
    if (!isSheetOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsSheetOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isSheetOpen]);

  // Nhan de ngan gon: 4 o loc chia nhau ~180px moi o, "Chon chu dau tu" bi
  // cat mat chu. Icon dan dau da du de phan biet tung o.
  const selects: SelectConfig[] = [
    {
      key: 'developerId',
      label: 'Chủ đầu tư',
      icon: <FiBriefcase />,
      options: options.developers,
    },
    {
      key: 'regionId',
      label: 'Khu vực',
      icon: <FiMapPin />,
      options: options.regions,
    },
    {
      key: 'propertyType',
      label: 'Loại hình',
      icon: <FiHome />,
      options: options.propertyTypes,
    },
    {
      key: 'status',
      label: 'Trạng thái',
      icon: <FiTag />,
      options: options.statuses,
    },
  ];

  const renderSelect = (config: SelectConfig, className: string) => (
    <FilterSelect
      key={config.key}
      label={config.label}
      icon={config.icon}
      value={values[config.key]}
      options={config.options}
      isLoading={isLoadingOptions}
      className={className}
      onChange={(next) => onChange(config.key, next)}
    />
  );

  const searchField = (
    <div className="relative flex-1 md:w-[280px] md:flex-none">
      <FiSearch
        aria-hidden
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        type="search"
        value={values.search}
        onChange={(event) => onChange('search', event.target.value)}
        placeholder="Tìm kiếm dự án..."
        aria-label="Tìm kiếm dự án"
        className="h-11 w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 text-theme-sm text-gray-700 outline-none transition placeholder:text-gray-400 hover:border-brand-300 focus:border-brand-400 focus:shadow-focus-ring"
      />
    </div>
  );

  return (
    <>
      <div className="mx-auto flex max-w-5xl flex-col gap-2 rounded-xl border border-gray-200 bg-white p-2 shadow-card md:flex-row md:items-center">
        <div className="flex items-center gap-2 md:contents">
          {searchField}

          {/* Duoi md, bon o loc rut vao sheet de thanh tren khong bi chat */}
          <button
            type="button"
            onClick={() => setIsSheetOpen(true)}
            aria-expanded={isSheetOpen}
            className="flex h-11 shrink-0 items-center gap-2 rounded-md border border-gray-300 px-3 text-theme-sm font-medium text-gray-700 transition hover:border-brand-400 hover:text-brand-600 md:hidden"
          >
            <FiSliders aria-hidden />
            Bộ lọc
            {activeCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-500 px-1 text-[11px] font-bold text-white">
                {activeCount}
              </span>
            )}
          </button>
        </div>

        <div className="hidden flex-1 gap-2 md:flex">
          {selects.map((config) => renderSelect(config, 'min-w-0 flex-1'))}
        </div>
      </div>

      {isSheetOpen && (
        <div className="fixed inset-0 z-[1050] md:hidden">
          <div
            aria-hidden
            onClick={() => setIsSheetOpen(false)}
            className="absolute inset-0 bg-gray-900/40"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Bộ lọc dự án"
            className="absolute inset-x-0 bottom-0 flex max-h-[90dvh] flex-col rounded-t-2xl bg-white shadow-panel"
          >
            <div className="flex justify-center pb-1 pt-3">
              <span aria-hidden className="h-1 w-10 rounded-full bg-gray-300" />
            </div>

            <div className="flex items-center justify-between border-b border-gray-100 px-4 pb-3">
              <span className="flex items-center gap-2 font-semibold text-gray-800">
                <FiSliders aria-hidden className="text-brand-500" />
                Bộ lọc
              </span>
              <button
                type="button"
                onClick={() => setIsSheetOpen(false)}
                aria-label="Đóng bộ lọc"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200"
              >
                <FiX aria-hidden />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {selects.map((config) => (
                <label key={config.key} className="block">
                  <span className="mb-1.5 block text-theme-xs font-medium text-gray-500">
                    {config.label}
                  </span>
                  {renderSelect(config, 'w-full')}
                </label>
              ))}
            </div>

            <div className="flex gap-3 border-t border-gray-100 p-4">
              <button
                type="button"
                onClick={onClearAll}
                disabled={activeCount === 0}
                className="h-11 rounded-md border border-gray-300 px-4 text-theme-sm font-medium text-gray-700 transition hover:border-error-500 hover:text-error-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Xóa tất cả
              </button>
              <button
                type="button"
                onClick={() => setIsSheetOpen(false)}
                className="h-11 flex-1 rounded-md bg-brand-500 text-theme-sm font-semibold text-white transition hover:bg-brand-600"
              >
                Xem {resultCount} dự án
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectFilterBar;
