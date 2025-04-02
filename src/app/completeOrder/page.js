import Stepper from '@/components/modules/cart/stepper/Stepper'
import Footer from '@/components/modules/Footer/Footer'
import Navbar from '@/components/modules/navbar/Navbar'
import Link from 'next/link'
import styles from "@/styles/completeOrder.module.css"
import React from 'react'
import { authUser } from '@/utils/authUserLink'
import connectToDB from '@/configs/db'
import Main from '@/components/templates/completeOrder/Main'

async function page() {

    connectToDB()
    const user = await authUser()


  return (
    <>
      <Navbar  isLogin={user ? true : false} />
      <Stepper step="complate" />
      <Main />
      <Footer />
    </>
  )
}

export default page