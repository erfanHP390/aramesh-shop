"use client";
import React, { useState } from "react";
import styles from "./ProductTable.module.css";
import Modal from "@/components/modules/Modal/Modal";
import { swalAlert, toastError, toastSuccess } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import Link from "next/link";

function ProductTable({ products, title }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const hideModal = () => setShowModal(false);

  const showProductDetails = (productID) => {
    const product = products.find((product) => product._id === productID);
    setSelectedProduct(product);
    setShowModal(true);
  };

  const removeProduct = async (productID) => {
    swal({
      title: "آیا از حذف محصول اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        if (!productID) {
          return swalAlert("شناسه محصول ارسال نشده است", "error", "فهمیدم");
        }

        const res = await fetch(`/api/product/${productID}`, {
          method: "DELETE",
        });

        if (res.status === 200) {
          toastSuccess(
            "محصول با موفقیت حذف شد",
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
             "فقط ادمین/مدیر سایت اجازه حذف محصول را دارد",
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
            "شناسه محصول ارسال نشده است",
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
            "شناسه محصول نامعتبر است",
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
            "محصول یافت نشد",
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
  };

  return (
    <>
      <div>
        <div>
          <h1 className={styles.title}>
            <span>{title}</span>
            <Link href="/p-admin/products/create"> ایجاد محصول </Link>
          </h1>
        </div>
        <div className={styles.table_container}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>شناسه</th>
                <th>نام</th>
                <th>قیمت</th>
                <th>امتیاز</th>
                <th>مشاهده جزئیات</th>
                <th>ویرایش</th>
                <th>حذف</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.price.toLocaleString()}</td>
                  <td>{product.score}</td>

                  <td>
                    <button
                      onClick={() => showProductDetails(product._id)}
                      type="button"
                      className={styles.edit_btn}
                    >
                      مشاهده جزئیات
                    </button>
                  </td>
                  <td>
                    <button type="button" className={styles.edit_btn}>
                      <Link href={`/p-admin/products/${product._id}`}>
                        ویرایش
                      </Link>
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => removeProduct(product._id)}
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

      {showModal && selectedProduct && (
        <Modal
          title={`جزئیات محصول ${selectedProduct.name}`}
          hideModal={hideModal}
        >
          <div className={styles.modal_product}>
            <div className={styles.modal_product_header}>
              <h2 className={styles.modal_product_title}>
                {selectedProduct.name}
              </h2>
            </div>

            <div className={styles.modal_product_content}>
              <div className={styles.modal_product_image_container}>
                <img
                  src={selectedProduct.img}
                  alt={selectedProduct.name}
                  fill
                  className={styles.modal_product_image}
                />
              </div>

              <div className={styles.modal_product_info}>
                <div className={styles.modal_product_price}>
                  {selectedProduct.price.toLocaleString()} تومان
                </div>

                <div className={styles.modal_product_rating}>
                  <span className={styles.modal_product_rating_stars}>
                    {"★".repeat(selectedProduct.score)}
                    {"☆".repeat(5 - selectedProduct.score)}
                  </span>
                  ({selectedProduct.score} از 5)
                </div>

                <div className={styles.modal_product_meta}>
                  <div className={styles.modal_product_meta_item}>
                    <span className={styles.modal_product_meta_label}>وزن</span>
                    <span className={styles.modal_product_meta_value}>
                      {selectedProduct.weight} گرم
                    </span>
                  </div>

                  <div className={styles.modal_product_meta_item}>
                    <span className={styles.modal_product_meta_label}>
                      رایحه
                    </span>
                    <span className={styles.modal_product_meta_value}>
                      {selectedProduct.smell}
                    </span>
                  </div>

                  <div className={styles.modal_product_meta_item}>
                    <span className={styles.modal_product_meta_label}>
                      مناسب برای
                    </span>
                    <span className={styles.modal_product_meta_value}>
                      {selectedProduct.suitableFor}
                    </span>
                  </div>
                </div>

                {selectedProduct.tags && selectedProduct.tags.length > 0 && (
                  <div className={styles.modal_product_tags}>
                    {selectedProduct.tags.map((tag, index) => (
                      <span key={index} className={styles.modal_product_tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.modal_product_description}>
                <h3 className={styles.modal_product_description_title}>
                  توضیحات کوتاه
                </h3>
                <p className={styles.modal_product_description_text}>
                  {selectedProduct.shortDesc}
                </p>
              </div>

              <div className={styles.modal_product_description}>
                <h3 className={styles.modal_product_description_title}>
                  توضیحات کامل
                </h3>
                <p className={styles.modal_product_description_text}>
                  {selectedProduct.longDesc}
                </p>
              </div>
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

export default ProductTable;
