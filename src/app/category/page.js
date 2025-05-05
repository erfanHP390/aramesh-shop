import React from "react";
import styles from "@/styles/category.module.css";
import BreadCrumb from "@/components/modules/breadcrumb/BreadCrumb";
import Navbar from "@/components/modules/navbar/Navbar";
import Footer from "@/components/modules/Footer/Footer";
import Products from "@/components/templates/category/products/Products";
import Filtering from "@/components/templates/category/filtering/Filtering";
import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";
import Head from "next/head";
import EmptyCart from "@/components/modules/EmptyCart/EmptyCart";
import { MdProductionQuantityLimits } from "react-icons/md";

export const metadata = {
  title: "فروشگاه تخصصی قهوه | خرید انواع قهوه اسپشیالیتی و تجهیزات کافی شاپ",
  description:
    "خرید آنلاین بهترین قهوه‌های اسپشیالیتی، دستگاه‌های اسپرسو و لوازم کافی شاپ با کیفیت عالی و قیمت مناسب | ارسال سریع به سراسر کشور",
  keywords: [
    "خرید قهوه اسپشیالیتی",
    "قهوه آرامش",
    "فروشگاه قهوه",
    "دستگاه اسپرسو",
    "قهوه فوری",
    "لوازم کافی شاپ",
    "قهوه گواتمالا",
    "قهوه برزیلی",
    "قهوه اتیوپی",
  ],
  openGraph: {
    title: "فروشگاه تخصصی قهوه آرامش | خرید آنلاین",
    description:
      "انواع قهوه اسپشیالیتی، دستگاه‌های اسپرسو و لوازم کافی شاپ با بهترین کیفیت",
    url: "https://aramesh-coffee.com/category",
    type: "website",
    images: [
      {
        url: "https://aramesh-coffee.com/images/category-og.jpg",
        width: 1200,
        height: 630,
        alt: "فروشگاه قهوه آرامش",
      },
    ],
    siteName: "آرامش - فروشگاه تخصصی قهوه",
    locale: "fa_IR",
  },
  alternates: {
    canonical: "https://aramesh-coffee.com/category",
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
};

async function page() {
  connectToDB();
  const products = await ProductModel.find();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "فروشگاه قهوه آرامش",
    description: "خرید آنلاین انواع قهوه اسپشیالیتی و تجهیزات کافی شاپ",
    url: "https://aramesh-coffee.com/category",
    publisher: {
      "@type": "Organization",
      name: "قهوه آرامش",
      logo: {
        "@type": "ImageObject",
        url: "https://aramesh-coffee.com/logo.png",
      },
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.name,
          description: product.shortDesc,
          image: product.img,
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "IRR",
          },
        },
      })),
    },
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://aramesh-coffee.com/category" />
      </Head>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />
      <BreadCrumb
        route={"فروشگاه"}
        links={[
          { title: "خانه", path: "/" },
          { title: "فروشگاه", path: "/category" },
        ]}
      />

      <main className={styles.container} data-aos="fade-up">
        <h1 className={styles.mainTitle}>فروشگاه تخصصی قهوه آرامش</h1>
        <p className={styles.introText}>
          بهترین قهوه‌های اسپشیالیتی و تجهیزات کافی شاپ را از ما بخواهید
        </p>

        <div className={styles.category}>
          {products.length > 0 ? (
            <>
              {" "}
              <Products productsDB={JSON.parse(JSON.stringify(products))} />
            </>
          ) : (
            <>
              <EmptyCart
                icon={<MdProductionQuantityLimits />}
                body={"بزودی با محصولاتی جدید شما را شگفت زده خواهیم کرد"}
                title={"محصولی وجود ندارد"}
                href={"/p-user/tickets/sendTicket"}
                textLink={"ارسال پیشنهادات"}
              />
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default page;
