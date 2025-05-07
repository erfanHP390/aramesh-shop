"use client";
import React, { useState } from "react";
import styles from "@/styles/forgetPassword.module.css";
import Link from "next/link";
import { swalAlert, toastError, toastSuccess } from "@/utils/helpers";
import { validatePhone } from "@/utils/auth";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

function SendPhone() {
  const [identifier, setIdentifier] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const resetPassword = async () => {
    if (!identifier) {
      return swalAlert(
        "لطفا شماره تلفن یا ایمیل خود را وارد نمایید",
        "error",
        "فهمیدم"
      );
    }

    const isValidPhone = validatePhone(identifier);
    // const isValidEmail = validateEmail(identifier)

    if (isValidPhone) {
      const res = await fetch("/api/auth/forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: identifier }),
      });

      if (res.status === 200) {
        setIsLoading(false);
        toastSuccess(
          "رمز عبور با موفقیت ارسال شد ، لطفا در اولین فرصت برای تغییر رمز عبور اقدام فرمایید",
          "top-center",
          5000,
          false,
          true,
          true,
          true,
          undefined,
          "colored"
        );
        router.replace("/login&register");
      } else if (res.status === 400) {
        setIsLoading(false);
        toastError(
          "لطفا شماره تلفن یا ایمیل خود را وارد نمایید",
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
          "لطفا یک شماره تلفن یاایمیل معتبر وارد نمایید",
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
          "شماره تلفن/ایمیل مسدود است.لطفا یک شماره تلفن/ایمیل دیگر وارد نمایید",
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
        setIsLoading(false);
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
    }
    // else if (isValidEmail) {
    //   //codes
    // }
    else {
      return swalAlert(
        "لطفا شماره تلفن یا ایمیل معتبر وارد نمایید",
        "error",
        "فهمیدم"
      );
    }
  };

  return (
    <div className={styles.forgot_password}>
      <div data-aos="fade-up" className={styles.bg}>
        <div className={styles.form}>
          <input
            className={styles.input}
            type="text"
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            placeholder="ایمیل / شماره موبایل"
          />
          <button
            style={{ marginTop: "1rem" }}
            className={styles.btn}
            onClick={() => {
              setIsLoading(true);
              resetPassword();
            }}
          >
            {isLoading ? <Loading /> : "بازنشانی رمزعبور"}
          </button>
          <Link href={"/login&register"} className={styles.back_to_login}>
            برگشت به ورود
          </Link>
        </div>
        <Link href={"/login&register"} className={styles.redirect_to_home}>
          لغو
        </Link>
      </div>
      <section>
        <img
          src="https://neurosciencenews.com/files/2023/06/coffee-brain-caffeine-neuroscincces.jpg"
          alt=""
        />
      </section>
    </div>
  );
}

export default SendPhone;
