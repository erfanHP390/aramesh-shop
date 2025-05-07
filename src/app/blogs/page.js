import BreadCrumb from "@/components/modules/breadcrumb/BreadCrumb";
import Footer from "@/components/modules/Footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import ArticleLoad from "@/components/templates/blog/articleLoad/ArticleLoad";
import styles from "@/styles/articles.module.css";
import BlogModel from "@/models/Blog";
import connectToDB from "@/configs/db";
import { MdOutlineArticle } from "react-icons/md";

export const metadata = {
  title: "وبلاگ تخصصی قهوه | آرامش - مرجع تخصصی قهوه‌های اسپشیالیتی",
  description: `خرید آنلاین بهترین قهوه‌های اسپشیالیتی و تجهیزات کافی شاپی با قیمت مناسب | فروشگاه آرامش ارائه‌دهنده انواع دانه قهوه، قهوه ترک، اسپرسو و کپسول قهوه با ارسال سریع به سراسر ایران`,
  keywords: [
    "قهوه اسپشیالیتی",
    "خرید قهوه آنلاین",
    "قهوه مرغوب",
    "دانه قهوه",
    "کافی شاپ خانگی",
    "قهوه ترک",
    "اسپرسو",
    "لوازم کافی شاپ",
    "قهوه بدون کافئین",
    "آموزش دم‌آوری قهوه",
  ],
  openGraph: {
    title: "وبلاگ تخصصی قهوه | آرامش - مرجع قهوه‌های اسپشیالیتی",
    description:
      "تخصصی‌ترین مقالات درباره قهوه، روش‌های دم‌آوری و تجهیزات کافی شاپی",
    url: "https://aramesh-coffee.com/blog",
    type: "website",
    images: [
      {
        url: "https://aramesh-coffee.com/images/blog-og.jpg",
        width: 800,
        height: 600,
        alt: "وبلاگ تخصصی قهوه آرامش",
      },
    ],
    siteName: "آرامش - فروشگاه تخصصی قهوه",
    locale: "fa_IR",
  },
  twitter: {
    card: "summary_large_image",
    title: "وبلاگ تخصصی قهوه | آرامش",
    description: "تخصصی‌ترین مقالات درباره قهوه و روش‌های دم‌آوری",
    images: ["https://aramesh-coffee.com/images/blog-twitter.jpg"],
  },
  alternates: {
    canonical: "https://arامش-coffee.com/blog",
  },
  icons: {
    icon: "https://www.freeiconspng.com/uploads/coffee-bean-icon-9.png",
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
      url: "https://aramesh-coffee.com/about",
    },
  ],
  category: "قهوه و کافی شاپ",
  manifest: "https://aramesh-coffee.com/site.webmanifest",
};

async function page() {
  connectToDB();
  const blogs = await BlogModel.find({}, "-__v  -updatedAt").lean();

  return (
    <>
      <Navbar />
      <BreadCrumb route={"اخبار و مقالات"} />
      <main className={styles.container}>
        {blogs.length > 0 ? (
          <>
            {" "}
            <ArticleLoad blogs={JSON.parse(JSON.stringify(blogs))} />
          </>
        ) : (
          <>
            <EmptyCart
              icon={<MdOutlineArticle />}
              body={"بزودی مقاله های جذاب و علمی بارگزاری خواهند شد"}
              title={"مقاله ای وجود ندارد"}
              href={"/p-user/tickets/sendTicket"}
              textLink={"ارسال پیشنهادات"}
            />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default page;
