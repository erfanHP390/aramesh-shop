"use client";
import Product from "@/components/modules/product/Product";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import styles from "./MoreProducts.module.css";

const MoreProducts = () => {
    return (
        <div data-aos="fade-right" className={styles.moreProducts}>
            <section>
                <h2>محصولات مرتبط</h2>
                <div className={styles.divider}></div>
            </section>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                dir="rtl"
                rewind={true}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  986: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                }}
            >
                <SwiperSlide><Product /></SwiperSlide>
                <SwiperSlide><Product /></SwiperSlide>
                <SwiperSlide><Product /></SwiperSlide>
                <SwiperSlide><Product /></SwiperSlide>
                <SwiperSlide><Product /></SwiperSlide>
                <SwiperSlide><Product /></SwiperSlide>
                <SwiperSlide><Product /></SwiperSlide>
                <SwiperSlide><Product /></SwiperSlide>
            </Swiper>
        </div>
    );
};

export default MoreProducts;