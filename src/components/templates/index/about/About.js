// app/services/page.js
import React from "react";
import Image from "next/image";
import styles from "./About.module.css";

export const metadata = {
  title: "خدمات قهوه آرامش - همراه شما در هر لحظه",
  description:
    "در قهوه آرامش، ما فقط قهوه نمی‌فروشیم، بلکه تجربه‌ای کامل از خرید و نوشیدن قهوه را به شما ارائه می‌دهیم.",
};

export default function Services() {
  return (
    <div
      className={styles.container}
      data-aos="fade-up"
      data-aos-duration="3000"
    >
      <h1 className={styles.title}>خدمات قهوه آرامش: همراه شما در هر لحظه</h1>
      <div className={styles.content}>
        <p className={styles.description}>
          در قهوه آرامش، ما فقط قهوه نمی‌فروشیم، بلکه تجربه‌ای کامل از خرید و
          نوشیدن قهوه را به شما ارائه می‌دهیم. ما بهترین دانه‌های قهوه را از
          سراسر جهان انتخاب می‌کنیم و با روش‌های مدرن آسیاب و بسته‌بندی، تازگی و
          عطر قهوه را تا زمان رسیدن به دست شما حفظ می‌کنیم.
        </p>
        <a href="#" className={styles.link}>
          اطلاعات بیشتر درباره خدمات ما
        </a>
      </div>

      <div className={styles.section}>
        <div className={styles.imageContainer}>
          <Image
            src="/images/about-us/quick-delivery.png" // مسیر عکس اول
            alt="ارسال سریع قهوه آرامش"
            width={300} // عرض عکس
            height={300} // ارتفاع عکس
            className={styles.image}
          />
        </div>
        <div className={styles.textContainer}>
          <h2 className={styles.subtitle}>ارسال سریع</h2>
          <p className={styles.description}>
            سفارشات شما در کمترین زمان ممکن به دستتان می‌رسد. ما با همکاری با
            بهترین شرکت‌های پست و ارسال، مطمئن می‌شویم که قهوه‌های تازه و
            باکیفیت به دست شما برسد.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.imageContainer}>
          <Image
            src="/images/about-us/advice.webp" // مسیر عکس دوم
            alt="مشاوره تخصصی قهوه آرامش"
            width={300} // عرض عکس
            height={300} // ارتفاع عکس
            className={styles.image}
          />
        </div>
        <div className={styles.textContainer}>
          <h2 className={styles.subtitle}>مشاوره تخصصی</h2>
          <p className={styles.description}>
            تیم ما متشکل از متخصصان قهوه است که آماده‌اند به شما در انتخاب
            بهترین قهوه بر اساس سلیقه و نیازتان کمک کنند. چه به دنبال قهوه‌های
            اسپشیالیتی باشید یا قهوه‌های ترکیبی، ما بهترین گزینه‌ها را به شما
            پیشنهاد می‌دهیم.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.imageContainer}>
          <Image
            src="/images/about-us/offer.webp" // مسیر عکس سوم
            alt="تخفیف‌های ویژه قهوه آرامش"
            width={300} // عرض عکس
            height={300} // ارتفاع عکس
            className={styles.image}
          />
        </div>
        <div className={styles.textContainer}>
          <h2 className={styles.subtitle}>تخفیف‌های ویژه</h2>
          <p className={styles.description}>
            از تخفیف‌های دوره‌ای و هدایای تبلیغاتی ما بهره‌مند شوید. با خرید از
            قهوه آرامش، نه‌تنها از کیفیت بی‌نظیر قهوه لذت می‌برید، بلکه در
            هزینه‌های خود نیز صرفه‌جویی می‌کنید.
          </p>
          <a href="#" className={styles.link}>
            خرید کد تخفیف
          </a>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.imageContainer}>
          <Image
            src="/images/about-us/support.png" // مسیر عکس چهارم
            alt="پشتیبانی ۲۴/۷ قهوه آرامش"
            width={300} // عرض عکس
            height={300} // ارتفاع عکس
            className={styles.image}
          />
        </div>
        <div className={styles.textContainer}>
          <h2 className={styles.subtitle}>پشتیبانی ۲۴/۷</h2>
          <p className={styles.description}>
            در هر زمان از شبانه‌روز، ما آماده پاسخگویی به سوالات و حل مشکلات شما
            هستیم. اگر سوالی دارید یا نیاز به راهنمایی دارید، تیم پشتیبانی قهوه
            آرامش در کنار شماست.
          </p>
        </div>
      </div>
    </div>
  );
}
