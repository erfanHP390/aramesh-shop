import Link from "next/link";
import React from 'react'
import styles from "./Latest.module.css"
import { FaChevronLeft } from "react-icons/fa6";
import Product from "@/components/modules/product/Product";

export default function Latest({products}) {
  return (
    <div className={styles.container}>
      <section className={styles.title}>
        <div>
          <p>آخرین محصولات</p>
          <span>Latest products</span>
        </div>
        <Link className={styles.link_btn} href={"/category"}>
          مشاهده همه <FaChevronLeft />{" "}
        </Link>
      </section>
      <main data-aos="fade-up" className={styles.products}>
        {
          products.slice(0,4).map(product => (
            <Product key={product._id}  {...product} />
          ))
        }
      </main>
    </div>
  )
}
