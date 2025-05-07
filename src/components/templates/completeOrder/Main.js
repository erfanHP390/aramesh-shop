"use client";
import { swalAlert } from "@/utils/helpers";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "@/styles/completeOrder.module.css";
import Loading from "@/app/loading";

function Main() {
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState("");
  const localOrder = JSON.parse(localStorage.getItem("order"));

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!localOrder?.code) {
          return swalAlert(
            "سفارشی برای شما ثبت نشده است لطفا سفارش خود را ثبت کنید",
            "error",
            "فهمیدم"
          );
        }

        const res = await fetch(`/api/orders/${localOrder.code}`);
        const data = await res.json();
        setOrder(data);
      } catch {
        console.log(err);
      }
    };

    fetchOrder();
  }, []);


  return (
    <>
      {!isLoading ? (
        <>
          {" "}
          <main className={styles.container} data-aos="fade-left">
            <div className={styles.box}>
              <h2 className={styles.title}>تکمیل سفارش</h2>
              <ul className={styles.orderDetails}>
                <li>
                  شماره سفارش: <span>{order.orderCode}</span>
                </li>
                <li>
                  تاریخ:{" "}
                  <span>
                    {new Date(order.createdAt).toLocaleDateString("fa-IR")}
                  </span>
                </li>
                <li>
                  {" "}
                  قیمت نهایی:{" "}
                  <strong>
                    {" "}
                    {order.totalPrice?.toLocaleString()} تومان
                  </strong>{" "}
                </li>
                <li>
                  روش پرداخت:{" "}
                  <span>{localOrder.mellat ? "بانک ملت" : "زرین پال"}</span>
                </li>
              </ul>
              <div className={styles.buttons}>
                <button className={styles.payButton}>پرداخت</button>
                <Link href={"/checkout"}>
                  <button className={styles.backButton}> بازگشت</button>
                </Link>
              </div>
            </div>
          </main>
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
}

export default Main;
