import UserPanelLayout from "@/components/layouts/UserPanelLayout/UserPanelLayout";
import Box from "@/components/templates/p-user/index/box/Box";
import Orders from "@/components/templates/p-user/index/orders/Orders";
import Tickets from "@/components/templates/p-user/index/tickets/Tickets";
import React from "react";
import styles from "@/styles/pUser.module.css";
import connectToDB from "@/configs/db";
import { authUser } from "@/utils/authUserLink";
import TicketModel from "@/models/Ticket";
import WishListModel from "@/models/Wishlist";
import CommentModel from "@/models/Comment";
import OrderModel from "@/models/Orders";
import BanModel from "@/models/Ban";
import { redirect } from "next/navigation";
import Title from "@/components/modules/p-user/title/Title";

export const metadata = {
  title: "پنل کاربری | پیشخوان",
};

async function Index() {
  connectToDB();
  const user = await authUser();
  const tickets = await TicketModel.find({ user: user._id, isAnswer: false })
    .limit(3)
    .populate("department", "title")
    .sort()
    .lean();
  const banUserEmail = await BanModel.findOne({ email: user.email }).lean();
  const banUserPhone = await BanModel.findOne({ phone: user.phone }).lean();

  const comments = await CommentModel.find({
    username: user.name,
    email: user.email,
  });
  const wishlist = await WishListModel.find({ user: user._id });
  const allTickets = await TicketModel.find({
    user: user._id,
    isAnswer: false,
  });
  const orders = await OrderModel.find({
    email: user.email,
    mobile: user.phone,
  })
    .limit(3)
    .sort({ _id: -1 })
    .populate("products")
    .lean();

  if (banUserEmail || banUserPhone) {
    redirect("/p-user/account-details");
  }

  return (
    <>
      <UserPanelLayout>
        <main>
          <Title title={"پنل کاربری"} />
          <section className={styles.boxes}>
            <Box title="مجموع تیکت ها " value={allTickets.length} />
            <Box title="مجموع کامنت ها " value={comments.length} />
            <Box title="مجموع سفارشات" value={orders.length} />
            <Box title="مجموع علاقه مندی ها" value={wishlist.length} />
          </section>
          <section className={styles.contents}>
            <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />
            <Orders orders={JSON.parse(JSON.stringify(orders))} />
          </section>
        </main>
      </UserPanelLayout>
    </>
  );
}

export default Index;
