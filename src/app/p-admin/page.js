import AdminPanelLayout from "@/components/layouts/AdminPanelLayout/AdminPanelLayout"
import Box from "@/components/templates/p-user/index/box/Box"
import connectToDB from "@/configs/db"
import styles from "@/styles/p-admin/pAdmin.module.css"
import TicketModel from "@/models/Ticket";
import CommentModel from "@/models/Comment";
import UserModel from "@/models/User";
import ProductModel from "@/models/Product";
import OrdersModel from "@/models/Orders"
import CommentBlogsModel from "@/models/CommentBlog"
import BlogModel from "@/models/Blog"
import SaleChart from "@/components/templates/p-admin/index/saleChart/SaleChart";
import GrowthChart from "@/components/templates/p-admin/index/growthChart/GrowthChart";

async function page() {

  connectToDB()
  const tickets = await TicketModel.find({}).lean()
  const products = await ProductModel.find({}).lean()
  const users = await UserModel.find({}).lean()
  const orders = await OrdersModel.find({}).lean()
  const comments = await CommentModel.find({}).lean()
  const commentBlogs = await CommentBlogsModel.find({}).lean()
  const blogs = await BlogModel.find({}).lean()

  return (
    <AdminPanelLayout>
      <main>
        <section className={styles.dashboard_contents}>
          <Box title="مجموع تیکت های دریافتی" value={tickets.length} />
          <Box title="مجموع محصولات سایت" value={products.length} />
          <Box title="مجموع سفارشات" value={orders.length} />
          <Box title="مجموع کاربر های سایت" value={users.length} />
          <Box title="مجموع مقالات سایت" value={blogs.length} />
          <Box title="مجموع کامنت های سایت" value={Number(comments.length) + Number(commentBlogs.length)} />
        </section>{" "}
        <div className={styles.dashboard_charts}>
          <section>
            <p>آمار فروش</p>
            <SaleChart />
          </section>
          <section>
            <p>نرخ رشد</p>
            <GrowthChart />
          </section>
        </div>
      </main>
    </AdminPanelLayout>
  )
}

export default page
