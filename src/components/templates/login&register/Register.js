import { useState } from "react";
import styles from "./Register.module.css";
import Link from "next/link";
import Sms from "./Sms";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastSuccess, toastError ,  swalAlert} from "@/utils/helpers";
import { validatePhone , validateEmail ,validatePassword } from "@/utils/auth";

const Register = ({ showLoginForm }) => {
  const [registerWithPass, setRegisterWithPass] = useState(false);
  const [isRegisterWithOtp, setIsRegisterWithOtp] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const hideOtpForm = () => setIsRegisterWithOtp(false);

  const signup = async () => {

    if(!name.trim()) {
      setIsLoading(false)
      return swalAlert("نام نمی تواند خالی باشد" , "error" , "تلاش مجدد")
    }

    const isValidPhone = validatePhone(phone)
    if(!isValidPhone) {
      setIsLoading(false)
    return  swalAlert("شماره تماس  معتبر است" , "error" , "تلاش مجدد")
    }

    if(email) {
      const isValidEmail = validateEmail(email)

      if(!isValidEmail) {
        setIsLoading(false)
       return swalAlert("ایمیل نامعتبر است" , "error" , "تلاش مجدد")
      }
    }

    if(password) {
      const isValidPassword = validatePassword(password)
    
      if(!isValidPassword) {
        setIsLoading(false)
       return swalAlert("رمز عبور نا معتبر است.رمز عبور باید شامل حداقل یک کاراکتر،یک حرف بزرگ و حرف کوچک و عدد باشد" , "error" , "تلاش مجدد")
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

  return (
    <>
      {isRegisterWithOtp ? (
        <>
          <Sms hideOtpForm={hideOtpForm} />
        </>
      ) : (
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
              onClick={() => setIsRegisterWithOtp(true)}
              style={{ marginTop: "1rem" }}
              className={styles.btn}
            >
              ثبت نام با کد تایید
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
              {isLoading ? "لطفا صبر کنید..." : "ثبت نام با رمز عبور"}
            </button>
            <p onClick={showLoginForm} className={styles.back_to_login}>
              برگشت به ورود
            </p>
          </div>
          <Link href={"/"} className={styles.redirect_to_home}>
            لغو
          </Link>
        </>
      )}
    </>
  );
};

export default Register;
