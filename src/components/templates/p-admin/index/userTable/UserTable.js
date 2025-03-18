"use client";
import React from "react";
import styles from "./UserTable.module.css";
import { swalAlert, toastError, toastSuccess } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { isValidObjectId } from "mongoose";

function UserTable({ users, title }) {

  const router = useRouter()

  const changeRole =(userID) => {

    if(!userID) {
      swalAlert("خطا در ارسال شناسه کاربر مورد نظر" , "error" , "تلاش مجدد")
    }

    swal({
      title: "آیا از تغییر نقش کاربر اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if(result) {
        const res = await fetch("/api/user/role", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: userID }),
        });

        
    
        if (res.status === 200) {
          toastSuccess(
            "نقش کاربر با موفقیت تغییر پیدا کرد",
            "top-center",
            5000,
            false,
            true,
            true,
            true,
            undefined,
            "colored"
          );
          router.refresh()
        } else if (res.status === 422) {
          toastError(
            "خطا در شناسایی ID کاربر",
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

      }})



  };

  const removeUser = async (userID) => {
    swal({
      title: "آیا از حذف کاربر اطمینان دارین؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
          const res = await fetch(`/api/user/${userID}`, {
            method: "DELETE",
          });
          if (res.status === 200) {
            toastSuccess(
              "کاربر با موفقیت حذف شد",
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
          } else if (res.status === 422) {
            toastError(
              "خطا در شناسایی ID کاربر",
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
    });
  };

  return (
    <div>
      <div>
        <h1 className={styles.title}>
          <span>{title}</span>
        </h1>
      </div>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>نقش</th>
              <th>ویرایش</th>
              <th>تغییر سطح</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email ? user.email : "ایمیل یافت نشد"}</td>
                <td>{user.role === "USER" ? "کاربر عادی" : "مدیر"}</td>
                <td>
                  <button type="button" className={styles.edit_btn}>
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => changeRole(user._id)}
                  >
                    تغییر نقش
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.delete_btn}
                  onClick={() => removeUser(user._id)}
                  >
                    حذف
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.delete_btn}>
                    بن
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTable;
