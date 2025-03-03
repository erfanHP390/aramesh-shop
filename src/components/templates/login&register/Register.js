import { useState } from "react";
import styles from "./Register.module.css";
import Link from "next/link";
import Sms from "./Sms";
import { Bounce, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = ({ showLoginForm }) => {
  const [registerWithPass, setRegisterWithPass] = useState(false);
  const [isRegisterWithOtp, setIsRegisterWithOtp] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading , setIsLoading] = useState(false)

  const hideOtpForm = () => setIsRegisterWithOtp(false);

  const signup = async () => {
    
    const newUser = {
      name,phone,email,password
    }

    const res = await fetch("/api/auth/signup" , {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(newUser)
    })


    if(res.status === 201) {
      setName("")
      setPhone("")
      setEmail("")
      setPassword("")
      setIsLoading(false)
      toast.success('ثبت نام با موفقیت انجام شد', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    } else if (res.status === 422) {
      setName("")
      setPhone("")
      setEmail("")
      setPassword("")
      setIsLoading(false)
      toast.error('نام/شماره تلفن / ایمیل شما قبلا ثبت شده است لطفا دوباره اقدام کنید', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    } else if(res.status === 500) {
      setName("")
      setPhone("")
      setEmail("")
      setPassword("")
      setIsLoading(false)
      toast.error('خطا در سرور لطفا بعدا تلاش کنید', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
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
                    if(registerWithPass) {
                      setIsLoading(true)
                      signup()
                    } else {
                      setRegisterWithPass(true)
                    }
                  }}
                  style={{ marginTop: ".7rem" }}
                  className={styles.btn}
                >
                  {
                    isLoading ? "لطفا صبر کنید..." : "ثبت نام با رمز عبور"
                  }
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
