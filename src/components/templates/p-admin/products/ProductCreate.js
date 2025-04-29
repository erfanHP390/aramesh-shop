"use client";
import styles from "@/components/templates/p-user/accountDetail/AccountDetail.module.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import { swalAlert, toastError, toastSuccess } from "@/utils/helpers";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import Loading from "@/app/loading";
import Link from "next/link";

function ProductCreate() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [weight, setWeight] = useState("");
  const [suitableFor, setSuitableFor] = useState("");
  const [smell, setSmell] = useState("");
  const [tags, setTags] = useState("");
  const [img, setImg] = useState("");
  const [stock , setStock] = useState("")

  const createProduct = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("shortDesc", shortDesc);
    formData.append("longDesc", longDesc);
    formData.append("weight", weight);
    formData.append("suitableFor", suitableFor);
    formData.append("smell", smell);
    formData.append("tags", tags);
    formData.append("img", img);
    formData.append("stock" , stock)
    const res = await fetch(`/api/product`, {
      method: "POST",
      body: formData,
    });

    
    const data = await res.json();

    if (res.status === 201) {
      setIsLoading(false);
      toastSuccess(
        "محصول با موفقیت ایجاد شد",
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
         "فقط ادمین/مدیر سایت اجازه ایجاد محصول را دارد",
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
          <span>ایجاد محصول</span>
          <Link href="/p-admin/products">همه محصولات</Link>
        </h1>
        <div className={styles.details_main}>
          <section>
            <section>
              <div className={styles.uploader}>
                <img src={img && img} alt="" />
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
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="لطفا نام محصول خود را وارد کنید"
                type="text"
              />
            </div>
            <div>
              <label>قیمت محصول</label>
              <input
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder="لطفا قیمت محصول خود را وارد کنید"
                type="number"
              />
            </div>
            <div>
              <label>وضعیت موجودی محصول</label>
              <input
                value={stock}
                onChange={(event) => setStock(event.target.value)}
                placeholder="لطفا وضعیت موجودی محصول خود را وارد کنید"
                type="number"
              />
            </div>
            <div>
              <label>توضیحات کوتاه</label>
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
                value={longDesc}
                onChange={(event) => setLongDesc(event.target.value)}
                className={styles.formTextarea}
                type="text"
              />
            </div>
            <div>
              <label>وزن محصول</label>
              <input
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
                placeholder="لطفا وزن محصول را وارد کنید"
                type="number"
              />
            </div>
            <div>
              <label>مناسب برای</label>
              <input
                value={suitableFor}
                onChange={(event) => setSuitableFor(event.target.value)}
                placeholder="لطفا گروه افراد مناسب محصول را وارد کنید"
                type="text"
              />
            </div>
            <div>
              <label>نوع بو و طعم محصول</label>
              <input
                value={smell}
                onChange={(event) => setSmell(event.target.value)}
                placeholder="لطفا نوع و بو و طعم محصول را وارد کنید"
                type="text"
              />
            </div>
            <div>
              <label>برچسب های محصول</label>
              <input
                value={tags}
                onChange={(event) => setTags(event.target.value)}
                placeholder={`لطفا برچسب های محصول را مانند نمونه وارد نمایید : "قهوه،ترک"`}
                type="text"
              />
            </div>
          </section>
        </div>
        <button
          onClick={() => {
            setIsLoading(true);
            createProduct();
          }}
          type="submit"
          className={styles.submit_btn}
        >
          {isLoading ? <Loading /> : "ثبت محصول"}
        </button>
      </div>
    </main>
  );
}

export default ProductCreate;
