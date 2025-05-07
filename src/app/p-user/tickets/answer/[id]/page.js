import UserPanelLayout from "@/components/layouts/UserPanelLayout/UserPanelLayout";
import styles from "@/styles/p-user/answerTicket.module.css";
import Answer from "@/components/templates/p-user/tickets/answer/Answer";
import connectToDB from "@/configs/db";
import TicketModel from "@/models/Ticket";
import BanModel from "@/models/Ban";
import UserProfileModel from "@/models/UserProfile";
import { redirect } from "next/navigation";
import { authUser } from "@/utils/authUserLink";
import Title from "@/components/modules/p-user/title/Title";
import EmptyCart from "@/components/modules/EmptyCart/EmptyCart";
import { FaTicket } from "react-icons/fa6";

export const metadata = {
  title: "پنل کاربری | صفحه گفتگو",
};

async function page({ params }) {
  connectToDB();
  const user = await authUser();
  const ticketID = params.id;
  const profileUser = await UserProfileModel.findOne({ user: user._id });
  const ticket = await TicketModel.findOne({ _id: ticketID })
    .populate("user", "name role")
    .lean();

  const banUserEmail = await BanModel.findOne({ email: user.email }).lean();
  const banUserPhone = await BanModel.findOne({ phone: user.phone }).lean();
  const answerTicket = await TicketModel.findOne({ mainTicket: ticket._id })
    .populate("user", "name role")
    .lean();

  if (banUserEmail || banUserPhone) {
    redirect("/p-user/account-details");
  }

  return (
    <UserPanelLayout>
      <main className={styles.container}>
        <Title
          route={"/p-user/tickets/sendTicket"}
          text={"ارسال تیکت جدید"}
          title={`تیکت: ${ticket.title}`}
        />
        <div>
          <Answer type="user" {...ticket} />
          {answerTicket && (
            <Answer
              type="admin"
              {...answerTicket}
              profileUser={JSON.parse(JSON.stringify(profileUser))}
            />
          )}

          {!answerTicket && (
            <EmptyCart title={"هنوز پاسخی ارسال نکردید"} icon={<FaTicket />} />
          )}
        </div>
      </main>
    </UserPanelLayout>
  );
}

export default page;
