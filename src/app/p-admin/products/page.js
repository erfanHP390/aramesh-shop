import AdminPanelLayout from '@/components/layouts/AdminPanelLayout/AdminPanelLayout'
import connectToDB from '@/configs/db'
import React from 'react'
import styles from "@/components/templates/p-admin/tickets/TicketTable.module.css"
import ProductModel from "@/models/Product"
import ProductTable from '@/components/templates/p-admin/products/ProductTable'
import Title from '@/components/modules/p-user/title/Title'

async function page() {

    connectToDB()
    const products = await ProductModel.find({})
    .sort({ _id: -1 })
    .populate("comments")
    .lean();

  return (
    <AdminPanelLayout>
    <main>
    <Title route={"/p-admin/products/create"}  text={"ایجاد محصول جدید"}  title={" محصولات"} />
      {products.length === 0 ? (
        <p className={styles.empty}>محصولی وجود ندارد</p>
      ) : (
        <ProductTable
          products={JSON.parse(JSON.stringify(products))}
        />
      )}
    </main>
  </AdminPanelLayout>
  )
}

export default page
