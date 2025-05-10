"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Autoplay } from "swiper/modules";

function Banner() {
  return (
    <Swiper
      rewind={true}
      navigation={true}
      loop={true}
      autoplay={{ delay: 3500 }}
      modules={[Navigation, Autoplay]}
      className="mySwiper home-slider"
    >
      <SwiperSlide>
        <img
          src="/images/sliders/first-slider.png"
          alt="Slide"
          style={{
            width: "100%",
            maxWidth: "1920px",
            height: "650px",
            aspectRatio: "1920 / 750",
            objectFit: "cover",
            display: "block",
            margin: "0 auto",
          }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/images/sliders/second-slider.png"
          alt="Slide"
          style={{
            width: "100%",
            maxWidth: "1920px",
            height: "650px",
            aspectRatio: "1920 / 750",
            objectFit: "cover",
            display: "block",
            margin: "0 auto",
          }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/images/sliders/third-slider.png"
          alt="Slide"
          style={{
            width: "100%",
            maxWidth: "1920px",
            height: "650px",
            aspectRatio: "1920 / 750",
            objectFit: "cover",
            display: "block",
            margin: "0 auto",
          }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/images/sliders/fourth-slider.png"
          alt="Slide"
          style={{
            width: "100%",
            maxWidth: "1920px",
            height: "650px",
            aspectRatio: "1920 / 750",
            objectFit: "cover",
            display: "block",
            margin: "0 auto",
          }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/images/sliders/fifth-slider.png"
          alt="Slide"
          style={{
            width: "100%",
            maxWidth: "1920px",
            height: "650px",
            aspectRatio: "1920 / 750",
            objectFit: "cover",
            display: "block",
            margin: "0 auto",
          }}
        />
      </SwiperSlide>
    </Swiper>
  );
}

export default Banner;
