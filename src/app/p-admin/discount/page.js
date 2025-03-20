import AdminPanelLayout from '@/components/layouts/AdminPanelLayout/AdminPanelLayout'
import DiscountTable from '@/components/templates/p-admin/discounts/DiscountTable'
import styles from "@/components/templates/p-admin/discounts/DiscountTable.module.css"
import connectToDB from '@/configs/db'
import DiscountModel from "@/models/Discount"

async function page() {


  connectToDB()
  const discounts = await DiscountModel.find({}).lean()

  return (
    <AdminPanelLayout>
      <main>
        <section className={styles.discount}>
          <p>افزودن کد تخفیف جدید</p>
          <div className={styles.discount_main}>
            <div>
              <label>شناسه تخفیف</label>
              <input placeholder="لطفا شناسه تخفیف را وارد کنید" type="text" />
            </div>
            <div>
              <label>درصد تخفیف</label>
              <input placeholder="لطفا درصد تخفیف را وارد کنید" type="text" />
            </div>
            <div>
              <label>حداکثر استفاده</label>
              <input placeholder="حداکثر استفاده از کد تخفیف" type="text" />
            </div>
            <div>
              <label>محصول</label>
              <select name="" id="">
                <option value="">قهوه ترک</option>
                <option value="">قهوه عربیکا</option>
                <option value="">قهوه اسپرسو</option>
              </select>
            </div>
          </div>
          <button>افزودن</button>
        </section>

        {discounts.length === 0 ? (
          <p className={styles.empty}>کد تخفیفی وجود ندارد</p>
        ) : (
          <DiscountTable
            discounts={JSON.parse(JSON.stringify(discounts))}
            title="لیست تخفیفات"
          />
        )}
      </main>
    </AdminPanelLayout>
  )
}

export default page
