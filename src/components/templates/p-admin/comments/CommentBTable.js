"use client";
import React from "react";
import styles from "./CommentTable.module.css";
import { swalAlert, toastError, toastSuccess } from "@/utils/helpers";
import swal from "sweetalert";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";

function CommentBTable({comments , title , phone}) {
    console.log(comments);
    

    const router = useRouter();

    const showCommentBody = (text) => {
      swalAlert(text, undefined, "بستن");
    };

    const acceptComment = async (commentID) => {
        const res = await fetch("/api/blog/comment/accept", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: commentID }),
        });
    
        if (res.status === 200) {
          toastSuccess(
            "کامنت تایید شد",
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
          toastError(
            "فقط ادمین/مدیر سایت اجازه تایید کامنت را دارد",
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
            "شناسه کامنت ارسال نشده است",
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
            "شناسه کامنت نامعتبر است",
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
    
      const rejectComment = async (commentID) => {
        const res = await fetch("/api/blog/comment/reject", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: commentID }),
        });
    
        if (res.status === 200) {
          toastSuccess(
            "کامنت رد شد",
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
          toastError(
            "فقط ادمین/مدیر سایت اجازه رد کامنت را دارد",
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
            "شناسه کامنت ارسال نشده است",
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
            "شناسه کامنت نامعتبر است",
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
    
      const removeComment = async (commentID) => {
        swal({
          title: "آیا از حذف کاربر اطمینان دارین؟",
          icon: "warning",
          buttons: ["نه", "آره"],
        }).then(async (result) => {
          if (result) {
            const res = await fetch(`/api/blog/comment/${commentID}`, {
              method: "DELETE",
            });
    
            if (res.status === 200) {
              toastSuccess(
                "کامنت با موفقیت حذف شد",
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
              toastError(
                "فقط ادمین/مدیر سایت اجازه حذف کامنت را دارد",
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
              toastError(
                "شناسه کامنت ارسال نشده است",
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
                "شناسه کامنت نامعتبر است",
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
      const banUser = async (commentEmail) => {
        swal({
          title: "آیا از مسدود کردن کاربر اطمینان دارید؟",
          icon: "warning",
          buttons: ["نه", "آره"],
        }).then(async (result) => {
          if (result) {
            const res = await fetch("/api/user/ban", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: commentEmail, phone }),
            });
    
            if (res.status === 200) {
              toastSuccess(
                "کاربر با موفقیت مسدود شد",
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
              toastError(
                "فقط ادمین/مدیر سایت اجازه مسدود کردن را دارد",
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
                "ایمیل/تلفن کاربر نامعتبر است",
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
              <th>کاربر</th>
              <th>ایمیل</th>
              <th>تحصیلات</th>
              <th>مقاله</th>
              <th>تاریخ ثبت</th>
              <th>مشاهده</th>
              <th>ویرایش</th>
              <th>حذف</th>
              <th>تایید</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr key={comment._id}>
                <td>{index + 1}</td>
                <td>{comment.name}</td>
                <td>{comment.email}</td>
                <td>
                    {comment.education}
                </td>
                {/* <td>{comment?.blogID.title}</td> */}
                <td>{new Date(comment.createdAt).toLocaleDateString("fa-IR")}</td>
                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => showCommentBody(comment.description)}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.edit_btn}>
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.delete_btn}
                    onClick={() => removeComment(comment._id)}
                  >
                    حذف
                  </button>
                </td>
                <td>
                  {comment.isAccept ? (
                    <button
                      type="button"
                      className={styles.delete_btn}
                      onClick={() => rejectComment(comment._id)}
                    >
                      رد
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={styles.delete_btn}
                      onClick={() => acceptComment(comment._id)}
                    >
                      تایید
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => banUser(comment.email)}
                    type="button"
                    className={styles.delete_btn}
                  >
                    بن
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CommentBTable
