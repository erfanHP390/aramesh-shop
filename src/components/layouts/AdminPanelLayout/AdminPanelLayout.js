import React from "react";
import styles from "./AdminPanelLayout.module.css";
import { FaTimes, FaBars } from "react-icons/fa";
import { authUser } from "@/utils/authUserLink";
import { redirect } from "next/navigation";
import SidebarWrapper from "@/components/templates/p-user/sidebarWrapper/SidebarWrapper";
import connectToDB from "@/configs/db";

const AdminPanelLayout = async ({ children }) => {
  connectToDB()
  const user = await authUser();
  if(user) {
    if(user.role !== "ADMIN") {
      return redirect("/login&register")
    }
  } else {
    return redirect("/login&register")
  }

  return (
    <div className={styles.layout}>
      <section className={styles.section}>
        <SidebarWrapper  name={user.name}  role={user.role}>{children}</SidebarWrapper>
      </section>
    </div>
  );
};

export default AdminPanelLayout;