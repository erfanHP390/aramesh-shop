"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "@/components/layouts/UserPanelLayout/UserPanelLayout.module.css";
import Sidebar from "@/components/modules/p-user/sidebar/Sidebar";
import { FaTimes } from "react-icons/fa";
import Topbar from "@/components/modules/p-user/topbar/Topbar";

function SidebarWrapper({ name, role, profileUser, children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <>
      <div
        ref={sidebarRef}
        className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}
      >
        <Sidebar name={name}  role={role} />
        <button className={styles.closeSidebar} onClick={toggleSidebar}>
          <FaTimes />
        </button>
      </div>
      <div className={styles.contents}>
        <Topbar toggleSidebar={toggleSidebar} profileUser={profileUser} name={name} role={role} />
        {children}
      </div>
    </>
  );
}

export default SidebarWrapper;
