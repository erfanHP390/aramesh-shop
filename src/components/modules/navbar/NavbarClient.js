"use client";
import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaShoppingCart, FaRegHeart, FaBars, FaTimes } from "react-icons/fa";
import { toastError, toastSuccess } from "@/utils/helpers";
import { useRouter } from "next/navigation";

function NavbarClient({ isLogin, whishList, isAdmin, isCookies }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isShowDropMobile, setIsShowDropMobile] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const getSafeLocalStorage = (key, defaultValue) => {
    if (typeof window === "undefined") return defaultValue;
  
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return defaultValue;
    }
  };
  

  useEffect(() => {
    const refreshUser = async () => {
      const res = await fetch("/api/auth/refresh", {
        method: "POST",
      });

      const userData = await res.json();

      if (res.status === 200 && userData?.user?.refreshToken) {
        const refreshT = userData.user.refreshToken;

        const signinUser = await fetch("/api/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userRefreshToken: refreshT }),
        });

        if (signinUser.status === 200) {
          toastSuccess(
            "خوش آمدید 😊",
            "top-center",
            5000,
            false,
            true,
            true,
            true,
            undefined,
            "colored"
          );
          router.refresh();
        } else if (signinUser.status === 419) {
          toastError(
            "ایمیل / رمز عبور نامعنبر است",
            "top-center",
            5000,
            false,
            true,
            true,
            true,
            undefined,
            "colored"
          );
        } else if (signinUser.status === 404) {
          toastError(
            "کاربر یافت نشد",
            "top-center",
            5000,
            false,
            true,
            true,
            true,
            undefined,
            "colored"
          );
        } else if (signinUser.status === 401) {
          toastError(
            "ایمیل/رمزعبور صحیح نیست",
            "top-center",
            5000,
            false,
            true,
            true,
            true,
            undefined,
            "colored"
          );
        } else if (signinUser.status === 403) {
          toastError(
            "ایمیل مسدود است",
            "top-center",
            5000,
            false,
            true,
            true,
            true,
            undefined,
            "colored"
          );
        } else if (res.status === 500) {
          toastError(
            "خطا در سرور ، لطفا بعدا تلاش کنید",
            "top-center",
            5000,
            false,
            true,
            true,
            true,
            undefined,
            "colored"
          );
        }
      }
    };

    if (!isCookies) {
      refreshUser();
    }
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = getSafeLocalStorage("cart", []);
      setCartItemsCount(cart.length);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileDropdown = () => {
    setIsShowDropMobile(!isShowDropMobile);
  };

  return (
    <nav className={styles.navbar}>
      <main>
        <div className={styles.logo_container}>
          <Link href="/">
            <h1 className={styles.logo}>فروشگاه آرامش</h1>
          </Link>
        </div>

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
            <div className={styles.dropdown}>
              <div className={styles.dropdown_header}>
                حساب کاربری
                <IoIosArrowDown className={styles.dropdown_icons} />
              </div>
              <div className={styles.dropdown_content}>
                {isAdmin && (
                  <>
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
          ) : (
            <li>
              <Link href="/login&register">ورود/عضویت</Link>
            </li>
          )}
        </ul>

        <div className={styles.navbar_icons}>
          <Link href="/cart">
            <FaShoppingCart />
            <span>{cartItemsCount}</span>
          </Link>
          <Link href="/wishlist">
            <FaRegHeart />
            <span>{whishList}</span>
          </Link>
          <div className={styles.menu_icon} onClick={toggleMenu}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </main>

      {/* Sidebar for mobile */}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.close_icon} onClick={toggleMenu}>
          <FaTimes />
        </div>
        <div className={styles.sidebar_content}>
          <ul className={styles.mobile_links}>
            <li>
              <Link href="/" onClick={toggleMenu}>
                صفحه اصلی
              </Link>
            </li>
            <li>
              <Link href="/category" onClick={toggleMenu}>
                فروشگاه
              </Link>
            </li>
            <li>
              <Link href="/blogs" onClick={toggleMenu}>
                وبلاگ
              </Link>
            </li>
            <li>
              <Link href="/contact-us" onClick={toggleMenu}>
                تماس با ما
              </Link>
            </li>
            <li>
              <Link href="/about-us" onClick={toggleMenu}>
                درباره ما
              </Link>
            </li>
            <li>
              <Link href="/rules" onClick={toggleMenu}>
                قوانین
              </Link>
            </li>
            <li>
              <Link
                href="https://website-coffee-shop.vercel.app/"
                target="_blank"
                onClick={toggleMenu}
              >
                کافی شاپ ما
              </Link>
            </li>

            {isLogin ? (
              <>
                <li>
                  <div
                    className={styles.dropdown_header_mobile}
                    onClick={toggleMobileDropdown}
                  >
                    حساب کاربری
                    {isShowDropMobile ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </div>
                  {isShowDropMobile && (
                    <div className={styles.mobile_dropdown}>
                      {isAdmin && (
                        <>
                          <Link href="/p-admin" onClick={toggleMenu}>
                            پنل مدیریت
                          </Link>
                        </>
                      )}
                      <Link href="/p-user/orders" onClick={toggleMenu}>
                        سفارشات
                      </Link>
                      <Link href="/p-user/tickets" onClick={toggleMenu}>
                        تیکت های پشتیبانی
                      </Link>
                      <Link href="/p-user/comments" onClick={toggleMenu}>
                        کامنت‌ها
                      </Link>
                      <Link href="/p-user/wishlist" onClick={toggleMenu}>
                        علاقه‌مندی‌ها
                      </Link>
                      <Link href="/p-user/account-details" onClick={toggleMenu}>
                        جزئیات اکانت
                      </Link>
                    </div>
                  )}
                </li>
              </>
            ) : (
              <li>
                <Link href="/login&register" onClick={toggleMenu}>
                  ورود/عضویت
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className={styles.overlay} onClick={toggleMenu} />}
    </nav>
  );
}

export default NavbarClient;
