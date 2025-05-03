"use client";
import React, { useState, useEffect } from "react";
import { IoCloudUploadOutline, IoMdStar } from "react-icons/io5";
import styles from "@/components/templates/checkout/ordersDetails/OrdersDetails.module.css";
import tableStyles from "@/components/templates/cart/table/Table.module.css";
import subStyles from "@/components/templates/p-user/accountDetail/AccountDetail.module.css";
import { swalAlert, toastError, toastSuccess } from "@/utils/helpers";
import { validateEmail, validatePassword, validatePhone } from "@/utils/auth";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import stateData from "@/utils/stateData";
import Select from "react-select";
import totalStyles from "@/components/templates/cart/table/totals.module.css";

function OrdersADetails({ order }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [stateOptions] = useState(stateData());
  const [stateSelectedOption, setStateSelectedOption] = useState(null);
  const [citySelectedOption, setCitySelectedOption] = useState(null);
  const [cityOptions, setCityOptions] = useState([]);
  const [citySelectorDisabled, setCitySelectorDisabled] = useState(true);
  const [formData, setFormData] = useState({
    firstName: order.firstName,
    lastName: order.lastName,
    company: order.company || "فاقدشرکت",
    province: order.province,
    city: order.city,
    address: order.address,
    postCode: order.postCode,
    mobile: order.mobile,
    email: order.email,
    description: order.description || "فاقدتوضیحات",
    basket: order.basket,
    orderCode: order.orderCode,
    totalPrice: order.totalPrice,
    postPrice: order.postPrice,
    isPay: order.isPay || false,
    products: order.products || [],
  });

  useEffect(() => {
    const newTotalPrice = formData.basket.reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );
    setFormData((prev) => ({ ...prev, totalPrice: newTotalPrice }));
  }, [formData.basket]);

  useEffect(() => {
    if (order.province) {
      const state = stateOptions.find(
        (option) => option.label === order.province
      );
      if (state) {
        setStateSelectedOption({
          label: state.label,
          value: state.value,
          price: state.price,
        });

        const cities = state.value.map((city) => ({
          label: city,
          value: city,
        }));

        setCityOptions(cities);

        if (order.city) {
          setCitySelectedOption({
            label: order.city,
            value: order.city,
          });
        }

        setCitySelectorDisabled(false);
      }
    }
  }, [order, stateOptions]);

  useEffect(() => {
    if (stateSelectedOption) {
      const cities = stateSelectedOption.value.map((city) => ({
        label: city,
        value: city,
      }));
      setCityOptions(cities);
      setCitySelectorDisabled(false);
      setFormData((prev) => ({
        ...prev,
        province: stateSelectedOption.label,
        postPrice: stateSelectedOption.price,
      }));
    } else {
      setCityOptions([]);
      setCitySelectedOption(null);
      setCitySelectorDisabled(true);
      setFormData((prev) => ({
        ...prev,
        province: "",
        city: "",
        postPrice: 0,
      }));
    }
  }, [stateSelectedOption]);

  useEffect(() => {
    if (citySelectedOption) {
      setFormData((prev) => ({
        ...prev,
        city: citySelectedOption.value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        city: "",
      }));
    }
  }, [citySelectedOption]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBasketChange = (itemId, newCount) => {
    setFormData((prev) => ({
      ...prev,
      basket: prev.basket.map((item) =>
        item.id === itemId ? { ...item, count: newCount } : item
      ),
    }));
  };

  const handleRemoveItem = (itemId) => {
    setFormData((prev) => ({
      ...prev,
      basket: prev.basket.filter((item) => item.id !== itemId),
      products: prev.products.filter(
        (productId) => productId.toString() !== itemId
      ),
    }));
  };

  const editProduct = async (orderID) => {
    setIsLoading(true);

    const requiredFields = [
      "firstName",
      "lastName",
      "province",
      "city",
      "address",
      "postCode",
      "mobile",
      "email",
      "basket",
      "orderCode",
      "totalPrice",
      "postPrice",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        setIsLoading(false);
        return swalAlert("لطفا تمامی موارد را پر کنید", "error", "فهمیدم");
      }
    }

    if (!validateEmail(formData.email)) {
      setIsLoading(false);
      return swalAlert("ایمیل معتبر وارد نمایید", "error", "فهمیدم");
    }

    if (!validatePhone(formData.mobile)) {
      setIsLoading(false);
      return swalAlert("شماره موبایل معتبر وارد نمایید", "error", "فهمیدم");
    }

    const res = await fetch(`/api/orders/edit/${orderID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.status === 200) {
      setIsLoading(false);
      toastSuccess(
        "سفارش با موفیقت بروزرسانی شد",
        "top-center",
        5000,
        false,
        true,
        true,
        true,
        undefined,
        "colored"
      );
      router.refresh()
    } else if (res.status === 401) {
      setIsLoading(false);
      toastError(
        "فقط ادمین/مدیر سایت اجازه ویرایش سفارش را دارد",
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
        "شناسه سفارش باید ارسال شود",
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
        "شناسه سفارش نامعتبر است",
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
        "سفارش یافت نشد.لطفا دوباره تلاش کنید",
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
  };

  const customStyles = {
    control: (base, { isFocused }) => ({
      ...base,
      backgroundColor: "#A68A64",
      borderColor: isFocused ? "#FFD700" : "rgba(255, 255, 255, 0.3)",
      borderWidth: "1px",
      borderRadius: "8px",
      minHeight: "48px",
      boxShadow: isFocused ? "0 0 0 1px #FFD700" : "none",
      "&:hover": {
        borderColor: "#FFD700",
      },
      cursor: "pointer",
      padding: "0 8px",
    }),
    placeholder: (base) => ({
      ...base,
      color: "rgba(255, 255, 255, 0.7)",
      fontSize: "0.95rem",
      textAlign: "right",
      direction: "rtl",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#FFFFFF",
      fontSize: "0.95rem",
      direction: "rtl",
      textAlign: "right",
    }),
    input: (base) => ({
      ...base,
      color: "#FFFFFF",
      direction: "rtl",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#6F4E37",
      border: "1px solid rgba(255, 215, 0, 0.2)",
      borderRadius: "8px",
      overflow: "hidden",
      marginTop: "4px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected
        ? "#CC5500"
        : isFocused
        ? "rgba(212, 181, 140, 0.3)"
        : "transparent",
      color: "#FFFFFF",
      fontSize: "0.9rem",
      padding: "12px 16px",
      direction: "rtl",
      textAlign: "right",
      "&:active": {
        backgroundColor: "#CC5500",
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "rgba(255, 255, 255, 0.7)",
      "&:hover": {
        color: "#FFD700",
      },
    }),
  };

  return (
    <>
      <div className={styles.details}>
        <form className={styles.form}>
          <div className={styles.groups}>
            <div className={styles.group}>
              <label className={styles.input_label}>
                کد سفارش <span>*</span>
              </label>
              <input
                name="orderCode"
                value={formData.orderCode}
                type="text"
                disabled
                className={styles.form_input}
              />
            </div>
          </div>

          <div className={styles.groups}>
            <div className={styles.group}>
              <label className={styles.input_label}>
                نام خانوادگی <span>*</span>
              </label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                type="text"
                placeholder="نام خانوادگی خود را وارد کنید"
                className={styles.form_input}
              />
            </div>

            <div className={styles.group}>
              <label className={styles.input_label}>
                نام <span>*</span>
              </label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                type="text"
                placeholder="نام خود را وارد کنید"
                className={styles.form_input}
              />
            </div>
          </div>

          <div className={styles.group}>
            <label className={styles.input_label}>نام شرکت/شغل (اختیاری)</label>
            <input
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              type="text"
              placeholder="نام شرکت (در صورت وجود)"
              className={styles.form_input}
            />
          </div>

          <div className={styles.groups}>
            <div className={styles.group}>
              <label className={styles.select_label}>
                استان<span>*</span>
              </label>
              <Select
                value={stateSelectedOption}
                onChange={setStateSelectedOption}
                options={stateOptions}
                placeholder="انتخاب استان"
                isRtl={true}
                isSearchable={true}
                styles={customStyles}
                noOptionsMessage={() => "استانی یافت نشد"}
                className="react-select-container"
                classNamePrefix="react-select"
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.label}
              />
            </div>

            <div className={styles.group}>
              <label className={styles.select_label}>
                شهر<span>*</span>
              </label>
              <Select
                value={citySelectedOption}
                onChange={setCitySelectedOption}
                options={cityOptions}
                isDisabled={citySelectorDisabled}
                placeholder={
                  citySelectorDisabled
                    ? "ابتدا استان را انتخاب کنید"
                    : "انتخاب شهر"
                }
                isRtl={true}
                isSearchable={true}
                styles={customStyles}
                noOptionsMessage={() => "شهری یافت نشد"}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>
          </div>

          <div className={styles.group}>
            <label className={styles.input_label}>
              آدرس خیابان<span>*</span>
            </label>
            <input
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              type="text"
              placeholder="آدرس کامل خود را وارد کنید"
              className={styles.form_input}
            />
          </div>

          <div className={styles.group}>
            <label className={styles.input_label}>
              کدپستی (بدون فاصله)<span>*</span>
            </label>
            <input
              name="postCode"
              value={formData.postCode}
              onChange={handleInputChange}
              type="text"
              placeholder="کدپستی ۱۰ رقمی"
              className={styles.form_input}
            />
          </div>

          <div className={styles.group}>
            <label className={styles.input_label}>
              شماره موبایل <span>*</span>
            </label>
            <input
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              type="tel"
              placeholder="۰۹۱۲۳۴۵۶۷۸۹"
              className={styles.form_input}
            />
          </div>

          <div className={styles.group}>
            <label className={styles.input_label}>
              قیمت کل <span>*</span>
            </label>
            <input
              name="totalPrice"
              value={formData.totalPrice.toLocaleString()}
              type="text"
              disabled
              className={styles.form_input}
            />
          </div>

          <div className={styles.group}>
            <label className={styles.input_label}>
              قیمت ارسال <span>*</span>
            </label>
            <input
              name="postPrice"
              value={formData.postPrice.toLocaleString()}
              type="text"
              disabled
              className={styles.form_input}
              placeholder={`هزینه ارسال: ${formData.postPrice.toLocaleString()} تومان`}
            />
          </div>

          <div className={styles.group}>
            <label className={styles.input_label}>
              ایمیل <span>*</span>
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              type="email"
              placeholder="example@domain.com"
              className={styles.form_input}
            />
          </div>

          <div className={styles.group}>
            <label className={styles.input_label}>
              توضیحات سفارش (اختیاری)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              cols="30"
              rows="5"
              placeholder="اگر توضیحی در مورد سفارش خود دارید در اینجا ثبت کنید"
              className={styles.form_textarea}
            ></textarea>
          </div>
        </form>
      </div>

      <div style={{ direction: "ltr" }} className={tableStyles.tabel_container}>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>جمع جزء</th>
              <th>تعداد</th>
              <th>قیمت</th>
              <th>محصول</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {formData.basket.map((item) => (
              <tr key={item.id}>
                <td>{(item.price * item.count).toLocaleString()} تومان</td>
                <td className={tableStyles.counter}>
                  <div>
                    <button
                      onClick={() =>
                        handleBasketChange(item.id, Math.max(1, item.count - 1))
                      }
                      disabled={item.count <= 1}
                    >
                      -
                    </button>
                    <span>{item.count}</span>
                    <button
                      onClick={() =>
                        handleBasketChange(item.id, item.count + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className={tableStyles.price}>
                  {item.price.toLocaleString()} تومان
                </td>
                <td className={tableStyles.product}>
                  <Link href={`/product/${item.id}`}>{item.name}</Link>
                </td>
                <td>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className={tableStyles.delete_btn}
                  >
                    <IoMdClose className={tableStyles.delete_icon} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        onClick={() => editProduct(order._id)}
        className={subStyles.submit_btn}
        disabled={isLoading}
      >
        {isLoading ? <Loading /> : "ثبت تغییرات"}
      </button>
    </>
  );
}

export default OrdersADetails;
