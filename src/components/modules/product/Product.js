"use client";
import Link from "next/link";
import { FaRegStar, FaStar } from "react-icons/fa";
import { CiSearch, CiHeart } from "react-icons/ci";
import styles from "./Product.module.css";
import connectToDB from "@/configs/db";
import { swalAlert, toastError, toastSuccess } from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";

export default function Product({ _id, name, price, img, score, uses, stock }) {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  connectToDB();

  useEffect(() => {
    const authUser = async () => {
      const res = await fetch("/api/auth/me");
      if (res.status === 200) {
        const data = await res.json();
        setUser({ ...data });
      }
    };

    authUser();
  }, []);

  const addToWishlist = async (event) => {
    event.preventDefault();
    if (!user?._id) {
      return swalAlert(
        "برای اضافه کردن به علاقه مندی‌ها لطفا ابتدا لاگین بکنین",
        "error",
        "فهمیدم"
      );
    }

    const wish = {
      user: user._id,
      product: _id,
    };

    const res = await fetch("/api/whishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wish),
    });

    if (res.status === 201) {
      setIsLoading(false);
      toastSuccess(
        "محصول با موفقیت به علاقه مندی ها افزوده شد",
        "top-center",
        5000,
        false,
        true,
        true,
        true,
        undefined,
        "colored"
      );
    } else if (res.status === 400) {
      setIsLoading(false);
      toastError(
        "شناسه کاربر و محصول باید ارسال شود. به پشتیبانی تیکت بدهید",
        "top-center",
        5000,
        false,
        true,
        true,
        true,
        undefined,
        "colored"
      );
    } else if (res.status === 422) {
      setIsLoading(false);
      toastError(
        "شناسه کاربر/محصول نامعتبر است.لطفا در صورت مشکل به پشتیبانی پیام دهید",
        "top-center",
        5000,
        false,
        true,
        true,
        true,
        undefined,
        "colored"
      );
    } else if (res.status === 404) {
      setIsLoading(false);
      toastError(
        "کاربر/محصول یافت نشد.لطفا دوباره تلاش کنید",
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
      setIsLoading(false);
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
  };

  const addProductHandler = (cart) => {
    const cartItem = {
      id: _id,
      name: name,
      price: price,
      count,
    };

    cart.push(cartItem);

    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    swalAlert("محصول با موفقیت به سبد خرید اضافه شد", "success", "فهمیدم");
  };

  const addToCart = () => {
    if (typeof window === "undefined") return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length) {
      const isInCart = cart.some((item) => item.id === _id);

      if (isInCart) {
        cart.forEach((item) => {
          if (item.id === _id) {
            item.count = item.count + count;
          }
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        swalAlert("تعداد محصول با موفقیت به روزرسانی شد", "success", "فهمیدم");
      } else {
        addProductHandler(cart);
      }
    } else {
      addProductHandler(cart);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.details_container}>
        <img src={img} alt={name} />
        <div className={styles.icons}>
          <Link href={`/product/${_id}`}>
            <CiSearch />
            <p className={styles.tooltip}>مشاهده سریع</p>
          </Link>
          <div
            onClick={(event) => {
              setIsLoading(true);
              addToWishlist(event);
            }}
          >
            <CiHeart />
            <p className={styles.tooltip}>
              {isLoading ? <Loading /> : "افزودن به علاقه مندی ها"}
            </p>
          </div>
        </div>
        <button onClick={() => addToCart()}>افزودن به سبد خرید</button>
      </div>

      <div className={styles.details}>
        <Link href={`/product/${_id}`}>{name}</Link>
        <div>
          {new Array(score).fill(0).map((_, index) => (
            <FaStar key={index} style={{ color: "#FFD700" }} />
          ))}
          {new Array(5 - score).fill(0).map((_, index) => (
            <FaRegStar key={index} style={{ color: "#A68A64" }} />
          ))}
        </div>
        <span>{price?.toLocaleString()} تومان</span>
      </div>
    </div>
  );
}
