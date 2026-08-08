'use client';

import NewsSection from '@/modules/news/components/NewsSection';
import { useHomeContent } from '../hooks/useHome';
import type { HomeContent } from '../models/home.model';
import ConsultForm from './ConsultForm';
import FeaturedProjects from './FeaturedProjects';
import HeroSearch from './HeroSearch';
import QuickUtilities from './QuickUtilities';
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
      <div className="bg-white pb-12 mt-20">
        <QuickUtilities />
      </div>
      <FeaturedProjects projects={content.featuredProjects} />
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
