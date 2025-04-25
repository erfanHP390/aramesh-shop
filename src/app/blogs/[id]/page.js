import BreadCrumb from "@/components/modules/breadcrumb/BreadCrumb";
import Footer from "@/components/modules/Footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import CommentArticle from "@/components/templates/blog/commentArticle/CommentArticle";
import DetailsArticle from "@/components/templates/blog/detailsArticle/DetailsArticle";
import styles from "@/styles/article.module.css";
import BlogModel from "@/models/Blog";
import connectToDB from "@/configs/db";
import { authUser } from "@/utils/authUserLink";

export async function generateMetadata({ params }) {
  connectToDB();
  const blog = await BlogModel.findOne({ _id: params.id }).lean();

  return {
    title: `${blog.title} | وبلاگ تخصصی قهوه آرامش`,
    description:
      blog.shortDescription ||
      `${blog.title} - مقاله تخصصی درباره قهوه و روش‌های دم‌آوری از فروشگاه آرامش`,
    keywords: [
      blog.title,
      "قهوه اسپشیالیتی",
      "آموزش دم‌آوری قهوه",
      ...(blog.tags || []),
      "وبلاگ تخصصی قهوه",
    ],
    openGraph: {
      title: `${blog.title} | آرامش`,
      description: blog.shortDescription || `مقاله تخصصی درباره ${blog.title}`,
      url: `https://aramesh-coffee.com/blog/${params.id}`,
      type: "article",
      images: [
        {
          url:
            blog.image || "https://aramesh-coffee.com/images/blog-default.jpg",
          width: 800,
          height: 600,
          alt: blog.title,
        },
      ],
      publishedTime: blog.createdAt.toISOString(),
      modifiedTime: blog.updatedAt.toISOString(),
      authors: ["تیم آرامش"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${blog.title} | آرامش`,
      description: blog.shortDescription || `مقاله تخصصی درباره ${blog.title}`,
      images: [
        blog.image || "https://aramesh-coffee.com/images/blog-twitter.jpg",
      ],
    },
    alternates: {
      canonical: `https://aramesh-coffee.com/blog/${params.id}`,
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
    other: {
      "article:published_time": blog.createdAt.toISOString(),
      "article:modified_time": blog.updatedAt.toISOString(),
      "article:author": "تیم آرامش",
      "article:section": "قهوه و کافی شاپ",
      "article:tag": blog.tags?.join(", ") || "قهوه, دم‌آوری قهوه",
    },
  };
}

async function page({ params }) {
  connectToDB();
  const id = params.id;
  const user = await authUser();
  const blog = await BlogModel.findOne({ _id: id }).populate("comments").lean();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.shortDescription,
    datePublished: blog.createdAt.toISOString(),
    dateModified: blog.updatedAt.toISOString(),
    author: {
      "@type": "Organization",
      name: "آرامش",
      url: "https://aramesh-coffee.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "آرامش",
      logo: {
        "@type": "ImageObject",
        url: "https://aramesh-coffee.com/logo.png",
      },
    },
    image: blog.image || "https://aramesh-coffee.com/images/blog-default.jpg",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://aramesh-coffee.com/blog/${params.id}`,
    },
    comment: blog.comments.map((comment) => ({
      "@type": "Comment",
      text: comment.text,
      author: {
        "@type": "Person",
        name: comment.user.name,
      },
      dateCreated: comment.createdAt.toISOString(),
    })),
  };

  return (
    <>
      <Navbar isLogin={user ? true : false} />
      <BreadCrumb route={"قهوه"} />
      <div className={styles.container}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <DetailsArticle blog={JSON.parse(JSON.stringify(blog))} />
        <CommentArticle
          comments={JSON.parse(JSON.stringify(blog.comments))}
          blogId={id}
        />
      </div>
      <Footer />
    </>
  );
}

export default page;
