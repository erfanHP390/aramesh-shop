import AdminPanelLayout from "@/components/layouts/AdminPanelLayout/AdminPanelLayout"
import Box from "@/components/templates/p-user/index/box/Box"
import connectToDB from "@/configs/db"
import styles from "@/styles/p-admin/pAdmin.module.css"
import TicketModel from "@/models/Ticket";
import CommentModel from "@/models/Comment";
import UserModel from "@/models/User";
import ProductModel from "@/models/Product";

async function page() {

  connectToDB()
  const tickets = await TicketModel.find({}).lean()
  const products = await ProductModel.find({}).lean()
  const users = await UserModel.find({}).lean()

  return (
    <AdminPanelLayout>
      <main>
        <section className={styles.dashboard_contents}>
          <Box title="مجموع تیکت های دریافتی" value={tickets.length} />
          <Box title="مجموع محصولات سایت" value={products.length} />
          <Box title="مجموع سفارشات" value="333" />
          <Box title="مجموع کاربر های سایت" value={users.length} />
        </section>{" "}
        <div className={styles.dashboard_charts}>
          <section>
            <p>آمار فروش</p>
          </section>
          <section>
            <p>نرخ رشد</p>
          </section>
        </div>
      </main>
    </AdminPanelLayout>
  )
}

export default page
