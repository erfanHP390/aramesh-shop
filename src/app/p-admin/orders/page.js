import AdminPanelLayout from "@/components/layouts/AdminPanelLayout/AdminPanelLayout";
import EmptyCart from "@/components/modules/EmptyCart/EmptyCart";
import Title from "@/components/modules/p-user/title/Title";
import OrderTable from "@/components/templates/p-admin/orders/OrderTable";
import connectToDB from "@/configs/db";
import OrderModel from "@/models/Orders";
import React from "react";
import { CiShop } from "react-icons/ci";

async function page() {
  connectToDB();
  const orders = await OrderModel.find({})
    .sort({ _id: -1 })
    .populate("products")
    .lean();

  return (
    <AdminPanelLayout>
      <Title title={" سفارشات"} />
      {orders.length === 0 ? (
        <>
          {" "}
          <EmptyCart icon={<CiShop />} title={"سفارشی وجود ندارد"} />
        </>
      ) : (
        <>
        <OrderTable orders={JSON.parse(JSON.stringify(orders))} />
        </>
      )}
    </AdminPanelLayout>
  );
}

export default page;
