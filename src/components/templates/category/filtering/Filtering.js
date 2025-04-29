"use client";
import { useState, useEffect, useRef } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import Product from "@/components/modules/product/Product";
import MultiRangeSlider from "../multiRange/MultiRangeSlider";
import { FiFilter, FiX } from "react-icons/fi";
import styles from "./Filtering.module.css";

export default function Filtering() {
  const [minValue, setMinValue] = useState(140000);
  const [maxValue, setMaxValue] = useState(6790000);
  const [showFilter, setShowFilter] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const priceFilterHandler = () => {
    alert(`فیلتر قیمت: ${minValue.toLocaleString()} تا ${maxValue.toLocaleString()} تومان`);
  };

  useEffect(() => {
    if (!isMounted) return;

    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div className={styles.filter_container}>
      <button
        className={styles.toggle_btn}
        onClick={() => setShowFilter(!showFilter)}
      >
        {showFilter ? (
          <>
            <FiX className={styles.toggle_icon} />
            <span>بستن فیلترها</span>
          </>
        ) : (
          <>
            <FiFilter className={styles.toggle_icon} />
            <span>نمایش فیلترها</span>
          </>
        )}
      </button>

      <div
        ref={sidebarRef}
        className={`${styles.filter_sidebar} ${showFilter ? styles.visible : ""}`}
      >
        <div className={styles.sidebar_content}>
          <div className={styles.filter_section}>
            <h3 className={styles.section_title}>محدوده قیمت</h3>
            <MultiRangeSlider
              min={140000}
              max={6790000}
              onChange={({ min, max }) => {
                setMinValue(min);
                setMaxValue(max);
              }}
            />
            <button 
              className={styles.apply_btn}
              onClick={priceFilterHandler}
            >
              اعمال فیلتر
            </button>
          </div>

          <div className={styles.filter_section}>
            <h3 className={styles.section_title}>دسته‌بندی</h3>
            <ul className={styles.category_list}>
              {['قهوه اسپرسو', 'قهوه فرانسه', 'دستگاه‌ها', 'لوازم جانبی'].map((cat, i) => (
                <li key={i} className={styles.category_item}>
                  <label>
                    <input type="checkbox" />
                    <span className={styles.checkmark}></span>
                    {cat}
                    <span className={styles.count}>({Math.floor(Math.random() * 20) + 5})</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.filter_section}>
            <h3 className={styles.section_title}>امتیاز</h3>
            <ul className={styles.rating_list}>
              {[5, 4, 3].map((stars) => (
                <li key={stars} className={styles.rating_item}>
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                      i < stars ? 
                        <FaStar key={i} className={styles.filled_star} /> : 
                        <FaRegStar key={i} className={styles.empty_star} />
                    ))}
                  </div>
                  <span>({Math.floor(Math.random() * 30) + 10})</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.filter_section}>
            <h3 className={styles.section_title}>پرفروش‌ترین‌ها</h3>
            <div className={styles.products_grid}>
              {[...Array(3)].map((_, i) => (
                <Product key={i} compactMode={true} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {showFilter && (
        <div 
          className={styles.overlay}
          onClick={() => setShowFilter(false)}
        />
      )}
    </div>
  );
}