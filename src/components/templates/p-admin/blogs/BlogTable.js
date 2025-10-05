"use client";
import Modal from "@/components/modules/Modal/Modal";
import styles from "@/components/templates/p-admin/products/ProductTable.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { swalAlert, toastError, toastSuccess } from "@/utils/helpers";

function BlogTable({ blogs, title }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const hideModal = () => setShowModal(false);

  const showBlogDetails = (blogID) => {
    const blog = blogs.find((blog) => blog._id === blogID);
    setSelectedBlog(blog);
    setShowModal(true);
  };

  const removeBlog = async (blogID) => {
    swal({
      title: "آیا از حذف مقاله اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        if (!blogID) {
          return swalAlert("شناسه مقاله ارسال نشده است", "error", "فهمیدم");
        }

        const res = await fetch(`/api/blog/${blogID}`, {
          method: "DELETE",
        });

        if (res.status === 200) {
          toastSuccess(
            "مقاله با موفقیت حذف شد",
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
        } else if (res.status === 403) {
          toastError(
            "شما مجاز به این کار نیستید",
            "top-center",
            5000,
            false,
            true,
            true,
            true,
            undefined,
            "colored"
          );
        } else if (res.status === 401) {
          toastError(
            "فقط ادمین/مدیر سایت اجازه حذف مقاله را دارد",
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
            "شناسه مقاله ارسال نشده است",
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
            "شناسه مقاله نامعتبر است",
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
            " مقاله یافت نشد ",
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
        <div className={styles.table_container}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>شناسه</th>
                <th>عنوان</th>
                <th>نویسنده</th>
                <th>تاریخ ایجاد</th>
                <th>مشاهده جزئیات</th>
                <th>ویرایش</th>
                <th>حذف</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, index) => (
                <tr key={blog._id}>
                  <td>{index + 1}</td>
                  <td>{blog.title}</td>
                  <td>{blog.author}</td>
                  <td>
                    {new Date(blog.createdAt).toLocaleDateString("fa-IR")}
                  </td>

                  <td>
                    <button
                      onClick={() => showBlogDetails(blog._id)}
                      type="button"
                      className={styles.edit_btn}
                    >
                      مشاهده جزئیات
                    </button>
                  </td>
                  <td>
                    <button type="button" className={styles.edit_btn}>
                      <Link href={`/p-admin/blogs/${blog._id}`}>ویرایش</Link>
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => removeBlog(blog._id)}
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

      {showModal && selectedBlog && (
        <Modal
          title={`جزئیات مقاله ${selectedBlog.title}`}
          hideModal={hideModal}
        >
          <div className={styles.modal_product}>
            <div className={styles.modal_product_header}>
              <h2 className={styles.modal_product_title}>
                {selectedBlog.title}
              </h2>
            </div>

            <div className={styles.modal_product_content}>
              <div className={styles.modal_product_image_container}>
                <img
                  src={selectedBlog.img}
                  alt={selectedBlog.title}
                  fill
                  className={styles.modal_product_image}
                />
              </div>

              <div className={styles.modal_product_info}>
                <div className={styles.modal_product_meta}>
                  <div className={styles.modal_product_meta_item}>
                    <span className={styles.modal_product_meta_label}>
                      نویسنده
                    </span>
                    <span className={styles.modal_product_meta_value}>
                      {selectedBlog.author}
                    </span>
                  </div>
                </div>

                <div className={styles.modal_product_meta}>
                  <div className={styles.modal_product_meta_item}>
                    <span className={styles.modal_product_meta_label}>
                      تاریخ ایجاد
                    </span>
                    <span className={styles.modal_product_meta_value}>
                      {new Date(selectedBlog.createdAt).toLocaleDateString(
                        "fa-IR"
                      )}
                    </span>
                  </div>
                </div>

                <div className={styles.modal_product_meta}>
                  <div className={styles.modal_product_meta_item}>
                    <span className={styles.modal_product_meta_label}>
                      آخرین بروزرسانی
                    </span>
                    <span className={styles.modal_product_meta_value}>
                      {new Date(selectedBlog.updatedAt).toLocaleDateString(
                        "fa-IR"
                      )}
                    </span>
                  </div>
                </div>

                <div className={styles.modal_product_meta}>
                  <div className={styles.modal_product_meta_item}>
                    <span className={styles.modal_product_meta_label}>
                      تیتر
                    </span>
                    <span className={styles.modal_product_meta_value}>
                      {selectedBlog.titr}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.modal_product_description}>
                <h3 className={styles.modal_product_description_title}>
                  چکیده
                </h3>
                <p className={styles.modal_product_description_text}>
                  {selectedBlog.shortDesc}
                </p>
              </div>

              <div className={styles.modal_product_description}>
                <h3 className={styles.modal_product_description_title}>
                  مقاله
                </h3>
                <p className={styles.modal_product_description_text}>
                  {selectedBlog.description}
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

export default BlogTable;
