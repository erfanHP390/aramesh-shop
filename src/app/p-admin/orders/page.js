import AdminPanelLayout from "@/components/layouts/AdminPanelLayout/AdminPanelLayout";
import Title from "@/components/modules/p-user/title/Title";
import OrderTable from "@/components/templates/p-admin/orders/OrderTable";
import connectToDB from "@/configs/db";
import OrderModel from "@/models/Orders";
import React from "react";

async function page() {
  connectToDB();
  const orders = await OrderModel.find({})
    .sort({ _id: -1 })
    .populate("products")
    .lean();

  return (
    <AdminPanelLayout>
      <Title title={" سفارشات"} />
      <OrderTable orders={JSON.parse(JSON.stringify(orders))} />
    </AdminPanelLayout>
  );
}

export default page;
