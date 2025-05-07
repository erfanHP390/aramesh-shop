import connectToDB from "@/configs/db";
import OrderModel from "@/models/Orders";
import React from "react";
import AdminPanelLayout from "@/components/layouts/AdminPanelLayout/AdminPanelLayout";
import OrdersADetails from "@/components/templates/p-admin/orders/OrdersADetails";
import ProductModel from "@/models/Product";
import Title from "@/components/modules/p-user/title/Title";

export const metadata = {
  title: "پنل مدیریت | جزئیات سفارش",
};

async function page({ params }) {
  connectToDB();
  const id = params.id;

  const order = await OrderModel.findOne({ _id: id }).lean();

  return (
    <AdminPanelLayout>
      <Title
        route={"/p-admin/orders"}
        text={"همه سفارشات"}
        title={"جزئیات سفارش"}
      />
      <OrdersADetails order={JSON.parse(JSON.stringify(order))} />
    </AdminPanelLayout>
  );
}

export default page;
