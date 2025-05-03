import AdminPanelLayout from "@/components/layouts/AdminPanelLayout/AdminPanelLayout";
import React from "react";
import BlogModel from "@/models/Blog";
import BlogTable from "@/components/templates/p-admin/blogs/BlogTable";
import connectToDB from "@/configs/db";
import emptyStyles from "@/components/templates/p-admin/discounts/DiscountTable.module.css"
import Title from "@/components/modules/p-user/title/Title";

async function page() {
  connectToDB();
  const blogs = await BlogModel.find({})
    .sort({ _id: -1 })
    .populate("comments")
    .lean();

  return (
    <AdminPanelLayout>
      <Title route={"/p-admin/blogs/create"} text={"ایجاد مقاله جدید"} title={"مقالات"} />
      {blogs.length === 0 ? (
        <p className={emptyStyles.empty}>مقاله ای وجود ندارد</p>
      ) : (
        <>
          <BlogTable
            blogs={JSON.parse(JSON.stringify(blogs))}
            title="لیست مقالات"
          />
        </>
      )}
    </AdminPanelLayout>
  );
}

export default page;
