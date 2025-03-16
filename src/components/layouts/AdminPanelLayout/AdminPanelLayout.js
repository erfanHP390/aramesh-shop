import React from "react";
import styles from "./AdminPanelLayout.module.css";
import { FaTimes, FaBars } from "react-icons/fa";
import { authUser } from "@/utils/authUserLink";
import { redirect } from "next/navigation";
import SidebarWrapper from "@/components/templates/p-user/sidebarWrapper/SidebarWrapper";

const AdminPanelLayout = async ({ children }) => {
  const user = await authUser();
  

  return (
    <div className={styles.layout}>
      <section className={styles.section}>
        <SidebarWrapper  name={user.name}  role={user.role}>{children}</SidebarWrapper>
      </section>
    </div>
  );
};

export default AdminPanelLayout;