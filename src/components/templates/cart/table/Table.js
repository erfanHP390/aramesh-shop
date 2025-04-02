"use client";
import React from "react";
import Select from "react-select";
import styles from "./Table.module.css";
import totalStyles from "./totals.module.css";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import stateData from "@/utils/stateData";
import Link from "next/link";
import { swalAlert, toastError, toastSuccess } from "@/utils/helpers";

const stateOptions = stateData();

function Table() {
  const [cart, setCart] = useState([]);
  const [discountInput, setDiscountInput] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [stateSelectedOption, setStateSelectedOption] = useState(null);
  const [changeAddress, setChangeAddress] = useState(false);
  const [citySelectedOption, setCitySelectedOption] = useState(null);
  const [citySelectorDisabel, setCitySelectorDisabel] = useState(true);
  const [cityOption, setCityOption] = useState([]);
  const [appliedDiscount, setAppliedDiscount] = useState(null);

  useEffect(() => {
    setCitySelectedOption(null);
    if (stateSelectedOption?.value) {
      const city = stateSelectedOption?.value.map((data) => ({
        value: data,
        label: data,
      }));
      setCityOption(city);
      setCitySelectorDisabel(false);
    }
  }, [stateSelectedOption]);

  const customStyles = {
    control: (base, { isFocused }) => ({
      ...base,
      backgroundColor: "#A68A64",
      borderColor: isFocused ? "#FFD700" : "rgba(255, 255, 255, 0.3)",
      borderWidth: "1px",
      borderRadius: "8px",
      minHeight: "48px",
      boxShadow: isFocused ? "0 0 0 1px #FFD700" : "none",
      "&:hover": {
        borderColor: "#FFD700",
      },
      cursor: "pointer",
      padding: "0 8px",
    }),
    placeholder: (base) => ({
      ...base,
      color: "rgba(255, 255, 255, 0.7)",
      fontSize: "0.95rem",
      textAlign: "right",
      direction: "rtl",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#FFFFFF",
      fontSize: "0.95rem",
      direction: "rtl",
      textAlign: "right",
    }),
    input: (base) => ({
      ...base,
      color: "#FFFFFF",
      direction: "rtl",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#6F4E37",
      border: "1px solid rgba(255, 215, 0, 0.2)",
      borderRadius: "8px",
      overflow: "hidden",
      marginTop: "4px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected
        ? "#CC5500"
        : isFocused
        ? "rgba(212, 181, 140, 0.3)"
        : "transparent",
      color: "#FFFFFF",
      fontSize: "0.9rem",
      padding: "12px 16px",
      direction: "rtl",
      textAlign: "right",
      "&:active": {
        backgroundColor: "#CC5500",
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "rgba(255, 255, 255, 0.7)",
      "&:hover": {
        color: "#FFD700",
      },
    }),
  };

  useEffect(() => {
    const getCart = JSON.parse(localStorage.getItem("cart")) || [];
    const getPriceCart = JSON.parse(localStorage.getItem("priceCart")) || {};

    setCart(getCart);
    
    if (getPriceCart.appliedDiscount) {
      setAppliedDiscount(getPriceCart.appliedDiscount);
    }
  }, []);

  const calcProductPrice = () => {
    let productsPrices = 0;

    if (cart.length) {
      productsPrices = cart.reduce(
        (prev, current) => prev + current.price * current.count,
        0
      );
    }

    setProductPrice(productsPrices);
  };

  const calcTotalPrice = () => {
    let price = productPrice;

    if (stateSelectedOption) {
      price = price + stateSelectedOption.price;
    }

    if (appliedDiscount) {
      price = price - (productPrice * appliedDiscount.percent) / 100;
    }

    setTotalPrice(price);
  };

  useEffect(() => {
    calcProductPrice();
  }, [cart]);

  useEffect(() => {
    calcTotalPrice();
  }, [productPrice, stateSelectedOption, appliedDiscount]);

  const discountHandler = async () => {
    if (!discountInput) {
      return swalAlert("لطفا کد تخفیف وارد کنید", "error", "فهمیدم");
    }

    const res = await fetch("/api/discount/use", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: discountInput }),
    });

    if (res.status === 200) {
      const discountCode = await res.json();
      const newDiscount = {
        code: discountInput,
        percent: discountCode.percent,
      };
      setAppliedDiscount(newDiscount);
      setDiscountInput("");
      
      // ذخیره در localStorage
      const priceCart = JSON.parse(localStorage.getItem("priceCart")) || {};
      localStorage.setItem("priceCart", JSON.stringify({
        ...priceCart,
        appliedDiscount: newDiscount
      }));

      toastSuccess(
        "کد تخفیف با موفقیت اعمال شد",
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
      toastError(
        "کد تخفیف وارد نشده است",
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
      toastError(
        "کد تخفیف منقضی شده است",
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
      toastError(
        "کد تخفیف یافت نشد",
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
  };

  const addPriceToLS = () => {
    const prices = {
      postPrice: stateSelectedOption?.price || 0,
      totalPrice,
      productPrice,
      province: stateSelectedOption?.label || "",
      city: citySelectedOption?.label || "",
      appliedDiscount,
    };

    localStorage.setItem("priceCart", JSON.stringify(prices));
  };

  const handleUpdateCart = () => {
    addPriceToLS();
    toastSuccess(
      "سبد خرید با موفقیت بروزرسانی شد",
      "top-center",
      3000,
      false,
      true,
      true,
      true,
      undefined,
      "colored"
    );
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
    setDiscountInput("");
    
    // حذف تخفیف از localStorage
    const priceCart = JSON.parse(localStorage.getItem("priceCart")) || {};
    delete priceCart.appliedDiscount;
    localStorage.setItem("priceCart", JSON.stringify(priceCart));
    
    toastSuccess(
      "تخفیف با موفقیت حذف شد",
      "top-center",
      3000,
      false,
      true,
      true,
      true,
      undefined,
      "colored"
    );
  };

  return (
    <>
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
                <td className={styles.price}>
                  {item.price.toLocaleString()} تومان
                </td>
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
          <button className={styles.update_btn} onClick={handleUpdateCart}>
            بروزرسانی سبد خرید
          </button>
          <div className={styles.discount_container}>
            <input
              type="text"
              placeholder="کد تخفیف"
              value={discountInput}
              onChange={(event) => setDiscountInput(event.target.value)}
            />
            {appliedDiscount ? (
              <button
                className={styles.remove_discount_btn}
                onClick={removeDiscount}
              >
                حذف تخفیف
              </button>
            ) : (
              <button
                className={styles.set_off_btn}
                onClick={discountHandler}
              >
                اعمال کوپن
              </button>
            )}
          </div>
        </section>
      </div>
      <div className={totalStyles.totals}>
        <p className={totalStyles.totals_title}>جمع کل سبد خرید</p>

        <div className={totalStyles.subtotal}>
          <p>جمع کالاهای خریداری شده </p>
          <p>{productPrice.toLocaleString()} تومان</p>
        </div>

        {stateSelectedOption && (
          <p className={totalStyles.motor}>
            پیک موتوری: <strong>{stateSelectedOption.price} تومان</strong>
          </p>
        )}

        {appliedDiscount && (
          <div className={totalStyles.discount}>
            <p>تخفیف ({appliedDiscount.code}): </p>
            <p>-{(productPrice * appliedDiscount.percent / 100).toLocaleString()} تومان</p>
          </div>
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
          <div className={styles.groups}>
            <div className={styles.group}>
              <label className={styles.select_label}>
                استان<span>*</span>
              </label>
              <Select
                defaultValue={stateSelectedOption}
                onChange={setStateSelectedOption}
                isClearable={true}
                placeholder="انتخاب استان"
                isRtl={true}
                isSearchable={true}
                options={stateOptions}
                styles={customStyles}
                noOptionsMessage={() => "استانی یافت نشد"}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>
            
            <div className={styles.group}>
              <label className={styles.select_label}>
                شهر<span>*</span>
              </label>
              <Select
                defaultValue={citySelectedOption}
                onChange={setCitySelectedOption}
                isDisabled={citySelectorDisabel}
                isClearable={true}
                isRtl={true}
                isSearchable={true}
                options={cityOption}
                placeholder={citySelectorDisabel ? "ابتدا استان را انتخاب کنید" : "انتخاب شهر"}
                styles={customStyles}
                noOptionsMessage={() => "شهری یافت نشد"}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>
            <button className={totalStyles.checkout_btn} onClick={handleUpdateCart}>
              بروزرسانی سبد خرید
            </button>
          </div>
        )}

        <div className={totalStyles.total}>
          <p>مجموع</p>
          <p>{totalPrice.toLocaleString()} تومان</p>
        </div>
        <Link href={"/checkout"}>
          <button
            className={totalStyles.checkout_btn}
            onClick={() => addPriceToLS()}
          >
            ادامه جهت تسویه حساب
          </button>
        </Link>
      </div>
    </>
  );
}

export default Table;