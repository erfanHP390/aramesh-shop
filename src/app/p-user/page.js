import UserPanelLayout from '@/components/layouts/UserPanelLayout/UserPanelLayout'
import Box from '@/components/templates/p-user/index/box/Box'
import Orders from '@/components/templates/p-user/index/orders/Orders'
import Tickets from '@/components/templates/p-user/index/tickets/Tickets'
import React from 'react'
import styles from "@/styles/pUser.module.css"
import connectToDB from '@/configs/db'
import { authUser } from '@/utils/authUserLink'
import TicketModel from "@/models/Ticket"
import WishListModel from "@/models/Wishlist"

async function Index() {

  connectToDB()
  const user =await authUser()
  const tickets = await TicketModel.find({user: user?._id}).limit(3).populate("department" , "title").sort().lean()
  const wishlist = await WishListModel.find({user: user?._id})
  const allTickets = await TicketModel.find({user: user?._id})

  return (
    <>
      <UserPanelLayout>
      <main>
        <section className={styles.boxes}>
          <Box title="مجموع تیکت ها " value={allTickets?.length} />
          <Box title="مجموع کامنت ها " value="0" />
          <Box title="مجموع سفارشات" value="2" />
          <Box title="مجموع علاقه مندی ها" value={wishlist?.length} />
        </section>
        <section className={styles.contents}>
          <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />
          <Orders />
        </section>
      </main>
      </UserPanelLayout>
    </>
  )
}

export default Index