"use client";
import Card from "@/components/modules/blogs/card/Card";
import styles from "@/styles/articles.module.css";
import { useState } from "react";

function ArticleLoad() {

    const [visibleArticles, setVisibleArticles] = useState(6); // تعداد اولیه مقالات نمایش داده شده
    // const articlesToShow = allArticles.slice(0, visibleArticles);
  
    const loadMore = () => {
      setVisibleArticles(prev => prev + 3); // هر بار 3 مقاله بیشتر نمایش داده می‌شود
    };

  return (
    <>
      <div className={styles.articles}>
        {/* {articlesToShow.map((article) => ( */}
          <Card
            // key={article.id}
            // title={article.title}
            // description={article.desc}
          />
        {/* // ))} */}
      </div>

      {/* {visibleArticles < allArticles.length && ( */}
        <button className={styles.loadMoreBtn} onClick={loadMore}>
          نمایش مقالات بیشتر
        </button>
      {/* )} */}
    </>
  );
}

export default ArticleLoad;
