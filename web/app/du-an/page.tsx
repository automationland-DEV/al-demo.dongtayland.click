import type { Metadata } from 'next';
import ProjectListPage from '@/modules/project/components/ProjectListPage';

export const metadata: Metadata = {
  title: 'Danh sách dự án',
  description: 'Tìm kiếm và lọc dự án bất động sản theo chủ đầu tư, khu vực, loại hình và trạng thái.',
};

export default function ProjectsRoutePage() {
  return <ProjectListPage />;
}
