import UserPanelLayout from "@/components/layouts/UserPanelLayout/UserPanelLayout";
import AllTickets from "@/components/templates/p-user/tickets/allTickets/AllTickets";
import connectToDB from "@/configs/db";
import { authUser } from "@/utils/authUserLink";
import TicketModel from "@/models/Ticket";
import BanModel from "@/models/Ban";
import { redirect } from "next/navigation";
import Title from "@/components/modules/p-user/title/Title";
import EmptyCart from "@/components/modules/EmptyCart/EmptyCart";
import { IoTicketOutline } from "react-icons/io5";

export const metadata = {
  title: "پنل کاربری | تیکت ها",
};

async function page() {
  connectToDB();
  const user = await authUser();
  const tickets = await TicketModel.find({ user: user._id, isAnswer: false })
    .populate(["department", "subDepartment"], "title")
    .sort({ _id: -1 });
  const banUserEmail = await BanModel.findOne({ email: user.email }).lean();
  const banUserPhone = await BanModel.findOne({ phone: user.phone }).lean();

  if (banUserEmail || banUserPhone) {
    redirect("/p-user/account-details");
  }

  return (
    <UserPanelLayout>
      <Title
        title={" تیکت ها"}
        route={"/p-user/tickets/sendTicket"}
        text={"ارسال تیکت"}
      />
      {tickets.length === 0 ? (
        <EmptyCart
          icon={<IoTicketOutline />}
          title={"تیکتی وجود ندارد"}
          body={"برای ایجاد تیکت جدید  کلیک کنید"}
          href={"/p-user/tickets/sendTicket"}
          textLink={"ارسال تیکت"}
        />
      ) : (
        <AllTickets tickets={JSON.parse(JSON.stringify(tickets))} />
      )}
    </UserPanelLayout>
  );
}

export default page;
