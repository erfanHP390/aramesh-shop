import Card from "@/components/modules/blogs/card/Card";
import BreadCrumb from "@/components/modules/breadcrumb/BreadCrumb";
import Footer from "@/components/modules/Footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import ArticleLoad from "@/components/templates/blog/articleLoad/ArticleLoad";
import styles from "@/styles/articles.module.css";
import { authUser } from "@/utils/authUserLink";
import BlogModel from "@/models/Blog"
import connectToDB from "@/configs/db";

async function page() {
  connectToDB()
  const user = await authUser()
  const blogs = await BlogModel.find({} , "-__v  -updatedAt").lean()

  return (
    <>
      <Navbar isLogin={user ? true : false} />
      <BreadCrumb route={"اخبار و مقالات"} />
      <main className={styles.container}>
        <ArticleLoad blogs={JSON.parse(JSON.stringify(blogs))} />
      </main>
      <Footer />
    </>
  );
}

export default page;