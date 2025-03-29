"use client";
import React, { useEffect, useState } from "react";
import "./articles.module.css";
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
      <p className={styles.title}>مقالات ما</p>
      <span className={styles.description}>دانستنی های جذاب دنیای قهوه</span>
      <main>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          dir="rtl"
          autoplay={{ delay: 1500, disableOnInteraction: false }}
          loop={true}
          navigation={true}
          modules={[Navigation, Autoplay]}
          className="mySwiper articles_slider"
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            986: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
        >
          {allArticles?.map((article) => (
            <SwiperSlide key={article._id}>
              <Article {...article} />
            </SwiperSlide>
          ))}
        </Swiper>
      </main>
    </div>
  );
}