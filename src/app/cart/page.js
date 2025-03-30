import Stepper from '@/components/modules/cart/stepper/Stepper'
import Footer from '@/components/modules/Footer/Footer'
import Navbar from '@/components/modules/navbar/Navbar'
import Table from '@/components/templates/cart/table/Table'
import connectToDB from '@/configs/db'
import styles from "@/styles/cart.module.css"
import { authUser } from '@/utils/authUserLink'

async function page() {

  connectToDB()
  const user = await authUser()

  return (
    <>
    <Navbar  isLogin={user ? true : false} />
    <Stepper step="cart" />

    <main className={styles.cart} data-aos="fade-up">
      <Table />
    </main>

    {/* <div class={styles.cart_empty} data-aos="fade-up">
              <TbShoppingCartX />
              <p>سبد خرید شما در حال حاضر خالی است. </p>
              <span>قبل از تسویه حساب، باید چند محصول را به سبد خرید خود اضافه کنید.</span>
              <span>در صفحه "فروشگاه"، محصولات جالب زیادی خواهید یافت.</span>
              <div>
                  <Link href='/category'>بازگشت به فروشگاه</Link>
              </div>
          </div> */}
    <Footer />
  </>
  )
}

export default page
