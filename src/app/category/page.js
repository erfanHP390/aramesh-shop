import React from "react";
import styles from "@/styles/category.module.css";
import BreadCrumb from "@/components/modules/breadcrumb/BreadCrumb";
import Navbar from "@/components/modules/navbar/Navbar";
import Footer from "@/components/modules/Footer/Footer";
import Products from "@/components/templates/category/products/Products";
import Filtering from "@/components/templates/category/filtering/Filtering";
import connectToDB from "@/configs/db";
import { authAdmin, authUser } from "@/utils/authUserLink";

async function page() {
  connectToDB()
  const user = await authUser()
  const admin = await authAdmin()

  return (
    <>
      <Navbar isLogin={user ? true : false}  isAdmin={admin ? true : false}  />
      <BreadCrumb route={'فروشگاه'} />
      <main className={styles.container} data-aos="fade-up">
        <div className={styles.category}>
          <Filtering />
          <Products />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default page;