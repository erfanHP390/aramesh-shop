"use client";
import React, { useState } from "react";
import styles from "./Form.module.css";
import { swalAlert, toastError, toastSuccess } from "@/utils/helpers";
import { validateEmail, validatePhone } from "@/utils/auth";
import Loading from "@/app/loading";

export default function Form() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (event) => {
    event.preventDefault();

    if (!name || !email || !phone || !message) {
      setIsLoading(false);
      return swalAlert("لطفا تمامی موارد لازم را پر کنید", "error", "فهمیدم");
    }

    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      setIsLoading(false);
      return swalAlert("لطفا یک ایمیل معتبر وارد کنید", "error", "فهمیدم");
    }

    const isValidPhone = validatePhone(phone);
    if (!isValidPhone) {
      setIsLoading(false);
      return swalAlert("لطفا شماره تلفن معتبر وارد کنید", "error", "فهمیدم");
    }

    const newMessage = {
      name,
      email,
      company,
      phone,
      message,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMessage),
    });


    if (res.status === 201) {
      setCompany("");
      setEmail("");
      setName("");
      setPhone("");
      setMessage("");
      setIsLoading(false);
      toastSuccess(
        "درخواست شما با موفقیت ثبت شد ، بزودی به ان پاسخ خواهیم داد",
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
      setCompany("");
      setEmail("");
      setName("");
      setPhone("");
      setMessage("");
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
      setCompany("");
      setEmail("");
      setName("");
      setPhone("");
      setMessage("");
      setIsLoading(false);
      toastError(
        "ایمیل یا شماره تلفن وارد شده نا معتبر است",
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
      setUserName("");
      setEmail("");
      setBody("");
      setScore("");
      setIsLoading(false);
      toastError(
        "خطا در سرور ، لطفا چند دقیقه بعد دوباره تلاش کنید",
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
    <form className={styles.form}>
      <span>فرم تماس با ما</span>
      <p>برای تماس با ما می توانید فرم زیر را تکمیل کنید</p>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label>نام و نام خانوادگی</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className={styles.group}>
          <label>آدرس ایمیل</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
      </div>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label>شماره تماس</label>
          <input
            type="text"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
        <div className={styles.group}>
          <label>نام شرکت</label>
          <input
            type="text"
            placeholder="(اختیاری)"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
          />
        </div>
      </div>
      <div className={styles.group}>
        <label>درخواست شما</label>
        <textarea
          cols="30"
          rows="3"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        ></textarea>
      </div>
      <button
        type="button"
        onClick={(event) => {
          setIsLoading(true);
          sendMessage(event);
        }}
      >
        {isLoading ? <Loading /> : "ثبت"}
      </button>
    </form>
  );
}
