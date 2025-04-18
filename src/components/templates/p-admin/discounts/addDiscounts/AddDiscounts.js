"use client";
import { useRouter } from "next/navigation";
import styles from "./AddDiscounts.module.css";
import { useState } from "react";
import { swalAlert, toastError, toastSuccess } from "@/utils/helpers";

function AddDiscounts() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [percent, setPercent] = useState("");
  const [maxUse, setMaxUse] = useState("");

  const addCodeDiscount = async () => {
    if (!code || !percent || !maxUse) {
      swalAlert("لطفا تمامی موارد لازم را پر کنید", "error", "فهمیدم");
    }

    const newDiscount = {
      code,
      percent,
      maxUse,
    };

    const res = await fetch("/api/discount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDiscount),
    });

    console.log(res);

    if (res.status === 201) {
      setCode("");
      setMaxUse("");
      setPercent("");
      toastSuccess(
        "کد تحفیف با موفقیت ایجاد شد",
        "top-center",
        5000,
        false,
        true,
        true,
        true,
        undefined,
        "colored"
      );
      router.refresh();
    } else if (res.status === 401) {
      toastError(
        "فقط ادمین/مدیر سایت اجازه ساخت کد تخفیف را دارد",
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
        "لطفا تمامی موارد را پرکنید",
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
    <section className={styles.discount}>
      <p>افزودن کد تخفیف جدید</p>
      <div className={styles.discount_main}>
        <div>
          <label>شناسه تخفیف</label>
          <input
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="لطفا شناسه تخفیف را وارد کنید"
            type="text"
          />
        </div>
        <div>
          <label>درصد تخفیف</label>
          <input
            value={percent}
            onChange={(event) => setPercent(event.target.value)}
            placeholder="لطفا درصد تخفیف را وارد کنید"
            type="text"
          />
        </div>
        <div>
          <label>حداکثر استفاده</label>
          <input
            value={maxUse}
            onChange={(event) => setMaxUse(event.target.value)}
            placeholder="حداکثر استفاده از کد تخفیف"
            type="text"
          />
        </div>
        <div>
          <label>محصول</label>
          <select name="" id="">
            <option value="">قهوه ترک</option>
            <option value="">قهوه عربیکا</option>
            <option value="">قهوه اسپرسو</option>
          </select>
        </div>
      </div>
      <button onClick={() => addCodeDiscount()}>افزودن</button>
    </section>
  );
}

export default AddDiscounts;
