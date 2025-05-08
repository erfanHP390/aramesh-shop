"use client";
import React, { useEffect, useState } from "react";
import styles from "./login.module.css";
import Sms from "./Sms";
import Link from "next/link";
import { swalAlert, toastSuccess, toastError } from "@/utils/helpers";
import { validateEmail, validatePhone } from "@/utils/auth";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

const Login = ({ showRegisterForm }) => {
  const [isLoginWithOtp, setIsLoginWithOtp] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaveUserLoginInfo, setIsSaveUserLoginInfo] = useState(false);
  const [isLoadingOtp, setIsLoadingOtp] = useState(false);
  const [isShowInputPhone, setIsShowInputPhone] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getUserInfoLogin = JSON.parse(localStorage.getItem("userLogin"));
      if (getUserInfoLogin) {
        setEmail(getUserInfoLogin.email);
        setPassword(getUserInfoLogin.password);
      }
    }
  }, []);

  const loginWithPassword = async () => {
    if (!email) {
      return swalAlert(
        "لطفا شماره تماس یا ایمیل خود را وراد نمایید",
        "error",
        "تلاش مجدد"
      );
    }

    const isValidEmail = validateEmail(email);

    if (!isValidEmail) {
      return swalAlert("ایمیل وارد شده معتبر نیست", "error", "تلاش مجدد");
    }

    if (!password) {
      return swalAlert(
        "لطفا کلمه عبور خود را وراد نمایید",
        "error",
        "تلاش مجدد"
      );
    }

    const user = { email, password };

    if (isSaveUserLoginInfo) {
      localStorage.setItem("userLogin", JSON.stringify(user));
    }

    try {
      setIsLoading(true); // در هنگام ارسال درخواست بارگذاری نشان داده می‌شود
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (res.status === 200) {
        setEmail("");
        setPassword("");
        router.replace("/p-user");
        toastSuccess(
          "خوش آمدید 😊",
          "top-center",
          5000,
          false,
          true,
          true,
          true,
          undefined,
          "colored"
        );
      } else {
        handleErrorResponse(res.status); // تابع مدیریت خطا
      }
    } catch (err) {
      console.error(err);
      toastError(
        "خطا در ارتباط با سرور",
        "top-center",
        5000,
        false,
        true,
        true,
        true,
        undefined,
        "colored"
      );
    } finally {
      setIsLoading(false); // بارگذاری به پایان می‌رسد
    }
  };

  const handleErrorResponse = (status) => {
    switch (status) {
      case 419:
        toastError(
          "ایمیل / رمز عبور نامعتبر است",
          "top-center",
          5000,
          false,
          true,
          true,
          true,
          undefined,
          "colored"
        );
        break;
      case 404:
        toastError(
          "کاربر یافت نشد",
          "top-center",
          5000,
          false,
          true,
          true,
          true,
          undefined,
          "colored"
        );
        break;
      case 401:
        toastError(
          "ایمیل/رمزعبور صحیح نیست",
          "top-center",
          5000,
          false,
          true,
          true,
          true,
          undefined,
          "colored"
        );
        break;
      case 403:
        toastError(
          "ایمیل مسدود است",
          "top-center",
          5000,
          false,
          true,
          true,
          true,
          undefined,
          "colored"
        );
        break;
      case 500:
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
        break;
      default:
        toastError(
          "خطای غیرمنتظره",
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
    setEmail("");
    setPassword("");
  };

  const hideOtpForm = () => setIsLoginWithOtp(false);

  const sendCode = async () => {
    if (!phone) {
      setIsLoadingOtp(false);
      return swalAlert("نام و شماره تلفن خود را وارد کنید", "error", "فهمیدم");
    }

    const isValidPhone = validatePhone(phone);
    if (!isValidPhone) {
      setIsLoadingOtp(false);
      return swalAlert(
        "لطفا یک شماره تلفن معتبر وارد نمایید",
        "error",
        "فهمیدم"
      );
    }

    try {
      setIsLoadingOtp(true);
      const res = await fetch("/api/auth/sms/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });

      if (res.status === 201) {
        toastSuccess(
          "کد یکبارمصرف با موفقیت ارسال شد",
          "top-center",
          5000,
          false,
          true,
          true,
          true,
          undefined,
          "colored"
        );
        setIsLoginWithOtp(true);
      } else {
        handleOtpErrorResponse(res.status);
      }
    } catch (err) {
      console.error(err);
      setIsLoadingOtp(false);
      toastError(
        "خطا در ارسال کد",
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

  const handleOtpErrorResponse = (status) => {
    switch (status) {
      case 400:
        toastError(
          "شماره تلفن و نام خود را وارد نمایید سپس برای دریافت کد کلیک کنید",
          "top-center",
          5000,
          false,
          true,
          true,
          true,
          undefined,
          "colored"
        );
        break;
      case 422:
        toastError(
          "شماره تلفن نامعتبر است یا از قبل ثبت شده است",
          "top-center",
          5000,
          false,
          true,
          true,
          true,
          undefined,
          "colored"
        );
        break;
      case 500:
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
        break;
      default:
        toastError(
          "خطای غیرمنتظره در ارسال کد",
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
    setEmail(""); // اگر خطا در ارسال کد پیش بیاید، ایمیل پاک می‌شود
    setIsLoadingOtp(false);
  };

  return (
    <>
      {isLoginWithOtp ? (
        <Sms hideOtpForm={hideOtpForm} phone={phone} />
      ) : (
        <>
          <div className={styles.form}>
            {isShowInputPhone && (
              <input
                className={styles.input}
                type="text"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="شماره تلفن (جهت ورود با کد تایید)"
              />
            )}
            <input
              className={styles.input}
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="ایمیل"
            />
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="رمز عبور"
            />
            <div className={styles.checkbox}>
              <input
                type="checkbox"
                name=""
                id=""
                value={isSaveUserLoginInfo}
                onChange={(event) =>
                  setIsSaveUserLoginInfo((prevValue) => !prevValue)
                }
              />
              <p>مرا به یاد داشته باش</p>
            </div>
            <button
              className={styles.btn}
              onClick={() => {
                setIsLoading(true);
                loginWithPassword();
              }}
            >
              {isLoading ? <Loading /> : "ورود"}
            </button>
            <Link href={"/forgetPassword"} className={styles.forgot_pass}>
              رمز عبور را فراموش کرده اید؟
            </Link>
            <button
              onClick={() => {
                setIsShowInputPhone(true);
                if (isShowInputPhone) {
                  setIsLoadingOtp(true);
                  sendCode();
                }
              }}
              className={styles.btn}
            >
              {isLoadingOtp ? <Loading /> : "ورود با کد تایید"}
            </button>
            <span>ایا حساب کاربری ندارید؟</span>
            <button onClick={showRegisterForm} className={styles.btn_light}>
              ثبت نام
            </button>
          </div>
          <Link href={"/"} className={styles.redirect_to_home}>
            لغو
          </Link>
        </>
      )}
    </>
  );
};

export default Login;
