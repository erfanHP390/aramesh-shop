import React from "react";
import styles from "./Card.module.css";
import Link from "next/link";

function Card() {
  return (
    <div className={styles.card}>
      <Link href={"/article/123"}>
        <img
          src="https://set-coffee.com/wp-content/uploads/2023/04/31810-Coffee.jpg"
          alt=""
        />
      </Link>
      <Link href={"/article/123"} className={styles.title}>
        انواع قهوه و خواص آن
      </Link>
      <p className={styles.description}>
        قهوه یکی از محبوب‌ترین نوشیدنی‌های جهان است که برای بسیاری از مردم یک
        قسمت از روزانه‌شان شده است. قهوه شامل
      </p>
      <Link  className={styles.to_blog} href={"/article/123"}>ادامه مطلب</Link>
    </div>
  );
}

export default Card;
