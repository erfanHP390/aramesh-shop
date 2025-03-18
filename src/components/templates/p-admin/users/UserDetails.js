"use client";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import styles from "./UserDetails.module.css";
import { useEffect, useState } from "react";
import { swalAlert, toastError } from "@/utils/helpers";
import { validateEmail, validatePhone } from "@/utils/auth";
import { useRouter } from "next/navigation";

function UserDetails({user}) {
    const router = useRouter()
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);

    const updateUser = async () => {
        const newInfo = {
            name,
            email,
            phone,
        };

        if (!name || !email || !phone) {
            return swalAlert("لطفا موارد لازم را پرنمایید", "error", "فهمیدم");
        }

        const isValidEmail = validateEmail(email);
        const isValidPhone = validatePhone(phone);

        if (!isValidEmail) {
            swalAlert("ایمیل نامعتبر است", "error", "فهمیدم");
        }

        if (!isValidPhone) {
            swalAlert("شماره تلفن نامعتبر است", "error", "فهمیدم");
        }

        const res = await fetch(`/api/user/${user._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newInfo),
        });

        if (res.status === 200) {
            swal({
                title: "اطلاعات با موفیقت ویرایش شد",
                icon: "success",
                buttons: "فهمیدم",
            }).then(async (result) => {
                if (result) {

                    if (res.status === 200) {
                        router.refresh()
                    }
                }
            });
        } else if (res.status === 400) {
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
                        <div className={styles.uploader}>
                            <img src="/images/shahin.jpg" alt="" />
                            <div>
                                <div>
                                    <button>
                                        <IoCloudUploadOutline />
                                        تغییر
                                    </button>
                                    <input type="file" name="" id="" />
                                </div>
                                <button>
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
                    onClick={updateUser}
                >
                    ثبت تغییرات
                </button>
            </div>
        </main>
    );
}

export default UserDetails;