"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";
import styles from "./Gallery.module.css";

const Gallery = ({product}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);


    return (
        <section className={styles.gallery}>
            <Swiper
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2 gallery-slider"
            >
                    <SwiperSlide >
                        <img src={product.img} alt={product.name} />
                    </SwiperSlide>
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="gallery-slider-2"
            >
                    <SwiperSlide >
                        <img src={product.img} alt={product.name} />
                    </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Gallery;