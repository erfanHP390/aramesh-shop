"use client"
import styles from "@/components/templates/p-user/accountDetail/AccountDetail.module.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import { swalAlert, toastError, toastSuccess } from "@/utils/helpers";
import { useRouter } from "next/navigation";


import React, { useState } from 'react'
import Loading from "@/app/loading";

function BlogCreate() {


    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
  
    const [title, setTitle] = useState("");
    const [titr, setTitr] = useState("");
    const [shortDesc, setShortDesc] = useState("");
    const [description, setDescription] = useState("");
    const [author, setAuthor] = useState("");
    const [img , setImg] = useState("")
  
    
  
    const createBlog = async () => {
  
      const formData = new FormData()
      formData.append('title', title  )
      formData.append('titr', titr  )
      formData.append('shortDesc', shortDesc  )
      formData.append('description', description  )
      formData.append('author', author )
      formData.append('img' , img )
  
      const res = await fetch(`/api/blog` , {
          method: "POST",
          body: formData
      })
  
      const data = await res.json()
  
      if (res.status === 201) {
          setIsLoading(false);
          toastSuccess(
            "مقاله با موفقیت ایجاد شد",
            "top-center",
            5000,
            false,
            true,
            true,
            true,
            undefined,
            "colored"
          );
          router.replace("/p-admin/blogs")
      } else if (res.status === 400) {
          setIsLoading(false);
          toastError(
             "لطفا تمامی موارد را وارد نمایید",
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
          setIsLoading(false);
          toastError(
             "فقط ادمین/مدیر سایت اجازه ایجاد مقاله را دارد",
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
  
    }


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
                        <img
                          src={img && img }
                          alt=""
                        />
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
            <label>نام مقاله</label>
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
      <button onClick={() => {
          setIsLoading(true)
          createBlog()
      }} type="submit" className={styles.submit_btn}>
        {isLoading ? <Loading /> : "ثبت مقاله"}
      </button>
    </div>
  </main>
  )
}

export default BlogCreate

