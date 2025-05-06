import UserPanelLayout from "@/components/layouts/UserPanelLayout/UserPanelLayout";
import AccountDetail from "@/components/templates/p-user/accountDetail/AccountDetail";
import connectToDB from "@/configs/db";
import UserProfileModel from "@/models/UserProfile";
import { authUser } from "@/utils/authUserLink";
import BanModel from "@/models/Ban";
import Title from "@/components/modules/p-user/title/Title";

export const metadata = {
  title: "پنل کاربری | جزئیات اکانت",
};

async function page() {
  connectToDB();
  const user = await authUser();
  const profileUser = await UserProfileModel.findOne({ user: user._id });
  const banUserEmail = await BanModel.findOne({ email: user.email }).lean();
  const banUserPhone = await BanModel.findOne({ phone: user.phone }).lean();

  return (
    <UserPanelLayout>
      <Title title={"جزییات اکانت"} />
      <AccountDetail
        bannedMobile={banUserPhone ? true : false}
        bannedEmail={banUserEmail ? true : false}
        profileUser={JSON.parse(JSON.stringify(profileUser))}
      />
    </UserPanelLayout>
  );
}

export default page;
