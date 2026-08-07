/**
 * Sinh anh mock dang SVG cho du an va tin tuc.
 *
 * Chay:  node scripts/generate-mock-images.mjs
 * Ket qua: web/public/images/projects/<slug>.svg  va  web/public/images/news/news-XX.svg
 *
 * Anh duoc ve hoan toan bang code, khong tai ve tu dau ca. Khi co anh that,
 * chi can doi truong `thumbnailUrl` trong mock sang duong dan anh moi.
 * Nguon du an lay tu chinh file seed ma mock dung, nen khong bao gio lech nhau.
 */
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SEED_PATH = join(ROOT, 'src/modules/project/mocks/projects.seed.json');
const PROJECT_OUT = join(ROOT, 'public/images/projects');
const NEWS_OUT = join(ROOT, 'public/images/news');

const WIDTH = 800;
const PROJECT_HEIGHT = 500; // ti le 16:10 dung voi khung anh cua card du an
const NEWS_HEIGHT = 450; // ti le 16:9 dung voi khung anh cua card tin tuc

/** Bang mau: moi du an chon 1 bang theo hash cua slug nen luon on dinh */
const PALETTES = [
  { skyTop: '#0b2f5e', skyMid: '#2f6fb5', skyLow: '#9fcbe8', sun: '#ffd88a', far: '#1d4a7a', near: '#12324f', build: '#0a2540', water: '#1b5f8c', green: '#1f6b4a' },
  { skyTop: '#3a1f52', skyMid: '#8e4a7d', skyLow: '#f0a98c', sun: '#ffd0a1', far: '#5b3160', near: '#33203f', build: '#241531', water: '#6b3b6a', green: '#4a5f3a' },
  { skyTop: '#06364a', skyMid: '#158ba3', skyLow: '#9fdbdc', sun: '#fff0b8', far: '#0f5c6b', near: '#0a3b46', build: '#062b36', water: '#0f7f96', green: '#177a5c' },
  { skyTop: '#4a2a10', skyMid: '#c07a2a', skyLow: '#f6cf8e', sun: '#fff4cf', far: '#7a4a1c', near: '#452a12', build: '#33200f', water: '#9a6a2c', green: '#5f6b25' },
  { skyTop: '#0d3b2e', skyMid: '#2f8a63', skyLow: '#bfe6c8', sun: '#f4ffcf', far: '#175c44', near: '#0c3a2c', build: '#08291f', water: '#1d7a6a', green: '#2f8f55' },
  { skyTop: '#2a1440', skyMid: '#4f4fb0', skyLow: '#a8b6ef', sun: '#e6e2ff', far: '#3a2f6b', near: '#241a45', build: '#191233', water: '#3f4a9c', green: '#3a5f7a' },
];

/** Hash on dinh tu chuoi -> so nguyen duong */
const hashOf = (seed) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

/** RNG co hat giong: cung slug -> cung bo so -> anh khong doi giua cac lan chay */
const makeRandom = (seed) => {
  let state = hashOf(seed) || 1;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const round = (value) => Math.round(value * 10) / 10;

/** May: vai hinh bau duc mo chong len nhau */
const clouds = (rand, count) => {
  let out = '';
  for (let i = 0; i < count; i += 1) {
    const cx = round(rand() * WIDTH);
    const cy = round(40 + rand() * 120);
    const rx = round(50 + rand() * 70);
    const ry = round(10 + rand() * 12);
    const opacity = round(0.1 + rand() * 0.18);
    out += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#fff" opacity="${opacity}"/>`;
  }
  return out;
};

/** Day nui xa: mot duong gap khuc chay het chieu ngang */
const ridge = (rand, baseY, color, opacity) => {
  const points = [`0,${PROJECT_HEIGHT}`, `0,${round(baseY + rand() * 20)}`];
  for (let x = 80; x <= WIDTH; x += 80) {
    points.push(`${x},${round(baseY - 40 + rand() * 70)}`);
  }
  points.push(`${WIDTH},${PROJECT_HEIGHT}`);
  return `<polygon points="${points.join(' ')}" fill="${color}" opacity="${opacity}"/>`;
};

/** Toa cao tang: than nha + luoi cua so */
const towers = (rand, palette, horizonY) => {
  let out = '';
  let x = -20;

  while (x < WIDTH) {
    const width = round(38 + rand() * 52);
    const height = round(90 + rand() * 210);
    const top = round(horizonY - height);
    const shade = rand() > 0.5 ? palette.build : palette.near;

    out += `<rect x="${round(x)}" y="${top}" width="${width}" height="${height}" fill="${shade}"/>`;

    // Luoi cua so - buoc nhay du thua de file khong phinh to
    const cols = Math.max(1, Math.floor(width / 14));
    const rows = Math.max(1, Math.floor(height / 22));
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        if (rand() > 0.55) continue;
        const wx = round(x + 6 + c * 14);
        const wy = round(top + 12 + r * 22);
        if (wy > horizonY - 8) continue;
        out += `<rect x="${wx}" y="${wy}" width="6" height="9" fill="${palette.sun}" opacity="${round(0.25 + rand() * 0.5)}"/>`;
      }
    }

    x += width + round(6 + rand() * 16);
  }

  return out;
};

/** Nha thap tang: than nha + mai doc + cua */
const villas = (rand, palette, horizonY) => {
  let out = '';
  let x = -10;

  while (x < WIDTH) {
    const width = round(70 + rand() * 60);
    const bodyHeight = round(46 + rand() * 34);
    const roofHeight = round(22 + rand() * 16);
    const top = round(horizonY - bodyHeight);
    const roofTop = round(top - roofHeight);

    out += `<rect x="${round(x)}" y="${top}" width="${width}" height="${bodyHeight}" fill="${palette.build}"/>`;
    out += `<polygon points="${round(x - 6)},${top} ${round(x + width / 2)},${roofTop} ${round(x + width + 6)},${top}" fill="${palette.near}"/>`;

    const windows = Math.max(1, Math.floor(width / 26));
    for (let w = 0; w < windows; w += 1) {
      const wx = round(x + 12 + w * 26);
      out += `<rect x="${wx}" y="${round(top + 14)}" width="10" height="12" fill="${palette.sun}" opacity="${round(0.35 + rand() * 0.45)}"/>`;
    }

    x += width + round(14 + rand() * 26);
  }

  return out;
};

/** Cay tien canh */
const trees = (rand, palette, horizonY, count) => {
  let out = '';
  for (let i = 0; i < count; i += 1) {
    const x = round(rand() * WIDTH);
    const scale = round(0.7 + rand() * 0.8);
    const trunkH = round(26 * scale);
    const crownR = round(18 * scale);
    const baseY = round(horizonY + 6 + rand() * 30);

    out += `<rect x="${round(x - 2)}" y="${round(baseY - trunkH)}" width="4" height="${trunkH}" fill="${palette.build}" opacity="0.9"/>`;
    out += `<circle cx="${x}" cy="${round(baseY - trunkH - crownR * 0.6)}" r="${crownR}" fill="${palette.green}" opacity="0.95"/>`;
  }
  return out;
};

const projectSvg = ({ slug, name, segment }) => {
  const rand = makeRandom(slug);
  const palette = PALETTES[hashOf(slug) % PALETTES.length];
  const horizonY = 350;
  const waterY = 400;

  const sunX = round(120 + rand() * 560);
  const sunY = round(90 + rand() * 70);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${PROJECT_HEIGHT}" width="${WIDTH}" height="${PROJECT_HEIGHT}" role="img" aria-label="Phối cảnh minh họa dự án ${name}">
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
<stop offset="0%" stop-color="${palette.skyTop}"/>
<stop offset="55%" stop-color="${palette.skyMid}"/>
<stop offset="100%" stop-color="${palette.skyLow}"/>
</linearGradient>
<radialGradient id="glow" cx="50%" cy="50%" r="50%">
<stop offset="0%" stop-color="${palette.sun}" stop-opacity="0.75"/>
<stop offset="100%" stop-color="${palette.sun}" stop-opacity="0"/>
</radialGradient>
<linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
<stop offset="0%" stop-color="${palette.water}"/>
<stop offset="100%" stop-color="${palette.near}"/>
</linearGradient>
<radialGradient id="vignette" cx="50%" cy="45%" r="75%">
<stop offset="60%" stop-color="#000" stop-opacity="0"/>
<stop offset="100%" stop-color="#000" stop-opacity="0.4"/>
</radialGradient>
</defs>
<rect width="${WIDTH}" height="${PROJECT_HEIGHT}" fill="url(#sky)"/>
<circle cx="${sunX}" cy="${sunY}" r="150" fill="url(#glow)"/>
<circle cx="${sunX}" cy="${sunY}" r="30" fill="${palette.sun}" opacity="0.9"/>
${clouds(rand, 5)}
${ridge(rand, 300, palette.far, 0.85)}
${segment === 'cao-tang' ? towers(rand, palette, horizonY) : villas(rand, palette, horizonY)}
<rect x="0" y="${waterY}" width="${WIDTH}" height="${PROJECT_HEIGHT - waterY}" fill="url(#water)"/>
<rect x="0" y="${waterY}" width="${WIDTH}" height="2" fill="#fff" opacity="0.18"/>
${trees(rand, palette, horizonY, segment === 'cao-tang' ? 5 : 9)}
<rect width="${WIDTH}" height="${PROJECT_HEIGHT}" fill="url(#vignette)"/>
</svg>`;
};

/** Anh tin tuc: hinh khoi truu tuong, khong ta canh */
const newsSvg = (id) => {
  const rand = makeRandom(id);
  const palette = PALETTES[hashOf(id) % PALETTES.length];

  let shapes = '';
  for (let i = 0; i < 4; i += 1) {
    const x = round(rand() * WIDTH - 100);
    const y = round(rand() * NEWS_HEIGHT - 60);
    const w = round(180 + rand() * 320);
    const h = round(60 + rand() * 130);
    const rotate = round(-25 + rand() * 50);
    const fill = [palette.far, palette.water, palette.green, palette.build][i % 4];
    shapes += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${fill}" opacity="${round(0.3 + rand() * 0.35)}" transform="rotate(${rotate} ${round(x + w / 2)} ${round(y + h / 2)})"/>`;
  }

  for (let i = 0; i < 3; i += 1) {
    shapes += `<circle cx="${round(rand() * WIDTH)}" cy="${round(rand() * NEWS_HEIGHT)}" r="${round(30 + rand() * 70)}" fill="${palette.sun}" opacity="${round(0.08 + rand() * 0.14)}"/>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${NEWS_HEIGHT}" width="${WIDTH}" height="${NEWS_HEIGHT}" role="img" aria-label="Ảnh minh họa bài viết">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stop-color="${palette.skyTop}"/>
<stop offset="100%" stop-color="${palette.skyMid}"/>
</linearGradient>
<radialGradient id="vignette" cx="50%" cy="50%" r="75%">
<stop offset="55%" stop-color="#000" stop-opacity="0"/>
<stop offset="100%" stop-color="#000" stop-opacity="0.35"/>
</radialGradient>
</defs>
<rect width="${WIDTH}" height="${NEWS_HEIGHT}" fill="url(#bg)"/>
${shapes}
<rect width="${WIDTH}" height="${NEWS_HEIGHT}" fill="url(#vignette)"/>
</svg>`;
};

const main = async () => {
  await mkdir(PROJECT_OUT, { recursive: true });
  await mkdir(NEWS_OUT, { recursive: true });

  const seeds = JSON.parse(await readFile(SEED_PATH, 'utf8'));

  await Promise.all(
    seeds.map((seed) =>
      writeFile(join(PROJECT_OUT, `${seed.slug}.svg`), projectSvg(seed), 'utf8'),
    ),
  );

  const newsIds = Array.from({ length: 8 }, (_, i) => `news-${String(i + 1).padStart(3, '0')}`);
  await Promise.all(
    newsIds.map((id) => writeFile(join(NEWS_OUT, `${id}.svg`), newsSvg(id), 'utf8')),
  );

  console.log(`Da sinh ${seeds.length} anh du an -> public/images/projects`);
  console.log(`Da sinh ${newsIds.length} anh tin tuc -> public/images/news`);
};

main().catch((error) => {
  console.error('Sinh anh that bai:', error);
  process.exit(1);
});
