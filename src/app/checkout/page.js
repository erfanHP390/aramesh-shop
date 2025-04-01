import Stepper from '@/components/modules/cart/stepper/Stepper'
import Navbar from '@/components/modules/navbar/Navbar'
import React from 'react'
import styles from "@/styles/checkout.module.css"
import Footer from '@/components/modules/Footer/Footer'
import Discount from '@/components/templates/checkout/discount/Discount'
import connectToDB from '@/configs/db'
import { authUser } from '@/utils/authUserLink'
import OrdersDetails from '@/components/templates/checkout/ordersDetails/OrdersDetails'

async function page() {

  connectToDB()
  const user = await authUser()

  return (
    <>
    <Navbar isLogin={user ? true : false} />
    <Stepper step="checkout" />
    <div className={styles.container} data-aos="fade-up">

        <Discount />

        <main className={styles.checkout}>
                <OrdersDetails /> 
        </main>
    </div>



    <Footer />
</>
  )
}

export default page