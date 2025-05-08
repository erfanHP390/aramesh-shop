"use client";
import { swalAlert } from "@/utils/helpers";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "@/styles/completeOrder.module.css";
import Loading from "@/app/loading";

function Main() {
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [localOrder, setLocalOrder] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedOrder = JSON.parse(localStorage.getItem("order"));
      setLocalOrder(storedOrder);
    }
  }, []);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!localOrder?.code) {
        return swalAlert(
          "سفارشی برای شما ثبت نشده است لطفا سفارش خود را ثبت کنید",
          "error",
          "فهمیدم"
        );
      }

      try {
        setIsLoading(true);
        const res = await fetch(`/api/orders/${localOrder.code}`);
        if (!res.ok) throw new Error("خطا در دریافت اطلاعات سفارش");
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        console.error(err);
        swalAlert("خطا در دریافت اطلاعات سفارش", "error", "باشه");
      } finally {
        setIsLoading(false);
      }
    };

    if (localOrder) fetchOrder();
  }, [localOrder]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <main className={styles.container} data-aos="fade-left">
          <div className={styles.box}>
            <h2 className={styles.title}>تکمیل سفارش</h2>
            {order ? (
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
                  قیمت نهایی:{" "}
                  <strong>{order.totalPrice?.toLocaleString()} تومان</strong>
                </li>
                <li>
                  روش پرداخت:{" "}
                  <span>{localOrder?.mellat ? "بانک ملت" : "زرین پال"}</span>
                </li>
              </ul>
            ) : (
              <p>اطلاعات سفارش یافت نشد.</p>
            )}
            <div className={styles.buttons}>
              <button className={styles.payButton}>پرداخت</button>
              <Link href={"/checkout"}>
                <button className={styles.backButton}> بازگشت</button>
              </Link>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default Main;
