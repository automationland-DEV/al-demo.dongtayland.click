/**
 * Tien ich so khop chuoi tieng Viet.
 *
 * Nguoi dung go tim kiem thuong bo dau ("vinh phuc", "can ho"), nen moi cho
 * loc theo tu khoa deu phai chuan hoa ca hai ve truoc khi so sanh.
 */

/** Dau thanh + dau phu sau khi tach bang NFD */
const COMBINING_MARKS = /[̀-ͯ]/g;

/** "Vĩnh Phúc" -> "vinh phuc", "Đà Nẵng" -> "da nang" */
export const normalizeVi = (value: string) =>
  value
    .normalize('NFD')
    .replace(COMBINING_MARKS, '')
    // "đ" la chu cai rieng, NFD khong tach duoc nen phai thay tay
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .trim();

/** Co chua tu khoa khong - bo qua dau va hoa thuong */
export const matchesVi = (haystack: string, needle: string) =>
  normalizeVi(haystack).includes(normalizeVi(needle));
