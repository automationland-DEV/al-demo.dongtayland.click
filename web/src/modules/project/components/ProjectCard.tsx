'use client';

import Link from 'next/link';
import { FiExternalLink, FiMapPin } from 'react-icons/fi';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import PlaceholderThumb from '@/common/components/PlaceholderThumb';
import { SEGMENT_LABELS, type Project } from '../models/project.model';

type ProjectCardProps = {
  project: Project;
  isFavorite: boolean;
  onToggleFavorite: (publicId: string) => void;
};

const ProjectCard = ({ project, isFavorite, onToggleFavorite }: ProjectCardProps) => {
  const segmentBadgeClass =
    project.segment === 'cao-tang'
      ? 'bg-navy-600 text-white'
      : 'bg-accent-500 text-white';

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-card transition hover:shadow-card-hover">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Link href={project.detailUrl} className="block h-full w-full">
          <PlaceholderThumb
            seed={project.publicId}
            label={project.name}
            src={project.thumbnailUrl || undefined}
            alt={`Ảnh dự án ${project.name}`}
            className="transition duration-500 group-hover:scale-105"
          />
        </Link>

        <span
          className={`absolute left-0 top-3 rounded-r px-3 py-1.5 text-theme-xs font-bold uppercase tracking-wide ${segmentBadgeClass}`}
        >
          {SEGMENT_LABELS[project.segment]}
        </span>

        <button
          type="button"
          onClick={() => onToggleFavorite(project.publicId)}
          aria-pressed={isFavorite}
          aria-label={
            isFavorite
              ? `Bỏ lưu dự án ${project.name}`
              : `Lưu dự án ${project.name}`
          }
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-base shadow-card transition hover:bg-white"
        >
          {isFavorite ? (
            <FaHeart className="text-error-500" />
          ) : (
            <FaRegHeart className="text-gray-400" />
          )}
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-bold uppercase leading-snug text-gray-900">
            <Link href={project.detailUrl} className="transition hover:text-brand-600">
              {project.name}
            </Link>
          </h3>
          <Link
            href={project.detailUrl}
            aria-label={`Mở trang chi tiết ${project.name}`}
            className="mt-0.5 shrink-0 text-brand-500 transition hover:text-brand-700"
          >
            <FiExternalLink aria-hidden />
          </Link>
        </div>

        <p className="line-clamp-2 text-theme-sm text-gray-600">{project.tagline}</p>

        <p className="mt-auto flex items-start gap-1.5 pt-2 text-theme-xs text-gray-500">
          <FiMapPin aria-hidden className="mt-0.5 shrink-0" />
          <span className="line-clamp-2">{project.address}</span>
        </p>
      </div>
    </article>
  );
};

export default ProjectCard;
