"use client"
import React, { useEffect, useState } from 'react'
import styles from "./Details.module.css"
import stateData from "@/utils/stateData";


function Details() {
    const [createAccount, setCreateAccount] = useState(false);
    const [priceCart , setPriceCart] = useState([])

      useEffect(() => {
        const getPricesCart = JSON.parse(localStorage.getItem("priceCart")) || [];
    
        setPriceCart(getPricesCart);
      }, []);


    return (
        <div className={styles.details}>
            <p className={styles.details_title}>جزئیات صورتحساب</p>
            <form className={styles.form}>
                {/* گروه فیلدهای نام و نام خانوادگی */}
                <div className={styles.groups}>
                    <div className={styles.group}>
                        <label className={styles.input_label}>
                            نام خانوادگی <span>*</span>
                        </label>
                        <input 
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
                            type="text" 
                            placeholder="نام خود را وارد کنید"
                            className={styles.form_input}
                        />
                    </div>
                </div>

                {/* فیلد نام شرکت */}
                <div className={styles.group}>
                    <label className={styles.input_label}>
                        نام شرکت (اختیاری)
                    </label>
                    <input 
                        type="text" 
                        placeholder="نام شرکت (در صورت وجود)"
                        className={styles.form_input}
                    />
                </div>

                {/* گروه فیلدهای استان و شهر */}
                <div className={styles.groups}>
                   <div className={styles.group}>
                        <label className={styles.select_label}>
                            شهر<span>*</span>
                        </label>
                    <input  value={priceCart?.city} disabled />
                    </div>

                    <div className={styles.group}>
                        <label className={styles.select_label}>
                            استان<span>*</span>
                        </label>
                        <input  value={priceCart?.province} disabled />
                    </div>
                    
 
                </div>

                {/* فیلد آدرس */}
                <div className={styles.group}>
                    <label className={styles.input_label}>
                        آدرس خیابان<span>*</span>
                    </label>
                    <input 
                        type="text" 
                        placeholder="آدرس کامل خود را وارد کنید"
                        className={styles.form_input}
                    />
                </div>

                {/* فیلد کدپستی */}
                <div className={styles.group}>
                    <label className={styles.input_label}>
                        کدپستی (بدون فاصله)<span>*</span>
                    </label>
                    <input 
                        type="text" 
                        placeholder="کدپستی ۱۰ رقمی"
                        className={styles.form_input}
                    />
                </div>

                {/* فیلد شماره موبایل */}
                <div className={styles.group}>
                    <label className={styles.input_label}>
                        شماره موبایل <span>*</span>
                    </label>
                    <input 
                        type="tel" 
                        placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                        className={styles.form_input}
                    />
                </div>

                {/* فیلد ایمیل */}
                <div className={styles.group}>
                    <label className={styles.input_label}>
                        ایمیل <span>*</span>
                    </label>
                    <input 
                        type="email" 
                        placeholder="example@domain.com"
                        className={styles.form_input}
                    />
                </div>

                {/* بخش ایجاد حساب کاربری */}
                <div className={styles.create_account}>
                    <div className={styles.account_toggle} onClick={() => setCreateAccount(!createAccount)}>
                        <h5>ایجاد حساب کاربری</h5>
                        <span>{createAccount ? '−' : '+'}</span>
                    </div>
                    
                    {createAccount && (
                        <section className={styles.account_section}>
                            <div className={styles.group}>
                                <label className={styles.input_label}>
                                    رمزعبور (اختیاری)
                                </label>
                                <input 
                                    type="password" 
                                    placeholder="رمز عبور دلخواه"
                                    className={styles.form_input}
                                />
                            </div>
                            <button 
                                type="button" 
                                className={styles.verify_button}
                            >
                                شماره موبایل را تایید کنید
                            </button>
                        </section>
                    )}
                </div> 

                {/* فیلد توضیحات سفارش */}
                <div className={styles.group}>
                    <label className={styles.input_label}>
                        توضیحات سفارش (اختیاری)
                    </label>
                    <textarea 
                        cols="30" 
                        rows="5" 
                        placeholder="اگر توضیحی در مورد سفارش خود دارید در اینجا ثبت کنید"
                        className={styles.form_textarea}
                    ></textarea>
                </div>
            </form>
        </div>
    )
}

export default Details