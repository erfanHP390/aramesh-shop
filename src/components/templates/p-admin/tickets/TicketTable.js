"use client";
import React from "react";
import styles from "./TicketTable.module.css";
import { swalAlert, toastError, toastSuccess } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { isValidObjectId } from "mongoose";
import { validateEmail, validatePhone } from "@/utils/auth";
import Link from "next/link";

function TicketTable({tickets , title}) {

    const showTicketBody = (text) => {
        swalAlert(text , undefined , "بستن")
    }

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
              <th>عنوان</th>
              <th>دپارتمان</th>
              <th>بخش</th>
              <th>مشاهده</th>
              <th>حذف</th>
              <th>پاسخ</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket._id}>
                <td>{index + 1}</td>
                <td>{ticket.user.name}</td>
                <td>{ticket.title}</td>
                <td>{ticket.department.title}</td>
                <td>{ticket.subDepartment.title}</td>
                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => showTicketBody(ticket.body)}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.delete_btn}
                  >
                    حذف
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.delete_btn}
                  >
                    پاسخ
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.delete_btn} >
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

export default TicketTable;
