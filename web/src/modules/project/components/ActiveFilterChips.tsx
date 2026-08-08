'use client';

import { FiX } from 'react-icons/fi';

export type ActiveChip = {
  /** Ten tham so tren URL, dung lam khoa va de xoa dung o loc */
  param: string;
  label: string;
};

type ActiveFilterChipsProps = {
  chips: ActiveChip[];
  onRemove: (param: string) => void;
  onClearAll: () => void;
};

const ActiveFilterChips = ({ chips, onRemove, onClearAll }: ActiveFilterChipsProps) => {
  if (chips.length === 0) return null;

  return (
    <div className="mx-auto mb-4 flex max-w-5xl flex-wrap items-center justify-center gap-2">
      <span className="text-theme-xs font-medium uppercase tracking-wide text-gray-400">
        Đang lọc
      </span>

      {chips.map((chip) => (
        <span
          key={chip.param}
          className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 py-1 pl-3 pr-1.5 text-theme-xs font-medium text-brand-700"
        >
          {chip.label}
          <button
            type="button"
            onClick={() => onRemove(chip.param)}
            aria-label={`Bỏ lọc ${chip.label}`}
            className="flex h-5 w-5 items-center justify-center rounded-full text-brand-500 transition hover:bg-brand-100 hover:text-brand-700"
          >
            <FiX aria-hidden />
          </button>
        </span>
      ))}

      <button
        type="button"
        onClick={onClearAll}
        className="text-theme-xs font-medium text-gray-500 underline underline-offset-2 transition hover:text-error-600"
      >
        Xóa tất cả
      </button>
    </div>
  );
};

export default ActiveFilterChips;
