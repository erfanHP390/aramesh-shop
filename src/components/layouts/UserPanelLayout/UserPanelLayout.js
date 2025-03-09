"use client"
import React, { useState } from "react";
import styles from "./UserPanelLayout.module.css";
import Sidebar from "@/components/modules/p-user/sidebar/Sidebar";
import Topbar from "@/components/modules/p-user/topbar/Topbar";
import { FaTimes, FaBars } from "react-icons/fa";

const UserPanelLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.layout}>
      <section className={styles.section}>
        <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}>
          <Sidebar />
          <button className={styles.closeSidebar} onClick={toggleSidebar}>
            <FaTimes />
          </button>
        </div>
        <div className={styles.contents}>
          <Topbar toggleSidebar={toggleSidebar} />
          {children}
        </div>
      </section>
    </div>
  );
};

export default UserPanelLayout;