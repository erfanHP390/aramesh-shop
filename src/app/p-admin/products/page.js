import AdminPanelLayout from "@/components/layouts/AdminPanelLayout/AdminPanelLayout";
import connectToDB from "@/configs/db";
import React from "react";
import styles from "@/components/templates/p-admin/tickets/TicketTable.module.css";
import ProductModel from "@/models/Product";
import ProductTable from "@/components/templates/p-admin/products/ProductTable";
import Title from "@/components/modules/p-user/title/Title";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import EmptyCart from "@/components/modules/EmptyCart/EmptyCart";

export const metadata = {
  title: "پنل مدیریت | لیست محصولات سایت",
};


async function page() {
  connectToDB();
  const products = await ProductModel.find({})
    .sort({ _id: -1 })
    .populate("comments")
    .lean();

  return (
    <AdminPanelLayout>
      <main>
        <Title
          route={"/p-admin/products/create"}
          text={"ایجاد محصول جدید"}
          title={" محصولات"}
        />
        {products.length === 0 ? (
          <EmptyCart
            icon={<MdOutlineProductionQuantityLimits />}
            body={"برای ایجاد محصول جدید کلیک کنید"}
            title={"محصولی وجود ندارد"}
            href={"/p-admin/products/create"}
            textLink={"ایجاد محصول"}
          />
        ) : (
          <ProductTable products={JSON.parse(JSON.stringify(products))} />
        )}
      </main>
    </AdminPanelLayout>
  );
}

export default page;
