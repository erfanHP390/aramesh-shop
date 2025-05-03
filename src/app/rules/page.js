import React from 'react'
import styles from "@/styles/rules.module.css"
import { authUser } from '@/utils/authUserLink'
import Navbar from '@/components/modules/navbar/Navbar'
import BreadCrumb from '@/components/modules/breadcrumb/BreadCrumb'
import Footer from '@/components/modules/Footer/Footer'
import connectToDB from '@/configs/db'
import Head from 'next/head'

export const metadata = {
  title: "قوانین و مقررات | قهوه آرامش - حریم خصوصی و شرایط استفاده",
  description: "قوانین و مقررات استفاده از فروشگاه اینترنتی قهوه آرامش | اطلاعات حریم خصوصی و شرایط خرید | تضمین امنیت اطلاعات شخصی کاربران",
  keywords: [
    "قوانین قهوه آرامش",
    "حریم خصوصی آرامش",
    "مقررات خرید آنلاین قهوه",
    "شرایط استفاده از سایت آرامش",
    "سیاست حفظ اطلاعات شخصی",
    "قوانین بازگشت کالا آرامش",
    "تضمین امنیت خرید آنلاین"
  ],
  openGraph: {
    title: "قوانین و مقررات | قهوه آرامش",
    description: "قوانین و شرایط استفاده از فروشگاه اینترنتی تخصصی قهوه آرامش",
    url: "https://aramesh-coffee.com/rules",
    type: "website",
    images: [
      {
        url: "https://aramesh-coffee.com/images/rules-og.jpg",
        width: 1200,
        height: 630,
        alt: "قوانین و مقررات قهوه آرامش",
      }
    ],
    siteName: "آرامش - فروشگاه تخصصی قهوه",
    locale: "fa_IR"
  },
  alternates: {
    canonical: "https://aramesh-coffee.com/rules"
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    }
  }
};

export default async function page() {
  connectToDB()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "قوانین و مقررات قهوه آرامش",
    "description": "قوانین و شرایط استفاده از فروشگاه اینترنتی تخصصی قهوه آرامش",
    "url": "https://aramesh-coffee.com/rules",
    "publisher": {
      "@type": "Organization",
      "name": "قهوه آرامش",
      "logo": {
        "@type": "ImageObject",
        "url": "https://aramesh-coffee.com/logo.png"
      }
    },
    "datePublished": "2023-01-01",
    "dateModified": new Date().toISOString().split('T')[0]
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://aramesh-coffee.com/rules" />
      </Head>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />
      <BreadCrumb route={"قوانین و مقررات"} />
      
      <div className={styles.container} data-aos="fade-up">
        <h1 className={styles.mainTitle}>قوانین و مقررات قهوه آرامش</h1>
        <p className={styles.introText}>
          در این صفحه می‌توانید با قوانین و شرایط استفاده از فروشگاه اینترنتی قهوه آرامش آشنا شوید.
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>حریم خصوصی و اطلاعات شخصی</h2>
          <p>
            "آرامش" ضمن احترامی که برای حریم شخصی کاربران قائل است، برای خرید،
            ثبت نظر یا استفاده از برخی امکانات وب سایت اطلاعاتی را از کاربران
            درخواست می‌کند تا بتواند خدماتی امن و مطمئن را به کاربران ارائه دهد.
            برای پردازش و ارسال سفارش، اطلاعاتی مانند آدرس، شماره تلفن و ایمیل
            مورد نیاز است و از آنجا که کلیه فعالیت‌های قهوه آرامش قانونی و مبتنی بر
            قوانین تجارت الکترونیک صورت می‌گیرد و طی فرایند خرید، فاکتور رسمی و
            بنا به درخواست مشتریان حقوقی گواهی ارزش افزوده صادر می‌شود، از این رو
            وارد کردن اطلاعاتی مانند نام و کد ملی برای اشخاص حقیقی یا کد اقتصادی و
            شناسه ملی برای خریدهای سازمانی لازم است.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>اطلاعات تماس و ارتباطات</h2>
          <p>
            همچنین آدرس ایمیل و تلفن‌هایی که مشتری در پروفایل خود ثبت می‌کند، تنها آدرس ایمیل و تلفن‌های رسمی و
            مورد تایید مشتری است و تمام مکاتبات و پاسخ‌های شرکت از طریق آنها صورت
            می‌گیرد.مشتریان می‌توانند نام، آدرس و تلفن شخص دیگری را برای تحویل
            گرفتن سفارش وارد کنند و قهوه آرامش تنها برای ارسال همان سفارش، از این
            اطلاعات استفاده خواهد کرد.
          </p>
          <p>
            <strong>شماره تماس:</strong> 66726563 - ۰۲۱
            <br />
            <strong>ساعات پاسخگویی:</strong> شنبه تا چهارشنبه 9 صبح تا 5 بعدازظهر
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>اخبار و اطلاع‌رسانی</h2>
          <p>
            همچنین قهوه آرامش ممکن است برای ارتباط با
            مشتریان، بهینه سازی محتوای وب سایت و تحقیقات بازاریابی از برخی اطلاعات
            استفاده کند و برای اطلاع رسانی رویدادها و اخبار، خدمات و سرویس‌های
            ویژه یا پروموشن‌ها، برای اعضای وب سایت ایمیل یا پیامک ارسال نماید. در
            صورتی که کاربران تمایل به دریافت اینگونه ایمیل و پیامک‌ها نداشته
            باشند، می‌توانند عضویت دریافت خبرنامه قهوه آرامش را در پروفایل خود لغو
            کنند.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>محتوای کاربران</h2>
          <p>
            قهوه آرامش ممکن است نقد و نظرهای ارسالی کاربران را در راستای رعایت قوانین
            وب سایت ویرایش کند. همچنین اگر نظر یا پیام ارسال شده توسط کاربر، مشمول
            مصادیق محتوای مجرمانه باشد، قهوه آرامش می‌تواند از اطلاعات ثبت شده برای
            پیگیری قانونی استفاده کند.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>امنیت اطلاعات</h2>
          <p>
            حفظ و نگهداری رمز عبور بر عهده کاربران است و
            برای جلوگیری از هرگونه سوء استفاده احتمالی، کاربران نباید آن را برای
            شخص دیگری فاش کنند. قهوه آرامش هویت شخصی کاربران را محرمانه می‌داند و
            اطلاعات شخصی آنان را به هیچ شخص یا سازمان دیگری منتقل نمی‌کند، مگر
            اینکه با حکم قانونی مجبور باشد در اختیار مراجع ذی‌صلاح قرار دهد.
          </p>
          <p>
            قهوه آرامش همانند سایر وب سایت‌ها از جمع آوری IP و کوکی‌ها استفاده می‌کند، اما
            پروتکل، سرور و لایه‌های امنیتی قهوه آرامش و روش‌های مناسب مدیریت داده‌ها
            اطلاعات کاربران را محافظت و از دسترسی‌های غیر قانونی جلوگیری
            می‌کند.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>آدرس فروشگاه</h2>
          <address>
            استان تهران - شهر تهران - خیابان انقلاب روبروی خیابان ویلا (نجات الهی)
            فروشگاه قهوه آرامش
          </address>
        </section>
      </div>
      <Footer />
    </>
  )
}