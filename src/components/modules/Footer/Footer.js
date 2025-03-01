"use client"
import React, { useState } from 'react';
import styles from "./Footer.module.css";
import ArticleFooter from './ArticleFooter';
import { FaPhoneAlt, FaMap, FaEnvelopeOpen } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  // State برای مدیریت باز و بسته شدن لینک‌ها
  const [showMoreLinks, setShowMoreLinks] = useState(false);
  const [showQuickLinks, setShowQuickLinks] = useState(false);

  return (
    <footer className={styles.footer}>
      <main className="container">
        <section className={styles.descriptions}>
          <img src="/images/logo_light.png" alt="" />
          <p className={styles.descriptions_title}>
            فروشگاه آرامش ؛ سالها تجربه در خرید و فروش قهوه های تازه از سرتاسر جهان
          </p>

          <div className={styles.description}>
            <FaMap style={{ fontSize: "2rem" }} />
            <p>
              تهران ، خیابان فرشته
            </p>
          </div>
          <div className={styles.description}>
            <FaPhoneAlt />
            <p>پیگیری سفارشات : 02191055666</p>
          </div>
          <div className={styles.description}>
            <FaEnvelopeOpen />
            <p>aramesh@yahoo.com</p>
          </div>
        </section>

        <section>
          <h4>جدیدترین نوشته ها</h4>
          <ArticleFooter
            href={"/article/123"}
            data="۱۷ آبان ۱۴۰۲ "
            comments="بدون دیدگاه"
            img="https://set-coffee.com/wp-content/uploads/elementor/thumbs/IMG_20230920_130854_091-qconsqrfwm7t626t2hckfjifv0kdd7cofsbfd1jcig.jpg"
            title="افزایش انرژی با پودر قهوه فوری"
          />

          <hr />

          <ArticleFooter
            href={"/article/123"}
            data="۱۷ آبان ۱۴۰۲ "
            comments="بدون دیدگاه"
            img="https://set-coffee.com/wp-content/uploads/elementor/thumbs/IMG_20230920_130854_091-qconsqrfwm7t626t2hckfjifv0kdd7cofsbfd1jcig.jpg"
            title="افزایش انرژی با پودر قهوه فوری"
          />
        </section>

        <ul className={styles.links}>
          <div>
            <h4
              onClick={() => window.innerWidth <= 986 && setShowMoreLinks(!showMoreLinks)}
              style={{ cursor: window.innerWidth <= 986 ? "pointer" : "default" }}
            >
              بیشتر {window.innerWidth <= 986 && (showMoreLinks ? "▲" : "▼")}
            </h4>
            {(window.innerWidth > 986 || showMoreLinks) && (
              <>
                <li>
                  <Link href={"/contact-us"}>تماس با ما</Link>
                </li>
                <li>
                  <Link href={"/about-us"}>درباره ما </Link>
                </li>
                <li>
                  <Link href={"/rules"}>قوانین</Link>
                </li>
              </>
            )}
          </div>
          <div>
            <h4
              onClick={() => window.innerWidth <= 986 && setShowQuickLinks(!showQuickLinks)}
              style={{ cursor: window.innerWidth <= 986 ? "pointer" : "default" }}
            >
              دسترسی سریع {window.innerWidth <= 986 && (showQuickLinks ? "▲" : "▼")}
            </h4>
            {(window.innerWidth > 986 || showQuickLinks) && (
              <>
                <li>
                  <Link href={"/category"}> فروشگاه </Link>
                </li>
                <li>
                  <Link href={"/articles"}> مقالات </Link>
                </li>
                <li>
                  <Link href={"/cart"}>سبد خرید</Link>
                </li>
                <li>
                  <Link href={"/wishlist"}>علاقه مندی ها</Link>
                </li>
              </>
            )}
          </div>
        </ul>
        <div className={styles.licenses}>
          <img src="/images/license4.htm" width={76} height={76} alt="" />
          <img src="/images/license1.png" width={85} height={85} alt="" />
          <img src="/images/license3.png" alt="" />
          <img src="/images/license2.svg" width={62} height={95} alt="" />
        </div>
      </main>
      <hr />
    </footer>
  );
}