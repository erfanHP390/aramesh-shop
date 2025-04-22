"use client";

import { useState } from "react";
import styles from "./Topbar.module.css";
import { IoIosSearch, IoIosNotifications } from "react-icons/io";
import Modal from "../modal/Model";
import { FaBars, FaHome } from "react-icons/fa";
import Link from "next/link";

const Topbar = ({name ,role , toggleSidebar , profileUser }) => {
  const [showModal, setShowModal] = useState(false);

  const hideModal = () => setShowModal(false);

  return (
    <>
      <div className={styles.topbar}>
        <div className={styles.profile}>
          <div>
            <p>{name}</p>
            <span>{role === "ADMIN" ? "ادمین" :  "کاربر عادی"}</span>
          </div>
          <img src={profileUser ? profileUser.img : "/images/user2.avif"} alt=""  className={styles.img_profile} />
        </div>
        <section>
          <div className={styles.searchBox}>
            <input type="text" placeholder="جستجو کنید" />
            <div>
              <IoIosSearch />
            </div>
          </div>
          <Link href={"/"}
            className={styles.notification}
          >
            <FaHome />
          </Link>
          <div className={styles.menuIcon} onClick={toggleSidebar}>
            <FaBars />
          </div>
        </section>
      </div>

      {/* {showNotifications && (
        <div>
          <div
            onClick={() => setShowNotifications(false)}
            className={styles.notifications_overlay}
          ></div>
          <section className={styles.notifications_box}>
            <div>
              <p
                onClick={() => {
                  setShowNotifications(false);
                  setShowModal(true);
                }}
              >
                سلام ادمین محترم
              </p>
              <button onClick={() => setShowNotifications(false)}>دیدم</button>
            </div>
            <div>
              <p
                onClick={() => {
                  setShowNotifications(false);
                  setShowModal(true);
                }}
              >
                سلام ادمین محترم
              </p>
              <button onClick={() => setShowNotifications(false)}>دیدم</button>
            </div>
          </section>
        </div>
      )} */}
      {showModal && (
        <Modal title="از واحد پشتیبانی" hideModal={hideModal}>
          <p className={styles.modal_text}>عالی هستی ادمین عزیز</p>
        </Modal>
      )}
    </>
  );
};

export default Topbar;