"use client";
import React from "react";
import Select from "react-select";
import styles from "./Table.module.css";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import stateData from "@/utils/stateData";
import Link from "next/link";
import { swalAlert, toastError, toastSuccess } from "@/utils/helpers";
import { TbShoppingCartX } from "react-icons/tb";
import { useRouter } from "next/navigation";

const stateOptions = stateData();

function Table({ userID }) {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [discountInput, setDiscountInput] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [stateSelectedOption, setStateSelectedOption] = useState(null);
  const [changeAddress, setChangeAddress] = useState(false);
  const [citySelectedOption, setCitySelectedOption] = useState(null);
  const [citySelectorDisabled, setCitySelectorDisabled] = useState(true);
  const [cityOptions, setCityOptions] = useState([]);
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [postalCode, setPostalCode] = useState("");

  const getSafeLocalStorage = (key, defaultValue) => {
    if (typeof window === "undefined") return defaultValue;
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
      const cities = stateSelectedOption.value.map((cityName) => ({
        value: cityName,
        label: cityName,
        price: stateSelectedOption.price,
      }));
      setCityOptions(cities);
      setCitySelectorDisabled(false);
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
    const getCart = getSafeLocalStorage("cart", []);
    const getPriceCart = getSafeLocalStorage("priceCart", {});

    setCart(getCart);
    setPostalCode(getPriceCart.postalCode || "");

    // Load discount from localStorage if exists
    if (getPriceCart.appliedDiscount) {
      setAppliedDiscount({
        code: getPriceCart.appliedDiscount.code,
        percent: getPriceCart.appliedDiscount.percent,
      });
    }

    if (getPriceCart.province) {
      const selectedState = stateOptions.find(
        (state) => state.label === getPriceCart.province
      );
      if (selectedState) {
        setStateSelectedOption(selectedState);
      }
    }
    if (getPriceCart.city) {
      const selectedCity = {
        value: getPriceCart.city,
        label: getPriceCart.city,
        price: getPriceCart.postPrice,
      };
      setCitySelectedOption(selectedCity);
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

    const shippingPrice =
      citySelectedOption?.price || stateSelectedOption?.price || 0;
    price += shippingPrice;

    // Apply discount if exists
    if (appliedDiscount?.percent) {
      const discountAmount = (price * appliedDiscount.percent) / 100;
      price -= discountAmount;
    }

    setTotalPrice(price);
  };

  useEffect(() => {
    calcProductPrice();
  }, [cart]);

  useEffect(() => {
    calcTotalPrice();
  }, [productPrice, stateSelectedOption, citySelectedOption, appliedDiscount]);

  const discountHandler = async () => {
    if (!discountInput) {
      return swalAlert("لطفا کد تخفیف وارد کنید", "error", "فهمیدم");
    }

    if (!userID) {
      return swalAlert(
        "برای استفاده از کد تخفیف ابتدا وارد حساب خود شوید",
        "error",
        "فهمیدم"
      );
    }

    const res = await fetch("/api/discount/use", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: discountInput, userId: userID }),
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
    } else if (res.status === 419) {
      toastError(
        "امکان استفاده مجدد از کد تخفیف برای شما امکان پذیر نیست",
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
        "برای استفاده از کد تخفیف ابتدا وارد حساب خود شوید",
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
    if (typeof window === "undefined") return;

    const prices = {
      postPrice: citySelectedOption?.price || stateSelectedOption?.price || 0,
      totalPrice,
      productPrice,
      province: stateSelectedOption?.label || "",
      city: citySelectedOption?.label || "",
      appliedDiscount, // Save complete discount info
      postalCode,
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

    swalAlert("کد تخفیف با موفقیت حذف شد", "success", "فهمیدم");
    router.refresh();
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

  const updateProductCount = (productId, newCount) => {
    if (newCount < 1) return;

    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, count: newCount } : item
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className={styles.main_container}>
      {cart.length > 0 ? (
        <>
          <div className={styles.title}>
            <span>سبد خرید شما</span>
          </div>

          <div className={styles.table_container}>
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
                        <span
                          onClick={() =>
                            updateProductCount(item.id, item.count - 1)
                          }
                        >
                          -
                        </span>
                        <p>{item.count}</p>
                        <span
                          onClick={() =>
                            updateProductCount(item.id, item.count + 1)
                          }
                        >
                          +
                        </span>
                      </div>
                    </td>
                    <td className={styles.price}>
                      {item.price.toLocaleString()} تومان
                    </td>
                    <td className={styles.product}>
                      <Link href={`/product/${item.id}`}>{item.name}</Link>
                    </td>
                    <td>
                      <button
                        className={styles.delete_btn}
                        onClick={() => removeProduct(item.id)}
                      >
                        <IoMdClose />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.actions_section}>
            <div className={styles.discount_container}>
              <input
                type="text"
                placeholder="کد تخفیف"
                value={appliedDiscount ? appliedDiscount.code : discountInput}
                onChange={(event) => setDiscountInput(event.target.value)}
                className={styles.discount_input}
                disabled={!!appliedDiscount}
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
                  className={styles.apply_discount_btn}
                  onClick={discountHandler}
                >
                  اعمال کوپن
                </button>
              )}
            </div>
            <button className={styles.update_btn} onClick={handleUpdateCart}>
              بروزرسانی سبد خرید
            </button>
          </div>

          <div className={styles.totals}>
            <div className={styles.totals_wrapper}>
              <p className={styles.totals_title}>جمع کل سبد خرید</p>

              <div className={styles.subtotal}>
                <p>جمع جزء </p>
                <p>{productPrice.toLocaleString()} تومان</p>
              </div>

              <div className={styles.shipping_cost}>
                <p>هزینه ارسال: </p>
                <p>
                  {citySelectedOption?.price
                    ? citySelectedOption.price.toLocaleString()
                    : stateSelectedOption?.price
                    ? stateSelectedOption.price.toLocaleString()
                    : "0"}{" "}
                  تومان
                </p>
              </div>

              <div className={styles.address}>
                <p>حمل و نقل </p>
                <span>
                  {stateSelectedOption?.label
                    ? `حمل و نقل به ${stateSelectedOption.label}`
                    : "لطفا استان را انتخاب کنید"}
                  {citySelectedOption?.label
                    ? ` (${citySelectedOption.label})`
                    : ""}
                </span>
              </div>

              <div className={styles.change_address_container}>
                <button
                  onClick={() => setChangeAddress((prev) => !prev)}
                  className={styles.change_address}
                >
                  {changeAddress ? "بستن" : "تغییر آدرس"}
                </button>
              </div>

              {changeAddress && (
                <div className={styles.address_details}>
                  <div className={styles.select_wrapper}>
                    <Select
                      value={stateSelectedOption}
                      onChange={(selectedOption) => {
                        setStateSelectedOption(selectedOption);
                        setCitySelectedOption(null);
                      }}
                      options={stateOptions}
                      placeholder="انتخاب استان"
                      isRtl={true}
                      isSearchable={true}
                      styles={customStyles}
                      noOptionsMessage={() => "استانی یافت نشد"}
                      classNamePrefix="react-select"
                    />
                  </div>

                  <div className={styles.select_wrapper}>
                    <Select
                      value={citySelectedOption}
                      onChange={setCitySelectedOption}
                      options={cityOptions}
                      isDisabled={citySelectorDisabled}
                      placeholder={
                        citySelectorDisabled
                          ? "ابتدا استان را انتخاب کنید"
                          : "انتخاب شهر"
                      }
                      isRtl={true}
                      isSearchable={true}
                      styles={customStyles}
                      noOptionsMessage={() => "شهری یافت نشد"}
                      classNamePrefix="react-select"
                    />
                  </div>

                  <input
                    type="number"
                    placeholder="کد پستی"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className={styles.postal_code_input}
                  />

                  <button
                    onClick={() => {
                      addPriceToLS();
                      setChangeAddress(false);
                    }}
                    className={styles.update_address_btn}
                  >
                    بروزرسانی آدرس
                  </button>
                </div>
              )}

              {appliedDiscount?.percent && (
                <div className={styles.discount_applied}>
                  <p>تخفیف ({appliedDiscount.percent}٪):</p>
                  <p>
                    {Math.floor(
                      ((productPrice +
                        (citySelectedOption?.price ||
                          stateSelectedOption?.price ||
                          0)) *
                        appliedDiscount.percent) /
                        100
                    ).toLocaleString()}{" "}
                    تومان
                  </p>
                </div>
              )}

              <div className={styles.total}>
                <p>مبلغ نهایی:</p>
                <p>{Math.floor(totalPrice).toLocaleString()} تومان</p>
              </div>

              <div className={styles.checkout_btn_wrapper}>
                <Link href={"/checkout"}>
                  <button
                    className={styles.checkout_btn}
                    onClick={addPriceToLS}
                    disabled={!stateSelectedOption}
                  >
                    ادامه جهت تسویه حساب
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.cart_empty}>
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
    </div>
  );
}

export default Table;
