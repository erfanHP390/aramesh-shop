import React from "react";
import styles from "./UserPanelLayout.module.css";
import { FaTimes, FaBars } from "react-icons/fa";
import { authUser } from "@/utils/authUserLink";
import { redirect } from "next/navigation";
import SidebarWrapper from "@/components/templates/p-user/sidebarWrapper/SidebarWrapper";

const UserPanelLayout = async ({ children }) => {
  const user = await authUser();
  if (!user) {
    redirect("/login&register");
  }

  return (
    <div className={styles.layout}>
      <section className={styles.section}>
        <SidebarWrapper>{children}</SidebarWrapper>
      </section>
    </div>
  );
};

export default UserPanelLayout;
