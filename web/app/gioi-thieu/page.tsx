import Image from 'next/image';
import Link from 'next/link';

import { FiArrowRight } from 'react-icons/fi';

import UserAvatar from '@/common/components/UserAvatar';

import { MOCK_ABOUT_CONTENT } from '@/modules/about/mocks/about.mock';

/**
 * Trang /gioi-thieu - Editorial Magazine style.
 *
 * Cam hung tu cac magazine cao cap (NYT, Vogue, Aeon):
 *   - Hero voi anh bia lon, tieu de dep, byline
 *   - Pull-quote + dropcap intro
 *   - So lieu lon typography dam
 *   - Timeline doc (5 milestones)
 *   - Team grid (6 thanh vien) - avatar + quote
 *   - Gia tri cot loi (4 values)
 *   - Closing CTA 2 cot
 *
 * Server component vi day la trang tinh, khong can client state.
 * Mock data lay tu MOCK_ABOUT_CONTENT (khi co backend thay bang API).
 */

const ABOUT = MOCK_ABOUT_CONTENT;

const GioiThieuPage = () => (
  <main className="bg-white">
    {/* ============ HERO ============ */}
    <section className="relative isolate overflow-hidden bg-gray-50">
      {/* Anh bia hero - full width */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={ABOUT.hero.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-90"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/75" />
      </div>

      <div className="site-container py-32 md:py-40 lg:py-48">
        <div className="mx-auto max-w-3xl text-center text-white">
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-theme-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
            {ABOUT.hero.eyebrow}
          </span>

          {/* Headline - serif italic cho cam giac editorial */}
          <h1 className="mt-6 font-serif text-5xl font-light italic leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            {ABOUT.hero.headline}
          </h1>

          {/* Tagline */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
            {ABOUT.hero.tagline}
          </p>

          {/* Byline */}
          <p className="mt-10 text-theme-xs uppercase tracking-[0.25em] text-white/60">
            {ABOUT.hero.byline}
          </p>
        </div>
      </div>
    </section>

    {/* ============ SỨ MỆNH ============ */}
    <section className="site-container py-20 md:py-28">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        {/* Cot trai: Text + dropcap intro */}
        <div className="md:pt-8">
          <span className="inline-block text-theme-xs font-semibold uppercase tracking-[0.25em] text-brand-600">
            Sứ mệnh của chúng tôi
          </span>
          <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            {ABOUT.mission.title}
          </h2>

          {/* Dropcap lead paragraph */}
          <p className="mt-8 text-lg leading-relaxed text-gray-800 md:text-xl">
            <span className="float-left mr-3 font-serif text-7xl font-bold leading-[0.85] text-brand-600 md:text-8xl">
              {ABOUT.mission.leadParagraph.charAt(0)}
            </span>
            {ABOUT.mission.leadParagraph.slice(1)}
          </p>

          {/* Body paragraphs */}
          <div className="mt-6 space-y-5 text-base leading-relaxed text-gray-600 md:text-lg">
            {ABOUT.mission.bodyParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Cot phai: Anh lon + pull-quote overlay */}
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 shadow-2xl md:aspect-[3/4]">
            <Image
              src={ABOUT.mission.missionImage}
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              unoptimized
            />
          </div>
          {/* Pull-quote card overlay (editorial classic) */}
          <div className="absolute -bottom-8 -left-4 max-w-xs rounded-2xl bg-white p-6 shadow-2xl md:-left-8 md:max-w-sm md:p-8">
            <p className="font-serif text-xl italic leading-snug text-gray-900 md:text-2xl">
              &ldquo;Minh bạch là nền tảng. Đồng cảm là sứ mệnh.&rdquo;
            </p>
            <p className="mt-3 text-theme-xs uppercase tracking-[0.2em] text-gray-500">
              — Tôn chỉ RealtyHub
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* ============ SỐ LIỆU ============ */}
    <section className="border-y border-gray-200 bg-gray-50/60 py-16 md:py-24">
      <div className="site-container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-block text-theme-xs font-semibold uppercase tracking-[0.25em] text-brand-600">
            Con số biết nói
          </span>
          <h2 className="mt-3 font-serif text-3xl font-bold text-gray-900 md:text-4xl">
            6 năm đồng hành, một niềm tin
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {ABOUT.metrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <div className="font-serif text-5xl font-bold leading-none text-brand-600 md:text-7xl">
                {metric.value}
                {metric.suffix && (
                  <span className="text-brand-500">{metric.suffix}</span>
                )}
              </div>
              <div className="mt-3 text-theme-xs uppercase tracking-[0.2em] text-gray-600 md:text-theme-sm">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ============ HÀNH TRÌNH (TIMELINE) ============ */}
    <section className="site-container py-20 md:py-28">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <span className="inline-block text-theme-xs font-semibold uppercase tracking-[0.25em] text-brand-600">
          Hành trình
        </span>
        <h2 className="mt-3 font-serif text-3xl font-bold text-gray-900 md:text-4xl">
          Từ ý tưởng nhỏ đến nền tảng quốc gia
        </h2>
        <p className="mt-4 text-base text-gray-600 md:text-lg">
          Sáu năm, năm cột mốc, và hàng nghìn câu chuyện khách hàng đã viết nên RealtyHub.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative mx-auto max-w-4xl">
        {/* Duong doc noi cac moc */}
        <div
          aria-hidden
          className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-brand-200 via-brand-400 to-brand-200 md:left-1/2 md:-translate-x-1/2"
        />

        <ol className="space-y-12 md:space-y-16">
          {ABOUT.milestones.map((milestone, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <li
                key={milestone.year}
                className="relative flex flex-col gap-4 pl-12 md:items-center md:gap-8 md:pl-0"
              >
                {/* Dot - tren dien thoai phai dat o `left-4` cho khop duong doc
                    (cung `left-4`). De `left-0`, cham vua lech khoi duong vua
                    bi cat mat 2px o mep man hinh vi no rong 36px ma le trang
                    chi co 16px. */}
                <span
                  aria-hidden
                  className="absolute left-4 top-2 inline-flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-brand-500 shadow-theme-md md:left-1/2"
                >
                  <span className="h-2 w-2 rounded-full bg-white" />
                </span>

                {/* Card */}
                <div
                  className={`flex-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-xs md:p-8 ${isEven ? 'md:mr-auto md:max-w-[calc(50%-3rem)] md:pr-12' : 'md:ml-auto md:max-w-[calc(50%-3rem)] md:pl-12'}`}
                >
                  {/* Year - dam, lon, brand */}
                  <div className="font-serif text-3xl font-bold text-brand-600 md:text-4xl">
                    {milestone.year}
                  </div>
                  <h3 className="mt-2 font-serif text-xl font-bold text-gray-900 md:text-2xl">
                    {milestone.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-gray-600">
                    {milestone.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>

    {/* ============ ĐỘI NGŨ ============ */}
    <section className="bg-gray-50/60 py-20 md:py-28">
      <div className="site-container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="inline-block text-theme-xs font-semibold uppercase tracking-[0.25em] text-brand-600">
            Đội ngũ
          </span>
          <h2 className="mt-3 font-serif text-3xl font-bold text-gray-900 md:text-4xl">
            Những người đứng sau RealtyHub
          </h2>
          <p className="mt-4 text-base text-gray-600 md:text-lg">
            Một đội ngũ đa ngành, cùng chung một niềm tin: công nghệ có thể giúp
            thị trường bất động sản minh bạch hơn.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {ABOUT.team.map((member) => (
            <article
              key={member.publicId}
              className="group relative flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-theme-xs transition hover:-translate-y-1 hover:shadow-theme-md md:p-8"
            >
              <UserAvatar
                name={member.name}
                src={member.avatar}
                size={88}
              />

              <h3 className="mt-5 font-serif text-xl font-bold text-gray-900">
                {member.name}
              </h3>
              <p className="mt-1 text-theme-xs uppercase tracking-[0.2em] text-brand-600">
                {member.role}
              </p>

              {member.quote && (
                <blockquote className="mt-4 font-serif text-base italic leading-relaxed text-gray-600">
                  {member.quote}
                </blockquote>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* ============ GIÁ TRỊ CỐT LÕI ============ */}
    <section className="site-container py-20 md:py-28">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <span className="inline-block text-theme-xs font-semibold uppercase tracking-[0.25em] text-brand-600">
          Giá trị cốt lõi
        </span>
        <h2 className="mt-3 font-serif text-3xl font-bold text-gray-900 md:text-4xl">
          Bốn nguyên tắc dẫn lối
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {ABOUT.values.map((value) => (
          <article
            key={value.publicId}
            className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-theme-xs transition hover:-translate-y-1 hover:shadow-theme-md md:p-8"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white md:h-14 md:w-14">
              <value.icon aria-hidden className="h-6 w-6 md:h-7 md:w-7" />
            </span>
            <h3 className="mt-5 font-serif text-xl font-bold text-gray-900">
              {value.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-gray-600">
              {value.description}
            </p>
          </article>
        ))}
      </div>
    </section>

    {/* ============ CTA CUỐI ============ */}
    <section className="bg-gray-900 py-20 text-white md:py-28">
      <div className="site-container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-light italic leading-tight md:text-5xl">
            Cùng chúng tôi viết tiếp
            <br />
            <span className="font-bold">câu chuyện bất động sản Việt</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            Dù bạn là khách hàng đang tìm nhà, hay môi giới đang tìm nền tảng
            chuyên nghiệp — RealtyHub luôn sẵn sàng đồng hành.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/gio-hang"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-theme-sm font-semibold text-gray-900 shadow-theme-sm transition hover:bg-gray-100"
            >
              Khám phá dự án
              <FiArrowRight
                aria-hidden
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/tro-thanh-moi-gioi"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-theme-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Trở thành đối tác
            </Link>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default GioiThieuPage;