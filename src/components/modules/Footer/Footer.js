"use client";
import React, { useState, useEffect } from 'react';
import styles from "./Footer.module.css";
import ArticleFooter from './ArticleFooter';
import { FaPhoneAlt, FaMap, FaEnvelopeOpen } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  const [showMoreLinks, setShowMoreLinks] = useState(false);
  const [showQuickLinks, setShowQuickLinks] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // بررسی وجود `window` قبل از استفاده
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 986);
      };

      handleResize(); // تنظیم مقدار اولیه
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

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
              onClick={() => isMobile && setShowMoreLinks(!showMoreLinks)}
              style={{ cursor: isMobile ? "pointer" : "default" }}
            >
              بیشتر {isMobile && (showMoreLinks ? "▲" : "▼")}
            </h4>
            {(!isMobile || showMoreLinks) && (
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
              onClick={() => isMobile && setShowQuickLinks(!showQuickLinks)}
              style={{ cursor: isMobile ? "pointer" : "default" }}
            >
              دسترسی سریع {isMobile && (showQuickLinks ? "▲" : "▼")}
            </h4>
            {(!isMobile || showQuickLinks) && (
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