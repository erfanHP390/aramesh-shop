import { useState } from "react";
import styles from "./register.module.css";
import Link from "next/link";
import Sms from "./Sms";

const Register = ({ showLoginForm }) => {
  const [registerWithPass, setRegisterWithPass] = useState(false);
  const [isRegisterWithOtp, setIsRegisterWithOtp] = useState(false);

  const hideOtpForm = () => setIsRegisterWithOtp(false);

  return (
    <>
      {isRegisterWithOtp ? (
        <>
          <Sms hideOtpForm={hideOtpForm} />
        </>
      ) : (
        <>
          <div className={styles.form}>
            <input className={styles.input} type="text" placeholder="نام" />
            <input
              className={styles.input}
              type="text"
              placeholder="شماره موبایل  "
            />
            <input
              className={styles.input}
              type="email"
              placeholder="ایمیل (دلخواه)"
            />
            {registerWithPass && (
              <input
                className={styles.input}
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
            {registerWithPass ? (
              <></>
            ) : (
              <>
                <button
                  onClick={() => setRegisterWithPass(true)}
                  style={{ marginTop: ".7rem" }}
                  className={styles.btn}
                >
                  ثبت نام با رمزعبور
                </button>
              </>
            )}
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
