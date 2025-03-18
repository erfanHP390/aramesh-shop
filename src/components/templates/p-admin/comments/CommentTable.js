"use client";
import React from "react";
import styles from "./CommentTable.module.css";
import { swalAlert, toastError, toastSuccess } from "@/utils/helpers";
import swal from "sweetalert";
import { FaRegStar, FaStar } from "react-icons/fa";

function CommentTable({ comments, title }) {
  const showCommentBody = (text) => {
    swalAlert(text, undefined, "بستن");
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
              <th>امتیاز</th>
              <th>محصول</th>
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
                <td>{comment.username}</td>
                <td>{comment.email}</td>
                <td>
                  {" "}
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
                <td>{comment.productID.name}</td>
                <td>{new Date(comment.date).toLocaleDateString("fa-IR")}</td>
                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => showCommentBody(comment.body)}
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
                  <button type="button" className={styles.delete_btn}>
                    حذف
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.delete_btn}>
                    تایید
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

export default CommentTable;
