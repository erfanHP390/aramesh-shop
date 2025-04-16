import UserPanelLayout from "@/components/layouts/UserPanelLayout/UserPanelLayout";
import AllTickets from "@/components/templates/p-user/tickets/allTickets/AllTickets";
import connectToDB from "@/configs/db";
import { authUser } from "@/utils/authUserLink";
import TicketModel from "@/models/Ticket";
import BanModel from "@/models/Ban";
import { redirect } from "next/navigation";
import emptyStyles from "@/components/templates/p-admin/discounts/DiscountTable.module.css";

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
      {tickets.length === 0 ? (
        <p className={emptyStyles.empty}>تیکتی وجود ندارد</p>
      ) : (
        <AllTickets tickets={JSON.parse(JSON.stringify(tickets))} />
      )}
    </UserPanelLayout>
  );
}

export default page;
