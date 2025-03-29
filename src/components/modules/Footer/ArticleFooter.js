import React from 'react';
import styles from "./ArticleFooter.module.css";
import Link from 'next/link';

export default function ArticleFooter({ _id , img , title , comments , createdAt}) {
  return (
    <Link href={`/blog/${_id}`} className={styles.article}>
      <img width={75} height={65} src={img} alt={title} />
      <div>
        <p className={styles.title}>{title}</p>
        <div>
          <p>دیدگاه({Number(comments.length).toLocaleString("fa-IR")})</p>
          <p dir="rtl">{new Date(createdAt).toLocaleDateString("fa-IR")}</p>
        </div>
      </div>
    </Link>
  );
}