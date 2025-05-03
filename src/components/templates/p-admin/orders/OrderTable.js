"use client";
import React, { useState } from "react";
import styles from "./OrderTable.module.css";
import Modal from "@/components/modules/Modal/Modal";
import { swalAlert, toastError, toastSuccess } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import Link from "next/link";

function OrderTable({ orders, title }) {

  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const hideModal = () => setShowModal(false);

  const showOrderDetails = (orderID) => {
    const order = orders.find((order) => order._id === orderID);
    setSelectedOrder(order);
    setShowModal(true);
  };

  const removeOrder = async (orderID) => {
        swal({
          title: "آیا از حذف سفارش اطمینان دارید؟",
          icon: "warning",
          buttons: ["نه", "آره"],
        }).then(async (result) => {
          if (result) {
            if (!orderID) {
              return swalAlert("شناسه سفارش ارسال نشده است", "error", "فهمیدم");
            }
    
            const res = await fetch(`/api/removeOrders/${orderID}`, {
              method: "DELETE",
            });

            console.log(res);
            
    
            if (res.status === 200) {
              toastSuccess(
                "سفارش با موفقیت حذف شد",
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
                 "فقط ادمین/مدیر سایت اجازه حذف سفارش را دارد",
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
              toastError(
                "اطلاعات لازم ارسال نشده است",
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
              toastError(
                "اطلاعات ارسالی نامعتبر است",
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
              toastError(
                "سفارش یافت نشد",
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
  }

  return (
    <>
      <div>
        <div className={styles.table_container}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>شناسه</th>
                <th>نام</th>
                <th>کد سفارش</th>
                <th>تاریخ</th>
                <th>قیمت</th>
                <th>استان</th>
                <th>تلفن</th>
                <th>مشاهده جزئیات</th>
                <th>ویرایش</th>
                <th>حذف</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{`${order.firstName} ${order.lastName}`}</td>
                  <td>{order.orderCode}</td>
                  <td>
                    {new Date(order.createdAt).toLocaleDateString("fa-IR")}
                  </td>
                  <td>{order.totalPrice.toLocaleString()}</td>
                  <td>{order.province}</td>
                  <td>{order.mobile}</td>
                  <td>
                    <button
                      onClick={() => showOrderDetails(order._id)}
                      type="button"
                      className={styles.edit_btn}
                    >
                      مشاهده
                    </button>
                  </td>
                  <td>
                    <button type="button" className={styles.edit_btn}>
                      <Link href={`/p-admin/orders/${order._id}`}>ویرایش</Link>
                    </button>
                  </td>
                  <td>
                    <button
                        onClick={() => removeOrder(order._id)}
                      type="button"
                      className={styles.delete_btn}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && selectedOrder && (
        <Modal
          title={`جزئیات سفارش ${selectedOrder.orderCode}`}
          hideModal={hideModal}
        >
          <div className={styles.modal_product}>
            <div className={styles.modal_product_header}>
              <h2 className={styles.modal_product_title}>
                سفارش شماره {selectedOrder.orderCode}
              </h2>
            </div>

            <div className={styles.modal_product_content}>
              <div className={styles.modal_product_info}>
                <h3 className={styles.modal_product_description_title}>
                  اطلاعات سفارش
                </h3>
                <div className={styles.modal_product_meta}>
                  <div className={styles.modal_product_meta_item}>
                    <span className={styles.modal_product_meta_label}>
                      تاریخ ایجاد
                    </span>
                    <span className={styles.modal_product_meta_value}>
                      {new Date(selectedOrder.createdAt).toLocaleString(
                        "fa-IR"
                      )}
                    </span>
                  </div>

                  <div className={styles.modal_product_meta_item}>
                    <span className={styles.modal_product_meta_label}>
                      آخرین بروزرسانی
                    </span>
                    <span className={styles.modal_product_meta_value}>
                      {new Date(selectedOrder.updatedAt).toLocaleString(
                        "fa-IR"
                      )}
                    </span>
                  </div>

                  <div className={styles.modal_product_meta_item}>
                    <span className={styles.modal_product_meta_label}>
                      وضعیت پرداخت
                    </span>
                    <span className={styles.modal_product_meta_value}>
                      {selectedOrder.isPay ? (
                        <span style={{ color: "green" }}>پرداخت شده</span>
                      ) : (
                        <span style={{ color: "red" }}>پرداخت نشده</span>
                      )}
                    </span>
                  </div>

                  <div className={styles.modal_product_meta_item}>
                    <span className={styles.modal_product_meta_label}>
                      هزینه پست
                    </span>
                    <span className={styles.modal_product_meta_value}>
                      {selectedOrder.postPrice.toLocaleString()} تومان
                    </span>
                  </div>

                  <div className={styles.modal_product_meta_item}>
                    <span className={styles.modal_product_meta_label}>
                      مبلغ کل
                    </span>
                    <span className={styles.modal_product_meta_value}>
                      {selectedOrder.totalPrice.toLocaleString()} تومان
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.modal_product_info}>
                <h3 className={styles.modal_product_description_title}>
                  اطلاعات مشتری
                </h3>
                <div className={styles.modal_product_meta}>
                  <div className={styles.modal_product_meta_item}>
                    <span className={styles.modal_product_meta_label}>
                      نام کامل
                    </span>
                    <span className={styles.modal_product_meta_value}>
                      {selectedOrder.firstName} {selectedOrder.lastName}
                    </span>
                  </div>

                  <div className={styles.modal_product_meta_item}>
                    <span className={styles.modal_product_meta_label}>
                      موبایل
                    </span>
                    <span className={styles.modal_product_meta_value}>
                      {selectedOrder.mobile}
                    </span>
                  </div>

                  <div className={styles.modal_product_meta_item}>
                    <span className={styles.modal_product_meta_label}>
                      ایمیل
                    </span>
                    <span className={styles.modal_product_meta_value}>
                      {selectedOrder.email}
                    </span>
                  </div>

                  <div className={styles.modal_product_meta_item}>
                    <span className={styles.modal_product_meta_label}>
                      آدرس
                    </span>
                    <span className={styles.modal_product_meta_value}>
                      {selectedOrder.province}، {selectedOrder.city}،{" "}
                      {selectedOrder.address}
                    </span>
                  </div>

                  <div className={styles.modal_product_meta_item}>
                    <span className={styles.modal_product_meta_label}>
                      شرکت
                    </span>
                    <span className={styles.modal_product_meta_value}>
                      {selectedOrder.company}
                    </span>
                  </div>

                  <div className={styles.modal_product_meta_item}>
                    <span className={styles.modal_product_meta_label}>
                      کد پستی
                    </span>
                    <span className={styles.modal_product_meta_value}>
                      {selectedOrder.postCode}
                    </span>
                  </div>
                </div>
              </div>

              {selectedOrder.basket && selectedOrder.basket.length > 0 && (
                <div className={styles.modal_product_info}>
                  <h3 className={styles.modal_product_description_title}>
                    سبد خرید
                  </h3>
                  <div className={styles.table_container}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>نام محصول</th>
                          <th>تعداد</th>
                          <th>قیمت واحد</th>
                          <th>قیمت کل</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder.basket.map((item, index) => (
                          <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.count}</td>
                            <td>{item.price.toLocaleString()} تومان</td>
                            <td>
                              {(item.price * item.count).toLocaleString()} تومان
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {selectedOrder.products && selectedOrder.products.length > 0 && (
                <div className={styles.modal_product_info}>
                  <h3 className={styles.modal_product_description_title}>
                    جزئیات محصولات
                  </h3>
                  {selectedOrder.products.map((product, index) => (
                    <div key={index} className={styles.modal_product_info}>
                      <div className={styles.modal_product_header}>
                        <h4 className={styles.modal_product_title}>
                          {product.name}
                        </h4>
                      </div>

                      <div className={styles.modal_product_price}>
                        {product.price.toLocaleString()} تومان
                      </div>

                      <div className={styles.modal_product_meta}>
                        <div className={styles.modal_product_meta_item}>
                          <span className={styles.modal_product_meta_label}>
                            وزن
                          </span>
                          <span className={styles.modal_product_meta_value}>
                            {product.weight} گرم
                          </span>
                        </div>

                        <div className={styles.modal_product_meta_item}>
                          <span className={styles.modal_product_meta_label}>
                            رایحه
                          </span>
                          <span className={styles.modal_product_meta_value}>
                            {product.smell}
                          </span>
                        </div>

                        <div className={styles.modal_product_meta_item}>
                          <span className={styles.modal_product_meta_label}>
                            مناسب برای
                          </span>
                          <span className={styles.modal_product_meta_value}>
                            {product.suitableFor}
                          </span>
                        </div>

                        <div className={styles.modal_product_meta_item}>
                          <span className={styles.modal_product_meta_label}>
                            امتیاز
                          </span>
                          <span className={styles.modal_product_meta_value}>
                            <span className={styles.modal_product_rating_stars}>
                              {"★".repeat(product.score)}
                              {"☆".repeat(5 - product.score)}
                            </span>
                            ({product.score} از 5)
                          </span>
                        </div>
                      </div>

                      {product.tags && product.tags.length > 0 && (
                        <div className={styles.modal_product_tags}>
                          {product.tags.map((tag, index) => (
                            <span
                              key={index}
                              className={styles.modal_product_tag}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className={styles.modal_product_description}>
                        <h5 className={styles.modal_product_description_title}>
                          توضیح کوتاه
                        </h5>
                        <p className={styles.modal_product_description_text}>
                          {product.shortDesc}
                        </p>
                      </div>

                      <div className={styles.modal_product_description}>
                        <h5 className={styles.modal_product_description_title}>
                          توضیحات کامل
                        </h5>
                        <p className={styles.modal_product_description_text}>
                          {product.longDesc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.modal_product_actions}>
              <button
                className={`${styles.modal_product_button} ${styles.modal_product_button_secondary}`}
                onClick={hideModal}
              >
                بستن
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default OrderTable;
