import { useState } from "react";
import styles from "./Register.module.css";
import Link from "next/link";
import Sms from "./Sms";
import "react-toastify/dist/ReactToastify.css";
import { toastSuccess, toastError, swalAlert } from "@/utils/helpers";
import { validatePhone, validateEmail, validatePassword } from "@/utils/auth";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

const Register = ({ showLoginForm }) => {
  const [registerWithPass, setRegisterWithPass] = useState(false);
  const [isRegisterWithOtp, setIsRegisterWithOtp] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOtp, setIsLoadingOtp] = useState(false);
  const router = useRouter();

  const hideOtpForm = () => setIsRegisterWithOtp(false);

  const signup = async () => {
    if (!name.trim()) {
      setIsLoading(false);
      return swalAlert("نام نمی تواند خالی باشد", "error", "تلاش مجدد");
    }

    const isValidPhone = validatePhone(phone);
    if (!isValidPhone) {
      setIsLoading(false);
      return swalAlert("شماره تماس  نامعتبر است", "error", "تلاش مجدد");
    }

    if (email) {
      const isValidEmail = validateEmail(email);

      if (!isValidEmail) {
        setIsLoading(false);
        return swalAlert("ایمیل نامعتبر است", "error", "تلاش مجدد");
      }
    }

    if (password) {
      const isValidPassword = validatePassword(password);

      if (!isValidPassword) {
        setIsLoading(false);
        return swalAlert(
          "رمز عبور نا معتبر است.رمز عبور باید شامل حداقل یک کاراکتر،یک حرف بزرگ و حرف کوچک و عدد باشد",
          "error",
          "تلاش مجدد"
        );
      }
    }

    const newUser = {
      name,
      phone,
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
      setName("");
      setPhone("");
      setEmail("");
      setPassword("");
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
      router.replace("/login&register");
    } else if (res.status === 422) {
      setName("");
      setPhone("");
      setEmail("");
      setPassword("");
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
    } else if (res.status === 403) {
      setName("");
      setPhone("");
      setEmail("");
      setPassword("");
      setIsLoading(false);
      toastError(
        "شماره تلفن / ایمیل مسدود است لطفا شماره تلفن / ایمیل دیگری وارد نمایید",
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
      setName("");
      setPhone("");
      setEmail("");
      setPassword("");
      setIsLoading(false);
      toastError(
        "شماره تلفن/ایمیل باید فرمت معتبر و رمزعبور حداقل از نماد و حرف بزرگ و کوچک و  نماد تشکیل شده باشد",
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
      setName("");
      setPhone("");
      setEmail("");
      setPassword("");
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

  const sendCode = async () => {
    if (!phone || !name) {
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

    const res = await fetch("/api/auth/sms/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone }),
    });

    if (res.status === 201) {
      setIsLoadingOtp(false);
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
      setIsRegisterWithOtp(true);
      // router.replace("/p-user")
    } else if (res.status === 400) {
      setIsLoadingOtp(false);
      setName("");
      setPhone("");
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
    } else if (res.status === 403) {
      setName("");
      setPhone("");
      setEmail("");
      setPassword("");
      setIsLoading(false);
      toastError(
        "شماره تلفن  مسدود است ،لطفا شماره تلفن  دیگری وارد نمایید",
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
      setIsLoadingOtp(false);
      setName("");
      setPhone("");
      toastError(
        "شماره تلفن نامعتبر است ",
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
      setName("");
      setPhone("");
      setIsLoadingOtp(false);
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
      {!isRegisterWithOtp ? (
        <>
          <div className={styles.form}>
            <input
              className={styles.input}
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="نام"
            />
            <input
              className={styles.input}
              type="text"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="شماره موبایل  "
            />
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="ایمیل (دلخواه)"
            />
            {registerWithPass && (
              <input
                className={styles.input}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="رمز عبور"
              />
            )}
            <p
              onClick={() => {
                setIsLoadingOtp(true);
                sendCode();
              }}
              style={{ marginTop: "1rem" }}
              className={styles.btn}
            >
              {isLoadingOtp ? <Loading /> : "ثبت نام با کد تایید"}
            </p>

            <button
              onClick={() => {
                if (registerWithPass) {
                  setIsLoading(true);
                  signup();
                } else {
                  setRegisterWithPass(true);
                }
              }}
              style={{ marginTop: ".7rem" }}
              className={styles.btn}
            >
              {isLoading ? <Loading /> : "ثبت نام با رمز عبور"}
            </button>
            <p onClick={showLoginForm} className={styles.back_to_login}>
              برگشت به ورود
            </p>
          </div>
          <Link href={"/"} className={styles.redirect_to_home}>
            لغو
          </Link>
        </>
      ) : (
        <>
          <Sms hideOtpForm={hideOtpForm} phone={phone} />
        </>
      )}
    </>
  );
};

export default Register;
