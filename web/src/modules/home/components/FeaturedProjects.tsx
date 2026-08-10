'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ProjectCard from '@/modules/project/components/ProjectCard';
import type { Project } from '@/modules/project/models/project.model';

type FeaturedProjectsProps = {
  projects: Project[];
};

/**
 * Khoi 6 du an noi bat - dung lai ProjectCard de giu dung UI voi /gio-hang.
 *
 * Layout responsive:
 *   - Mobile (<sm): CAROUSEL Embla, moi lan 1 card full-width (~88vw) + peek
 *     12vw card ke ben canh. User vuot/khich nut prev/next. Co dots indicator
 *     o duoi.
 *   - Tablet (sm): grid 2 cot (carousel an).
 *   - Desktop (lg): grid 3 cot (carousel an).
 *
 * Vi sao Embla:
 *   - Dependency-free, ~3KB gzipped, khong them Tailwind plugin.
 *   - Hook API don gian (useEmblaCarousel + scrollPrev/Next/To).
 *   - Ho tro snap tuy bien, friction, drag threshold.
 *   - SSR-safe: useEffect init() chi chay client; SSR render markup tinh.
 *
 * SSR chieu rong embla:
 *   - Hook tra { emblaRef, emblaApi } - emblaRef gan vao div container.
 *   - Container can co 'overflow-hidden', con ben trong co 'flex'.
 *
 * Hydration: useEffect thiet lap carousel chi chay client, server render cards
 * nhu binh thuong trong div container -> khong can 'use client' cho card, chi
 * cho component nay.
 */
const FeaturedProjects = ({ projects }: FeaturedProjectsProps) => {
  // `loop: true` khi < projects.length se khong hoat dong -> check.
  const canLoop = projects.length > 3;

  // `dragFree: false` de snap vao moi card (mac dinh). `align: 'start'` de card
  // can trai viewport. `containScroll: 'trimSnaps'` cat snap o dau/cuoi.
  // `slidesToScroll: 'auto'` cho phep scroll theo nhieu card neu viewport chua.
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: canLoop,
    slidesToScroll: 1,
    skipSnaps: false,
  });

  // selectedSnap: index cua card dang active, [0, slideCount-1].
  // scrollSnaps: danh sach vi tri snap.
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // setState trong callback (reInit) thay vi effect body - tranh cascading
    // renders theo rule React 19.
    const onReInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on('reInit', onReInit);
    emblaApi.on('select', onSelect);
    // Khoi tao lan dau: goi reInit() de no dispatch event => setState qua
    // callback thay vi goi truc tiep setScrollSnaps/setSelectedIndex.
    emblaApi.reInit();
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onReInit);
    };
  }, [emblaApi, onSelect]);

  return (
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

        {/* ── Mobile carousel (<sm) ─────────────────────────────────────── */}
        <div className="sm:hidden">
          <div className="relative">
            {/* emblaRef gan vao div overflow-hidden de embla do container. */}
            <div ref={emblaRef} className="overflow-hidden">
              {/* flex + gap-4 = spacing giua cards. embla tu tinh snap. */}
              <div className="flex gap-4">
                {projects.map((project) => (
                  <div
                    key={project.publicId}
                    // flex-[0_0_88%]: card 88vw, peek 12vw card ke ben canh
                    // de user biet co card khac de luot.
                    className="flex-[0_0_88%] min-w-0"
                  >
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            </div>

            {/* Nut prev/next: absolute 2 ben, z-10 de phu len card ngoai.
                Khoi nay chi co tren dien thoai nen nut phai nam HAN trong
                khung - keo ra ngoai bang -translate-x-1/2 la lo ra khoi man
                hinh va lam ca trang cuon ngang 4px. */}
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canLoop && selectedIndex === 0}
              aria-label="Dự án trước"
              className="absolute left-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-card transition hover:bg-brand-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-700"
            >
              <FiChevronLeft aria-hidden className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canLoop && selectedIndex === scrollSnaps.length - 1}
              aria-label="Dự án tiếp theo"
              className="absolute right-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-card transition hover:bg-brand-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-700"
            >
              <FiChevronRight aria-hidden className="h-5 w-5" />
            </button>
          </div>

          {/* Dot indicator: moi dot la mot snap, click de scroll den no. */}
          {scrollSnaps.length > 1 && (
            <div className="mt-4 flex items-center justify-center gap-2">
              {scrollSnaps.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(idx)}
                  aria-label={`Đi đến dự án ${idx + 1}`}
                  aria-current={idx === selectedIndex ? 'true' : undefined}
                  className={`h-2 rounded-full transition-all ${
                    idx === selectedIndex
                      ? 'w-6 bg-brand-500'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Desktop grid (sm+) ─────────────────────────────────────────── */}
        <div className="hidden grid-cols-1 gap-5 sm:grid sm:grid-cols-2 lg:grid lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.publicId} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
