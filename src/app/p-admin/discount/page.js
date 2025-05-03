import AdminPanelLayout from '@/components/layouts/AdminPanelLayout/AdminPanelLayout'
import Title from '@/components/modules/p-user/title/Title'
import AddDiscounts from '@/components/templates/p-admin/discounts/addDiscounts/AddDiscounts'
import DiscountTable from '@/components/templates/p-admin/discounts/DiscountTable'
import styles from "@/components/templates/p-admin/discounts/DiscountTable.module.css"
import connectToDB from '@/configs/db'
import DiscountModel from "@/models/Discount"

async function page() {


  connectToDB()
  const discounts = await DiscountModel.find({}).sort({_id: -1}).lean()

  return (
    <AdminPanelLayout>
      <main>
      <Title   title={" تخفیفات"} />
        <AddDiscounts />
        {discounts.length === 0 ? (
          <p className={styles.empty}>کد تخفیفی وجود ندارد</p>
        ) : (
          <DiscountTable
            discounts={JSON.parse(JSON.stringify(discounts))}
          />
        )}
      </main>
    </AdminPanelLayout>
  )
}

export default page
