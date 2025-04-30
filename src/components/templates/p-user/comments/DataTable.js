"use client";
import styles from "./DataTable.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import swal from "sweetalert";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { swalAlert, toastError, toastSuccess } from "@/utils/helpers";

function DataTable({ comments, title }) {
  const router = useRouter();

  const showCommentBody = (commentBody) => {
    swalAlert(commentBody, undefined, "فهمیدم");
  };

  const deleteComment = async (commentID) => {
    swal({
      title: "آیا از حذف کاربر اطمینان دارین؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch(`/api/comment/${commentID}`, {
          method: "DELETE",
        });

        if (res.status === 200) {
          toastSuccess(
            "محصول با موفقیت به علاقه مندی ها افزوده شد",
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
            "شناسه کامنت باید ارسال شود. به پشتیبانی تیکت بدهید",
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
            "شناسه کامنت نامعتبر است.لطفا در صورت مشکل به پشتیبانی پیام دهید",
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
            "کامنت یافت نشد.لطفا دوباره تلاش کنید",
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
              <th>تاریخ</th>
              <th>محصول</th>
              <th>امتیاز</th>
              <th>وضعیت</th>
              <th>مشاهده</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{new Date(comment.date).toLocaleDateString("fa-IR")}</td>
                <td>{comment.productID ? comment.productID.name : "محصول حذف شده"}</td>
                <td>
                  {new Array(comment.score).fill(0).map((item, index) => (
                    <FaStar
                      key={index}
                      style={{ color: "#FFD700" }}
                    /> 
                  ))}
                  {new Array(5 - comment.score).fill(0).map((item, index) => (
                    <FaRegStar
                      key={index}
                      style={{ color: "#A68A64" }}
                    /> 
                  ))}
                </td>
                <td>
                  <button type="button" className={styles.no_check}>
                    {comment.isAccept ? "تایید شده" : "در انتظار تایید"}
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => showCommentBody(comment.body)}
                    className={styles.btn}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.btn}>
                    <Link href={`/p-user/comments/${comment._id}`}>ویرایش</Link>
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.btn}
                    onClick={() => deleteComment(comment._id)}
                  >
                    حذف
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

export default DataTable;
