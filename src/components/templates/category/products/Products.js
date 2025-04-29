"use client";
import { useState, useEffect } from "react";
import styles from "./products.module.css";
import { MdOutlineGridView } from "react-icons/md";
import { BiSolidGrid } from "react-icons/bi";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import Product from "@/components/modules/product/Product";

function Products() {
  const [columns, setColumns] = useState(3);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className={styles.products}>
      <div className={styles.filtering}>
        <div className={styles.view}>
          <TfiLayoutGrid4Alt className={columns === 4 ? styles.active : ""} onClick={() => setColumns(4)} />
          <BiSolidGrid className={columns === 3 ? styles.active : ""} onClick={() => setColumns(3)} />
          <MdOutlineGridView className={columns === 2 ? styles.active : ""} onClick={() => setColumns(2)} />
        </div>
        <select name="orderby">
          <option value="default">مرتب‌سازی پیش‌فرض</option>
          <option value="popularity">مرتب‌سازی بر اساس محبوبیت</option>
          <option value="rating">مرتب‌سازی بر اساس امتیاز</option>
          <option value="last_products">مرتب‌سازی بر اساس آخرین</option>
          <option value="Inexpensive">مرتب‌سازی بر اساس ارزانترین</option>
          <option value="expensive">مرتب‌سازی بر اساس گرانترین</option>
        </select>
      </div>

      <main className={styles.main} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: 12 }).map((_, index) => (
          <Product key={index} />
        ))}
      </main>
    </div>
  );
}

export default Products;