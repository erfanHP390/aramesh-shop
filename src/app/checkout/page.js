import Stepper from '@/components/modules/cart/stepper/Stepper'
import Navbar from '@/components/modules/navbar/Navbar'
import React from 'react'
import styles from "@/styles/checkout.module.css"
import Footer from '@/components/modules/Footer/Footer'
import Discount from '@/components/templates/checkout/discount/Discount'
import OrdersDetails from '@/components/templates/checkout/ordersDetails/OrdersDetails'
import connectToDB from '@/configs/db'

async function page() {


  connectToDB()

  return (
    <>
    <Navbar   />
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