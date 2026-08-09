/**
 * Mock data cho trang /gioi-thieu.
 *
 * Toan bo content dang tieng Viet, giu giong van editorial magazine:
 *   - Hero pull-quote + dropcap intro
 *   - 4 so lieu lon (founded, projects, customers, brokers)
 *   - 5 milestones (timeline)
 *   - 6 thanh vien (team)
 *   - 4 gia tri cot loi
 *
 * Khi co backend: thay bang GET /about -> tra ve AboutContent.
 */

import type { ComponentType } from 'react';

import {
  HiOutlineHeart,
  HiOutlineLightBulb,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
} from 'react-icons/hi2';

export type AboutMilestone = {
  year: string;
  title: string;
  description: string;
};

export type AboutTeamMember = {
  publicId: string;
  name: string;
  role: string;
  /** URL anh chan dung. Neu khong co -> UserAvatar fallback initials */
  avatar?: string;
  /** Quote ngan cua thanh vien (hien thi khi hover) */
  quote?: string;
};

export type AboutValue = {
  publicId: string;
  icon: ComponentType<{ 'aria-hidden'?: boolean; className?: string }>;
  title: string;
  description: string;
};

export type AboutMetric = {
  value: string;
  label: string;
  /** Don vi hien thi sau value (VD: "+", "K+") */
  suffix?: string;
};

export type AboutContent = {
  /** Hero: tieu de lon + tagline */
  hero: {
    eyebrow: string;
    headline: string;
    /** Cau editorial cam xuc (italic, font-serif, font-light) */
    tagline: string;
    /** Anh bia hero */
    heroImage: string;
    /** Ten tac gia + chuc danh (byline editorial) */
    byline: string;
  };
  /** Sứ mệnh: dropcap intro + noi dung 2 doan */
  mission: {
    title: string;
    leadParagraph: string;
    bodyParagraphs: string[];
    missionImage: string;
  };
  /** 4 so lieu lon */
  metrics: AboutMetric[];
  /** 5 milestones theo thoi gian */
  milestones: AboutMilestone[];
  /** 6 thanh vien team */
  team: AboutTeamMember[];
  /** 4 gia tri cot loi */
  values: AboutValue[];
};

export const MOCK_ABOUT_CONTENT: AboutContent = {
  hero: {
    eyebrow: 'Về RealtyHub',
    headline: 'Câu chuyện của chúng tôi',
    tagline:
      'Chúng tôi tin rằng mỗi người Việt đều xứng đáng tìm được một mái nhà phù hợp với ước mơ và khả năng của mình.',
    heroImage: '/images/about/hero.jpg',
    byline: 'Đội ngũ RealtyHub',
  },

  mission: {
    title: 'Sứ mệnh',
    leadParagraph:
      'Xây dựng nền tảng bất động sản minh bạch, hiện đại và công bằng nhất Việt Nam — nơi mọi quyết định mua bán đều được hỗ trợ bởi dữ liệu đáng tin cậy.',
    bodyParagraphs: [
      'Từ khi thành lập năm 2019, RealtyHub đã đồng hành cùng hơn 50.000 khách hàng trong hành trình tìm kiếm căn nhà đầu đời, đầu tư dài hạn, hay đơn giản là tìm một nơi an cư đúng nghĩa.',
      'Chúng tôi không chỉ là một trang web đăng tin. RealtyHub là hệ sinh thái gồm công cụ tìm kiếm thông minh, đội ngũ chuyên viên tư vấn 1-1, và bộ công cụ hỗ trợ môi giới chuyên nghiệp — tất cả vì một mục tiêu: giúp bạn đưa ra quyết định tốt nhất.',
    ],
    missionImage: '/images/about/mission.jpg',
  },

  metrics: [
    { value: '6', label: 'Năm kinh nghiệm', suffix: '+' },
    { value: '1.200', label: 'Dự án trên nền tảng' },
    { value: '50', label: 'Khách hàng tin tưởng', suffix: 'K+' },
    { value: '300', label: 'Chuyên viên tư vấn' },
  ],

  milestones: [
    {
      year: '2019',
      title: 'Khởi đầu từ một ý tưởng',
      description:
        'Ba nhà sáng lập gặp nhau tại một hội thảo bất động sản, nhận ra thị trường thiếu một nền tảng minh bạch. RealtyHub ra đời với 10 dự án đầu tiên tại TP. Hồ Chí Minh.',
    },
    {
      year: '2021',
      title: 'Mở rộng toàn quốc',
      description:
        'Sau 2 năm, nền tảng có mặt tại 30 tỉnh thành. Đội ngũ tăng lên 50 người. Chúng tôi giới thiệu bộ lọc thông minh đầu tiên cho phép tìm kiếm theo ngân sách và khu vực.',
    },
    {
      year: '2022',
      title: 'Ra mắt bộ công cụ môi giới',
      description:
        'Phát hành bộ CRM, tính khoản vay, so sánh căn hộ — phục vụ hơn 5.000 môi giới trên toàn quốc. Nền tảng đạt mốc 1 triệu lượt truy cập/tháng.',
    },
    {
      year: '2024',
      title: 'AI và Phong thủy',
      description:
        'Tích hợp AI gợi ý dự án, la bàn phong thủy số, lịch âm Việt Nam — kết hợp công nghệ hiện đại với giá trị truyền thống.',
    },
    {
      year: '2026',
      title: 'Hướng tới ASEAN',
      description:
        'Mở rộng dịch vụ sang Campuchia và Lào. Mục tiêu trở thành nền tảng bất động sản Đông Nam Á trong 5 năm tới.',
    },
  ],

  team: [
    {
      publicId: 'team-ceo',
      name: 'Nguyễn Minh Khoa',
      role: 'CEO & Đồng sáng lập',
      quote: '"Một sản phẩm tốt phải giải quyết được vấn đề thật của người dùng."',
    },
    {
      publicId: 'team-cto',
      name: 'Trần Quốc Đạt',
      role: 'CTO & Đồng sáng lập',
      quote: '"Công nghệ phải phục vụ con người, không phải ngược lại."',
    },
    {
      publicId: 'team-cpo',
      name: 'Lê Thị Hồng Vân',
      role: 'CPO - Trưởng phòng Sản phẩm',
      quote: '"Mỗi tính năng là một câu trả lời cho nỗi đau thật của khách hàng."',
    },
    {
      publicId: 'team-cmo',
      name: 'Phạm Hoàng Long',
      role: 'CMO - Trưởng phòng Marketing',
      quote: '"Bất động sản không chỉ là giao dịch, đó là tin tưởng."',
    },
    {
      publicId: 'team-cfo',
      name: 'Đặng Thị Mai',
      role: 'CFO - Trưởng phòng Tài chính',
      quote: '"Mỗi con số đều phản ánh sự tin tưởng của hàng nghìn gia đình."',
    },
    {
      publicId: 'team-vp-eng',
      name: 'Vũ Đức Anh',
      role: 'VP Engineering',
      quote: '"Code tốt là code mà đồng nghiệp có thể đọc được sau 6 tháng."',
    },
  ],

  values: [
    {
      publicId: 'value-transparency',
      icon: HiOutlineShieldCheck,
      title: 'Minh bạch',
      description:
        'Mọi thông tin dự án đều được xác minh từ nguồn chính thống. Không phóng đại, không giấu giếm.',
    },
    {
      publicId: 'value-empathy',
      icon: HiOutlineHeart,
      title: 'Đồng cảm',
      description:
        'Chúng tôi hiểu mua nhà là quyết định lớn nhất đời người. Mỗi lời tư vấn đều xuất phát từ sự thấu hiểu.',
    },
    {
      publicId: 'value-innovation',
      icon: HiOutlineLightBulb,
      title: 'Đổi mới',
      description:
        'Ứng dụng AI, dữ liệu lớn và công nghệ mới nhất để giúp khách hàng ra quyết định nhanh và chính xác hơn.',
    },
    {
      publicId: 'value-excellence',
      icon: HiOutlineSparkles,
      title: 'Xuất sắc',
      description:
        'Chúng tôi không ngừng hoàn thiện. Một sản phẩm tốt hôm nay phải tốt hơn vào ngày mai.',
    },
  ],
};