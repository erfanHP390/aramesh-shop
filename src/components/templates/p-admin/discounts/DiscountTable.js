"use client";
import styles from "@/components/templates/p-admin/discounts/DiscountTable.module.css";
import { toastError, toastSuccess } from "@/utils/helpers";
import { useRouter } from "next/navigation";

function DiscountTable({ discounts }) {
  const router = useRouter();

  const removeDiscount = async (discountID) => {
    swal({
      title: "آیا از حذف کد تخفیف اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch(`/api/discount/${discountID}`, {
          method: "DELETE",
        });

        if (res.status === 200) {
          toastSuccess(
            "کد تخفیف حذف شد",
            "top-center",
            5000,
            false,
            true,
            true,
            true,
            undefined,
            "colored"
          );
          router.refresh();
        } else if (res.status === 401) {
          toastError(
            "فقط ادمین/مدیر سایت اجازه حذف کد تخفیف را دارد",
            "top-center",
            5000,
            false,
            true,
            true,
            true,
            undefined,
            "colored"
          );
        } else if (res.status === 400) {
          setIsLoading(false);
          toastError(
            "شناسه کد تخفیف ارسال نشده است",
            "top-center",
            5000,
            false,
            true,
            true,
            true,
            undefined,
            "colored"
          );
        } else if (res.status === 422) {
          setIsLoading(false);
          toastError(
            "شناسه کدتحفیف نامعتبر است",
            "top-center",
            5000,
            false,
            true,
            true,
            true,
            undefined,
            "colored"
          );
        } else if (res.status === 404) {
          setIsLoading(false);
          toastError(
            "کد تخفیف یافت نشد",
            "top-center",
            5000,
            false,
            true,
            true,
            true,
            undefined,
            "colored"
          );
        } else if (res.status === 500) {
          setIsLoading(false);
          toastError(
            "خطا در سرور ، لطفا بعدا تلاش کنید",
            "top-center",
            5000,
            false,
            true,
            true,
            true,
            undefined,
            "colored"
          );
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
