"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./products.module.css";
import btnStyles from "@/styles/articles.module.css";
import Product from "@/components/modules/product/Product";
import { FaRegStar, FaStar } from "react-icons/fa";
import MultiRangeSlider from "../multiRange/MultiRangeSlider";
import { FiFilter, FiX } from "react-icons/fi";
import filterStyles from "../filtering/Filtering.module.css";

function Products({ productsDB }) {
  const [sort, setSort] = useState("-1");
  const [products, setProducts] = useState([...productsDB]);
  const [filteredProducts, setFilteredProducts] = useState([...productsDB]);
  const [visibleProducts, setVisibleProducts] = useState(6);
  
  const [bestsellers, setBestsellers] = useState([...productsDB]);
  const [minValue, setMinValue] = useState(140000);
  const [maxValue, setMaxValue] = useState(6790000);
  const [priceFilter, setPriceFilter] = useState({
    min: 140000,
    max: 6790000
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const sidebarRef = useRef(null);

  const categories = ['اسپرسو', 'ارگانیک', 'دستگاه', 'لوازم جانبی', 'گواتمالا'];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let filtered = [...products];
    
    filtered = filtered.filter(
      product => product.price >= priceFilter.min && product.price <= priceFilter.max
    );
    
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => {
        return selectedCategories.some(category => 
          product.tags[0].includes(category)
        );
      });
    }
    
    setFilteredProducts(filtered);
    setVisibleProducts(6);
  }, [priceFilter, selectedCategories, products]);

  const productsToShow = filteredProducts.slice(0, visibleProducts);

  const loadMore = () => {
    setVisibleProducts((prev) => prev + 3);
  };

  useEffect(() => {
    let newProducts = [...productsDB];
    
    newProducts = newProducts.filter(
      product => product.price >= priceFilter.min && product.price <= priceFilter.max
    );
    
    if (selectedCategories.length > 0) {
      newProducts = newProducts.filter(product => {
        return selectedCategories.some(category => 
          product.tags[0].includes(category)
        );
      });
    }

    switch (sort) {
      case "popularity":
        newProducts.sort((a, b) => a.uses - b.uses);
        break;
      case "rating":
        newProducts.sort((a, b) => a.score - b.score);
        break;
      case "last_products":
        newProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "Inexpensive":
        newProducts.sort((a, b) => a.price - b.price);
        break;
      case "expensive":
        newProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    
    setProducts(newProducts);
  }, [sort, productsDB, priceFilter, selectedCategories]);

  const priceFilterHandler = () => {
    setPriceFilter({
      min: minValue,
      max: maxValue
    });
    setShowFilter(false);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  useEffect(() => {
    if (!isMounted) return;

    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowFilter(false);
      }
    };

    const filteredBestSell = productsDB.filter(product => product.uses >= product.stock);
    setBestsellers(filteredBestSell);

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <>
      <div className={filterStyles.filter_container}>
        <button
          className={filterStyles.toggle_btn}
          onClick={() => setShowFilter(!showFilter)}
        >
          {showFilter ? (
            <>
              <FiX className={filterStyles.toggle_icon} />
              <span>بستن فیلترها</span>
            </>
          ) : (
            <>
              <FiFilter className={filterStyles.toggle_icon} />
              <span>فیلتر های پیشرفته</span>
            </>
          )}
        </button>

        <div
          ref={sidebarRef}
          className={`${filterStyles.filter_sidebar} ${showFilter ? filterStyles.visible : ""}`}
        >
          <div className={filterStyles.sidebar_content}>
            <div className={filterStyles.filter_section}>
              <h3 className={filterStyles.section_title}>محدوده قیمت</h3>
              <MultiRangeSlider
                min={140000}
                max={6790000}
                initialMin={minValue}
                initialMax={maxValue}
                onChange={({ min, max }) => {
                  setMinValue(min);
                  setMaxValue(max);
                }}
              />
              <button 
                className={filterStyles.apply_btn}
                onClick={priceFilterHandler}
              >
                اعمال فیلتر
              </button>
            </div>

            <div className={filterStyles.filter_section}>
              <h3 className={filterStyles.section_title}>دسته‌بندی</h3>
              <ul className={filterStyles.category_list}>
                {categories.map((cat, i) => (
                  <li key={i} className={filterStyles.category_item}>
                    <label>
                      <input 
                        type="checkbox" 
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleCategoryChange(cat)}
                      />
                      <span className={filterStyles.checkmark}></span>
                      {cat}
                      <span className={filterStyles.count}>
                        ({productsDB.filter(p => p.tags[0].includes(cat)).length})
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className={filterStyles.filter_section}>
              <h3 className={filterStyles.section_title}>امتیاز</h3>
              <ul className={filterStyles.rating_list}>
                {[5, 4, 3].map((stars) => (
                  <li key={stars} className={filterStyles.rating_item}>
                    <div className={filterStyles.stars}>
                      {[...Array(5)].map((_, i) => (
                        i < stars ? 
                          <FaStar key={i} className={filterStyles.filled_star} /> : 
                          <FaRegStar key={i} className={filterStyles.empty_star} />
                      ))}
                    </div>
                    <span>({Math.floor(Math.random() * 30) + 10})</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={filterStyles.filter_section}>
              <h3 className={filterStyles.section_title}>پرفروش‌ترین‌ها</h3>
              <div className={filterStyles.products_grid}>
                {bestsellers.slice(0, 3).map((product) => (
                  <Product key={product._id} {...product} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {showFilter && (
          <div 
            className={filterStyles.overlay}
            onClick={() => setShowFilter(false)}
          />
        )}
      </div>

      <div className={styles.products}>
        <div className={styles.filtering}>
          <select
            name="orderby"
            defaultValue={sort} 
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="-1">مرتب‌سازی پیش‌فرض</option>
            <option value="popularity">مرتب‌سازی بر اساس محبوبیت</option>
            <option value="rating">مرتب‌سازی بر اساس امتیاز</option>
            <option value="last_products">مرتب‌سازی بر اساس آخرین</option>
            <option value="Inexpensive">مرتب‌سازی بر اساس ارزانترین</option>
            <option value="expensive">مرتب‌سازی بر اساس گرانترین</option>
          </select>
        </div>

        <main className={styles.main}>
          {productsToShow.length > 0 ? (
            productsToShow.map((product) => (
              <Product key={product._id} {...product} />
            ))
          ) : (
            <div className={styles.noProducts}>
              محصولی با فیلترهای انتخاب شده یافت نشد
            </div>
          )}
        </main>

        {visibleProducts < filteredProducts.length && (
          <div className={btnStyles.buttonContainer}>
            <button className={btnStyles.loadMoreBtn} onClick={loadMore}>
              نمایش محصولات بیشتر
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Products;