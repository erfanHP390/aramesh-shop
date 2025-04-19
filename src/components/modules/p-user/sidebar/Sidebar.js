"use client";

import styles from "./Sidebar.module.css";
import { ImReply } from "react-icons/im";
import { FaBlog, FaComments, FaHeart, FaHome, FaShoppingBag, FaUsers } from "react-icons/fa";
import { MdOutlineArticle, MdOutlineAttachMoney } from "react-icons/md";
import { MdSms, MdLogout } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import { TbListDetails } from "react-icons/tb";
import Link from "next/link";
import { swalAlert, toastError, toastSuccess } from "@/utils/helpers";


const Sidebar = ({name}) => {
  const router = useRouter()
  const path = usePathname();
  

  const logoutHandler = () => {
    swal({
      title: "آیا از خروج اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if(result) {

        const res = await fetch("/api/auth/signout" , {
          method: "POST"
        })

        if(res.status === 200) {
          toastSuccess(
            "با موفقیت خارج شدید",
            "top-center",
            5000,
            false,
            true,
            true,
            true,
            undefined,
            "colored"
          );
            router.replace("/")
        }

      }
    });
  };
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar_header}>
        <p>خوش اومدی {name} عزیز</p>
      </div>
      <ul className={styles.sidebar_main}>
        {path.includes("/p-user") ? (
          <>
            <Link href={"/p-user"} className={path.includes === ("/p-user") && styles.sidebar_link_active}>
              <ImReply />
              پیشخوان
            </Link>
            <Link href={"/p-user/orders"}  className={path.includes("/p-user/orders") && styles.sidebar_link_active} >
              <FaShoppingBag />
              سفارش ها
            </Link>
            <Link href={"/p-user/tickets"}  className={path.includes("/p-user/tickets") && styles.sidebar_link_active}>
              <MdSms />
              تیکت های پشتیبانی
            </Link>
            <Link href={"/p-user/comments"}  className={path.includes("/p-user/comments") && styles.sidebar_link_active}>
              <FaComments />
              کامنت ها
            </Link>
            <Link href={"/p-user/wishlist"}  className={path.includes("/p-user/wishlist") && styles.sidebar_link_active}>
              <FaHeart />
              علاقه مندی
            </Link>
            <Link href={"/p-user/account-details"} className={path.includes("/p-user/account-details") && styles.sidebar_link_active}>
              <TbListDetails />
              جزئیات اکانت
            </Link>
            <Link href={"/"}>
              <FaHome />
              بازگشت به صفحه اصلی
            </Link>
          </>
        ) : (
          <>
            <Link href={"/p-admin"} className={styles.sidebar_link_active}>
              <ImReply />
              پیشخوان
            </Link>

            <Link href={"/p-admin/products"}  className={path.includes("/p-admin/products") && styles.sidebar_link_active}>
              <FaShoppingBag />
              محصولات
            </Link>
            <Link href={"/p-admin/blogs"}  className={path.includes("/p-admin/blogs") && styles.sidebar_link_active}>
              <MdOutlineArticle /> 
              مقالات
            </Link>
            <Link href={"/p-admin/orders"}  className={path.includes("/p-admin/orders") && styles.sidebar_link_active}>
              <FaShoppingBag/> 
              سفارش ها
            </Link>
            <Link href={"/p-admin/users"} className={path.includes("/p-admin/users") && styles.sidebar_link_active} >
              <FaUsers />
              کاربران
            </Link>
            <Link href={"/p-admin/comments"}   className={path.includes("/p-admin/comments") && styles.sidebar_link_active}>
              <FaComments />
              کامنت ها
            </Link>

            <Link href={"/p-admin/tickets"}   className={path.includes("/p-admin/tickets") && styles.sidebar_link_active}>
              <MdSms />
              تیکت ها
            </Link>
            <Link href={"/p-admin/discount"}   className={path.includes("/p-admin/discount") && styles.sidebar_link_active}>
              <MdOutlineAttachMoney />
              تخفیفات
            </Link>
          </>
        )}
      </ul>
      <div className={styles.logout} onClick={logoutHandler}>
        <MdLogout />
        خروج
      </div>
    </aside>
  );
};

export default Sidebar;