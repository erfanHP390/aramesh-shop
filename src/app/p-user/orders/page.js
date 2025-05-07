import React from "react";
import OrdersMain from "@/components/templates/p-user/orders/OrdersMain";
import UserPanelLayout from "@/components/layouts/UserPanelLayout/UserPanelLayout";
import connectToDB from "@/configs/db";
import { authUser } from "@/utils/authUserLink";
import OrderModel from "@/models/Orders";
import BanModel from "@/models/Ban";
import { redirect } from "next/navigation";
import Title from "@/components/modules/p-user/title/Title";
import EmptyCart from "@/components/modules/EmptyCart/EmptyCart";
import { TbShoppingCartX } from "react-icons/tb";

export const metadata = {
  title: "پنل کاربری | سفارشات",
};

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
      <Title title={" سفارشات"} route={"/category"} text={"ایجاد سفارش جدید"} />
      {orders.length === 0 ? (
        <EmptyCart
          icon={<TbShoppingCartX />}
          body={"میتوانید در بخش فروشگاه نسبت به سفارش جدید اقدام نمایید"}
          title={"سفارشی وجود ندارد"}
          href={"/category"}
          textLink={"رفتن به فروشگاه"}
        />
      ) : (
        <OrdersMain orders={JSON.parse(JSON.stringify(orders))} />
      )}
    </UserPanelLayout>
  );
}

export default page;
