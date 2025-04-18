"use client"
import { useState } from "react";
import styles from "./Sms.module.css";
import { swalAlert, toastError, toastSuccess } from "@/utils/helpers";
import { validatePhone } from "@/utils/auth";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

const Sms = ({hideOtpForm , phone}) => {

  

  const router = useRouter()
  const [code , setCode] = useState("")
  const [isLoading , setIsLoading] = useState(false)

  const verifyCode = async () => {

    if(!phone || !code) {
      setIsLoading(false)
      return swalAlert("لطفا شماره تلفن  و کد یکبار مصرف ارسال شده را وارد نمایید" , "error" , "فهمیدم")
    }

    const isValidPhone = validatePhone(phone) 
    if(!isValidPhone) {
      setIsLoading(false)
      return swalAlert("شماره تفلن معتبر نیست" ,"error" , "فهمیدم")
    }

    const verifyOtp = {phone , code}

    const res = await fetch("/api/auth/sms/verify" , {
      method : "POST" ,
      headers : {
        "Content-Type" : "application/json" ,
      },
      body : JSON.stringify(verifyOtp)
    })


    if(res.status === 200) {
      setIsLoading(false)
      setCode("")
      toastSuccess(
        "خوش آمدید",
        "top-center",
        5000,
        false,
        true,
        true,
        true,
        undefined,
        "colored"
      );
      router.replace("/p-user")
    } else if (res.status === 400) {
      setIsLoading(false)
      setCode("")
      toastError(
        "شماره تلفن و کدیکبار مصرف ارسال شده خود را وارد نمایید سپس برای دریافت کد کلیک کنید",
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
      setIsLoading(false)
      setCode("")
      toastError(
        "شماره تلفن معتبر نیست",
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
      setIsLoading(false)
      setCode("")
      toastError(
        "شماره تلفن یا کد یافت نشد لطفا دوباره تلاش کنید",
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
      setIsLoading(false)
      setCode("")
      toastError(
        "این مشاره تلفن مسدود است ، لطفا دوباره تلاش کنید",
        "top-center",
        5000,
        false,
        true,
        true,
        true,
        undefined,
        "colored"
      );
    } else if (res.status === 410) {
      setIsLoading(false)
      setCode("")
      toastError(
        "کدیکبار مصرف شما منقضی شده است لطفا بر روی ارسال کد مجدد کلیک کنید",
        "top-center",
        5000,
        false,
        true,
        true,
        true,
        undefined,
        "colored"
      );
    } else if (res.status === 429) {
      setIsLoading(false)
      setCode("")
      toastError(
        "تلاش های شما به بیش از حد مجاز رسیده است لطفا دقایقی دیگر دوباره تلاش کنید",
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
      setIsLoading(false)
      setCode("")
      toastError(
        "کدیکبار مصرف صحیح نیست یا نامعتبر است",
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
      setIsLoading(false)
      setCode("")
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

  return (
    <>
      <div className={styles.form}>
        <p>کد تایید</p>
        <span className={styles.code_title}>
          لطفاً کد تأیید ارسال شده را تایپ کنید
        </span>
        <span className={styles.number}>{phone}</span>
        <input className={styles.input} type="text"  value={code} onChange={(event) => setCode(event.target.value)} />
        <button style={{ marginTop: "1rem" }} className={styles.btn}  onClick={() => {
          setIsLoading(true)
          verifyCode()
        }}>
          {
            isLoading ?  <Loading />: "ثبت کد تایید"
          }
        </button>
        <p className={styles.send_again_code}>ارسال مجدد کد یکبار مصرف</p>
      </div>
      <p  onClick={hideOtpForm} className={styles.redirect_to_home}>لغو</p>
    </>
  );
};

export default Sms;
