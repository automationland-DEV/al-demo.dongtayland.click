import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';
import ProjectCard from '@/modules/project/components/ProjectCard';
import type { Project } from '@/modules/project/models/project.model';

type FeaturedProjectsProps = {
  projects: Project[];
};

/**
 * Khoi 6 du an noi bat - dung lai ProjectCard de giu dung UI voi /gio-hang.
 * Section title "Dự án nổi bật" cung pattern voi NewsSection.
 */
const FeaturedProjects = ({ projects }: FeaturedProjectsProps) => (
  <section className="bg-gray-50 py-8 md:py-12">
    <div className="site-container">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900 md:text-2xl">
            Dự án nổi bật
          </h2>
          <p className="mt-1 text-theme-sm text-gray-500">
            Những dự án đang được quan tâm nhiều nhất tuần qua.
          </p>
        </div>
        <Link
          href="/gio-hang"
          className="inline-flex items-center gap-1 text-theme-sm font-medium text-brand-600 transition hover:text-brand-700"
        >
          Xem tất cả
          <FiChevronRight aria-hidden />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.publicId} project={project} />
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedProjects;
