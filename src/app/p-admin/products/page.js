import AdminPanelLayout from '@/components/layouts/AdminPanelLayout/AdminPanelLayout'
import connectToDB from '@/configs/db'
import React from 'react'
import ProductModel from "@/models/Product"
import ProductTable from '@/components/templates/p-admin/products/ProductTable'

async function page() {

    connectToDB()
    const products = await ProductModel.find({})
    .sort({ _id: -1 })
    .populate("comments")
    .lean();

  return (
    <AdminPanelLayout>
    <main>
      {products.length === 0 ? (
        <p className={styles.empty}>محصولی وجود ندارد</p>
      ) : (
        <ProductTable
          products={JSON.parse(JSON.stringify(products))}
          title="لیست محصولات"
        />
      )}
    </main>
  </AdminPanelLayout>
  )
}

export default page
