import connectToDB from '@/configs/db'
import { authUser } from '@/utils/authUserLink'
import OrderModel from "@/models/Orders"
import React from 'react'
import AdminPanelLayout from '@/components/layouts/AdminPanelLayout/AdminPanelLayout'
import OrdersADetails from '@/components/templates/p-admin/orders/OrdersADetails'
import ProductModel from "@/models/Product"

async function page({params}) {

    connectToDB()
    const id = params.id

    const order = await OrderModel.findOne({_id: id}).lean()    

    

  return (
    <AdminPanelLayout>
        <OrdersADetails  order={JSON.parse(JSON.stringify(order))} />
    </AdminPanelLayout>
  )
}

export default page
