'use client';

import { useEffect, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!isVisible) return null;

  return (
    // bottom-28 chu khong phai bottom-6: goc duoi phai da co nut tro ly ao
    // (cao 64px, cach day 24px), nut nay xep chong len phia tren no.
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Lên đầu trang"
      className="fixed bottom-28 right-6 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-brand-500 text-white shadow-card-hover transition hover:bg-brand-600"
    >
      <FiArrowUp aria-hidden />
    </button>
  );
};

export default BackToTop;
