"use client";
import React, { useState } from "react";
import styles from "@/components/templates/p-user/accountDetail/AccountDetail.module.css";
import { IoMdStar } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import { toastError, toastSuccess } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

function ProductDetails({ product }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [ID, setID] = useState(product._id);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [shortDesc, setShortDesc] = useState(product.shortDesc);
  const [longDesc, setLongDesc] = useState(product.longDesc);
  const [weight, setWeight] = useState(product.weight);
  const [suitableFor, setSuitableFor] = useState(product.suitableFor);
  const [smell, setSmell] = useState(product.smell);
  const [score, setScore] = useState(product.score);
  const [tags, setTags] = useState(product.tags);
  const [img, setImg] = useState("");

  const updateProduct = async () => {
    const formData = new FormData();
    formData.append("name", name || product.name);
    formData.append("price", price || product.price);
    formData.append("shortDesc", shortDesc || product.shortDesc);
    formData.append("longDesc", longDesc || product.longDesc);
    formData.append("weight", weight || product.weight);
    formData.append("suitableFor", suitableFor || product.suitableFor);
    formData.append("smell", smell || product.smell);
    formData.append("score", String(score || product.score));
    formData.append("tags", tags || product.tags);
    formData.append("img", img || product.img);

    const res = await fetch(`/api/product/edit/${ID}`, {
      method: "PUT",
      body: formData,
    });

    const data = await res.json();

    if (res.status === 200) {
      setIsLoading(false);
      toastSuccess(
        "محصول با موفقیت به‌روزرسانی شد",
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
        "فقط ادمین/مدیر سایت اجازه ویرایش جزییات محصول را دارد",
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
        "لطفا  آیدی محصول را وارد نمایید",
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
      setIsLoading(false);
      toastError(
        " محصول یافت نشد",
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
        <div className={styles.details_main}>
          <section>
            <section>
              <div className={styles.uploader}>
                <img src={img ? img : product.img} alt="" />
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
                          setImg(e.target.files[0]);
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
                placeholder="لطفا وزن محصول خود را وارد کنید"
                type="number"
              />
            </div>
            <div>
              <label>مناسب برای</label>
              <input
                value={suitableFor}
                onChange={(event) => setSuitableFor(event.target.value)}
                placeholder="لطفا وضعیت گروه محصول خود را وارد کنید"
                type="text"
              />
            </div>
            <div>
              <label>بووطعم محصول</label>
              <input
                value={smell}
                onChange={(event) => setSmell(event.target.value)}
                placeholder="لطفا بووطعم محصول خود را وارد کنید"
                type="text"
              />
            </div>
            <div>
              <label>برچسب های محصول</label>
              <input
                value={tags}
                onChange={(event) => setTags(event.target.value)}
                placeholder="لطفا برچسب های محصول خود را وارد کنید"
                type="text"
              />
            </div>
            <div className={styles.rate}>
              <p>امتیاز شما :</p>
              <div>
                <IoMdStar
                  onClick={() => setScore(5)}
                  className={score === 5 ? `${styles.active}` : null}
                />
                <IoMdStar
                  onClick={() => setScore(4)}
                  className={score === 4 ? `${styles.active}` : null}
                />
                <IoMdStar
                  onClick={() => setScore(3)}
                  className={score === 3 ? `${styles.active}` : null}
                />
                <IoMdStar
                  onClick={() => setScore(2)}
                  className={score === 2 ? `${styles.active}` : null}
                />
                <IoMdStar
                  onClick={() => setScore(1)}
                  className={score === 1 ? `${styles.active}` : null}
                />
              </div>
            </div>
          </section>
        </div>
        <button
          onClick={() => {
            setIsLoading(true);
            updateProduct();
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

export default ProductDetails;
