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
import { TbShoppingCartX } from "react-icons/tb";
import { useRouter } from "next/navigation";

const stateOptions = stateData();

function Table() {
  const router = useRouter();
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

  // تابع ایمن برای خواندن از localStorage
  const getSafeLocalStorage = (key, defaultValue) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return defaultValue;
    }
  };

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

  // استایل‌های سفارشی برای Select (همان کد قبلی)
  const customStyles = {
    // ... (همان استایل‌های قبلی)
  };

  useEffect(() => {
    const getCart = getSafeLocalStorage("cart", []);
    const getPriceCart = getSafeLocalStorage("priceCart", {});

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

      const priceCart = getSafeLocalStorage("priceCart", {});
      localStorage.setItem(
        "priceCart",
        JSON.stringify({
          ...priceCart,
          appliedDiscount: newDiscount,
        })
      );

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
    swalAlert("سبد خرید با موفقیت بروزرسانی شد", "success", "فهمیدم");
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
    setDiscountInput("");

    const priceCart = getSafeLocalStorage("priceCart", {});
    delete priceCart.appliedDiscount;
    localStorage.setItem("priceCart", JSON.stringify(priceCart));

    swalAlert("کدتخفیف با موفقیت حذف شد", "success", "فهمیدم");
  };

  const removeProduct = (productId) => {
    swal({
      title: "آیا از حذف محصول از سبد خرید اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        const currentCart = getSafeLocalStorage("cart", []);
        const updatedCart = currentCart.filter((item) => item.id !== productId);

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCart(updatedCart);

        swalAlert("محصول از سبد خرید حذف شد", "success", "فهمیدم");
        router.refresh();
      }
    });
  };

  return (
    <>
      {cart.length > 0 ? (
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
                      <img src={item.img} alt={item.name} />
                      <Link href={`/product/${item.id}`}>{item.name}</Link>
                    </td>
                    <td>
                      <IoMdClose
                        className={styles.delete_icon}
                        onClick={() => removeProduct(item.id)}
                      />
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
            {/* ... (بقیه کدهای مربوط به جمع کل سبد خرید) */}
          </div>
        </>
      ) : (
        <div className={styles.cart_empty} data-aos="fade-up">
          <TbShoppingCartX />
          <p>سبد خرید شما در حال حاضر خالی است. </p>
          <span>
            قبل از تسویه حساب، باید چند محصول را به سبد خرید خود اضافه کنید.
          </span>
          <span>در صفحه "فروشگاه"، محصولات جالب زیادی خواهید یافت.</span>
          <div>
            <Link href="/category">بازگشت به فروشگاه</Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Table;
