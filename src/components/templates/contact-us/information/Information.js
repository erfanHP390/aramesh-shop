import React from "react";
import {
  FaEnvelopeOpenText,
  FaInternetExplorer,
  FaPhone,
  FaTelegramPlane,
} from "react-icons/fa";
import { PiCoffeeFill } from "react-icons/pi";
import { BiSolidContact } from "react-icons/bi";
import styles from "./Information.module.css";

export default function Information() {
  return (
    <section className={styles.Information}>
      <span>تماس با ما</span>
      <p>راه‌های ارتباط با هلدینگ آرامش</p>

      <div className={styles.item}>
        <PiCoffeeFill />
        <p>هلدینگ آرامش، بزرگترین و تخصصی‌ترین فروشگاه قهوه ایران</p>
      </div>

      <div className={styles.item}>
        <FaInternetExplorer />
        <p>aramesh-coffee.com</p>
      </div>

      <div className={styles.item}>
        <BiSolidContact />
        <p>مشهد، شهرک صنعتی فاز دو، میدان تلاش، خیابان کوشش، کوشش ۲</p>
      </div>

      <div className={styles.item}>
        <FaPhone />
        <p>۰۵۱-۳۶۴۷۹۲۲۸</p>
      </div>

      <div className={styles.item}>
        <FaEnvelopeOpenText />
        <p>aramesh-holding-coffee.com</p>
      </div>

      <div className={styles.item}>
        <FaEnvelopeOpenText />
        <p>arameshCoffeeBeans@yahoo.com</p>
      </div>

      <div className={styles.item}>
        <FaTelegramPlane />
        <p>تماس با مدیریت در واتساپ یا تلگرام: ۰۹۳۶۶۷۲۶۵۶۳</p>
      </div>
    </section>
  );
}
