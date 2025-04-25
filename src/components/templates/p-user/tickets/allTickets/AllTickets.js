import Ticket from "../ticket/Ticket";
import styles from "./AllTickets.module.css"
import Link from "next/link";

function AllTickets({ tickets }) {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        <span>همه تیکت ها</span>
        <Link href="/p-user/tickets/sendTicket"> ارسال تیکت جدید </Link>
      </h1>

      <div>
          {
            tickets.map(ticket => (
              <Ticket key={ticket._id} {...ticket} />
            ))
          }
      </div>

      {
        tickets.length === 0 && 
        <div className={styles.empty}>
          <p>تیکتی وجود ندارد</p>
        </div>
      }

    </main>
  )
}

export default AllTickets