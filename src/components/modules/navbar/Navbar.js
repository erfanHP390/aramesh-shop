"use client";
import React, { useState } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaShoppingCart, FaRegHeart, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar({isLogin}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isShowDropMobile, setIsShowDropMobile] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <main>
        {/* لوگو (در همه سایزها نمایش داده می‌شود) */}
        <div className={styles.logo_container}>
          <Link href="/">
            <h1 className={styles.logo}>فروشگاه آرامش</h1>
          </Link>
        </div>

        {/* منو در حالت دسکتاپ (853px و بزرگتر) */}
        <ul className={styles.desktop_links}>
          <li>
            <Link href="/">صفحه اصلی</Link>
          </li>
          <li>
            <Link href="/category">فروشگاه</Link>
          </li>
          <li>
            <Link href="/blog">وبلاگ</Link>
          </li>
          <li>
            <Link href="/contact-us">تماس با ما</Link>
          </li>
          <li>
            <Link href="/about-us">درباره ما</Link>
          </li>
          <li>
            <Link href="/rules">قوانین</Link>
          </li>
          <li>
            <Link
              href="https://website-coffee-shop.vercel.app/"
              target="_blank"
            >
              کافی شاپ ما
            </Link>
          </li>
          {isLogin ? (
             <>
              {" "}
              <div className={styles.dropdown}>
                <div className={styles.dropdown_header}>
                  حساب کاربری
                  <IoIosArrowDown className={styles.dropdown_icons} />
                </div>
                <div className={styles.dropdown_content}>
                  <Link href="/p-user/orders">سفارشات</Link>
                  <Link href="/p-user/tickets">تیکت های پشتیبانی</Link>
                  <Link href="/p-user/comments">کامنت‌ها</Link>
                  <Link href="/p-user/wishlist">علاقه‌مندی‌ها</Link>
                  <Link href="/p-user/account-details">جزئیات اکانت</Link>
                </div>
              </div>
            </> 
           ) : ( 
            <>
              <li>
                <Link href="/login&register">ورود/عضویت</Link>
              </li>
            </>
           )} 
        </ul>

        {/* آیکون‌ها (سبد خرید و علاقه‌مندی‌ها) */}
        <div className={styles.navbar_icons}>
          <Link href="/cart">
            <FaShoppingCart />
            <span>1</span>
          </Link>
          <Link href="/wishlist">
            <FaRegHeart />
            <span>1</span>
          </Link>
          {/* آیکون همبرگر منو (فقط در موبایل و زمانی که سایدبار بسته است) */}
          {!isOpen && (
            <div className={styles.menu_icon} onClick={toggleMenu}>
              <FaBars />
            </div>
          )}
        </div>

        {/* منو در حالت موبایل (سایدبار) */}
        <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
          {/* آیکون ضربدر در سایدبار */}
          <div className={styles.close_icon} onClick={toggleMenu}>
            <FaTimes />
          </div>
          {/* لینک‌ها در سایدبار */}
          <div className={styles.sidebar_content}>
            <ul className={styles.mobile_links}>
              <li>
                <Link href="/">صفحه اصلی</Link>
              </li>
              <li>
                <Link href="/category">فروشگاه</Link>
              </li>
              <li>
                <Link href="/blog">وبلاگ</Link>
              </li>
              <li>
                <Link href="/contact-us">تماس با ما</Link>
              </li>
              <li>
                <Link href="/about-us">درباره ما</Link>
              </li>
              <li>
                <Link href="/rules">قوانین</Link>
              </li>
              <li>
                <Link
                  href="https://website-coffee-shop.vercel.app/"
                  target="_blank"
                >
                  کافی شاپ ما
                </Link>
              </li>
              <li>
                <Link href="/login&register">ورود/عضویت</Link>
              </li>
              {/* بخش dropdown در موبایل */}
              <li className={styles.mobile_dropdown}>
                <div className={styles.dropdown_header_mobile}>
                  <p
                    onClick={() => {
                      setIsShowDropMobile(true);
                    }}
                  >
                    حساب کاربری
                  </p>
                  {isShowDropMobile ? (
                    <IoIosArrowUp onClick={() => setIsShowDropMobile(false)} />
                  ) : (
                    <IoIosArrowDown onClick={() => setIsShowDropMobile(true)} />
                  )}
                </div>
                <div
                  className={styles.dropdown_content_mobile}
                  style={{ display: `${isShowDropMobile ? "block" : "none"}` }}
                >
                  <Link
                    className={styles.dropdown_content_mobile_link}
                    href="/p-user/orders"
                  >
                    سفارشات
                  </Link>
                  <Link
                    className={styles.dropdown_content_mobile_link}
                    href="/p-user/tickets"
                  >
                    تیکت های پشتیبانی
                  </Link>
                  <Link
                    className={styles.dropdown_content_mobile_link}
                    href="/p-user/comments"
                  >
                    کامنت‌ها
                  </Link>
                  <Link
                    className={styles.dropdown_content_mobile_link}
                    href="/p-user/wishlist"
                  >
                    علاقه‌مندی‌ها
                  </Link>
                  <Link
                    className={styles.dropdown_content_mobile_link}
                    href="/p-user/account-details"
                  >
                    جزئیات اکانت
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </nav>
  );
}
