'use client';

import { useState } from 'react';
import { FiMaximize } from 'react-icons/fi';
import PlaceholderThumb from '@/common/components/PlaceholderThumb';
import type { ProjectDetail } from '../../../models/project-detail.model';
import { TabEmptyState } from '../shared';

const Photo360Tab = ({ project }: { project: ProjectDetail }) => {
  const [index, setIndex] = useState(0);

  if (project.panoramas.length === 0) {
    return <TabEmptyState message="Dự án chưa có ảnh 360°." />;
  }

  const panorama = project.panoramas[Math.min(index, project.panoramas.length - 1)];

  return (
    <div>
      <h2 className="mb-5 text-center text-xl font-bold uppercase tracking-wide text-gray-900">
        Toàn cảnh dự án
      </h2>

      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-gray-900 shadow-card">
        <PlaceholderThumb
          seed={panorama.publicId}
          src={panorama.imageUrl || undefined}
          alt={`Ảnh 360° ${panorama.title} - ${project.name}`}
        />

        {/* Diem chu thich dat theo toa do % nen tu co gian theo kich thuoc khung */}
        {panorama.hotspots.map((hotspot) => (
          <span
            key={hotspot.publicId}
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-md bg-jade-700/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-card-hover"
          >
            {hotspot.label}
          </span>
        ))}

        <span className="pointer-events-none absolute bottom-3 left-3 rounded bg-black/60 px-2 py-1 text-theme-xs font-medium text-white">
          {index + 1}/{project.panoramas.length}
        </span>

        <button
          type="button"
          aria-label="Xem toàn màn hình"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded bg-black/60 text-white transition hover:bg-black/80"
        >
          <FiMaximize aria-hidden />
        </button>

        <p className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-8 text-center text-theme-sm font-medium text-white">
          {panorama.title}
        </p>
      </div>

      <ul className="mt-4 flex gap-3 overflow-x-auto pb-2">
        {project.panoramas.map((item, itemIndex) => (
          <li key={item.publicId} className="shrink-0">
            <button
              type="button"
              onClick={() => setIndex(itemIndex)}
              aria-current={itemIndex === index}
              aria-label={`Xem ${item.title}`}
              className={`block h-20 w-32 overflow-hidden rounded-md border-2 transition ${
                itemIndex === index
                  ? 'border-accent-500'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <PlaceholderThumb
                seed={item.publicId}
                src={item.imageUrl || undefined}
                alt={item.title}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Photo360Tab;
