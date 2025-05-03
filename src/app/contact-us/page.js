import React from 'react'
import styles from "@/styles/contactUs.module.css"
import Navbar from '@/components/modules/navbar/Navbar'
import BreadCrumb from '@/components/modules/breadcrumb/BreadCrumb'
import Footer from '@/components/modules/Footer/Footer'
import Form from '@/components/templates/contact-us/form/Form'
import { authUser } from '@/utils/authUserLink'
import Information from '@/components/templates/contact-us/information/Information'
import Map from '@/components/templates/map/Map'
import Link from 'next/link'
import connectToDB from '@/configs/db'

export const metadata = {
  title: "تماس با ما | قهوه آرامش - راه‌های ارتباطی و آدرس شعب",
  description: "تماس مستقیم با فروشگاه تخصصی قهوه آرامش | آدرس شعب تهران و مشهد | شماره تلفن: 021-11111122 | پشتیبانی 24 ساعته | پاسخگویی به سوالات درباره خرید قهوه اسپشیالیتی",
  keywords: [
    "تماس با آرامش",
    "آدرس کافی شاپ آرامش",
    "شماره تلفن قهوه آرامش",
    "پشتیبانی قهوه آرامش",
    "شعبه تهران قهوه آرامش",
    "شعبه مشهد آرامش",
    "سوالات متداول خرید قهوه",
    "راهنمای خرید از آرامش"
  ],
  openGraph: {
    title: "تماس با ما | قهوه آرامش",
    description: "راه‌های ارتباطی با فروشگاه تخصصی قهوه آرامش - شعب تهران و مشهد",
    url: "https://aramesh-coffee.com/contact-us",
    type: "website",
    images: [
      {
        url: "https://aramesh-coffee.com/images/contact-us-og.jpg",
        width: 1200,
        height: 630,
        alt: "تماس با کافی شاپ آرامش",
      }
    ],
    siteName: "آرامش - فروشگاه تخصصی قهوه",
    locale: "fa_IR"
  },
  twitter: {
    card: "summary_large_image",
    title: "تماس با ما | قهوه آرامش",
    description: "راه‌های ارتباطی با فروشگاه تخصصی قهوه آرامش",
    images: ["https://aramesh-coffee.com/images/contact-twitter.jpg"]
  },
  alternates: {
    canonical: "https://aramesh-coffee.com/contact-us"
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
    "@type": "ContactPage",
    "name": "تماس با کافی شاپ آرامش",
    "description": "راه‌های ارتباطی با فروشگاه تخصصی قهوه آرامش",
    "url": "https://aramesh-coffee.com/contact-us",
    "publisher": {
      "@type": "Organization",
      "name": "آرامش",
      "logo": {
        "@type": "ImageObject",
        "url": "https://aramesh-coffee.com/logo.png"
      }
    },
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "خیابان فرشته، جنب پاساژ فرشته، طبقه دوم",
        "addressLocality": "تهران",
        "postalCode": "1234567890",
        "addressCountry": "IR",
        "telephone": "+982111111122"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "روبروی پارک ملت، خیابان گلشن، نبش کوچه گلشن هشتم",
        "addressLocality": "مشهد",
        "postalCode": "1234567891",
        "addressCountry": "IR",
        "telephone": "+985137121154"
      }
    ],
    "openingHours": "Mo-Su 09:00-23:00",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+982111111122",
      "contactType": "customer service",
      "email": "info@aramesh-coffee.com",
      "availableLanguage": ["fa", "en"]
    }
  };

  return (
    <>
      <Navbar  />
      <BreadCrumb route={"تماس با ما"} />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className={styles.container}>
        <h1 className={styles.mainTitle}>تماس با فروشگاه قهوه آرامش</h1>
        <p className={styles.introText}>ما 24 ساعته آماده پاسخگویی به سوالات شما درباره قهوه‌های اسپشیالیتی هستیم</p>
        
        <main className={styles.maps}>
          <section>
            <Map
              position={[35.7975, 51.4230]}
              center={[35.7975, 51.4230]}
            >
              <span> فروشگاه ما</span>
              <h2>آدرس فروشگاه حضوری آرامش (شعبه یک)</h2>
              <p>
                شعبه (یک) - تهران ، خیابان فرشته ، جنب پاساژ فرشته ، طبقه دوم
              </p>
              <p>
                <a href="tel:+982111111122" className={styles.phoneLink}>021-11111122</a>
              </p>
              <Link href="/about-us" className={styles.aboutLink}>درباره فروشگاه</Link>
            </Map>
          </section>
          <section>
            <Map
              position={[36.3060, 59.5600]}
              center={[36.3060, 59.5600]}
            >
              <span> فروشگاه ما</span>
              <h2>آدرس فروشگاه حضوری آرامش (شعبه دو)</h2>
              <p>
                شعبه دو - مشهد ، روبروی پارک ملت ، خیابان گلشن ، نبش کوچه گلشن هشتم
              </p>
              <p>
                <a href="tel:+985137121154" className={styles.phoneLink}>051-37121154</a>
              </p>
              <Link href="/about-us" className={styles.aboutLink}>درباره فروشگاه</Link>
            </Map>
          </section>
        </main>
      </div>
      
      <div className={styles.container}>
        <div className={styles.contents}>
          <Form />
          <Information />
        </div>
      </div>

      <Footer />
    </>
  )
}