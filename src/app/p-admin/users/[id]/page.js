import AdminPanelLayout from "@/components/layouts/AdminPanelLayout/AdminPanelLayout";
import Title from "@/components/modules/p-user/title/Title";
import UserDetails from "@/components/templates/p-admin/users/UserDetails";
import connectToDB from "@/configs/db";
import UserModel from "@/models/User";


export const metadata = {
  title: "پنل مدیریت | جزئیات حساب کاربر ثبت نام شده",
};


async function page({ params }) {
  connectToDB();
  const UserID = params.id;
  const user = await UserModel.findOne({ _id: UserID });

  return (
    <AdminPanelLayout>
      <Title route={"/p-admin/users"} text={"همه کاربران"} title={"جزئیات اکانت کاربر"} />
      <UserDetails user={JSON.parse(JSON.stringify(user))} />
    </AdminPanelLayout>
  );
}

export default page;
