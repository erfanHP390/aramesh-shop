"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./OrdersDetails.module.css";
import { swalAlert, toastError, toastSuccess } from "@/utils/helpers";
import { validateEmail, validatePassword, validatePhone } from "@/utils/auth";
import Loading from "@/app/loading";

function OrdersDetails() {
  const [createAccount, setCreateAccount] = useState(false);
  const [priceCart, setPriceCart] = useState([]);
  const router = useRouter();
  const [showZarinPallAlert, setShowZarinPallAlert] = useState(false);
  const [showMellatBank, setShowMellatBank] = useState(false);
  const [cart, setCart] = useState([]);
  const [isReadRoles, setIsReadRoles] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let userOrder = null;
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [postCode, setPostCode] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [postPrice, setPostPrice] = useState("");
  const [basket, setBasket] = useState([]);
  const [products, setProducts] = useState([]);
  const [orderCode, setOrderCode] = useState(
    Math.floor(Math.random() * 999999)
  );
  const [password, setPassword] = useState("");

  useEffect(() => {
    const getPricesCart = JSON.parse(localStorage.getItem("priceCart")) || [];
    const getCart = JSON.parse(localStorage.getItem("cart")) || [];

    const productsID = getCart.map((item) => item.id);

    setPriceCart(getPricesCart);
    setProvince(getPricesCart.province);
    setCity(getPricesCart.city);
    setTotalPrice(getPricesCart.totalPrice);
    setPostPrice(getPricesCart.postPrice);
    setBasket(getCart);
    setProducts(productsID);
  }, []);

  useEffect(() => {
    const getCart = JSON.parse(localStorage.getItem("cart")) || [];
    const getPricesCart = JSON.parse(localStorage.getItem("priceCart")) || [];

    setPriceCart(getPricesCart);

    setCart(getCart);
  }, []);

  const addOrder = async () => {
    if (!showZarinPallAlert && !showMellatBank) {
      return swalAlert("لطفا شیوه پرداخت خود را تعیین کنید", "error", "فهمیدم");
    }

    if (!isReadRoles) {
      return swalAlert(
        "لطفا شرایط و مقررات سایت را مطالعه فرمایید",
        "error",
        "فهمیدم"
      );
    }

    const isValidPhone = validatePhone(mobile);
    if (!isValidPhone) {
      setIsLoading(false);
      return swalAlert("لطفا یک شماره تلفن معتبر وارد کنید", "error", "فهمیدم");
    }

    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      setIsLoading(false);
      return swalAlert("لطفا یک ایمیل معتبر وارد کنید", "error", "فهمیم");
    }

    const newOrder = {
      firstName: firstname,
      lastName: lastname,
      company,
      province,
      city,
      address,
      postCode,
      mobile,
      email,
      description,
      totalPrice,
      postPrice,
      basket,
      products,
      orderCode,
      isPay: false,
    };

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    });

    if (res.status === 201) {
      if (showZarinPallAlert) {
        userOrder = {
          code: orderCode,
          ZarinPall: showZarinPallAlert,
          mellat: showMellatBank,
          price: totalPrice,
        };

        localStorage.setItem("order", JSON.stringify(userOrder));
      } else if (showMellatBank) {
        userOrder = {
          code: orderCode,
          ZarinPall: showZarinPallAlert,
          mellat: showMellatBank,
          price: totalPrice,
        };

        localStorage.setItem("order", JSON.stringify(userOrder));
      }

      setIsLoading(false);
      setShowZarinPallAlert(false);
      setShowMellatBank(false);
      setCart([]);
      setIsReadRoles(false);
      setIsLoading(false);
      setFirstName("");
      setLastName("");
      setCompany("");
      setProvince("");
      setCity("");
      setAddress("");
      setPostCode("");
      setMobile("");
      setEmail("");
      setDescription("");
      setTotalPrice("");
      setPostPrice("");
      setBasket("");
      setProducts("");
      setOrderCode("");

      toastSuccess(
        "سفارش شما با موفقیت ثبت شده و در انتظار پرداخت است",
        "top-center",
        5000,
        false,
        true,
        true,
        true,
        undefined,
        "colored"
      );
      router.replace("/completeOrder");
    } else if (res.status === 400) {
      setIsLoading(false);
      toastError(
        "لطفا همه موارد * را پر نمایید . در صورت بروز مشکل به پشتیبانی پیام دهید",
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
        "شماره تلفن یا ایمیل نامعتبر است لطفا یک شماره تلفن/ایمیل معتبر وارد نمایید",
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

  const registerUser = async () => {
    if (!firstname || !lastname || !mobile || !email || !password) {
      setIsLoading(false);
      return swalAlert(
        "لطفا نام ، نام خانوادگی ، شماره تماس ، ایمیل یا رمزعبور خود را وراد نمایی",
        "error",
        "فهمیدم"
      );
    }

    const isValidPhone = validatePhone(mobile);
    if (!isValidPhone) {
      setIsLoading(false);
      return swalAlert("لطفا یک شماره تلفن معتبر وارد کنید", "error", "فهمیدم");
    }

    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      setIsLoading(false);
      return swalAlert("لطفا یک ایمیل معتبر وارد کنید", "error", "فهمیم");
    }

    const isValidPassword = validatePassword(password);
    if (!isValidPassword) {
      setIsLoading(false);
      return swalAlert("لطفا یک رمز عبور معتبر وارد نمایید", "error", "فهمیدم");
    }

    const newUser = {
      name: `${firstname}-${lastname}`,
      phone: mobile,
      email,
      password,
    };

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (res.status === 201) {
      setIsLoading(false);
      toastSuccess(
        "ثبت نام با موفقیت انجام شد",
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
        "لطفا موارد زیر را جهت تشکیل حساب تکمیل فرمایید ، نام ، نام خانوادگی ، شماره تماس ، ایمیل و رمزعبور",
        "top-center",
        5000,
        false,
        true,
        true,
        true,
        undefined,
        "colored"
      );
    } else if (res.status === 403) {
      setIsLoading(false);
      toastError(
        "ایمیل/شماره تلفن وارد شده مسدود می باشد.لطفا مورد جدیدی وارد نمایید",
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
        "نام/شماره تلفن / ایمیل شما قبلا ثبت شده است لطفا دوباره اقدام کنید",
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
      setIsLoading(false);
      toastError(
        "شماره تماس / ایمیل باید فرمت معتبری داشته باشد ، پسورد باید حداقل از هشت کاراکتر حرف بزرگ ،نماد و عدد تشکیل شده باشد",
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

  return (
    <>
      <div className={styles.order}>
        <p className={styles.title}>سفارش شما</p>
        <main className={styles.main}>
          <div>
            <p>جمع جزء</p>
            <p>محصول</p>
          </div>
          {cart.map((item) => (
            <div className={styles.cart_item} key={item.id}>
              <div className={styles.price_row}>
                <span className={styles.item_price}>
                  {item.price.toLocaleString()}
                </span>
                <span className={styles.currency}>تومان</span>
              </div>
              <p className={styles.product_name}>
                {item.name} × {item.count}
              </p>
            </div>
          ))}
          <div>
            <p> {priceCart?.productPrice?.toLocaleString()} تومان</p>
            <p>جمع کل محصولات</p>
          </div>
          <div>
            <p>
              پیک موتوری:{" "}
              <strong> {priceCart?.postPrice?.toLocaleString()} تومان</strong>
            </p>
            <p>حمل و نقل</p>
          </div>
          <div>
            <div>
              <h2>{priceCart?.totalPrice?.toLocaleString()} تومان</h2>
              <p>
                (شامل <strong>16,927</strong> تومان ارزش افزوده)
              </p>
            </div>
            <h3>مجموع</h3>
          </div>
        </main>
        <div className={styles.transaction}>
          <div>
            <input
              onClick={() => {
                setShowZarinPallAlert(false);
                setShowMellatBank(true);
              }}
              type="radio"
              name="payment_method"
              value={showMellatBank}
            />
            <label> بانک ملی</label>
            <img
              width={24}
              height={40}
              src="https://set-coffee.com/wp-content/plugins/WooCommerce-melli/images/logo.png"
              alt="بانک ملی"
            ></img>
          </div>
          <div>
            <input
              onClick={() => {
                setShowMellatBank(false);
                setShowZarinPallAlert(true);
              }}
              type="radio"
              name="payment_method"
              value="zarinpal"
            />
            <label>پرداخت امن زرین پال </label>
            <img
              width={40}
              height={40}
              src="https://set-coffee.com/wp-content/plugins/zarinpal-woocommerce-payment-gateway/assets/images/logo.png"
              alt="زرین پال"
            ></img>
          </div>
          {showZarinPallAlert && (
            <div className={styles.paymentBox}>
              <p>
                پرداخت امن به وسیله کلیه کارت های عضو شتاب از طریق درگاه زرین
                پال
              </p>
            </div>
          )}
          <div className={styles.warning}>
            <p>
              اطلاعات شخصی شما برای پردازش سفارش و پشتیبانی از تجربه شما در این
              وبسایت و برای اهداف دیگری که در{" "}
              <strong>سیاست حفظ حریم خصوصی</strong> توضیح داده شده است استفاده
              می‌شود.
            </p>
          </div>
          <div className={styles.accept_rules}>
            <input
              value={isReadRoles}
              onChange={() => setIsReadRoles((prevValue) => !prevValue)}
              type="checkbox"
              name=""
              id=""
            />
            <p>
              {" "}
              من<strong> شرایط و مقررات</strong> سایت را خوانده ام و آن را می
              پذیرم. <span>*</span>
            </p>
          </div>
          <div>
            <button
              onClick={() => {
                setIsLoading(true);
                addOrder();
              }}
              className={styles.submit}
            >
              {isLoading ? <Loading /> : "ثبت سفارش"}
            </button>
          </div>
        </div>
      </div>
      {/* ================================================ */}
      <div className={styles.details}>
        <p className={styles.details_title}>جزئیات صورتحساب</p>
        <form className={styles.form}>
          <div className={styles.groups}>
            <div className={styles.group}>
              <label className={styles.input_label}>
                کد سفارش <span>*</span>
              </label>
              <input
                value={orderCode}
                type="text"
                disabled
                className={styles.form_input}
              />
            </div>
          </div>
          <div className={styles.groups}>
            <div className={styles.group}>
              <label className={styles.input_label}>
                نام خانوادگی <span>*</span>
              </label>
              <input
                value={lastname}
                onChange={(event) => setLastName(event.target.value)}
                type="text"
                placeholder="نام خانوادگی خود را وارد کنید"
                className={styles.form_input}
              />
            </div>

            <div className={styles.group}>
              <label className={styles.input_label}>
                نام <span>*</span>
              </label>
              <input
                value={firstname}
                onChange={(event) => setFirstName(event.target.value)}
                type="text"
                placeholder="نام خود را وارد کنید"
                className={styles.form_input}
              />
            </div>
          </div>

          <div className={styles.group}>
            <label className={styles.input_label}>نام شرکت (اختیاری)</label>
            <input
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              type="text"
              placeholder="نام شرکت (در صورت وجود)"
              className={styles.form_input}
            />
          </div>

          <div className={styles.groups}>
            <div className={styles.group}>
              <label className={styles.select_label}>
                شهر<span>*</span>
              </label>
              <input value={priceCart?.city} disabled />
            </div>

            <div className={styles.group}>
              <label className={styles.select_label}>
                استان<span>*</span>
              </label>
              <input value={priceCart?.province} disabled />
            </div>
          </div>

          <div className={styles.group}>
            <label className={styles.input_label}>
              آدرس خیابان<span>*</span>
            </label>
            <input
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              type="text"
              placeholder="آدرس کامل خود را وارد کنید"
              className={styles.form_input}
            />
          </div>

          <div className={styles.group}>
            <label className={styles.input_label}>
              کدپستی (بدون فاصله)<span>*</span>
            </label>
            <input
              value={postCode}
              onChange={(event) => setPostCode(event.target.value)}
              type="text"
              placeholder="کدپستی ۱۰ رقمی"
              className={styles.form_input}
            />
          </div>

          <div className={styles.group}>
            <label className={styles.input_label}>
              شماره موبایل <span>*</span>
            </label>
            <input
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
              type="tel"
              placeholder="۰۹۱۲۳۴۵۶۷۸۹"
              className={styles.form_input}
            />
          </div>

          <div className={styles.group}>
            <label className={styles.input_label}>
              ایمیل <span>*</span>
            </label>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="example@domain.com"
              className={styles.form_input}
            />
          </div>

          <div className={styles.create_account}>
            <div
              className={styles.account_toggle}
              onClick={() => setCreateAccount(!createAccount)}
            >
              <h5>ایجاد حساب کاربری</h5>
              <span>{createAccount ? "−" : "+"}</span>
            </div>

            {createAccount && (
              <section className={styles.account_section}>
                <div className={styles.group}>
                  <label className={styles.input_label}>رمزعبور</label>
                  <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type="password"
                    placeholder="رمز عبور "
                    className={styles.form_input}
                  />
                </div>
                <button
                  onClick={() => {
                    setIsLoading(true);
                    registerUser();
                  }}
                  type="button"
                  className={styles.verify_button}
                >
                  ایجاد حساب کاربری
                </button>
              </section>
            )}
          </div>

          <div className={styles.group}>
            <label className={styles.input_label}>
              توضیحات سفارش (اختیاری)
            </label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              cols="30"
              rows="5"
              placeholder="اگر توضیحی در مورد سفارش خود دارید در اینجا ثبت کنید"
              className={styles.form_textarea}
            ></textarea>
          </div>
        </form>
      </div>
    </>
  );
}

export default OrdersDetails;
