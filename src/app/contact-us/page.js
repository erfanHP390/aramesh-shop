import React from 'react'
import styles from "@/styles/contactUs.module.css"
import Navbar from '@/components/modules/navbar/Navbar'
import BreadCrumb from '@/components/modules/breadcrumb/BreadCrumb'
import Footer from '@/components/modules/Footer/Footer'
import Form from '@/components/templates/contact-us/form/Form'
import { authUser } from '@/utils/authUserLink'
import Information from '@/components/templates/contact-us/information/Information'
import Map from '@/components/templates/map/Map'
import Link from 'next/link'
import connectToDB from '@/configs/db'

export default async function page() {

  connectToDB()
    const user = await authUser()

  return (
    <>
      <Navbar isLogin={user ? true : false} />
      <BreadCrumb route={"تماس با ما"} />

      <div className={styles.container}>
      <main className={styles.maps}>
          <section>
            <Map
              position={[35.7975, 51.4230]}
              center={[35.7975, 51.4230]}
            >
              <span> فروشگاه ما</span>
              <h3>آدرس فروشگاه حضوری آرامش (شعبه یک)</h3>
              <p>
                شعبه (یک) - تهران ، خیابان فرشته ، جنب پاساژ فرشته ، طبقه دوم
              </p>
              <p>021-11111122</p>
              <Link href="/about-us">درباره فروشگاه</Link>
            </Map>
          </section>
          <section>
            <Map
              position={[ 36.3060, 59.5600]}
              center={[36.3060, 59.5600]}
            >
              <span> فروشگاه ما</span>
              <h3>آدرس فروشگاه حضوری آرامش (شعبه دو)</h3>
              <p>
                شعبه دو - مشهد ، روبروی پارک ملت ، خیابان گلشن ، نبش کوچه گلشن هشتم
              </p>
              <p>051-37121154</p>
              <Link href="/about-us">درباره فروشگاه</Link>
            </Map>
          </section>
        </main>
      </div>
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
