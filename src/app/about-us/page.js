import Footer from "@/components/modules/Footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import React from "react";
import connectToDB from "@/configs/db";
import styles from "@/styles/AboutUs.module.css";
import { authUser } from "@/utils/authUserLink";
import BreadCrumb from "@/components/modules/breadcrumb/BreadCrumb";

export const metadata = {
  title: "درباره ما | قهوه آرامش - تخصصی‌ترین فروشگاه قهوه اسپشیالیتی ایران",
  description:
    "آرامش: پیشرو در صنعت قهوه ایران از سال ۱۳۹۵ | عضو انجمن تخصصی قهوه اروپا (SCAE) | ارائه دهنده بهترین قهوه‌های اسپشیالیتی و تجهیزات کافی شاپ",
  keywords: [
    "درباره آرامش",
    "تاریخچه کافی شاپ آرامش",
    "قهوه اسپشیالیتی ایران",
    "عضو انجمن قهوه اروپا",
    "بهترین قهوه تهران",
    "فروشگاه تخصصی قهوه",
    "SCAE Coffee Diploma",
    "قهوه مرغوب ایرانی",
  ],
  openGraph: {
    title: "درباره ما | قهوه آرامش",
    description:
      "تخصصی‌ترین فروشگاه قهوه اسپشیالیتی ایران با گواهی انجمن قهوه اروپا",
    url: "https://aramesh-coffee.com/about-us",
    type: "website",
    images: [
      {
        url: "https://aramesh-coffee.com/images/about-us-og.jpg",
        width: 1200,
        height: 630,
        alt: "درباره کافی شاپ آرامش",
      },
    ],
    siteName: "آرامش - فروشگاه تخصصی قهوه",
    locale: "fa_IR",
  },
  twitter: {
    card: "summary_large_image",
    title: "درباره ما | قهوه آرامش",
    description:
      "پیشرو در صنعت قهوه ایران از سال ۱۳۹۵ با گواهی انجمن قهوه اروپا",
    images: ["https://aramesh-coffee.com/images/about-twitter.jpg"],
  },
  alternates: {
    canonical: "https://aramesh-coffee.com/about-us",
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
    },
  },
  authors: [
    {
      name: "تیم آرامش",
      url: "https://aramesh-coffee.com/about-us",
    },
  ],
  category: "قهوه و کافی شاپ",
};

async function page() {
  connectToDB();
  const user = await authUser();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "درباره کافی شاپ آرامش",
    description:
      "تخصصی‌ترین فروشگاه قهوه اسپشیالیتی ایران با گواهی انجمن قهوه اروپا",
    url: "https://aramesh-coffee.com/about-us",
    publisher: {
      "@type": "Organization",
      name: "آرامش",
      logo: {
        "@type": "ImageObject",
        url: "https://aramesh-coffee.com/logo.png",
      },
      foundingDate: "2016",
      founder: {
        "@type": "Person",
        name: "مدیریت آرامش",
      },
      award: "SCAE Coffee Diploma",
      memberOf: {
        "@type": "Organization",
        name: "Speciality Coffee Association of Europe",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://aramesh-coffee.com/about-us",
    },
  };

  return (
    <>
      <Navbar isLogin={user ? true : false} />
      <BreadCrumb route={"درباره ما"} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className={styles.container}>
        <section>
          <h1 className={styles.mainTitle}>درباره کافی شاپ آرامش</h1>

          <p className={styles.content}>
            از سال <strong>۱۳۹۵</strong> تاکنون، فروشگاه قهوه آرامش با افتخار
            میزبان مشتریان و دوستداران قهوه بوده است. ما با بهره‌گیری از
            تجربه‌ای به قدمت چهار نسل و ارتباط مستمر با مصرف‌کنندگان، همواره
            کیفیت و اصالت را در اولویت کار خود قرار داده‌ایم.
          </p>

          <p className={styles.content}>
            آرامش، به عنوان یکی از پیشگامان صنعت قهوه در ایران، از سال{" "}
            <strong>۱۳۸۶</strong>
            (۲۰۰۷ میلادی) به عضویت انجمن تخصصی قهوه اروپا (SCAE) درآمده است. این
            مجموعه با واردات مستقیم بهترین مواد اولیه و انتخاب دقیق دانه‌های
            قهوه، همواره تلاش کرده تا محصولاتی با کیفیت جهانی به مشتریان خود
            ارائه دهد.
          </p>
        </section>

        <main className={styles.main}>
          <div className={styles.card}>
            <h2>صاحب امتیاز: کافی شاپ آرامش</h2>
            <h3>داستان آرامش</h3>

            <p className={styles.content}>
              آرامش تنها یک نام نیست، بلکه نمادی از کیفیت، اصالت و عشق به قهوه
              است. ما در فروشگاه آرامش، با هدف ارائه بهترین تجربه قهوه به شما،
              همواره در تلاش هستیم تا با بهره‌گیری از دانش روز دنیا و
              تکنولوژی‌های پیشرفته، محصولاتی در سطح استانداردهای جهانی به شما
              عرضه کنیم.
            </p>

            <p className={styles.content}>
              مجموعه آرامش اولین مجموعه مرتبط با قهوه در ایران است که در سال
              ۲۰۰۷ به عضویت انجمن تخصصی قهوه اروپا (Speciality Coffee
              Association of Europe) درآمده است. مدیریت این مجموعه بسیاری از
              دوره‌های مربوط به فرآوری قهوه را به صورت تخصصی در کارگاه‌های
              آموزشی این انجمن و همچنین کارگاه‌های تخصصی فرآوری قهوه، به خصوص در
              زمینه بو دادن قهوه (Roasting)، در کشور آمریکا که از پیشگامان این
              صنعت است، گذرانده است.
            </p>
          </div>

          <div className={styles.card}>
            <p className={styles.content}>
              در <strong>بهمن ماه ۱۳۹۴</strong>، آرامش موفق به اخذ مجوزهای لازم
              از وزارت بهداشت، درمان و آموزش پزشکی و سازمان غذا و دارو شد و با
              تبدیل تولید سنتی به صنعتی، گامی بلند در جهت افزایش کیفیت و تنوع
              محصولات خود برداشت.
            </p>

            <p className={styles.content}>
              همچنین، در <strong>فروردین ماه ۱۳۹۵</strong>، این مجموعه موفق به
              دریافت مدرک دیپلم دانش قهوه از انجمن تخصصی قهوه اروپا شد (SCAE
              Coffee Diploma).
            </p>

            <p className={styles.content}>
              ما در فروشگاه قهوه آرامش، با افتخار محصولات خود را به شما عرضه
              می‌کنیم. این محصولات حاصل سال‌ها تجربه، دانش و تلاش بی‌وقفه در
              صنعت قهوه است. از قهوه‌های بو داده شده با تکنیک‌های پیشرفته گرفته
              تا انواع نوشیدنی‌های گرم و سرد، همه و همه در فضایی آرام و دل‌نشین
              در انتظار شما هستند.
            </p>

            <p className={styles.content}>
              به فروشگاه قهوه آرامش بیایید و طعم واقعی قهوه را در کنار ما تجربه
              کنید.
            </p>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}

export default page;
