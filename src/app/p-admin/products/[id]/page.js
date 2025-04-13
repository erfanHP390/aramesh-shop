import connectToDB from '@/configs/db'
import { authUser } from '@/utils/authUserLink'
import ProductModel from "@/models/Product"
import React from 'react'
import ProductDetails from '@/components/templates/p-user/products/productDetails/ProductDetails'
import AdminPanelLayout from '@/components/layouts/AdminPanelLayout/AdminPanelLayout'

async function page({params}) {

    connectToDB()
    const id = params.id

    const product = await ProductModel.findOne({_id: id}).lean()

  return (
    <AdminPanelLayout>
        <ProductDetails  product={JSON.parse(JSON.stringify(product))} />
    </AdminPanelLayout>
  )
}

export default page

