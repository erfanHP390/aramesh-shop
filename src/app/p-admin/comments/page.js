import AdminPanelLayout from "@/components/layouts/AdminPanelLayout/AdminPanelLayout";
import React from "react";
import connectToDB from "@/configs/db";
import CommentModel from "@/models/Comment";
import CommentBlogModel from "@/models/CommentBlog";
import CommentTable from "@/components/templates/p-admin/comments/CommentTable";
import { authUser } from "@/utils/authUserLink";
import CommentBTable from "@/components/templates/p-admin/comments/CommentBTable";
import Title from "@/components/modules/p-user/title/Title";
import EmptyCart from "@/components/modules/EmptyCart/EmptyCart";
import { FaRegComment } from "react-icons/fa";

export const metadata = {
  title: "پنل مدیریت | لیست کامنت ها",
};


const page = async () => {
  connectToDB();
  const comments = await CommentModel.find({})
    .sort({ _id: -1 })
    .populate("productID")
    .lean();
  const user = await authUser();

  const commentsBlog = await CommentBlogModel.find({})
    .sort({ _id: -1 })
    .populate("blogID")
    .lean();

  return (
    <AdminPanelLayout>
      <main>
        <Title title={" کامنت ها"} />
        {comments.length === 0 && commentsBlog.length === 0 ? (
          <>
            <EmptyCart
              icon={<FaRegComment />}
              title={"کامنتی وجود ندارد"}
            />
          </>
        ) : (
          <>
            <CommentTable
              comments={JSON.parse(JSON.stringify(comments))}
              phone={user.phone}
            />
            <CommentBTable
              comments={JSON.parse(JSON.stringify(commentsBlog))}
              title="لیست کامنت مقالات"
              phone={user.phone}
            />
          </>
        )}
      </main>
    </AdminPanelLayout>
  );
};

export default page;
