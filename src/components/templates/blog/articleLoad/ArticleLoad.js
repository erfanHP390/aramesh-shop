"use client";
import Card from "@/components/modules/blogs/card/Card";
import styles from "@/styles/articles.module.css";
import { useState } from "react";

function ArticleLoad({blogs}) {

  console.log(blogs);
  

  const [visibleArticles, setVisibleArticles] = useState(6);
  const articlesToShow = blogs.slice(0, visibleArticles);

  const loadMore = () => {
    setVisibleArticles(prev => prev + 3);
  };

  return (
    <div className={styles.articlesWrapper}>
      <div className={styles.articlesGrid}>
        {articlesToShow.map((article) => (
          <Card key={article._id} {...article} />
        ))}
      </div>
      
      {visibleArticles < blogs.length && (
        <div className={styles.buttonContainer}>
          <button className={styles.loadMoreBtn} onClick={loadMore}>
            نمایش مقالات بیشتر
          </button>
        </div>
      )}
    </div>
  );
}

export default ArticleLoad;