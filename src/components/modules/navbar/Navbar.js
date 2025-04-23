"use client";
import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaShoppingCart, FaRegHeart, FaBars, FaTimes } from "react-icons/fa";


export default function Navbar({ isLogin, whishList, isAdmin }) {
    
  const [isOpen, setIsOpen] = useState(false);
  const [isShowDropMobile, setIsShowDropMobile] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItemsCount(cart.length);
    };

    updateCartCount();

    const handleStorageChange = () => {
      updateCartCount();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

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
            <Link href="/blogs">وبلاگ</Link>
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
                  {isAdmin && (
                    <>
                      {" "}
                      <Link href="/p-admin">پنل مدیریت</Link>
                      <hr />
                    </>
                  )}
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
            <span>{cartItemsCount}</span>
          </Link>
          <Link href="/wishlist">
            <FaRegHeart />
            <span>{whishList}</span>
          </Link>
          {/* آیکون همبرگر منو (فقط در موبایل و زمانی که سایدبار بسته است) */}
          {!isOpen && (
            <div className={styles.menu_icon} onClick={toggleMenu}>
              <FaBars />
            </div>
          )}
        </div>

        {/* بقیه کدهای منو موبایل بدون تغییر */}
      </main>
    </nav>
  );
}
