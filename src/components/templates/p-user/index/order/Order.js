import Link from "next/link";
import styles from "./Order.module.css";

const Order = ({orderCode , isPay , totalPrice , createdAt}) => {
  return (
    <Link href={`/product/123`} className={styles.card}>
      <div>
        <div>
          <p>کد سفارش : {orderCode}</p>
          {/* <img
            src="https://set-coffee.com/wp-content/uploads/2022/03/ethiopia-430x430.png"
            alt=""
          /> */}
        </div>
        <p>{isPay ? "تکمیل شده" : "در انتظار پرداخت"}</p>
      </div>
      <div>
        <p>{new Date(createdAt).toLocaleDateString("fa-IR")}</p>
        <p className={styles.price}>{totalPrice.toLocaleString()} تومان</p>
      </div>
    </Link>
  );
};

export default Order;