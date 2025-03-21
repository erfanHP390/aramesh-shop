"use client"
import Link from "next/link";
import styles from "./Ticket.module.css";

function Ticket({ _id, title, createdAt, department, subDepartment, hasAnswer, body }) {

    return (
        <Link href={`/p-user/tickets/answer/${_id}`} className={styles.ticket}>
            <div>
                <p>{title}</p>
                <p className={styles.department}>{department.title}</p>
                <p className={styles.department}>{subDepartment.title}</p>
            </div>
            <div>
                <p>{new Date(createdAt).toLocaleDateString("fa-IR")}</p>
                <p className={hasAnswer ? styles.answer : styles.no_answer}>
                    {hasAnswer ? "پاسخ داده شده" : "پاسخ داده نشده"}
                </p>
            </div>
        </Link>
    );
}

export default Ticket;