import Ticket from "../ticket/Ticket";
import styles from "./Tickets.module.css";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const Tickets = ({tickets}) => {
  return (
    <div className={styles.content}>
      <div className={styles.content_details}>
        <p>تیکت های اخیر</p>
        <Link href="/p-user/tickets">
          همه تیکت ها <FaArrowLeft />
        </Link>
      </div>
      <div className={styles.ticket_container}>
        {
          tickets.map(ticket => (
            <Ticket key={ticket._id}  {...ticket} />
          ))
        }
      </div>
    </div>
  );
};

export default Tickets;