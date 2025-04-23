"use client";
import connectToDB from "@/configs/db";
import { swalAlert, toastError, toastSuccess } from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";

export default function AddToWishList({productID}) {

  const [user , setUser] = useState("")
  const [isLoading , setIsLoading] = useState(false)

  connectToDB()

  useEffect(() => {
    const authUser = async () => {
      const res = await fetch("/api/auth/me");
      console.log(res);
      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
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
      product: productID,
    };

    const res = await fetch("/api/whishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wish),
    });

    
    if (res.status === 201) {
      setIsLoading(false)
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
      setIsLoading(false)
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
      setIsLoading(false)
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
      setIsLoading(false)
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
      setIsLoading(false)
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


  return (
    <div onClick={() => {
      setIsLoading(true)
      addToWishlist(event)
    }}>
      <CiHeart />
      <a href="/" >افزودن به علاقه مندی ها</a>
    </div>
  );
}
