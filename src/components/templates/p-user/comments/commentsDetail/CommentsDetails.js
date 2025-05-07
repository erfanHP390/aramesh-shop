"use client";
import React, { useState } from "react";
import styles from "@/components/templates/p-user/accountDetail/AccountDetail.module.css";
import { swalAlert, toastError, toastSuccess } from "@/utils/helpers";
import { validateEmail } from "@/utils/auth";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

function CommentsDetails({ comment }) {
  const router = useRouter();
  const [email, setEmail] = useState(comment.email);
  const [body, setBody] = useState(comment.body);
  const [score, setScore] = useState(comment.score);
  const [isLoading, setIsLoading] = useState(false);

  const updateComment = async () => {
    if (!email || !body || !score) {
      setIsLoading(false);
      return swalAlert("لطفا موارد را پر کنید", "error", "فهمیدم");
    }

    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      setIsLoading(false);
      return swalAlert("ایمیل نامعتبر است", "error", "فهمیدم");
    }

    const editComment = {
      email,
      body,
      score,
    };

    const res = await fetch(`/api/comment/${comment._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editComment),
    });

    if (res.status === 200) {
      setIsLoading(false);
      toastSuccess(
        "کامنت با موفقیت ویرایش شد",
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
      setIsLoading(false);
      toastError(
        "فقط ادمین/مدیر سایت ویرایش کامنت را دارد",
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
        "اطلاعات ارسالی ناقص است،پشتیبانی",
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
        "اطلاعات ارسالی نامعتبر است،پشتیبانی",
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
        "کامنت یافت نشد",
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
    <main>
      <div className={styles.details}>
        <div className={styles.details_main}>
          <section>
            <div>
              <label>ایمیل</label>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="لطفا ایمیل خود را وارد کنید"
                type="text"
              />
            </div>
            <div>
              <label>امتیاز</label>
              <input
                value={score}
                onChange={(event) => setScore(event.target.value)}
                type="number"
              />
            </div>
            <div>
              <label>متن پیام</label>
              <br />
              <textarea
                value={body}
                className={styles.formTextarea}
                onChange={(event) => setBody(event.target.value)}
                type="text"
              />
            </div>
          </section>
        </div>
        <button
          type="submit"
          className={styles.submit_btn}
          onClick={() => {
            setIsLoading(true);
            updateComment();
          }}
        >
          {isLoading ? <Loading /> : "ثبت ویرایش"}
        </button>
      </div>
    </main>
  );
}

export default CommentsDetails;
