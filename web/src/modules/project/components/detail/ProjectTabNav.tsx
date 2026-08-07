'use client';

import type { ReactNode } from 'react';
import {
  FiBookOpen,
  FiCalendar,
  FiCamera,
  FiFileText,
  FiGlobe,
  FiMapPin,
} from 'react-icons/fi';
import {
  HiOutlineAcademicCap,
  HiOutlineBookOpen,
  HiOutlineHomeModern,
  HiOutlineNewspaper,
  HiOutlineSquares2X2,
} from 'react-icons/hi2';
import {
  PROJECT_DETAIL_TABS,
  type ProjectDetailTabKey,
} from '../../models/project-detail.model';

/** Icon nam o day chu khong o model: model la hop dong du lieu, khong chua JSX */
const TAB_ICONS: Record<ProjectDetailTabKey, ReactNode> = {
  'tong-quan': <FiGlobe aria-hidden />,
  'vi-tri': <FiMapPin aria-hidden />,
  'phan-khu': <HiOutlineSquares2X2 aria-hidden />,
  'mat-bang-quy-can': <FiBookOpen aria-hidden />,
  'quy-can': <HiOutlineHomeModern aria-hidden />,
  'anh-360': <FiCamera aria-hidden />,
  'dao-tao': <HiOutlineAcademicCap aria-hidden />,
  'chinh-sach-ban-hang': <FiFileText aria-hidden />,
  'tien-do': <FiCalendar aria-hidden />,
  'tai-lieu': <HiOutlineBookOpen aria-hidden />,
  'tin-tuc': <HiOutlineNewspaper aria-hidden />,
};

type ProjectTabNavProps = {
  current: ProjectDetailTabKey;
  onChange: (tab: ProjectDetailTabKey) => void;
};

const ProjectTabNav = ({ current, onChange }: ProjectTabNavProps) => (
  <nav aria-label="Nội dung dự án" className="border-b border-gray-200">
    {/* Man hinh hep: cuon ngang thay vi xuong dong, giu dung mot hang nhu thiet
        ke. no-scrollbar de khong loi ra mot thanh cuon xam duoi day tab. */}
    <ul className="site-container no-scrollbar flex items-stretch justify-start gap-0 overflow-x-auto lg:justify-center">
      {PROJECT_DETAIL_TABS.map((tab, index) => {
        const isActive = tab.key === current;

        return (
          <li key={tab.key} className="flex shrink-0 items-center">
            {index > 0 && <span aria-hidden className="mx-1 h-4 w-px bg-gray-200" />}

            <button
              type="button"
              onClick={() => onChange(tab.key)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex items-center gap-1.5 whitespace-nowrap border-b-2 px-2.5 py-3 text-theme-sm transition ${
                isActive
                  ? 'border-accent-500 font-semibold text-accent-600'
                  : 'border-transparent text-gray-700 hover:text-brand-600'
              }`}
            >
              <span className={isActive ? 'text-accent-500' : 'text-gray-400'}>
                {TAB_ICONS[tab.key]}
              </span>
              {tab.label}
            </button>
          </li>
        );
      })}
    </ul>
  </nav>
);

export default ProjectTabNav;
