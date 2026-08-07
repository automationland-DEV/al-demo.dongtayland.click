'use client';

import Link from 'next/link';
import { FiClock, FiTrendingUp } from 'react-icons/fi';
import { HiOutlineBuildingOffice2, HiOutlineHomeModern } from 'react-icons/hi2';
import type { ProjectHighlightGroup } from '../models/project.model';

const GROUP_ICONS: Record<string, React.ReactNode> = {
  'cao-tang': <HiOutlineBuildingOffice2 aria-hidden className="text-brand-500" />,
  'thap-tang': <HiOutlineHomeModern aria-hidden className="text-accent-500" />,
  'moi-nhat': <FiClock aria-hidden className="text-success-500" />,
};

type ProjectHighlightPanelProps = {
  groups: ProjectHighlightGroup[];
  isLoading: boolean;
};

const ProjectHighlightPanel = ({ groups, isLoading }: ProjectHighlightPanelProps) => (
  <aside className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-panel">
    <h2 className="flex items-center justify-center gap-2 bg-gradient-to-r from-navy-700 to-brand-600 px-4 py-3.5 text-center text-sm font-bold uppercase tracking-wide text-white">
      <FiTrendingUp aria-hidden />
      Dự án đang bán chạy
    </h2>

    {isLoading ? (
      <div className="space-y-3 p-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="h-4 animate-pulse rounded bg-gray-100" />
        ))}
      </div>
    ) : (
      <div className="divide-y divide-gray-100">
        {groups.map((group) => (
          <section key={group.key} className="px-4 py-4">
            <h3 className="mb-3 flex items-center gap-2 text-theme-sm font-semibold text-gray-800">
              {GROUP_ICONS[group.key]}
              {group.title}
            </h3>

            <ul className="space-y-2.5">
              {group.projects.map((project) => (
                <li key={project.publicId}>
                  <Link
                    href={`/du-an/${project.slug}`}
                    className="block text-theme-sm uppercase leading-snug text-gray-600 transition hover:text-brand-600"
                  >
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    )}
  </aside>
);

export default ProjectHighlightPanel;
