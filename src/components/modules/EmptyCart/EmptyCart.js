import Link from "next/link";
import React from "react";
import styles from "./EmptyCart.module.css";

function EmptyCart({ icon, title, body, href, textLink }) {
  return (
    <div className={styles.cart_empty} data-aos="fade-up">
      {icon}
      <p>{title}</p>
      {body && <span>{body}</span>}
      <div>{href && textLink && <Link href={href}>{textLink}</Link>}</div>
    </div>
  );
}

export default EmptyCart;
