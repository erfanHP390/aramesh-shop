import React from "react";
import styles from "@/styles/p-user/orders.module.css";
import OrdersMain from "@/components/templates/p-user/orders/OrdersMain";
import UserPanelLayout from "@/components/layouts/UserPanelLayout/UserPanelLayout";
import connectToDB from "@/configs/db";
import { authUser } from "@/utils/authUserLink";
import OrderModel from "@/models/Orders";
import BanModel from "@/models/Ban";
import { redirect } from "next/navigation";

async function page() {
  connectToDB();
  const user = await authUser();
  const orders = await OrderModel.find({
    email: user.email,
    mobile: user.phone,
  })
    .populate("products")
    .lean();
  const banUserEmail = await BanModel.findOne({ email: user.email }).lean();
  const banUserPhone = await BanModel.findOne({ phone: user.phone }).lean();

  if (banUserEmail || banUserPhone) {
    redirect("/p-user/account-details");
  }

  return (
    <UserPanelLayout>
      <OrdersMain orders={JSON.parse(JSON.stringify(orders))} />
    </UserPanelLayout>
  );
}

export default page;
