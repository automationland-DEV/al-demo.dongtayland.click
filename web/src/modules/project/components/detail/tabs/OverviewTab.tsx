'use client';

import { useState } from 'react';
import { FiPhone } from 'react-icons/fi';
import {
  HiOutlineBanknotes,
  HiOutlineMap,
  HiOutlineUserGroup,
} from 'react-icons/hi2';
import type { ReactNode } from 'react';
import type { ProjectDetail, ProjectStat } from '../../../models/project-detail.model';
import ProjectHeroCarousel from '../ProjectHeroCarousel';
import {
  CarouselDots,
  JadePanel,
  MediaFrame,
  PanelTitle,
  PlayOverlay,
  SectionHeading,
} from '../shared';

const STAT_ICONS: Record<ProjectStat['key'], ReactNode> = {
  scale: <HiOutlineMap aria-hidden />,
  capital: <HiOutlineBanknotes aria-hidden />,
  population: <HiOutlineUserGroup aria-hidden />,
};

const PRODUCTS_PER_PAGE = 3;
const AMENITIES_PER_PAGE = 4;

/** Chia mot mang thanh cac trang co do dai `size` */
const paginate = <T,>(items: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(items.length / size) }, (_, page) =>
    items.slice(page * size, page * size + size),
  );

const StatCards = ({ stats }: { stats: ProjectStat[] }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
    {stats.map((stat) => (
      <div
        key={stat.key}
        className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-card"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-jade-50 text-2xl text-jade-500">
          {STAT_ICONS[stat.key]}
        </span>
        <div className="min-w-0">
          <p className="text-theme-xs uppercase tracking-wide text-gray-500">{stat.label}</p>
          <p className="truncate text-xl font-bold text-accent-500">{stat.value}</p>
        </div>
      </div>
    ))}
  </div>
);

/** Panel xanh: chu ben trai, o video ben phai - dung cho ca khoi mo va khoi ket */
const StoryPanel = ({
  title,
  body,
  thumbnailUrl,
  seed,
}: {
  title: string;
  body: string;
  thumbnailUrl: string;
  seed: string;
}) => (
  <JadePanel>
    <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-10">
      <div>
        <PanelTitle>{title}</PanelTitle>
        <p className="text-theme-sm leading-relaxed text-white/90">{body}</p>
      </div>

      <button type="button" className="group relative block w-full text-left">
        <MediaFrame seed={seed} src={thumbnailUrl} alt={`Video giới thiệu: ${title}`} />
        <PlayOverlay label={`Phát video: ${title}`} />
      </button>
    </div>
  </JadePanel>
);

const OverviewTab = ({ project }: { project: ProjectDetail }) => {
  const [sheetKey, setSheetKey] = useState(project.masterPlan[0]?.key ?? '');
  const [productPage, setProductPage] = useState(0);
  const [amenityPage, setAmenityPage] = useState(0);

  const activeSheet =
    project.masterPlan.find((sheet) => sheet.key === sheetKey) ?? project.masterPlan[0];

  const productPages = paginate(project.products, PRODUCTS_PER_PAGE);
  const amenityPages = paginate(project.amenities, AMENITIES_PER_PAGE);

  return (
    <div className="space-y-12">
      <ProjectHeroCarousel slides={project.hero} projectName={project.name} />

      <StatCards stats={project.stats} />

      {/* Tong quan du an: thong so ben trai, phoi canh ben phai */}
      <JadePanel>
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-10">
          <div>
            <PanelTitle>Tổng quan dự án</PanelTitle>
            <ul className="space-y-2.5">
              {project.specs.map((spec) => (
                <li key={spec.label} className="flex gap-2 text-theme-sm text-white/90">
                  <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                  <span>
                    <strong className="font-semibold text-gold-200">{spec.label}:</strong>{' '}
                    {spec.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <MediaFrame
            seed={`${project.publicId}-overview`}
            src={project.overviewImageUrl}
            alt={`Phối cảnh tổng thể ${project.name}`}
            ratio="aspect-[4/3]"
          />
        </div>
      </JadePanel>

      {/* Mat bang */}
      {activeSheet && (
        <section>
          <SectionHeading title="Mặt bằng" subtitle="Thiết kế chi tiết các phân khu" />

          <div className="mb-5 flex flex-wrap items-center justify-center gap-2">
            {project.masterPlan.map((sheet) => (
              <button
                key={sheet.key}
                type="button"
                onClick={() => setSheetKey(sheet.key)}
                aria-pressed={sheet.key === activeSheet.key}
                className={`rounded-full px-4 py-1.5 text-theme-sm font-semibold uppercase tracking-wide transition ${
                  sheet.key === activeSheet.key
                    ? 'bg-gold-400 text-jade-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {sheet.label}
              </button>
            ))}
          </div>

          <div className="rounded-xl bg-jade-600 p-2 shadow-panel sm:p-3">
            <MediaFrame
              seed={`${project.publicId}-plan-${activeSheet.key}`}
              src={activeSheet.imageUrl}
              alt={`Mặt bằng ${activeSheet.label} - ${project.name}`}
              label={`Mặt bằng ${activeSheet.label}`}
            />
          </div>
        </section>
      )}

      {/* San pham */}
      {productPages.length > 0 && (
        <section>
          <SectionHeading title="Sản phẩm" subtitle="Đa dạng lựa chọn cho mọi nhu cầu" />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {productPages[Math.min(productPage, productPages.length - 1)].map((product) => (
              <article
                key={product.publicId}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-card transition hover:shadow-card-hover"
              >
                <MediaFrame
                  seed={product.publicId}
                  src={product.imageUrl}
                  alt={product.name}
                  ratio="aspect-[4/3]"
                  className="rounded-none"
                />
                <div className="p-4">
                  <h3 className="text-theme-sm font-bold uppercase tracking-wide text-gray-900">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-theme-xs text-gray-500">{product.areaLabel}</p>
                </div>
              </article>
            ))}
          </div>

          <CarouselDots
            count={productPages.length}
            current={productPage}
            onSelect={setProductPage}
            label="Trang sản phẩm"
          />
        </section>
      )}

      <StoryPanel
        title={project.intro.title}
        body={project.intro.body}
        thumbnailUrl={project.intro.videoThumbnailUrl}
        seed={`${project.publicId}-intro`}
      />

      {/* Tien ich */}
      {amenityPages.length > 0 && (
        <section>
          <SectionHeading title="Tiện ích" subtitle="Hệ thống tiện ích nội khu đồng bộ" />

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {amenityPages[Math.min(amenityPage, amenityPages.length - 1)].map((amenity) => (
              <figure
                key={amenity.publicId}
                className="group relative overflow-hidden rounded-lg shadow-card"
              >
                <MediaFrame
                  seed={amenity.publicId}
                  src={amenity.imageUrl}
                  alt={amenity.name}
                  ratio="aspect-[4/3]"
                  className="rounded-none transition duration-500 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-black/60 px-3 py-2 text-theme-xs font-semibold uppercase leading-tight text-white">
                  {amenity.name}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-3 text-right text-theme-xs text-gray-400">
            {Math.min(amenityPage, amenityPages.length - 1) + 1} / {amenityPages.length}
          </div>

          <CarouselDots
            count={amenityPages.length}
            current={amenityPage}
            onSelect={setAmenityPage}
            label="Trang tiện ích"
          />
        </section>
      )}

      <StoryPanel
        title={project.closing.title}
        body={project.closing.body}
        thumbnailUrl={project.closing.videoThumbnailUrl}
        seed={`${project.publicId}-closing`}
      />

      {/* Lien he tu van */}
      <section>
        <SectionHeading
          title="Liên hệ tư vấn"
          subtitle="Đội ngũ chuyên viên sẵn sàng hỗ trợ bạn 24/7"
        />

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-5 sm:grid-cols-2">
          {project.consultants.map((consultant) => (
            <div
              key={consultant.publicId}
              className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 text-center shadow-card"
            >
              <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-jade-50 text-xl text-jade-500">
                <FiPhone aria-hidden />
              </span>

              <p className="text-theme-xs font-semibold uppercase tracking-wide text-gold-500">
                {consultant.role}
              </p>
              <p className="mt-0.5 text-theme-sm font-medium text-gray-700">
                {consultant.name}
              </p>

              <a
                href={`tel:${consultant.phone.replace(/\s/g, '')}`}
                className="mt-2 text-lg font-bold text-jade-600 transition hover:text-jade-500"
              >
                {consultant.phone}
              </a>

              <a
                href={`tel:${consultant.phone.replace(/\s/g, '')}`}
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-gold-400 px-4 py-1.5 text-theme-xs font-bold uppercase tracking-wide text-jade-800 transition hover:bg-gold-300"
              >
                <FiPhone aria-hidden />
                Liên hệ ngay
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OverviewTab;
