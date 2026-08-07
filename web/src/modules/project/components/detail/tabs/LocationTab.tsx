'use client';

import type { ReactNode } from 'react';
import {
  FaCar,
  FaGlobeAsia,
  FaPlane,
  FaRocket,
  FaShip,
  FaTrain,
} from 'react-icons/fa';
import type { LocationIcon, ProjectDetail } from '../../../models/project-detail.model';
import { MediaFrame } from '../shared';

const HIGHLIGHT_ICONS: Record<LocationIcon, ReactNode> = {
  train: <FaTrain aria-hidden />,
  car: <FaCar aria-hidden />,
  plane: <FaPlane aria-hidden />,
  globe: <FaGlobeAsia aria-hidden />,
  ship: <FaShip aria-hidden />,
  rocket: <FaRocket aria-hidden />,
};

const LocationTab = ({ project }: { project: ProjectDetail }) => {
  const { location } = project;

  // Ban do nhung cua Google khong can API key voi tham so output=embed
  const mapSrc = `https://www.google.com/maps?q=${location.latitude},${location.longitude}&hl=vi&z=14&output=embed`;

  return (
    <div className="space-y-8">
      <MediaFrame
        seed={`${project.publicId}-location`}
        src={location.bannerUrl}
        alt={`Sơ đồ vị trí và kết nối vùng của ${project.name}`}
        ratio="aspect-[21/9]"
        className="shadow-card"
      />

      <section>
        <h2 className="mb-3 text-base font-bold uppercase tracking-wide text-gray-900">
          {location.headline}
        </h2>
        <p className="mb-4 text-theme-sm leading-relaxed text-gray-600">{location.intro}</p>

        <ul className="mb-4 space-y-3">
          {location.highlights.map((highlight) => (
            <li key={highlight.publicId} className="flex gap-3 text-theme-sm">
              <span className="mt-0.5 shrink-0 text-base text-jade-500">
                {HIGHLIGHT_ICONS[highlight.icon]}
              </span>
              <span className="text-gray-600">
                <strong className="font-semibold text-gray-900">{highlight.title}:</strong>{' '}
                {highlight.description}
              </span>
            </li>
          ))}
        </ul>

        <p className="text-theme-sm leading-relaxed text-gray-600">{location.closing}</p>
      </section>

      <section>
        <h2 className="sr-only">Bản đồ vị trí dự án</h2>
        <div className="aspect-[16/9] w-full overflow-hidden rounded-lg border border-gray-200 shadow-card">
          <iframe
            src={mapSrc}
            title={`Bản đồ vị trí ${project.name} - ${location.mapLabel}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0"
          />
        </div>
        <p className="mt-2 text-theme-xs text-gray-500">{location.mapLabel}</p>
      </section>
    </div>
  );
};

export default LocationTab;
