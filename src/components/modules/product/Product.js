"use client"
import Link from "next/link";
import { FaRegStar, FaStar } from "react-icons/fa";
import { CiSearch, CiHeart } from "react-icons/ci";
import styles from "./Product.module.css"
import connectToDB from "@/configs/db";
import { swalAlert } from "@/utils/helpers";
import React, { useEffect, useState } from "react";

export default function Product({_id ,name , price , img}) {

  const [user , setUser] = useState("")
  const [count, setCount] = useState(1);

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
      product: _id,
    };

    const res = await fetch("/api/whishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wish),
    });

    console.log("Response ->", res);

    if (res.status === 201) {
      swalAlert("محصول مورد نظر به علاقه‌مندی‌ها اضافه شد", "success", "فهمیدم");
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

    localStorage.setItem("cart", JSON.stringify(cart));
    swalAlert("محصول با موفقیت به سبد خرید اضافه شد", "success", "فهمیدم");
  };

  const addToCart = () => {
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
        <img
          src={img}
          alt=""
        />
        <div className={styles.icons}>
          <Link href={`/product/${_id}`}>
            <CiSearch />
            <p className={styles.tooltip}>مشاهده سریع</p>
          </Link>
          <div  onClick={addToWishlist}>
          <CiHeart />
          <p className={styles.tooltip}>افزودن به علاقه مندی ها </p>
          </div>
        </div>
        <button  onClick={() => addToCart()}>افزودن به سبد خرید</button>
      </div>

      <div className={styles.details}>
        <Link href={`/product/${_id}`}>
        {name}
        </Link>
        <div>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaRegStar />
          <FaRegStar />
        </div>
        <span>{price?.toLocaleString()} تومان</span>
      </div>
    </div>
  )
}
