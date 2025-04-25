'use client' 

import styles from './Error.module.css';
import Link from 'next/link';

export default function Error({ error, reset }) {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.coffeeIcon}>☕</div>
      
      <h1 className={styles.errorTitle}>خطایی رخ داد!</h1>
      
      <p className={styles.errorMessage}>
        {error.message || 'مشکلی در بارگذاری صفحه پیش آمده است'}
      </p>

      <div className={styles.buttonsContainer}>
        <button 
          onClick={reset}
          className={styles.retryButton}
        >
          تلاش مجدد
        </button>
        
        <Link href="/" className={styles.homeButton}>
          بازگشت به خانه
        </Link>
      </div>
    </div>
  );
}