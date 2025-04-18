"use client";
import { swalAlert, toastError, toastSuccess } from "@/utils/helpers";
import styles from "./ProductWUser.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegStar, FaStar } from "react-icons/fa";

function ProductWUser({ name, price, score, productID, wishID, img }) {
  const router = useRouter();

  const removeProduct = () => {
    swal({
      title: "آیا از حذف محصول اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch(`/api/whishlist/${wishID}`, {
          method: "DELETE",
        });

        if (res.status === 200) {
          toastSuccess(
            "محصول با موفقیت از علاقه مندی شما حذف شد",
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
        }  else if (res.status === 400) {
          toastError(
            "شناسه محصول ارسال نشده است",
            "top-center",
            5000,
            false,
            true,
            true,
            true,
            undefined,
            "colored"
          );
        } else if (res.status === 401) {
          toastError(
            "احراز کاربر نامشخص است لطفا ابتدا وارد حساب خود شوید",
            "top-center",
            5000,
            false,
            true,
            true,
            true,
            undefined,
            "colored"
          );
          router.replace("/login&register");
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
    });
  };

  return (
    <div className={styles.card}>
      <Link href={"/"}>
        <img
          width={283}
          height={283}
          src={img}
          alt={name}
          style={{ width: "100%", height: "auto" }} /* ریسپانسیو کردن تصویر */
        />
      </Link>
      <p dir="rtl">{name}</p>
      <div>
        <div>
          {new Array(score).fill(0).map((item, index) => (
            <FaStar key={index} />
          ))}
          {new Array(5 - score).fill(0).map((item, index) => (
            <FaRegStar key={index} />
          ))}
        </div>
        <span>{price?.toLocaleString()} تومان</span>
      </div>
      <button onClick={() => removeProduct()} className={styles.delete_btn}>
        حذف محصول
      </button>
    </div>
  );
}

export default ProductWUser;
