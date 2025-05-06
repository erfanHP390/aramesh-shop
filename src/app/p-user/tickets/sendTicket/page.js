import UserPanelLayout from "@/components/layouts/UserPanelLayout/UserPanelLayout"
import SendTicket from "@/components/templates/p-user/tickets/SendTicket"
import connectToDB from "@/configs/db";
import { authUser } from "@/utils/authUserLink";
import BanModel from "@/models/Ban";
import { redirect } from "next/navigation";
import Title from "@/components/modules/p-user/title/Title";

export const metadata = {
  title: "پنل کاربری | ارسال تیکت",
};

async function page() {

    connectToDB();
    const user = await authUser();

      const banUserEmail = await BanModel.findOne({ email: user.email }).lean();
      const banUserPhone = await BanModel.findOne({ phone: user.phone }).lean();
    
      if (banUserEmail || banUserPhone) {
        redirect("/p-user/account-details");
      }

  return (
    <UserPanelLayout>
      <Title route={"/p-user/tickets"} text={"همه تیکت ها"} title={"ارسال تیکت جدید"} />
      <SendTicket />
    </UserPanelLayout>
  )
}

export default page