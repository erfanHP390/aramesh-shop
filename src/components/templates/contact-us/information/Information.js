import React from 'react'
import {
    FaEnvelopeOpenText,
    FaInternetExplorer,
    FaPhone,
    FaTelegramPlane,
  } from "react-icons/fa";
  import { PiCoffeeFill } from "react-icons/pi";
  import { BiSolidContact } from "react-icons/bi";
  import styles from "./Information.module.css"

export default function Information() {
  return (
    <section className={styles.Information}>
      <span>تماس با ما</span>
      <p>اطلاعات تماس</p>
      <div>
        <PiCoffeeFill />
        <p>هلدینگ آرامش، بزرگترین و تخصصی ترین فروشگاه قهوه ایران</p>
      </div>
      <div>
        <FaInternetExplorer />
        <p>aramesh-coffee.com</p>
      </div>
      <div>
        <BiSolidContact />
        <p>
          {" "}
          مشهد ، شهرک صنعتی فاز دو ، میدان تلاش ، خیابان کوشش ، کوشش 2
          {" "}
        </p>
      </div>
      <div>
        <FaPhone />
        <p>051-36479228</p>
      </div>
      <div>
        <FaEnvelopeOpenText />
        <p>aramesh-holding-coffee.com</p>
      </div>
      <div>
        <FaEnvelopeOpenText />
        <p>arameshCoffeeBeans@yahoo.com</p>
      </div>
      <div>
        <FaTelegramPlane />
        <p>تماس با مدیریت از طریق واتساپ و یا تلگرام : 09366726563</p>
      </div>
    </section>
  )
}
