import React from 'react';
import styles from "./ArticleFooter.module.css";
import Link from 'next/link';

export default function ArticleFooter({ href, img, title, comments, date }) {
  return (
    <Link href={href} className={styles.article}>
      <img width={75} height={65} src={img} alt={title} />
      <div>
        <p className={styles.title}>{title}</p>
        <div>
          <p>{comments}</p>
          <p dir="rtl">{date}</p>
        </div>
      </div>
    </Link>
  );
}