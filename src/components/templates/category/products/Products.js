"use client";
import { useState, useEffect } from "react";
import styles from "./products.module.css";
import btnStyles from "@/styles/articles.module.css"
import Product from "@/components/modules/product/Product";

function Products({products}) {


  const [visibleProducts, setVisibleProducts] = useState(6);
  const productsToShow = products.slice(0, visibleProducts);

  const loadMore = () => {
    setVisibleProducts(prev => prev + 3);
  };

  return (
    <>
        <div className={styles.products}>
      <div className={styles.filtering}>
        <select name="orderby">
          <option value="default">مرتب‌سازی پیش‌فرض</option>
          <option value="popularity">مرتب‌سازی بر اساس محبوبیت</option>
          <option value="rating">مرتب‌سازی بر اساس امتیاز</option>
          <option value="last_products">مرتب‌سازی بر اساس آخرین</option>
          <option value="Inexpensive">مرتب‌سازی بر اساس ارزانترین</option>
          <option value="expensive">مرتب‌سازی بر اساس گرانترین</option>
        </select>
      </div>

      <main className={styles.main}>
        {productsToShow.map((product) => (
          <Product key={product._id} {...product} />
        ))}
      </main>

      {visibleProducts < products.length && (
        <div className={btnStyles.buttonContainer}>
          <button className={btnStyles.loadMoreBtn} onClick={loadMore}>
            نمایش محصولات بیشتر
          </button>
        </div>
      )}
    </div>
    </>
  );
}

export default Products;