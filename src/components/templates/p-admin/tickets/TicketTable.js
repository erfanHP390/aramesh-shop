"use client";
import React, { useState } from "react";
import styles from "./TicketTable.module.css";
import { swalAlert, toastError, toastSuccess } from "@/utils/helpers";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

function TicketTable({ tickets, title, email, phone }) {
  const router = useRouter();
  const [directionFilter, setDirectionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("updatedAt");

  const showTicketBody = (text) => {
    swalAlert(text, undefined, "بستن");
  };

  const answerToTicket = async (ticket) => {
    swal({
      title: "لطفا پاسخ موردنظر خود را وارد کنید",
      content: "input",
      buttons: "ثبت پاسخ",
    }).then(async (answer) => {
      if (answer) {
        const newAnswerTicket = {
          ...ticket,
          body: answer,
          ticketID: ticket._id,
        };

        const res = await fetch("/api/ticket/answer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAnswerTicket),
        });

        if (res.status === 201) {
          toastSuccess(
            "پاسخ برای تیکت مورد نظر ثبت شد",
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
            "فقط ادمین/مدیر سایت اجازه پاسخ به تیکت را دارد",
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

  const banUser = async () => {
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
          body: JSON.stringify({ email, phone }),
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

  const applyFilters = (e) => {
    e.preventDefault();
    // فیلترها از طریق state اعمال می‌شوند، نیازی به ارسال درخواست جدید نیست
  };

  const filteredTickets = tickets
    .filter((ticket) => {
      // فیلتر جهت (فرستاده شده/دریافتی)
      if (directionFilter === "sent") return ticket.isAnswer === false;
      if (directionFilter === "received") return ticket.isAnswer === true;
      return true;
    })
    .filter((ticket) => {
      // فیلتر وضعیت
      if (statusFilter === "all") return true;
      if (statusFilter === "open") return !ticket.hasAnswer && !ticket.isClosed;
      if (statusFilter === "closed") return ticket.isClosed;
      if (statusFilter === "answered") return ticket.hasAnswer && !ticket.isClosed;
      if (statusFilter === "completed") return ticket.isClosed;
      return true;
    })
    .sort((a, b) => {
      // مرتب‌سازی بر اساس تاریخ
      const dateA = new Date(dateFilter === "createdAt" ? a.createdAt : a.updatedAt);
      const dateB = new Date(dateFilter === "createdAt" ? b.createdAt : b.updatedAt);
      return dateB - dateA; // جدیدترین اول
    });

  return (
    <>
      <div>
        <div>
          <h1 className={styles.title}>
            <span>{title}</span>
          </h1>
        </div>
        <form onSubmit={applyFilters} className={styles.filtering}>
        <div className={styles.filter_group}>
          <select 
            value={directionFilter}
            onChange={(e) => setDirectionFilter(e.target.value)}
            className={styles.filter_select}
          >
            <option value="all">همه</option>
            <option value="sent">فرستاده شده</option>
            <option value="received">دریافتی</option>
          </select>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={styles.filter_select}
          >
            <option value="all">همه</option>
            <option value="open">باز</option>
            <option value="closed">بسته</option>
            <option value="answered">پاسخ داده شده</option>
            <option value="completed">پایان یافته</option>
          </select>
          
          <select 
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className={styles.filter_select}
          >
            <option value="updatedAt">تاریخ پاسخ</option>
            <option value="createdAt">تاریخ ایجاد</option>
          </select>
        </div>

      </form>
        <div className={styles.table_container}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>شناسه</th>
                <th>کاربر</th>
                <th>عنوان</th>
                <th>دپارتمان</th>
                <th>بخش</th>
                <th>وضعیت</th>
                <th>مشاهده</th>
                <th>پاسخ</th>
                <th>بن</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket, index) => (
                <tr key={ticket._id}>
                  <td>{index + 1}</td>
                  <td>{ticket.user.name}</td>
                  <td>{ticket.title}</td>
                  <td>{ticket.department.title}</td>
                  <td>{ticket.subDepartment.title}</td>
                  <td>
                    {ticket.isClosed 
                      ? "پایان یافته" 
                      : ticket.hasAnswer 
                        ? "پاسخ داده شده" 
                        : "باز"}
                  </td>
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
                    {!ticket.isAnswer && !ticket.isClosed && (
                      <button
                        type="button"
                        onClick={() => answerToTicket(ticket)}
                        className={styles.delete_btn}
                      >
                        پاسخ
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => banUser()}
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
    </>
  );
}

export default TicketTable;