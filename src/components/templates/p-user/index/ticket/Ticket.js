import Link from "next/link";
import styles from "./Ticket.module.css";

const Ticket = ({_id , title , hasAnswer , department , createdAt}) => {

  return (
    <Link href={`/p-user/tickets/answer/${_id}`} className={styles.ticket}>
      <div className={styles.header}>
        <p>{title}</p>
        <p className={styles.department}>{department.title}</p>
      </div>
      <div>
        <p>{new Date(createdAt).toLocaleString("fa-IR")}</p>
        <p className={styles.no_answer}>{hasAnswer ? "پاسخ داده شده" : "پاسخ داده نشده"}</p>
        {/* answer */}
      </div>
    </Link>
  );
};

export default Ticket;