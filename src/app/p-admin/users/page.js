import AdminPanelLayout from "@/components/layouts/AdminPanelLayout/AdminPanelLayout";
import React from "react";
import styles from "@/components/templates/p-admin/index/userTable/UserTable.module.css";
import UserTable from "@/components/templates/p-admin/index/userTable/UserTable";
import connectToDB from "@/configs/db";
import UserModel from "@/models/User";

async function page() {
    connectToDB();
    const users = await UserModel.find({}).lean();

  return (
    <AdminPanelLayout>
      <main>
      {users.length === 0 ? (
          <p className={styles.empty}>کاربری وجود ندارد</p>
        ) : (
          <UserTable
            users={JSON.parse(JSON.stringify(users))}
            title="لیست کاربران"
          />
        )}
      </main>
    </AdminPanelLayout>
  );
}

export default page;
