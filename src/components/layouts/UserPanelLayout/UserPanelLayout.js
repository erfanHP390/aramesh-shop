import React from "react";
import styles from "./UserPanelLayout.module.css";
import { FaTimes, FaBars } from "react-icons/fa";
import { authUser } from "@/utils/authUserLink";
import { redirect } from "next/navigation";
import SidebarWrapper from "@/components/templates/p-user/sidebarWrapper/SidebarWrapper";
import connectToDB from "@/configs/db";
import UserProfileModel from "@/models/UserProfile"


const UserPanelLayout = async ({ children }) => {
  connectToDB()
  const user = await authUser();
  if (!user) {
    redirect("/login&register");
  }

  const profileUser = await UserProfileModel.findOne({user: user._id})


  return (
    <div className={styles.layout}>
      <section className={styles.section}>
        <SidebarWrapper  profileUser={JSON.parse(JSON.stringify(profileUser))}  name={user.name}  role={user.role}>{children}</SidebarWrapper>
      </section>
    </div>
  );
};

export default UserPanelLayout;
