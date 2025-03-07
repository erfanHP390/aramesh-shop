import { IoMdStar } from "react-icons/io";
import styles from "./CommentForm.module.css";
import { useState } from "react";
import { swalAlert, toastError, toastSuccess } from "@/utils/helpers";
import { validateEmail } from "@/utils/auth";

const CommentForm = ({ productID }) => {
  console.log(productID);
  

  const [username, setUserName] = useState("");
  const [body, setBody] = useState("");
  const [email, setEmail] = useState("");
  const [score, setScore] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log(score);
  

  const setCommentScore =  (score) => {
    setScore(score)
    swalAlert("امتیاز شما با موفقیتا ثبت شد" , "success" , "ادامه ثبت نظر")
  }

  

  const sendComment = async () => {
  

    if(!username || !!body || !email) {
      swalAlert("لطفا تمامی موارد * را پر کنید" , "error" , "فهمیدم")
    }

    const isValidEmail = validateEmail(email)
    if(!isValidEmail) {
      swalAlert("ایمیل نا معتبر است لطفا یک ایمیل معتبر وارد نمایید"  , "error" , "فهمیدم")
    }

    const newComment = {
      username,
      body,
      email,
      score,
      productID,
    };

    const res = await fetch("/api/comment" , {
        method: "POST",
        headers: {
            "Content-type" : "application/json"
        },
        body: JSON.stringify(newComment)
    });

    if(res.status === 201) {
        setUserName("")
        setEmail("")
        setBody("")
        setScore("")
        setIsLoading(false)
        toastSuccess(
            "نظر شما با موفیقت ثبت شد با تشکر از اینکه مار را در خدمات رسانی بهتر یاری با نضر پرمهرتان یاری می کنید😍",
            "top-center",
            5000,
            false,
            true,
            true,
            true,
            undefined,
            "colored"
          );
    } else if(res.status === 400) {
      setUserName("")
      setEmail("")
      setBody("")
      setScore("")
      setIsLoading(false)
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
    } else if(res.status === 422) {
      setUserName("")
      setEmail("")
      setBody("")
      setScore("")
      setIsLoading(false)
      toastError(
        "لطفا یک ایمیل معتبر را وارد کنید",
        "top-center",
        5000,
        false,
        true,
        true,
        true,
        undefined,
        "colored"
      );
    } else if(res.status === 500) {
      setUserName("")
      setEmail("")
      setBody("")
      setScore("")
      setIsLoading(false)
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
    <div className={styles.form}>
      <p className={styles.title}>دیدگاه خود را بنویسید</p>
      <p>
        نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند{" "}
        <span style={{ color: "red" }}>*</span>
      </p>
      <div className={styles.rate}>
        <p>امتیاز شما :</p>
        <div>
          <IoMdStar onClick={() => setCommentScore(5)}  className={score === 5 ? `${styles.active}` : null } />
          <IoMdStar onClick={() => setCommentScore(4)}  className={score === 4 ? `${styles.active}` : null } />
          <IoMdStar onClick={() => setCommentScore(3)}  className={score === 3 ? `${styles.active}` : null } />
          <IoMdStar onClick={() => setCommentScore(2)}  className={score === 2 ? `${styles.active}` : null } />
          <IoMdStar onClick={() => setCommentScore(1)}  className={score === 1 ? `${styles.active}` : null } />
        </div>
      </div>

      <div className={styles.groups}>
        <div className={styles.group}>
          <label htmlFor="">
            نام
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            value={username}
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>
        <div className={styles.group}>
          <label htmlFor="">
            ایمیل
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
      </div>
      <div className={styles.group}>
        <label htmlFor="">
          دیدگاه شما
          <span style={{ color: "red" }}>*</span>
        </label>
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          id="comment"
          name="comment"
          cols="45"
          rows="8"
          required=""
          placeholder=""
        ></textarea>
      </div>
      <div className={styles.checkbox}>
        <input type="checkbox" name="" id="" />
        <p>
          {" "}
          ذخیره نام، ایمیل و وبسایت من در مرورگر برای زمانی که دوباره دیدگاهی
          می‌نویسم.
        </p>
      </div>
      <button onClick={() => {
        setIsLoading(true)
        sendComment()
      }}>{
        isLoading ? "در حال ثبت ، لطفا منتظر باشید" : "ثبت"
      }</button>
    </div>
  );
};

export default CommentForm;
