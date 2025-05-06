import DataTable from "@/components/templates/p-user/comments/DataTable";
import UserPanelLayout from "@/components/layouts/UserPanelLayout/UserPanelLayout";
import connectToDB from "@/configs/db";
import CommentModel from "@/models/Comment";
import { authUser } from "@/utils/authUserLink";
import BanModel from "@/models/Ban";
import { redirect } from "next/navigation";
import emptyStyles from "@/components/templates/p-admin/discounts/DiscountTable.module.css";
import Title from "@/components/modules/p-user/title/Title";
import { FaRegComment } from "react-icons/fa";
import EmptyCart from "@/components/modules/EmptyCart/EmptyCart";

export const metadata = {
  title: "پنل کاربری | کامنت ها",
};

async function page() {
  connectToDB();
  const user = await authUser();
  const comments = await CommentModel.find(
    { email: user.email, username: user.name },
    "-__v"
  ).populate("productID", "name");
  const banUserEmail = await BanModel.findOne({ email: user.email }).lean();
  const banUserPhone = await BanModel.findOne({ phone: user.phone }).lean();

  if (banUserEmail || banUserPhone) {
    redirect("/p-user/account-details");
  }

  return (
    <UserPanelLayout>
      <main>
        <Title
          title={" کامنت ها"}
          route={"/category"}
          text={"ایجاد کامنت جدید"}
        />
        {comments.length === 0 ? (
          <EmptyCart
            icon={<FaRegComment />}
            title={"کامنتی وجود ندارد"}
            body={
              "میتوانید در بخش فروشگاه برای محصولات و یا بخش مقالات نظرات خود را ثبت کنید"
            }
            href={"/category"}
            textLink={"فروشگاه"}
          />
        ) : (
          <DataTable
            comments={JSON.parse(JSON.stringify(comments))}
            title="لیست کامنت‌ها"
          />
        )}
      </main>
    </UserPanelLayout>
  );
}

export default page;
