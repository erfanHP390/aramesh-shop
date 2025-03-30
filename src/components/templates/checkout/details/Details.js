"use client"
import React, { useEffect, useState } from 'react'
import styles from "./Details.module.css"
import Select from "react-select";
import stateData from "@/utils/stateData";

const stateOptions = stateData();

function Details() {
    const [stateSelectedOption, setStateSelectedOption] = useState(null); 
    const [citySelectedOption, setCitySelectedOption] = useState(null);
    const [citySelectorDisabel, setCitySelectorDisabel] = useState(true);
    const [cityOption, setCityOption] = useState([]);
    const [createAccount, setCreateAccount] = useState(false);

    useEffect(() => {
        setCitySelectedOption(null);
        if (stateSelectedOption?.value) {
            const city = stateSelectedOption?.value.map(data => ({
                value: data,
                label: data
            }));
            setCityOption(city);
            setCitySelectorDisabel(false);
        }
    }, [stateSelectedOption]);

    const customStyles = {
        control: (base, { isFocused }) => ({
            ...base,
            backgroundColor: '#A68A64',
            borderColor: isFocused ? '#FFD700' : 'rgba(255, 255, 255, 0.3)',
            borderWidth: '1px',
            borderRadius: '8px',
            minHeight: '48px',
            boxShadow: isFocused ? '0 0 0 1px #FFD700' : 'none',
            '&:hover': {
                borderColor: '#FFD700'
            },
            cursor: 'pointer',
            padding: '0 8px'
        }),
        placeholder: (base) => ({
            ...base,
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.95rem',
            textAlign: 'right',
            direction: 'rtl'
        }),
        singleValue: (base) => ({
            ...base,
            color: '#FFFFFF',
            fontSize: '0.95rem',
            direction: 'rtl',
            textAlign: 'right'
        }),
        input: (base) => ({
            ...base,
            color: '#FFFFFF',
            direction: 'rtl'
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: '#6F4E37',
            border: '1px solid rgba(255, 215, 0, 0.2)',
            borderRadius: '8px',
            overflow: 'hidden',
            marginTop: '4px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        }),
        option: (base, { isFocused, isSelected }) => ({
            ...base,
            backgroundColor: isSelected 
                ? '#CC5500' 
                : isFocused 
                ? 'rgba(212, 181, 140, 0.3)' 
                : 'transparent',
            color: '#FFFFFF',
            fontSize: '0.9rem',
            padding: '12px 16px',
            direction: 'rtl',
            textAlign: 'right',
            '&:active': {
                backgroundColor: '#CC5500'
            }
        }),
        indicatorSeparator: () => ({
            display: 'none'
        }),
        dropdownIndicator: (base) => ({
            ...base,
            color: 'rgba(255, 255, 255, 0.7)',
            '&:hover': {
                color: '#FFD700'
            }
        })
    };

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
                            استان<span>*</span>
                        </label>
                        <Select
                            defaultValue={stateSelectedOption}
                            onChange={setStateSelectedOption}
                            isClearable={true}
                            placeholder="انتخاب استان"
                            isRtl={true}
                            isSearchable={true}
                            options={stateOptions}
                            styles={customStyles}
                            noOptionsMessage={() => "استانی یافت نشد"}
                            className="react-select-container"
                            classNamePrefix="react-select"
                        />
                    </div>
                    
                    <div className={styles.group}>
                        <label className={styles.select_label}>
                            شهر<span>*</span>
                        </label>
                        <Select
                            defaultValue={citySelectedOption}
                            onChange={setCitySelectedOption}
                            isDisabled={citySelectorDisabel}
                            isClearable={true}
                            isRtl={true}
                            isSearchable={true}
                            options={cityOption}
                            placeholder={citySelectorDisabel ? "ابتدا استان را انتخاب کنید" : "انتخاب شهر"}
                            styles={customStyles}
                            noOptionsMessage={() => "شهری یافت نشد"}
                            className="react-select-container"
                            classNamePrefix="react-select"
                        />
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