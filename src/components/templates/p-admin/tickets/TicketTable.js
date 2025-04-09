"use client";
import React from "react";
import styles from "./TicketTable.module.css";
import { swalAlert, toastError, toastSuccess } from "@/utils/helpers";
import swal from "sweetalert"
import { useRouter } from "next/navigation";

function TicketTable({tickets , title , email , phone}) {
  const router = useRouter()

    const showTicketBody = (text) => {
        swalAlert(text , undefined , "بستن")
    }


    const answerToTicket = async (ticket) => {
      swal({
        title: "لطفا پاسخ موردنظر خود را وارد کنید",
        content: "input",
        buttons: "ثبت پاسخ"
      }).then(async (answer) => {
        if(answer) {

          const newAnswerTicket = {
            ...ticket,
            body: answer,
            ticketID: ticket._id
          }

          const res = await fetch("/api/ticket/answer" , {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
              },
              body: JSON.stringify(newAnswerTicket)
          })
          

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
                    router.refresh()
                  }

        }
      }
      )
    }

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
            body: JSON.stringify({ email , phone }),
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
              <th>عنوان</th>
              <th>دپارتمان</th>
              <th>بخش</th>
              <th>مشاهده</th>
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
                  <button type="button"  onClick={() => answerToTicket(ticket)}  className={styles.delete_btn}
                  >
                    پاسخ
                  </button>
                </td>
                <td>
                  <button
                  onClick={() => banUser()}
                  type="button" className={styles.delete_btn} >
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
