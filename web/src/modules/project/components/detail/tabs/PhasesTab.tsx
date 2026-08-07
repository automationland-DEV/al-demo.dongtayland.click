'use client';

import { HiOutlineBuildingOffice2, HiOutlineSquares2X2 } from 'react-icons/hi2';
import { FiCreditCard } from 'react-icons/fi';
import { formatNumber, formatPriceRange } from '@/common/utils/format';
import type { ProjectDetail } from '../../../models/project-detail.model';
import { MediaFrame, TabEmptyState } from '../shared';

/** Mot dong so lieu trong the phan khu: o icon mau + nhan + gia tri */
const PhaseFact = ({
  icon,
  tone,
  label,
  value,
}: {
  icon: React.ReactNode;
  tone: string;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-3 rounded-lg bg-gray-50 px-3 py-2.5">
    <span
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-white ${tone}`}
    >
      {icon}
    </span>
    <div className="min-w-0">
      <p className="text-[11px] uppercase tracking-wide text-gray-400">{label}</p>
      <p className="truncate text-theme-sm font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const PhasesTab = ({ project }: { project: ProjectDetail }) => {
  if (project.phases.length === 0) {
    return <TabEmptyState message="Dự án chưa công bố thông tin phân khu." />;
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {project.phases.map((phase) => (
        <article
          key={phase.publicId}
          className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-card transition hover:shadow-card-hover"
        >
          <div className="px-4 pt-4">
            <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-gray-400">
              <HiOutlineSquares2X2 aria-hidden />
              Phân khu
            </p>
            <h3 className="mt-1 text-base font-bold uppercase leading-snug text-navy-700">
              {phase.name}
            </h3>
          </div>

          <div className="p-4">
            <MediaFrame
              seed={phase.publicId}
              src={phase.imageUrl}
              alt={`Phối cảnh phân khu ${phase.name}`}
              ratio="aspect-[4/3]"
            />
          </div>

          <div className="space-y-2 px-4 pb-4">
            <PhaseFact
              icon={<HiOutlineBuildingOffice2 aria-hidden />}
              tone="bg-gold-400"
              label="Tổng căn"
              value={formatNumber(phase.totalUnits)}
            />
            <PhaseFact
              icon={<FiCreditCard aria-hidden />}
              tone="bg-jade-500"
              label="Giá"
              value={formatPriceRange(phase.priceFrom, phase.priceTo)}
            />
          </div>
        </article>
      ))}
    </div>
  );
};

export default PhasesTab;
