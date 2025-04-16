import UserPanelLayout from "@/components/layouts/UserPanelLayout/UserPanelLayout";
import CommentsDetails from "@/components/templates/p-user/comments/commentsDetail/CommentsDetails";
import connectToDB from "@/configs/db";
import { authUser } from "@/utils/authUserLink";
import React from "react";
import CommentModel from "@/models/Comment";
import BanModel from "@/models/Ban";
import { redirect } from "next/navigation";

async function page({ params }) {
  connectToDB();
  const id = params.id;
  const user = await authUser();

  const banUserEmail = await BanModel.findOne({ email: user.email }).lean();
  const banUserPhone = await BanModel.findOne({ phone: user.phone }).lean();
  const comment = await CommentModel.findOne({ _id: id })
    .populate("productID")
    .lean();

  if (banUserEmail || banUserPhone) {
    redirect("/p-user/account-details");
  }

  return (
    <UserPanelLayout>
      <CommentsDetails comment={JSON.parse(JSON.stringify(comment))} />
    </UserPanelLayout>
  );
}

export default page;
