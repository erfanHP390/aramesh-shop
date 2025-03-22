"use client";
import React from "react";
import Select from "react-select";
import styles from "./Table.module.css";
import totalStyles from "./totals.module.css";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import stateData from "@/utils/stateData";
import Link from "next/link";

const stateOptions = stateData();

function Table() {
  const [cart, setCart] = useState([]);
  const [stateSelectedOption, setStateSelectedOption] = useState(null);
  const [changeAddress, setChangeAddress] = useState(false);

  useEffect(() => {
    const getCart = JSON.parse(localStorage.getItem("cart")) || [];

    setCart(getCart);
  }, []);

  const calcTotalPrice = () => {
    let totalPrice = 0;

    if (cart.length) {
      totalPrice = cart.reduce(
        (prev, current) => prev + current.price * current.count,
        0
      );
    }

    if (stateSelectedOption) {
      totalPrice = totalPrice + stateSelectedOption.price;
    }

    return totalPrice;
  };

  const calcProductPrice = () => {
    let productPrice = 0;

    if (cart.length) {
      productPrice = cart.reduce(
        (prev, current) => prev + current.price * current.count,
        0
      );
    }

    return productPrice;
  };

  return (
    <>
      {" "}
      <div className={styles.tabel_container}>
  <table className={styles.table}>
    <thead>
      <tr>
        <th>جمع جزء</th>
        <th>تعداد</th>
        <th>قیمت</th>
        <th>محصول</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {cart.map((item) => (
        <tr key={item.id}>
          <td>{(item.price * item.count).toLocaleString()} تومان</td>
          <td className={styles.counter}>
            <div>
              <span>-</span>
              <p>{item.count}</p>
              <span>+</span>
            </div>
          </td>
          <td className={styles.price}>{item.price.toLocaleString()} تومان</td>
          <td className={styles.product}>
            <img
              src="https://set-coffee.com/wp-content/uploads/2020/12/Red-box-DG--430x430.jpg"
              alt={item.name}
            />
            <Link href={`/product/${item.id}`}>{item.name}</Link>
          </td>
          <td>
            <IoMdClose className={styles.delete_icon} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <section>
    <button className={styles.update_btn}> بروزرسانی سبد خرید</button>
    <div className={styles.discount_container}>
      <input type="text" placeholder="کد تخفیف" />
      <button className={styles.set_off_btn}>اعمال کوپن</button>
    </div>
  </section>
</div>
      <div className={totalStyles.totals}>
        <p className={totalStyles.totals_title}>جمع کل سبد خرید</p>

        <div className={totalStyles.subtotal}>
          <p>جمع کالاهای خریداری شده </p>
          <p>{calcProductPrice().toLocaleString()} تومان</p>
        </div>

        {stateSelectedOption && (
          <p className={totalStyles.motor}>
            {" "}
            پیک موتوری: <strong>{stateSelectedOption.price} تومان</strong>
          </p>
        )}

        <div className={totalStyles.address}>
          <p>حمل و نقل </p>
        </div>
        <p
          onClick={() => setChangeAddress((prev) => !prev)}
          className={totalStyles.change_address}
        >
          تغییر آدرس
        </p>
        {changeAddress && (
  <div className={totalStyles.address_details}>
<Select
  defaultValue={stateSelectedOption}
  onChange={setStateSelectedOption}
  isClearable={true}
  placeholder={"استان"}
  isRtl={true}
  isSearchable={true}
  options={stateOptions}
  styles={{
    control: (base) => ({
      ...base,
      border: "1px solid rgba(0, 0, 0, 0.1)",
      borderRadius: "5px",
      padding: "0.5rem",
      direction: "rtl",
      textAlign: "right",
      backgroundColor: "#D2B48C", // بژ روشن
      color: "#000000", // سیاه
      fontSize: "14px", // فونت کوچک‌تر
      minWidth: "200px", // حداقل عرض
      width: "100%", // عرض کامل
    }),
    menu: (base) => ({
      ...base,
      direction: "rtl",
      textAlign: "right",
      backgroundColor: "#D2B48C", // بژ روشن
      color: "#000000", // سیاه
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isFocused ? "#CC5500" : isSelected ? "#A68A64" : "#D2B48C", // نارنجی گرم یا قهوه‌ای روشن
      color: isFocused || isSelected ? "#FFFFFF" : "#000000", // سفید یا سیاه
      fontSize: "14px", // فونت کوچک‌تر
    }),
    singleValue: (base) => ({
      ...base,
      color: "#000000", // سیاه
    }),
    placeholder: (base) => ({
      ...base,
      color: "#777", // خاکستری
    }),
  }}
/>
    <input type="text" placeholder="شهر" />
    <input type="text" placeholder="کد پستی" />
    <button onClick={() => setChangeAddress(false)}>بروزرسانی</button>
  </div>
)}

        <div className={totalStyles.total}>
          <p>مجموع</p>
          <p>{calcTotalPrice().toLocaleString()} تومان</p>
        </div>
        <Link href={"/checkout"}>
          <button className={totalStyles.checkout_btn}>
            ادامه جهت تسویه حساب
          </button>
        </Link>
      </div>
    </>
  );
}

export default Table;
