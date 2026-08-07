'use client';

import { FiSearch } from 'react-icons/fi';
import type { FilterOption } from '../models/project.model';

type SelectFilterProps = {
  label: string;
  value: string | null;
  options: FilterOption[];
  isLoading: boolean;
  onChange: (value: string | null) => void;
};

const SelectFilter = ({
  label,
  value,
  options,
  isLoading,
  onChange,
}: SelectFilterProps) => (
  <label className="block">
    <span className="sr-only">{label}</span>
    <select
      value={value ?? ''}
      disabled={isLoading}
      onChange={(event) => onChange(event.target.value || null)}
      className="h-11 w-full rounded-md border border-gray-300 bg-white px-3 text-theme-sm text-gray-700 outline-none transition focus:border-brand-400 focus:shadow-focus-ring disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
    >
      <option value="">{label}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
);

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
  onChange: <K extends keyof ProjectFilterValues>(
    key: K,
    value: ProjectFilterValues[K],
  ) => void;
};

const ProjectFilterBar = ({
  values,
  options,
  isLoadingOptions,
  onChange,
}: ProjectFilterBarProps) => (
  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
    <div className="relative lg:col-span-1">
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
        className="h-11 w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 text-theme-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-brand-400 focus:shadow-focus-ring"
      />
    </div>

    <SelectFilter
      label="Chọn chủ đầu tư"
      value={values.developerId}
      options={options.developers}
      isLoading={isLoadingOptions}
      onChange={(value) => onChange('developerId', value)}
    />
    <SelectFilter
      label="Chọn khu vực"
      value={values.regionId}
      options={options.regions}
      isLoading={isLoadingOptions}
      onChange={(value) => onChange('regionId', value)}
    />
    <SelectFilter
      label="Chọn loại hình"
      value={values.propertyType}
      options={options.propertyTypes}
      isLoading={isLoadingOptions}
      onChange={(value) => onChange('propertyType', value)}
    />
    <SelectFilter
      label="Chọn trạng thái"
      value={values.status}
      options={options.statuses}
      isLoading={isLoadingOptions}
      onChange={(value) => onChange('status', value)}
    />
  </div>
);

export default ProjectFilterBar;
