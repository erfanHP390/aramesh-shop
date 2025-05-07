import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";
import React from "react";
import ProductDetails from "@/components/templates/p-user/products/productDetails/ProductDetails";
import AdminPanelLayout from "@/components/layouts/AdminPanelLayout/AdminPanelLayout";
import Title from "@/components/modules/p-user/title/Title";

export const metadata = {
  title: "پنل مدیریت | جزئیات محصول",
};

async function page({ params }) {
  connectToDB();
  const id = params.id;

  const product = await ProductModel.findOne({ _id: id }).lean();

  return (
    <AdminPanelLayout>
      <Title
        route={"/p-admin/products"}
        text={"همه محصولات"}
        title={"جزئیات محصول"}
      />
      <ProductDetails product={JSON.parse(JSON.stringify(product))} />
    </AdminPanelLayout>
  );
}

export default page;
