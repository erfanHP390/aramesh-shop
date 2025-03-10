import UserPanelLayout from '@/components/layouts/UserPanelLayout/UserPanelLayout'
import Box from '@/components/templates/p-user/index/box/Box'
import Orders from '@/components/templates/p-user/index/orders/Orders'
import Tickets from '@/components/templates/p-user/index/tickets/Tickets'
import React from 'react'
import styles from "@/styles/pUser.module.css"
import Navbar from '@/components/modules/navbar/Navbar'

function Index() {
  return (
    <>
        <Navbar isLogin={false} />
      <UserPanelLayout>
      <main>
        <section className={styles.boxes}>
          <Box title="مجموع تیکت ها " value="20" />
          <Box title="مجموع کامنت ها " value="0" />
          <Box title="مجموع سفارشات" value="2" />
          <Box title="مجموع علاقه مندی ها" value="10" />
        </section>
        <section className={styles.contents}>
          <Tickets />
          <Orders />
        </section>
      </main>
      </UserPanelLayout>
    </>
  )
}

export default Index