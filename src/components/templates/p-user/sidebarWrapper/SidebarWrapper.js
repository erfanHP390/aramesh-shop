"use client";
import React, { useState } from "react";
import styles from "@/components/layouts/UserPanelLayout/UserPanelLayout.module.css";
import Sidebar from "@/components/modules/p-user/sidebar/Sidebar";
import { FaTimes } from "react-icons/fa";
import Topbar from "@/components/modules/p-user/topbar/Topbar";

function SidebarWrapper({ name,role ,profileUser  , children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}>
        <Sidebar  name={name} />
        <button className={styles.closeSidebar} onClick={toggleSidebar}>
          <FaTimes />
        </button>
      </div>
      <div className={styles.contents}>
        <Topbar toggleSidebar={toggleSidebar}  profileUser={profileUser}  name={name}  role={role} />
        {children}
      </div>
    </>
  );
}

export default SidebarWrapper;
