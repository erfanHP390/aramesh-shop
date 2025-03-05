import Link from 'next/link';
import styles from '@/styles/404.module.css'; // فرض کنید فایل استایل‌ها اینجاست

export default function NotFound() {
  return (
    <div>
      <div className={styles.contents}>
        <p className={styles.left_number}>4</p>
        <div className={styles.mug}></div>
        <p className={styles.right_number}>4</p>
      </div>
      <div className={styles.texts}>
        <p>صفحه مورد نظر یافت نشد :((</p>
        <Link href="/"  target='_blank'>برگشت به خانه</Link>
      </div>
    </div>
  );
}