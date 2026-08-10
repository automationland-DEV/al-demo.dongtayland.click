'use client';

import NewsSection from '@/modules/news/components/NewsSection';
import { useHomeContent } from '../hooks/useHome';
import type { HomeContent } from '../models/home.model';
import ConsultForm from './ConsultForm';
import FeaturedProjects from './FeaturedProjects';
import HeroSearch from './HeroSearch';
import QuickUtilities from './QuickUtilities';
import TestimonialsSection from './TestimonialsSection';
import Thongbao from './Thongbao';
import WhyUs from './WhyUs';

type HomePageProps = {
  /** Noi dung doc san tu server (route page) - tranh loading o lan paint dau */
  initialContent: HomeContent;
};

/**
 * Trang chu: HeroSearch + QuickUtilities + FeaturedProjects + News + WhyUs + ConsultForm.
 * Noi dung doc 1 lan tu server qua `initialContent`, hook chi refresh khi can.
 */
const HomePage = ({ initialContent }: HomePageProps) => {
  const { data } = useHomeContent(initialContent);
  const content = data ?? initialContent;

  return (
    <>
    <div className="bg-white mx-auto">

      <HeroSearch slides={content.banners} />
      <Thongbao />
      {/* Search bar cua HeroSearch overlap xuong section nay nen can
          pt-28 (md) de khong bi card de len content. */}
      <div className="bg-white pb-8 pt-16 md:pt-24">
        <QuickUtilities />
      </div>
      <FeaturedProjects projects={content.featuredProjects} />
      {/* Testimonials chen giua featured projects va news - phan tach 2 khoi
          noi dung nang (du an + tin tuc) bang khoi danh gia emotional. */}
      <TestimonialsSection testimonials={content.testimonials} />
      {/* NewsSection tu quan ly padding/mau nen, boc trong site-container de can vao layout */}
      <div className="bg-white">
        <div className="site-container">
          <NewsSection />
        </div>
      </div>
      <WhyUs features={content.features} />
      <ConsultForm />
      </div>
    </>
  );
};

export default HomePage;
