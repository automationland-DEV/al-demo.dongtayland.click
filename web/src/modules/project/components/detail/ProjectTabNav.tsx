'use client';

import { useEffect, useRef, type ReactNode } from 'react';
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

const ProjectTabNav = ({ current, onChange }: ProjectTabNavProps) => {
  const listRef = useRef<HTMLUListElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  // Man hinh hep chi thay 3-4 tab mot luc. Doi tab qua URL (nut Back, link chia
  // se) ma khong keo thanh nay thi tab dang xem nam ngoai tam nhin.
  useEffect(() => {
    const list = listRef.current;
    const active = activeRef.current;
    if (!list || !active) return;

    const offset =
      active.offsetLeft - list.clientWidth / 2 + active.clientWidth / 2;
    list.scrollTo({ left: Math.max(0, offset), behavior: 'smooth' });
  }, [current]);

  return (
    // top-16 = dung chieu cao SiteHeader dang dinh o tren, de hai thanh xep sat
    // nhau thay vi de lo mot dai noi dung troi qua giua.
    <nav
      aria-label="Nội dung dự án"
      className="sticky top-16 z-30 border-b border-gray-200 bg-white/85 backdrop-blur-lg"
    >
      <ul
        ref={listRef}
        className="site-container no-scrollbar flex items-center gap-1.5 overflow-x-auto py-2.5"
      >
        {PROJECT_DETAIL_TABS.map((tab) => {
          const isActive = tab.key === current;

          return (
            <li key={tab.key} className="shrink-0">
              <button
                ref={isActive ? activeRef : undefined}
                type="button"
                onClick={() => onChange(tab.key)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-theme-sm transition duration-200 ${
                  isActive
                    ? 'brand-gradient font-semibold text-white shadow-[0_4px_14px_-4px_rgba(15,111,209,0.7)]'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-brand-600'
                }`}
              >
                <span className={isActive ? 'text-white' : 'text-gray-400'}>
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
};

export default ProjectTabNav;
