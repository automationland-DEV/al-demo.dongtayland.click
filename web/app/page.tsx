import { redirect } from 'next/navigation';

// Trang chu chua lam - tam dieu huong sang danh sach du an.
export default function HomePage() {
  redirect('/du-an');
}
