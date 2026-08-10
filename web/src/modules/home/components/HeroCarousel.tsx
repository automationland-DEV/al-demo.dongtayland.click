'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { HomeBannerSlide } from '../models/home.model';

type HeroCarouselProps = {
  slides: HomeBannerSlide[];
  /** Khoang doi giua cac slide (ms). Default 5000. */
  intervalMs?: number;
};

/**
 * Carousel 3 banner o dau trang chu. Auto-play, dung khi hover, co the chuyen
 * slide bang nut trai/phai hoac cham vao dot.
 *
 * Render dung <picture> thong qua <Image fill> cua next/image voi object-cover
 * de 3 3 banner co 3 ty le khac nhau van full khung. Khong dung PlaceholderThumb
 * nua vi banner co anh that.
 *
 * Responsive image chain (3 breakpoint):
 *   - mobile  (<768px)  : mobileImageUrl   - anh doc ~1:2
 *   - tablet  (768-1023): tabletImageUrl   - anh portrait ~3:4
 *   - desktop (>=1024px): desktopImageUrl  - anh ngang ~2:1
 *
 * Browser chon <source> dau tien match media query (CSS standard). Neu
 * tabletImageUrl undefined, source tablet khong render => browser bo qua,
 * tiep tuc kiem source tiep theo.
 */
const HeroCarousel = ({ slides, intervalMs = 5000 }: HeroCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + slides.length) % slides.length);
  }, [slides.length]);

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Auto-play: reset timer moi khi activeIndex hoac pause thay doi
  useEffect(() => {
    if (isPaused || slides.length <= 1) return undefined;
    timerRef.current = setTimeout(goNext, intervalMs);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIndex, isPaused, goNext, intervalMs, slides.length]);

  // Khong co slide thi khong render gi - trang van dung vi HeroSearch xu ly fallback
  if (slides.length === 0) return null;

  return (
    <div
      className="absolute inset-0 -z-10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Banner dự án nổi bật"
    >
      {slides.map((slide, index) => {
        const isActive = index === activeIndex;
        return (
          <div
            key={slide.publicId}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={!isActive}
            aria-roledescription="slide"
            aria-label={`${index + 1} / ${slides.length}`}
          >
            <picture>
              {/* Tablet (768-1023px) - kiem truoc vi media query max-width
                  1023px cung match mobile. Dat max-width: 1023px nhung co
                  768px breakpoint ngay duoi de tablet khong bi mobile de len. */}
              {slide.tabletImageUrl && (
                <source
                  media="(min-width: 768px) and (max-width: 1023px)"
                  srcSet={slide.tabletImageUrl}
                />
              )}
              {/* Mobile (<768px) - media query max-width: 767px match dung
                  dien thoai, browser khong matching tablet source o tren. */}
              {slide.mobileImageUrl && (
                <source media="(max-width: 767px)" srcSet={slide.mobileImageUrl} />
              )}
              {/* Fallback: desktop + bat ky viewport nao khong match 2 source
                  tren (vi du khi thieu tabletImageUrl). */}
              <Image
                src={slide.desktopImageUrl}
                alt=""
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
                unoptimized
              />
            </picture>
          </div>
        );
      })}

      {/* Dots + arrow chi can khi co nhieu hon 1 slide */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Slide trước"
            className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50 md:left-4 md:h-10 md:w-10"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Slide sau"
            className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50 md:right-4 md:h-10 md:w-10"
          >
            ›
          </button>

          <div
            className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 md:bottom-6"
            role="tablist"
            aria-label="Chọn slide"
          >
            {slides.map((slide, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={slide.publicId}
                  type="button"
                  onClick={() => goTo(index)}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Đi tới slide ${index + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    isActive
                      ? 'w-6 bg-white'
                      : 'w-2 bg-white/50 hover:bg-white/80'
                  }`}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default HeroCarousel;