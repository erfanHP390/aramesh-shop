import AdminPanelLayout from "@/components/layouts/AdminPanelLayout/AdminPanelLayout";
import Title from "@/components/modules/p-user/title/Title";
import ProductCreate from "@/components/templates/p-admin/products/ProductCreate";
import React from "react";

function page() {
  return (
    <AdminPanelLayout>
      <Title route={"/p-admin/products"} text={"همه محصولات"} title={"ایجاد محصول"} />
      <ProductCreate />
    </AdminPanelLayout>
  );
}

export default page;
