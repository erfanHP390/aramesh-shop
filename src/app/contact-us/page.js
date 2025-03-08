import React from 'react'
import styles from "@/styles/contactUs.module.css"
import Navbar from '@/components/modules/navbar/Navbar'
import BreadCrumb from '@/components/modules/breadcrumb/BreadCrumb'
import Footer from '@/components/modules/Footer/Footer'
import Form from '@/components/templates/contact-us/form/form'
import { authUser } from '@/utils/authUserLink'
import Information from '@/components/templates/contact-us/information/Information'

export default async function page() {

    const user = await authUser()

  return (
    <>
      <Navbar isLogin={user ? true : false} />
      <BreadCrumb route={"تماس با ما"} />
      <div className={styles.container}>
        <div className={styles.contents}>
          <Form />
          <Information />
        </div>
      </div>

      <Footer />
    </>
  )
}
