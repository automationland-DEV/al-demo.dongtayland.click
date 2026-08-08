'use client';

import { useCallback, useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import PlaceholderThumb from '@/common/components/PlaceholderThumb';
import type { MediaSlide } from '../../models/project-detail.model';

const AUTOPLAY_MS = 6000;

type ProjectHeroCarouselProps = {
  slides: MediaSlide[];
  projectName: string;
};

const ProjectHeroCarousel = ({ slides, projectName }: ProjectHeroCarouselProps) => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const total = slides.length;

  const goTo = useCallback(
    (next: number) => setIndex(((next % total) + total) % total),
    [total],
  );

  useEffect(() => {
    if (isPaused || total <= 1) return;

    // Nguoi dung da tat hieu ung chuyen dong thi khong tu chay
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const timer = setInterval(() => setIndex((current) => (current + 1) % total), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [isPaused, total]);

  if (total === 0) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label={`Phối cảnh dự án ${projectName}`}
      className="relative overflow-hidden rounded-xl bg-gray-100 shadow-card"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="relative aspect-21/9 w-full">
        {slides.map((slide, slideIndex) => (
          <div
            key={slide.publicId}
            aria-hidden={slideIndex !== index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              slideIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <PlaceholderThumb
              seed={slide.publicId}
              src={slide.imageUrl || undefined}
              alt={slide.caption}
            />
          </div>
        ))}

        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/60 to-transparent"
        />
        <p className="absolute inset-x-0 bottom-0 px-6 pb-8 text-center text-theme-sm font-medium text-white sm:pb-9">
          {slides[index].caption}
        </p>
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Ảnh trước"
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-gray-700 shadow-card transition hover:bg-white"
          >
            <FiChevronLeft aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Ảnh tiếp theo"
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-gray-700 shadow-card transition hover:bg-white"
          >
            <FiChevronRight aria-hidden />
          </button>

          <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
            {slides.map((slide, slideIndex) => (
              <button
                key={slide.publicId}
                type="button"
                onClick={() => goTo(slideIndex)}
                aria-label={`Xem ảnh ${slideIndex + 1}`}
                aria-current={slideIndex === index}
                className={`h-2 rounded-full transition-all ${
                  slideIndex === index ? 'w-6 bg-white' : 'w-2 bg-white/55 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default ProjectHeroCarousel;
