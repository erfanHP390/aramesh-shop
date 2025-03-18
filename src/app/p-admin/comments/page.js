import AdminPanelLayout from "@/components/layouts/AdminPanelLayout/AdminPanelLayout";
import React from "react";
import styles from "@/components/templates/p-admin/comments/CommentTable.module.css";
import connectToDB from "@/configs/db";
import CommentModel from "@/models/Comment";
import CommentTable from "@/components/templates/p-admin/comments/CommentTable";

const page = async () => {
    connectToDB();
    const comments = await CommentModel.find({})
      .sort({ _id: -1 })
      .populate("productID")
      .lean();
  
    return (
      <AdminPanelLayout>
        <main>
          {comments.length === 0 ? (
            <p className={styles.empty}>کامنتی وجود ندارد</p>
          ) : (
            <CommentTable
              comments={JSON.parse(JSON.stringify(comments))}
              title="لیست کامنت ها"
            />
          )}
        </main>
      </AdminPanelLayout>
    );
  };
  
  export default page;
  