'use client';

import { useEffect, useState, type FormEvent } from 'react';
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
import ShineSweep from '@/common/components/ShineSweep';
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
  /** So o loc dang bat - hien tren huy hieu nut "Bo loc" */
  activeCount: number;
  /** So du an khop bo loc hien tai - hien tren nut dong bang loc */
  resultCount: number;
  onClearAll: () => void;
  /** Ap tu khoa ngay lap tuc, bo qua do tre go phim */
  onSubmitSearch: () => void;
  onChange: <K extends keyof ProjectFilterValues>(
    key: K,
    value: ProjectFilterValues[K],
  ) => void;
};

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
  onSubmitSearch,
  onChange,
}: ProjectFilterBarProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Bang loc la lop phu chan mo tuong tac phia sau: khoa cuon nen va cho Escape
  // dong lai. FilterSelect bat Escape o pha capture nen menu dang mo se "an"
  // phim nay - Escape thu nhat dong menu, thu hai moi dong bang loc.
  useEffect(() => {
    if (!isFilterOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsFilterOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isFilterOpen]);

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

  const submit = (event: FormEvent) => {
    event.preventDefault();
    onSubmitSearch();
  };

  return (
    <>
      <div className="mx-auto flex max-w-4xl items-center gap-3">
        {/* Thanh tim kiem chinh. focus-within de ca vien vien sang khi con tro
            nam trong o nhap - o nhap khong co vien rieng nen phai lam o day. */}
        <form
          onSubmit={submit}
          role="search"
          className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-gray-200 bg-white p-2 pl-5 shadow-card transition focus-within:border-brand-300 focus-within:shadow-panel sm:pl-6"
        >
          <input
            type="search"
            value={values.search}
            onChange={(event) => onChange('search', event.target.value)}
            placeholder="Tìm kiếm dự án..."
            aria-label="Tìm kiếm dự án"
            className="h-12 min-w-0 flex-1 bg-transparent text-base text-gray-800 outline-none placeholder:text-gray-400"
          />

          <button
            type="submit"
            className="brand-gradient group relative flex h-12 shrink-0 items-center overflow-hidden rounded-full px-5 text-theme-sm font-bold text-white shadow-[0_4px_16px_-4px_rgba(15,111,209,0.75)] transition-transform duration-300 ease-out hover:scale-105 active:scale-95 sm:px-6"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="hidden sm:inline">Tìm kiếm</span>
              <FiSearch aria-hidden className="text-base" />
            </span>
            <ShineSweep />
          </button>
        </form>

        <button
          type="button"
          onClick={() => setIsFilterOpen(true)}
          aria-expanded={isFilterOpen}
          className={`flex h-14 shrink-0 items-center gap-2 rounded-full border bg-white px-4 text-theme-sm font-semibold shadow-card transition sm:px-5 ${
            activeCount > 0
              ? 'border-brand-400 text-brand-600'
              : 'border-gray-200 text-gray-700 hover:border-brand-400 hover:text-brand-600'
          }`}
        >
          <FiSliders aria-hidden className="text-base" />
          <span className="hidden xsm:inline">Bộ lọc</span>
          {activeCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-500 px-1 text-[11px] font-bold text-white">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Duoi md truot len tu day man hinh, tu md tro len la hop thoai giua man */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[1050]">
          <div
            aria-hidden
            onClick={() => setIsFilterOpen(false)}
            className="absolute inset-0 bg-gray-900/40"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Bộ lọc dự án"
            className="absolute inset-x-0 bottom-0 flex max-h-[90dvh] flex-col rounded-t-2xl bg-white shadow-panel md:inset-x-auto md:bottom-auto md:left-1/2 md:top-1/2 md:max-h-[80vh] md:w-110 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl"
          >
            {/* Thanh keo - chi co nghia khi bang truot len tu day */}
            <div className="flex justify-center pb-1 pt-3 md:hidden">
              <span aria-hidden className="h-1 w-10 rounded-full bg-gray-300" />
            </div>

            <div className="flex items-center justify-between border-b border-gray-100 px-4 pb-3 md:pt-4">
              <span className="flex items-center gap-2 font-semibold text-gray-800">
                <FiSliders aria-hidden className="text-brand-500" />
                Bộ lọc
              </span>
              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
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
                  <FilterSelect
                    label={config.label}
                    icon={config.icon}
                    value={values[config.key]}
                    options={config.options}
                    isLoading={isLoadingOptions}
                    className="w-full"
                    onChange={(next) => onChange(config.key, next)}
                  />
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
                onClick={() => setIsFilterOpen(false)}
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
