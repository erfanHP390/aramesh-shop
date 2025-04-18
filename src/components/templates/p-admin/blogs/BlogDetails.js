"use client";
import React, { useState } from "react";
import styles from "@/components/templates/p-user/accountDetail/AccountDetail.module.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import { swalAlert, toastError, toastSuccess } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

function BlogDetails({ blog }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [ID, setID] = useState(blog._id);
  const [title, setTitle] = useState(blog.title);
  const [titr, setTitr] = useState(blog.titr);
  const [shortDesc, setShortDesc] = useState(blog.shortDesc);
  const [description, setDescription] = useState(blog.description);
  const [author, setAuthor] = useState(blog.author);
  const [img, setImg] = useState("");

  const updateBlog = async () => {
    const formData = new FormData();
    formData.append("title", title || blog.title);
    formData.append("titr", titr || blog.titr);
    formData.append("shortDesc", shortDesc || blog.shortDesc);
    formData.append("description", description || blog.description);
    formData.append("author", author || blog.author);
    formData.append("img", img || blog.img);

    const res = await fetch(`/api/blog/edit/${ID}`, {
      method: "PUT",
      body: formData,
    });

    const data = await res.json();

    if (res.status === 200) {
      setIsLoading(false);
      toastSuccess(
        "مقاله با موفقیت ویرایش شد",
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
      setIsLoading(false);
      toastError(
        "فقط ادمین/مدیر سایت اجازه ویرایش مقاله را دارد",
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
        "لطفا  آیدی مقاله را وارد نمایید",
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
      setIsLoading(false);
      toastError(
        " مقاله یافت نشد",
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
        data.message || "خطا در سرور، لطفا بعدا تلاش کنید",
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
  };

  return (
    <main>
      <div className={styles.details}>
        <h1 className={styles.title}>
          <span>جزئیات مقاله</span>
        </h1>
        <div className={styles.details_main}>
          <section>
            <section>
              <div className={styles.uploader}>
                <img src={img ? img : blog.img} alt="" />
                <div>
                  <div>
                    <button>
                      <IoCloudUploadOutline />
                      {img ? "تصویر با موفقیت بارگزاری شد" : "بارگزاری عکس"}
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setImg(e.target.files[0]); // ذخیره فایل در state
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </section>
            <div>
              <label>نام محصول</label>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="لطفا عنوان مقاله خود را وارد کنید"
                type="text"
              />
            </div>
            <div>
              <label>سرتیتر مقاله</label>
              <input
                value={titr}
                onChange={(event) => setTitr(event.target.value)}
                placeholder="لطفا سرتیتر مقاله خود را وارد کنید"
                type="text"
              />
            </div>
            <div>
              <label>چکیده</label>
              <br />
              <textarea
                value={shortDesc}
                onChange={(event) => setShortDesc(event.target.value)}
                className={styles.formTextarea}
                type="text"
              />
            </div>
            <div>
              <label>توضیحات بلند</label>
              <br />
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className={styles.formTextarea}
                type="text"
              />
            </div>
            <div>
              <label>نویسنده</label>
              <input
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
                placeholder="لطفا نام نویسنده را وارد کنید"
                type="text"
              />
            </div>
          </section>
        </div>
        <button
          onClick={() => {
            setIsLoading(true);
            updateBlog();
          }}
          type="submit"
          className={styles.submit_btn}
        >
          {isLoading ? <Loading /> : "ثبت ویرایش"}
        </button>
      </div>
    </main>
  );
}

export default BlogDetails;
