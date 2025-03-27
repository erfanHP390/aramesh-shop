import Card from "@/components/modules/blogs/card/Card";
import BreadCrumb from "@/components/modules/breadcrumb/BreadCrumb";
import Footer from "@/components/modules/Footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import ArticleLoad from "@/components/templates/blog/articleLoad/ArticleLoad";
import styles from "@/styles/articles.module.css";
import { authUser } from "@/utils/authUserLink";

async function page() {

  const user = await authUser()

  return (
    <>
      <Navbar isLogin={user ? true : false} />
      <BreadCrumb route={"اخبار و مقالات"} />
      <main className={styles.container}>
        <div className={styles.articles}>
          <ArticleLoad />
        </div>
      </main>

      <Footer />
    </>
  );
}

export default page;
