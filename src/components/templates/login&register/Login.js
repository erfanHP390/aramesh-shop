"use client";
import React, { useState } from "react";
import styles from "./login.module.css";
import Sms from "./Sms";
import Link from "next/link";
import { swalAlert, toastSuccess , toastError } from "@/utils/helpers";
import { validateEmail, validatePassword } from "@/utils/auth";

const Login = ({ showRegisterForm }) => {
  const [isLoginWithOtp, setIsLoginWithOtp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

    const isValidPassword = validatePassword(password);
    if (!isValidPassword) {
      return swalAlert("ایمیل یا پسورد اشتباه است", "error", "تلاش مجدد");
    }

    const user = { email, password };

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
      setIsLoading("");
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
    } else if (res.status === 419) {
      setEmail("");
      setPassword("");
      setIsLoading("");
      toastError(
        "ایمیل / رمز عبور نامعنبر است",
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
      setEmail("");
      setPassword("");
      setIsLoading("");
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
    } else if (res.status === 401) {
      setEmail("");
      setPassword("");
      setIsLoading("");
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
    }
  };

  const hideOtpForm = () => setIsLoginWithOtp(false);

  return (
    <>
      {isLoginWithOtp ? (
        <Sms hideOtpForm={hideOtpForm} />
      ) : (
        <>
          <div className={styles.form}>
            <input
              className={styles.input}
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="ایمیل/شماره موبایل"
            />
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="رمز عبور"
            />
            <div className={styles.checkbox}>
              <input type="checkbox" name="" id="" />
              <p>مرا به یاد داشته باش</p>
            </div>
            <button
              className={styles.btn}
              onClick={() => {
                setIsLoading(true);
                loginWithPassword();
              }}
            >
              {isLoading ? "در حال بررسی" : "ورود"}
            </button>
            <Link href={"/forgetPassword"} className={styles.forgot_pass}>
              رمز عبور را فراموش کرده اید؟
            </Link>
            <button
              onClick={() => setIsLoginWithOtp(true)}
              className={styles.btn}
            >
              ورود با کد یکبار مصرف
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
