"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import Article from "@/components/modules/article/Article";
import styles from "./articles.module.css";

export default function Articles() {
  const [allArticles, setAllArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        setAllArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>مقالات ما</p>
        <span className={styles.description}>دانستنی های جذاب دنیای قهوه</span>
      </div>
      <main className={styles.main}>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          dir="rtl"
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          navigation={true}
          modules={[Navigation, Autoplay]}
          className={styles.swiper}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 15 },
            576: { slidesPerView: 1.5, spaceBetween: 15 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            986: { slidesPerView: 2.5, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
            1200: { slidesPerView: 3, spaceBetween: 40 },
          }}
        >
          {allArticles?.map((article) => (
            <SwiperSlide key={article._id} className={styles.slide}>
              <Article 
                {...article} 
                imgStyle={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px 8px 0 0'
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </main>
    </div>
  );
}