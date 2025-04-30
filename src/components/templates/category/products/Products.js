"use client";
import { useState, useEffect } from "react";
import styles from "./products.module.css";
import Product from "@/components/modules/product/Product";

function Products({products}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
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
        {products.map((product) => (
          <Product key={product._id} {...product} />
        ))}
      </main>
    </div>
  );
}

export default Products;