/**
 * Du lieu mau de dung FE truoc khi co API.
 * Ten du an, chu dau tu, mo ta deu la hu cau.
 * Khi backend san sang: xoa file nay, khong sua file nao khac ngoai
 * services/project.service.ts.
 */
import type {
  FilterOption,
  Project,
  ProjectPropertyType,
  ProjectSegment,
  ProjectStatus,
} from '../models/project.model';

export const MOCK_DEVELOPERS: FilterOption[] = [
  { value: 'cdt-an-khang', label: 'Tập đoàn An Khang' },
  { value: 'cdt-bao-minh', label: 'Bảo Minh Group' },
  { value: 'cdt-dong-duong', label: 'Đông Dương Land' },
  { value: 'cdt-thai-binh-duong', label: 'Thái Bình Dương Holdings' },
  { value: 'cdt-truong-son', label: 'Trường Sơn Invest' },
];

export const MOCK_REGIONS: FilterOption[] = [
  { value: 'kv-ha-noi', label: 'Hà Nội' },
  { value: 'kv-hcm', label: 'TP. Hồ Chí Minh' },
  { value: 'kv-da-nang', label: 'Đà Nẵng' },
  { value: 'kv-hung-yen', label: 'Hưng Yên' },
  { value: 'kv-quang-ninh', label: 'Quảng Ninh' },
  { value: 'kv-hai-phong', label: 'Hải Phòng' },
];

type Seed = {
  name: string;
  tagline: string;
  address: string;
  segment: ProjectSegment;
  status: ProjectStatus;
  propertyType: ProjectPropertyType;
  developerIndex: number;
  regionIndex: number;
  isHot?: boolean;
};

const SEEDS: Seed[] = [
  {
    name: 'Green Harbor Hạ Long',
    tagline: 'Đô thị ven vịnh với công viên bờ biển dài 2km',
    address: 'Phường Tuần Châu, TP. Hạ Long, Quảng Ninh',
    segment: 'thap-tang',
    status: 'dang-mo-ban',
    propertyType: 'biet-thu',
    developerIndex: 0,
    regionIndex: 4,
    isHot: true,
  },
  {
    name: 'Lotus Park Hưng Yên',
    tagline: 'Khu đô thị sinh thái kề sông, trọn vẹn tiện ích nội khu',
    address: 'Xã Văn Giang, huyện Văn Giang, Hưng Yên',
    segment: 'thap-tang',
    status: 'dang-mo-ban',
    propertyType: 'nha-pho',
    developerIndex: 1,
    regionIndex: 3,
    isHot: true,
  },
  {
    name: 'Sunrise Bay Đà Nẵng',
    tagline: 'Tổ hợp nghỉ dưỡng hướng biển phía Đông thành phố',
    address: 'Phường Hòa Hiệp Bắc, quận Liên Chiểu, TP. Đà Nẵng',
    segment: 'thap-tang',
    status: 'sap-mo-ban',
    propertyType: 'biet-thu',
    developerIndex: 2,
    regionIndex: 2,
    isHot: true,
  },
  {
    name: 'An Phú Garden City',
    tagline: 'Thành phố vườn với hơn 60% diện tích cây xanh và mặt nước',
    address: 'Xã Văn Lâm, huyện Văn Lâm, Hưng Yên',
    segment: 'thap-tang',
    status: 'dang-mo-ban',
    propertyType: 'nha-pho',
    developerIndex: 0,
    regionIndex: 3,
  },
  {
    name: 'Vạn Xuân Marina',
    tagline: 'Bến du thuyền và phố thương mại ven sông',
    address: 'Phường Vĩnh Niệm, quận Lê Chân, TP. Hải Phòng',
    segment: 'thap-tang',
    status: 'dang-mo-ban',
    propertyType: 'shophouse',
    developerIndex: 3,
    regionIndex: 5,
  },
  {
    name: 'Metro Star Tower',
    tagline: 'Căn hộ trên trục metro, kết nối trung tâm trong 15 phút',
    address: 'Đường Nguyễn Trãi, quận Thanh Xuân, Hà Nội',
    segment: 'cao-tang',
    status: 'dang-mo-ban',
    propertyType: 'can-ho',
    developerIndex: 1,
    regionIndex: 0,
    isHot: true,
  },
  {
    name: 'Hoàng Gia Central',
    tagline: 'Không gian sống chuẩn quốc tế giữa lòng thành phố',
    address: 'Xã Tân Hội, huyện Đan Phượng, Hà Nội',
    segment: 'thap-tang',
    status: 'sap-mo-ban',
    propertyType: 'biet-thu',
    developerIndex: 4,
    regionIndex: 0,
  },
  {
    name: 'Nam Long Ecopark',
    tagline: 'Đô thị xanh hứa hẹn trở thành điểm đến mới phía Nam',
    address: 'Đường Nguyễn Xiển, phường Long Bình, TP. Hồ Chí Minh',
    segment: 'cao-tang',
    status: 'dang-mo-ban',
    propertyType: 'can-ho',
    developerIndex: 2,
    regionIndex: 1,
  },
  {
    name: 'Bến Thành Skyline',
    tagline: 'Sống phong cách hòa điệu toàn cầu',
    address: 'Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    segment: 'cao-tang',
    status: 'dang-mo-ban',
    propertyType: 'can-ho',
    developerIndex: 3,
    regionIndex: 1,
    isHot: true,
  },
  {
    name: 'Diamond Crown Hải Phòng',
    tagline: 'Tổ hợp cao tầng cá tính dành cho cư dân thế hệ mới',
    address: 'Phường Nghĩa Trụ, quận Hồng Bàng, TP. Hải Phòng',
    segment: 'cao-tang',
    status: 'da-ban-giao',
    propertyType: 'can-ho',
    developerIndex: 0,
    regionIndex: 5,
  },
  {
    name: 'Thanh Xuân Riverside',
    tagline: 'Sống phóng khoáng bên hành lang sông',
    address: 'Phường Thanh Xuân Trung, quận Thanh Xuân, Hà Nội',
    segment: 'cao-tang',
    status: 'dang-mo-ban',
    propertyType: 'can-ho',
    developerIndex: 4,
    regionIndex: 0,
  },
  {
    name: 'Phú Mỹ Grand Villas',
    tagline: 'Thành phố công viên tri thức hàng đầu khu vực',
    address: 'Xã Tân Thới Nhì, huyện Hóc Môn, TP. Hồ Chí Minh',
    segment: 'thap-tang',
    status: 'dang-mo-ban',
    propertyType: 'biet-thu',
    developerIndex: 1,
    regionIndex: 1,
  },
  {
    name: 'Đông Đô Central Park',
    tagline: 'Quần thể căn hộ ôm trọn công viên trung tâm 12ha',
    address: 'Phường Việt Hưng, quận Long Biên, Hà Nội',
    segment: 'cao-tang',
    status: 'sap-mo-ban',
    propertyType: 'can-ho',
    developerIndex: 2,
    regionIndex: 0,
  },
  {
    name: 'Biển Ngọc Resort Villas',
    tagline: 'Biệt thự mặt biển sở hữu lâu dài cuối cùng tại khu Đông',
    address: 'Phường Mỹ An, quận Ngũ Hành Sơn, TP. Đà Nẵng',
    segment: 'thap-tang',
    status: 'dang-mo-ban',
    propertyType: 'biet-thu',
    developerIndex: 3,
    regionIndex: 2,
  },
  {
    name: 'Sao Mai Business Tower',
    tagline: 'Shophouse khối đế cho hộ kinh doanh và văn phòng nhỏ',
    address: 'Đường Lê Hồng Phong, quận Ngô Quyền, TP. Hải Phòng',
    segment: 'cao-tang',
    status: 'da-ban-giao',
    propertyType: 'shophouse',
    developerIndex: 4,
    regionIndex: 5,
  },
  {
    name: 'Hạ Long Pearl Bay',
    tagline: 'Kỳ quan địa thế, tựa rừng hướng biển',
    address: 'Phường Hùng Thắng, TP. Hạ Long, Quảng Ninh',
    segment: 'cao-tang',
    status: 'dang-mo-ban',
    propertyType: 'can-ho',
    developerIndex: 0,
    regionIndex: 4,
  },
  {
    name: 'Vườn Xuân Residence',
    tagline: 'Nhà phố thương mại giữa trục đại lộ mới mở',
    address: 'Xã Kim Chung, huyện Hoài Đức, Hà Nội',
    segment: 'thap-tang',
    status: 'dang-mo-ban',
    propertyType: 'nha-pho',
    developerIndex: 1,
    regionIndex: 0,
  },
  {
    name: 'Cát Tường Land Zone',
    tagline: 'Đất nền pháp lý hoàn thiện, hạ tầng đã bàn giao',
    address: 'Xã Long Hòa, huyện Cần Giờ, TP. Hồ Chí Minh',
    segment: 'thap-tang',
    status: 'sap-mo-ban',
    propertyType: 'dat-nen',
    developerIndex: 2,
    regionIndex: 1,
  },
  {
    name: 'Thủy Nguyên Riverfront',
    tagline: 'Đô thị bên sông với bến thuyền và quảng trường nước',
    address: 'Thị trấn Núi Đèo, huyện Thủy Nguyên, TP. Hải Phòng',
    segment: 'thap-tang',
    status: 'dang-mo-ban',
    propertyType: 'nha-pho',
    developerIndex: 3,
    regionIndex: 5,
  },
  {
    name: 'Sky Garden Đà Nẵng',
    tagline: 'Căn hộ vườn treo hướng sông Hàn',
    address: 'Phường An Hải Bắc, quận Sơn Trà, TP. Đà Nẵng',
    segment: 'cao-tang',
    status: 'dang-mo-ban',
    propertyType: 'can-ho',
    developerIndex: 4,
    regionIndex: 2,
  },
  {
    name: 'Tân Cảng Waterfront',
    tagline: 'Tổ hợp căn hộ và trung tâm thương mại ven cảng',
    address: 'Phường 22, quận Bình Thạnh, TP. Hồ Chí Minh',
    segment: 'cao-tang',
    status: 'da-ban-giao',
    propertyType: 'can-ho',
    developerIndex: 0,
    regionIndex: 1,
  },
  {
    name: 'Đại An Eco Village',
    tagline: 'Làng sinh thái khép kín, mật độ xây dựng 28%',
    address: 'Xã Đại An, huyện Văn Giang, Hưng Yên',
    segment: 'thap-tang',
    status: 'dang-mo-ban',
    propertyType: 'biet-thu',
    developerIndex: 1,
    regionIndex: 3,
  },
  {
    name: 'Bạch Đằng Luxury',
    tagline: 'Căn hộ hàng hiệu trên trục phố cổ ven sông',
    address: 'Phường Thạch Thang, quận Hải Châu, TP. Đà Nẵng',
    segment: 'cao-tang',
    status: 'sap-mo-ban',
    propertyType: 'can-ho',
    developerIndex: 2,
    regionIndex: 2,
  },
  {
    name: 'Yên Bình New Town',
    tagline: 'Khu đô thị mới gắn với tuyến vành đai 4',
    address: 'Xã Yên Bình, huyện Thạch Thất, Hà Nội',
    segment: 'thap-tang',
    status: 'dang-mo-ban',
    propertyType: 'dat-nen',
    developerIndex: 3,
    regionIndex: 0,
  },
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/** Ngay dang gia lap - lui dan tu 07/08/2026 de thu tu "moi nhat" on dinh */
const publishedAtFor = (index: number) => {
  const base = new Date('2026-08-07T09:00:00.000Z');
  base.setDate(base.getDate() - index * 3);
  return base.toISOString();
};

export const MOCK_PROJECTS: Project[] = SEEDS.map((seed, index) => {
  const developer = MOCK_DEVELOPERS[seed.developerIndex];
  const region = MOCK_REGIONS[seed.regionIndex];
  const slug = slugify(seed.name);

  return {
    publicId: `prj-${String(index + 1).padStart(3, '0')}`,
    slug,
    name: seed.name,
    tagline: seed.tagline,
    address: seed.address,
    segment: seed.segment,
    status: seed.status,
    propertyType: seed.propertyType,
    developerId: developer.value,
    developerName: developer.label,
    regionId: region.value,
    regionName: region.label,
    thumbnailUrl: '',
    detailUrl: `/du-an/${slug}`,
    isHot: Boolean(seed.isHot),
    isFavorite: false,
    publishedAt: publishedAtFor(index),
  };
});
