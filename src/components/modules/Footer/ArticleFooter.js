"use client";
import React from 'react';
import styles from "./ArticleFooter.module.css";
import Link from 'next/link';

export default function ArticleFooter({ _id, img, title, comments, createdAt }) {
  return (
    <Link href={`/blogs/${_id}`} className={styles.article}>
      <div className={styles.imageContainer}>
        <img src={img} alt={title} className={styles.articleImage} />
      </div>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <div className={styles.meta}>
          <p className={styles.comments}>دیدگاه({Number(comments.length).toLocaleString("fa-IR")})</p>
          <p className={styles.date}>{new Date(createdAt).toLocaleDateString("fa-IR")}</p>
        </div>
      </div>
    </Link>
  );
}