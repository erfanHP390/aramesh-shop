import Link from "next/link";
import Order from "../order/Order";
import styles from "./Orders.module.css";
import { FaArrowLeft } from "react-icons/fa6";

const Orders = ({orders}) => {

  return (
    <div className={styles.content}>
      <div className={styles.content_details}>
        <p>سفارش های اخیر</p>
        <Link href="/p-user/orders">
          همه سفارش ها <FaArrowLeft />
        </Link>
      </div>
      {
        orders.map(order => (
          <Order key={order._id} {...order} />
        ))
      }
      {
        orders.length === 0 &&       <p className={styles.empty}>سفارشی ثبت نشده</p>
      }
    </div>
  );
};

export default Orders;