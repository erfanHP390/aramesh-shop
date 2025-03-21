"use client";
import styles from "@/components/templates/p-admin/discounts/DiscountTable.module.css";
import { swalAlert } from "@/utils/helpers";
import { useRouter } from "next/navigation";

function DiscountTable({ discounts }) {
  const router = useRouter();

  const removeDiscount = async (discountID) => {
    swal({
      title: "آیا از تغییر نقش کاربر اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch(`/api/discount/${discountID}`, {
          method: "DELETE",
        });

        if (res.status === 200) {
          swalAlert("کد تخفیف با موفقیت حذف شد" ,"success" , "فهمیدم")
          router.refresh();
        }
      }
    });
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>شناسه</th>
          <th>کد</th>
          <th>درصد</th>
          <th>حداکثر استفاده</th>
          <th>دفعات استفاده شده</th>
          <th>حذف</th>
        </tr>
      </thead>
      <tbody>
        {discounts.map((discount, index) => (
          <tr key={discount._id}>
            <td>{index + 1}</td>
            <td>{discount.code}</td>
            <td>{discount.percent}</td>
            <td>{discount.maxUse}</td>
            <td>{discount.uses}</td>
            <td>
              <button
                type="button"
                className={styles.delete_btn}
                onClick={() => removeDiscount(discount._id)}
              >
                حذف
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DiscountTable;
