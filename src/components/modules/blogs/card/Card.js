import React from "react";
import styles from "./Card.module.css";
import Link from "next/link";

function Card({_id , title  , img ,  shortDesc}) {
  return (
    <div className={styles.card}>
      <Link href={`/blogs/${_id}`}>
        <img
          src={img}
          alt=""
        />
      </Link>
      <Link href={`/blogs/${_id}`} className={styles.title}>
        {title}
      </Link>
      <p className={styles.description}>
        {shortDesc}
      </p>
      <Link  className={styles.to_blog} href={"/article/123"}>ادامه مطلب</Link>
    </div>
  );
}

export default Card;
