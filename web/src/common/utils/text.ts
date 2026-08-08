/**
 * Xu ly chuoi tieng Viet.
 *
 * Dai U+0300-U+036F la cac dau thanh/dau mu o dang to hop (combining marks).
 * Viet bang ma escape chu khong go thang ky tu dau vao source: ky tu to hop
 * dung mot minh rat de bi editor hoac cong cu chuan hoa lam hong.
 */
const COMBINING_MARKS = new RegExp('[\\u0300-\\u036f]', 'g');

/** "Hạ Long" -> "ha long". Dung de tim kiem khong dau. */
export const removeDiacritics = (value: string) =>
  value
    .normalize('NFD')
    .replace(COMBINING_MARKS, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');

/** "Vọng Nguyệt" -> "vong-nguyet". Dung lam slug tren URL. */
export const toSlug = (value: string) =>
  removeDiacritics(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
