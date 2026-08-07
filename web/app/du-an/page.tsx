import { Suspense } from 'react';
import type { Metadata } from 'next';
import ProjectListPage from '@/modules/project/components/ProjectListPage';

export const metadata: Metadata = {
  title: 'Danh sách dự án',
  description:
    'Tìm kiếm và lọc dự án bất động sản theo chủ đầu tư, khu vực, loại hình và trạng thái.',
};

/** Khung xuong hien trong luc cho doc tham so loc tu URL */
const PageFallback = () => (
  <div className="site-container py-8">
    <div className="mx-auto mb-6 h-8 w-64 animate-pulse rounded bg-gray-200" />
    <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="h-11 animate-pulse rounded-md bg-gray-100" />
      ))}
    </div>
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="h-72 animate-pulse rounded-lg bg-gray-100" />
      ))}
    </div>
  </div>
);

export default function ProjectsRoutePage() {
  // ProjectListPage doc bo loc qua useSearchParams nen bat buoc phai nam
  // trong Suspense, neu khong Next se bao loi khi prerender trang tinh.
  return (
    <Suspense fallback={<PageFallback />}>
      <ProjectListPage />
    </Suspense>
  );
}
