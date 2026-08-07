'use client';

import { useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useProjectDetail } from '../../hooks/useProjects';
import {
  DEFAULT_TAB,
  parseTabKey,
  type ProjectDetail,
  type ProjectDetailTabKey,
} from '../../models/project-detail.model';
import ProjectDetailHeader from './ProjectDetailHeader';
import ProjectTabNav from './ProjectTabNav';
import DocumentsTab from './tabs/DocumentsTab';
import FloorPlanTab from './tabs/FloorPlanTab';
import LocationTab from './tabs/LocationTab';
import OverviewTab from './tabs/OverviewTab';
import PhasesTab from './tabs/PhasesTab';
import Photo360Tab from './tabs/Photo360Tab';
import ProgressTab from './tabs/ProgressTab';
import ProjectNewsTab from './tabs/ProjectNewsTab';
import SalesPolicyTab from './tabs/SalesPolicyTab';
import TrainingTab from './tabs/TrainingTab';
import UnitsTab from './tabs/UnitsTab';

const TAB_PARAM = 'tab';

const DetailSkeleton = () => (
  <div className="site-container py-8">
    <div className="mb-6 h-24 animate-pulse rounded-lg bg-gray-100" />
    <div className="mb-6 h-11 animate-pulse rounded bg-gray-100" />
    <div className="mb-6 aspect-[21/9] w-full animate-pulse rounded-xl bg-gray-100" />
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="h-20 animate-pulse rounded-xl bg-gray-100" />
      ))}
    </div>
  </div>
);

type ProjectDetailPageProps = {
  slug: string;
  /** Du lieu route da doc san tren server - dung lam initialData cho query */
  initialProject?: ProjectDetail;
};

const ProjectDetailPage = ({ slug, initialProject }: ProjectDetailPageProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const tabsRef = useRef<HTMLDivElement>(null);

  // Tab nam tren URL nen refresh, nut Back va link chia se deu ra dung tab
  const currentTab = parseTabKey(searchParams.get(TAB_PARAM));

  const detailQuery = useProjectDetail(slug, initialProject);

  const changeTab = useCallback(
    (tab: ProjectDetailTabKey) => {
      const next = new URLSearchParams(searchParams.toString());
      if (tab === DEFAULT_TAB) next.delete(TAB_PARAM);
      else next.set(TAB_PARAM, tab);

      const queryString = next.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });

      // Doi tab ma giu nguyen vi tri cuon se roi vao giua mot tab ngan, nhin
      // nhu trang bi vo - keo ve dau vung noi dung.
      tabsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    [pathname, router, searchParams],
  );

  if (detailQuery.isLoading) return <DetailSkeleton />;

  if (detailQuery.isError) {
    return (
      <div className="site-container py-16 text-center">
        <p className="mb-4 text-theme-sm text-error-600">Không tải được thông tin dự án.</p>
        <button
          type="button"
          onClick={() => detailQuery.refetch()}
          className="rounded-md bg-brand-500 px-4 py-2 text-theme-sm font-semibold text-white transition hover:bg-brand-600"
        >
          Thử lại
        </button>
      </div>
    );
  }

  const project = detailQuery.data;

  if (!project) {
    return (
      <div className="site-container py-16 text-center">
        <p className="mb-4 text-theme-sm text-gray-500">Không tìm thấy dự án này.</p>
        <Link
          href="/du-an"
          className="rounded-md border border-gray-300 px-4 py-2 text-theme-sm font-medium text-gray-700 transition hover:border-brand-400 hover:text-brand-600"
        >
          Về danh sách dự án
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-14">
      <ProjectDetailHeader name={project.name} />

      {/* scroll-mt tru cho header dinh o tren, neu khong tab bi che mat */}
      <div ref={tabsRef} className="mt-5 scroll-mt-16">
        <ProjectTabNav current={currentTab} onChange={changeTab} />
      </div>

      <div className="site-container pt-8">
        {currentTab === 'tong-quan' && <OverviewTab project={project} />}
        {currentTab === 'vi-tri' && <LocationTab project={project} />}
        {currentTab === 'phan-khu' && <PhasesTab project={project} />}
        {currentTab === 'mat-bang-quy-can' && <FloorPlanTab project={project} />}
        {currentTab === 'quy-can' && <UnitsTab slug={slug} />}
        {currentTab === 'anh-360' && <Photo360Tab project={project} />}
        {currentTab === 'dao-tao' && <TrainingTab project={project} />}
        {currentTab === 'chinh-sach-ban-hang' && <SalesPolicyTab project={project} />}
        {currentTab === 'tien-do' && <ProgressTab project={project} />}
        {currentTab === 'tai-lieu' && <DocumentsTab project={project} />}
        {currentTab === 'tin-tuc' && <ProjectNewsTab project={project} />}
      </div>
    </div>
  );
};

export default ProjectDetailPage;
