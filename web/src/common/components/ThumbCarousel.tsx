'use client';

import { useEffect, useState } from 'react';
import PlaceholderThumb from './PlaceholderThumb';

/** Bao lau doi mot anh khi khong ai dong den */
const AUTOPLAY_MS = 3000;

type ThumbCarouselProps = {
  /** Hat giong cho anh thay the khi chua co anh that */
  seed: string;
  images: string[];
  alt: string;
  /** Tam dung tu chuyen - the dang duoc ro chuot chang han */
  paused?: boolean;
  className?: string;
};

/**
 * Bang anh tu chuyen canh cho the du an.
 *
 * Tu chay 3 giay mot anh; nguoi dung cham vao cham tron thi dung han - da chon
 * tay roi ma anh van tu troi di thi rat kho chiu. Ro chuot len the cung tam
 * dung (prop `paused`) de con kip nhin.
 *
 * Cac anh xep chong len nhau va chuyen bang do mo chu khong truot ngang: the
 * nam trong luoi, truot ngang se de lo mep anh ben canh luc dang chay.
 */
const ThumbCarousel = ({
  seed,
  images,
  alt,
  paused = false,
  className = '',
}: ThumbCarouselProps) => {
  const [index, setIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  // Danh sach rong van phai ve mot khung, de PlaceholderThumb lo phan anh thay the
  const slides = images.length > 0 ? images : [''];
  const canPlay = slides.length > 1 && !paused && !isLocked;

  // Dung ban cap nhat theo ham thay vi doc `index`: de `index` vao mang phu
  // thuoc se lam dong ho bi dat lai sau MOI lan doi anh, khong con dung 3 giay.
  const count = slides.length;

  useEffect(() => {
    if (!canPlay) return;

    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % count),
      AUTOPLAY_MS,
    );
    return () => window.clearInterval(timer);
  }, [canPlay, count]);

  // Bo loc doi thi so anh doi theo - dung de con tro chi ra ngoai danh sach
  if (index >= slides.length) setIndex(0);

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {slides.map((src, slideIndex) => (
        <div
          key={`${src}-${slideIndex}`}
          aria-hidden={slideIndex !== index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            slideIndex === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <PlaceholderThumb
            seed={`${seed}-${slideIndex}`}
            src={src || undefined}
            alt={slideIndex === index ? alt : ''}
          />
        </div>
      ))}

      {/* Cham dat o MEP TREN chu khong mep duoi: ten du an nam de len day anh
          va cao 1-2 dong tuy ten dai ngan, nen cham o duoi se dam vao chu.
          Mep tren con trong - nhan phan khuc sat trai, nut tim sat phai.
          Nen den mo giup cham noi len tren nhung tam anh sang mau. */}
      {slides.length > 1 && (
        <div className="absolute inset-x-0 top-3 z-10 flex justify-center">
          <div className="flex items-center gap-1.5 rounded-full bg-black/25 px-2 py-1 backdrop-blur-sm">
            {slides.map((src, slideIndex) => (
              <button
                key={`${src}-${slideIndex}`}
                type="button"
                onClick={(event) => {
                  // Nut nam trong the <Link> bao quanh anh nen phai chan ca mac
                  // dinh lan bubble, neu khong bam cham se nhay sang trang chi tiet.
                  event.preventDefault();
                  event.stopPropagation();
                  setIndex(slideIndex);
                  setIsLocked(true);
                }}
                aria-label={`Xem ảnh ${slideIndex + 1}`}
                aria-current={slideIndex === index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  slideIndex === index
                    ? 'w-5 bg-white'
                    : 'w-1.5 bg-white/60 hover:bg-white/90'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThumbCarousel;
