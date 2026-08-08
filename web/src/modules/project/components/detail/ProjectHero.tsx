'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiCheck, FiChevronRight, FiMapPin, FiShare2 } from 'react-icons/fi';
import type { ProjectDetail } from '../../models/project-detail.model';
import {
  PROPERTY_TYPE_LABELS,
  SEGMENT_LABELS,
  STATUS_LABELS,
  type ProjectStatus,
} from '../../models/project.model';
import ProjectHeroCarousel from './ProjectHeroCarousel';

/**
 * Mau nhan trang thai. Dang mo ban la trang thai "hanh dong duoc" nen dung mau
 * noi nhat; da ban giao la thong tin qua khu nen tram lai.
 */
const STATUS_TONES: Record<ProjectStatus, string> = {
  'dang-mo-ban': 'bg-success-500 text-white',
  'sap-mo-ban': 'bg-gold-400 text-navy-900',
  'da-ban-giao': 'bg-white/20 text-white ring-1 ring-white/40',
};

const ProjectHero = ({ project }: { project: ProjectDetail }) => {
  const [isCopied, setIsCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;

    // Tren dien thoai mo bang chia se cua he dieu hanh; may ban thi chep link
    if (navigator.share) {
      try {
        await navigator.share({ title: project.name, url });
        return;
      } catch {
        // Nguoi dung bam huy - khong coi la loi, roi xuong nhanh chep link
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // Trinh duyet chan clipboard (thuong do khong phai HTTPS) - bo qua im lang
    }
  };

  const chips = [
    { label: STATUS_LABELS[project.status], className: STATUS_TONES[project.status] },
    {
      label: SEGMENT_LABELS[project.segment],
      className: 'bg-white/15 text-white ring-1 ring-white/30 backdrop-blur-md',
    },
    {
      label: PROPERTY_TYPE_LABELS[project.propertyType],
      className: 'bg-white/15 text-white ring-1 ring-white/30 backdrop-blur-md',
    },
  ];

  return (
    <header>
      <ProjectHeroCarousel
        slides={project.hero}
        projectName={project.name}
        ratio="h-[66vh] min-h-110 max-h-170"
      >
        {/* Lop noi dung de len anh. pointer-events-none o lop bao, bat lai o tung
            phan tu bam duoc - neu khong lop nay se nuot ca nut mui ten cua anh. */}
        <div className="pointer-events-none absolute inset-0 flex flex-col">
          <div className="site-container flex items-start justify-between gap-4 pt-5">
            <nav aria-label="Đường dẫn" className="pointer-events-auto min-w-0">
              <ol className="flex items-center gap-1.5 text-theme-sm text-white/70">
                <li>
                  <Link href="/du-an" className="transition hover:text-white">
                    Dự án
                  </Link>
                </li>
                <li aria-hidden>
                  <FiChevronRight className="text-white/40" />
                </li>
                <li aria-current="page" className="truncate text-white">
                  {project.name}
                </li>
              </ol>
            </nav>

            <button
              type="button"
              onClick={share}
              className="pointer-events-auto flex shrink-0 items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-theme-sm font-medium text-white backdrop-blur-md transition duration-200 hover:scale-105 hover:bg-white/25 active:scale-95"
            >
              {isCopied ? (
                <>
                  <FiCheck aria-hidden className="text-success-500" />
                  Đã chép link
                </>
              ) : (
                <>
                  <FiShare2 aria-hidden />
                  <span className="hidden xsm:inline">Chia sẻ</span>
                </>
              )}
            </button>
          </div>

          <div className="site-container mt-auto pb-14 sm:pb-16">
            <div className="flex flex-wrap items-center gap-2">
              {chips.map((chip) => (
                <span
                  key={chip.label}
                  className={`rounded-full px-3 py-1 text-theme-xs font-bold uppercase tracking-wide ${chip.className}`}
                >
                  {chip.label}
                </span>
              ))}
            </div>

            <h1 className="mt-4 max-w-4xl text-3xl font-extrabold uppercase leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:text-4xl lg:text-5xl">
              {project.name}
            </h1>

            <p className="mt-3 max-w-2xl text-theme-sm leading-relaxed text-white/85 sm:text-base">
              {project.tagline}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-theme-sm text-white/80">
              <span className="flex items-start gap-1.5">
                <FiMapPin aria-hidden className="mt-0.5 shrink-0 text-gold-300" />
                {project.address}
              </span>
              <span className="hidden h-4 w-px bg-white/25 sm:block" aria-hidden />
              <span>
                Chủ đầu tư:{' '}
                <strong className="font-semibold text-white">
                  {project.developerName}
                </strong>
              </span>
            </div>
          </div>
        </div>
      </ProjectHeroCarousel>
    </header>
  );
};

export default ProjectHero;
