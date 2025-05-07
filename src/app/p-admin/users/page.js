import AdminPanelLayout from "@/components/layouts/AdminPanelLayout/AdminPanelLayout";
import React from "react";
import UserTable from "@/components/templates/p-admin/index/userTable/UserTable";
import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import Title from "@/components/modules/p-user/title/Title";
import { FaUsersLine } from "react-icons/fa6";
import EmptyCart from "@/components/modules/EmptyCart/EmptyCart";

export const metadata = {
  title: "پنل مدیریت | لیست کاربران ثبت نام شده",
};

async function page() {
  connectToDB();
  const users = await UserModel.find({}).lean();

  return (
    <AdminPanelLayout>
      <main>
        <Title
          title={" کاربران"}
          text={"ایجاد کاربر جدید"}
          route={"/p-admin/users/create"}
        />
        {users.length === 0 ? (
          <EmptyCart
            icon={<FaUsersLine />}
            body={"برای ایجاد کاربر جدید کلیک کنید"}
            title={"کاربری وجود ندارد"}
            href={"/p-admin/users/create"}
            textLink={"ایجاد کاربر جدید"}
          />
        ) : (
          <UserTable users={JSON.parse(JSON.stringify(users))} />
        )}
      </main>
    </AdminPanelLayout>
  );
}

export default page;
