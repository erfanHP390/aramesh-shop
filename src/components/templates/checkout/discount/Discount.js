"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/checkout.module.css";

function Discount() {
  const [showDiscountForm, setShowDiscountForm] = useState(false);
  const [priceCart, setPriceCart] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedData = localStorage.getItem("priceCart");
        if (storedData) {
          setPriceCart(JSON.parse(storedData));
        }
      } catch (error) {
        console.error("Error reading priceCart from localStorage:", error);
      }
    }
  }, []);

  return (
    <section className={styles.discount}>
      <div>
        <p>کد تخفیف دارید؟</p>
        <span onClick={() => setShowDiscountForm(true)}>
          برای نوشتن کد اینجا کلیک کنید
        </span>
      </div>
      {showDiscountForm && (
        <div className={styles.discount_container}>
          <p>اگر کد تخفیف دارید لطفا در باکس زیر بنویسید</p>
          <div>
            <input
              type="text"
              placeholder="کد تخفیف"
              value={priceCart?.appliedDiscount?.code || ""}
            />
            <button>اعمال کوپن</button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Discount;
