"use client";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import styles from "./AccountDetail.module.css";
import { useEffect, useState } from "react";
import { swalAlert, toastError, toastSuccess } from "@/utils/helpers";
import { validateEmail, validatePhone } from "@/utils/auth";
import { useRouter } from "next/navigation";

function AccountDetail({ profileUser }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState("");
  const [img, setImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      setName(data.name);
      setEmail(data.email);
      setPhone(data.phone);
      setUser(data._id);
    };

    getUser();
  }, []);

  const updateUser = async () => {
    const newInfo = {
      name,
      email,
      phone,
    };

    if (!name || !email || !phone) {
      setIsLoading(false);
      return swalAlert("لطفا موارد لازم را پرنمایید", "error", "فهمیدم");
    }

    const isValidEmail = validateEmail(email);
    const isValidPhone = validatePhone(phone);

    if (!isValidEmail) {
      setIsLoading(false);
      return swalAlert("ایمیل نامعتبر است", "error", "فهمیدم");
    }

    if (!isValidPhone) {
      setIsLoading(false);

      return swalAlert("شماره تلفن نامعتبر است", "error", "فهمیدم");
    }

    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newInfo),
    });

    if (res.status === 200) {
      setIsLoading(false);
      swal({
        title: "اطلاعات با موفیقت ویرایش شد",
        icon: "success",
        buttons: "فهمیدم",
      }).then(async (result) => {
        if (result) {
          const res = await fetch("/api/auth/signout", {
            method: "POST",
          });

          if (res.status === 200) {
            location.replace("/login&register");
          }
        }
      });
    } else if (res.status === 400) {
      setIsLoading(false);
      toastError(
        "لطفا موارد را پر کنید",
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
        "ایمیل یا شماره تلفن نامعتبر است",
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

  const updateProfile = async () => {
    if (!user || !img) {
      setIsLoading(false);
      return swalAlert("لطفا عکس خود را ارسال کنید", "error", "فهمیدم");
    }

    if (img.size > 5 * 1024 * 1024) { 
        setIsLoading(false)
        return swalAlert("حجم فایل نباید بیشتر از ۵ مگابایت باشد", "error", "فهمیدم");
      }

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("user", user);
      formData.append("img", img); // img باید یک File object باشد

      const res = await fetch("/api/auth/changeProfile", {
        method: "PUT",
        body: formData, // حذف header Content-Type برای FormData
      });

      const data = await res.json();

      if (res.status === 200) {
        setIsLoading(false);
        setImg(null);
        toastSuccess(
          "عکس پروفایل با موفقیت به‌روزرسانی شد",
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
      } else if (res.status === 400) {
        setIsLoading(false);
        toastError(
          data.message || "لطفا عکس یا آیدی خود را وارد نمایید",
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
          data.message || "خطا در سرور، لطفا بعدا تلاش کنید",
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
    } catch (err) {
      setIsLoading(false);
      toastError(
        "خطا در ارتباط با سرور",
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

  const deleteProfile = async (userID) => {

    swal({
      title: "آیا از حذف عکس اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {

      if(result) {
        if(!userID) {
          setIsLoading(false)
          return swalAlert("خطا در ارسال شناسه کاربر" , "error" , "فهمیدم")
        }
    
        const res = await fetch(`/api/auth/changeProfile/${userID}` , {
          method: "DELETE"
        })
    
        if (res.status === 200) {
          setIsLoading(false);
          setImg(null);
          toastSuccess(
            "عکس پروفایل با موفقیت حذف شد",
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
        } else if (res.status === 400) {
          setIsLoading(false);
          toastError(
             "لطفا عکس یا آیدی خود را وارد نمایید",
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
            "پروفایل کاربر یافت نشد",
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
            data.message || "خطا در سرور، لطفا بعدا تلاش کنید",
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
      
    })
    
  }

  return (
    <main>
      <div className={styles.details}>
        <h1 className={styles.title}>
          <span>جزئیات اکانت</span>
        </h1>
        <div className={styles.details_main}>
          <section>
            <div>
              <label>نام کاربری</label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="لطفا نام کاربری خود را وارد کنید"
                type="text"
              />
            </div>
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
              <label>شماره تماس</label>
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="لطفا شماره تماس خود را وارد کنید"
                type="number"
              />
            </div>
          </section>
          <section>
            <p style={{color: "red"}}>
              لطفا عکس قدیمی خود را ابتدا حذف و سپس عکس جدید خود را بارگزاری کنید
            </p>
            <div className={styles.uploader}>
              <img
                src={profileUser ? profileUser.img : "/images/user2.avif"}
                alt=""
              />
              <div>
                <div>
                  <button>
                    <IoCloudUploadOutline />
                    {
                        img ? "تصویر با موفقیت بارگزاری شد" : "بارگزاری عکس"
                    }
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setImg(e.target.files[0]); // ذخیره فایل در state
                      }
                    }}
                  />
                </div>
                <button
                  onClick={() => {
                    setIsLoading(true);
                    if (img) {
                      updateProfile();
                    }
                  }}
                >
                  <IoCloudUploadOutline />
                  {isLoading ? "لطفا منتظر باشید" : "تغییر عکس"}
                </button>
                <button onClick={() => {
                  setIsLoading(true)
                  deleteProfile(user)
                }}>
                  <MdOutlineDelete />
                  حذف
                </button>
              </div>
            </div>
            <div>
              <label>رمز عبور</label>
              <div className={styles.password_group}>
                <input type="password" />
                <button>تغییر رمز عبور</button>
              </div>
            </div>
          </section>
        </div>
        <button
          type="submit"
          className={styles.submit_btn}
          onClick={() => {
            setIsLoading(true);
            updateUser();
          }}
        >
          {isLoading ? "لطفا منتظر باشید" : "ثبت تغییرات"}
        </button>
      </div>
    </main>
  );
}

export default AccountDetail;
