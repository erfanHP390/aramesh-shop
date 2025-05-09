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
          src="https://sdmntprpolandcentral.oaiusercontent.com/files/00000000-c9f4-620a-8ea6-3c3b89170a57/raw?se=2025-05-09T22%3A02%3A05Z&sp=r&sv=2024-08-04&sr=b&scid=00000000-0000-0000-0000-000000000000&skoid=eb780365-537d-4279-a878-cae64e33aa9c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-09T06%3A10%3A54Z&ske=2025-05-10T06%3A10%3A54Z&sks=b&skv=2024-08-04&sig=UkVYigpzidY0otkgSz7TTs1LgdhyrCgNtp5L9iatAng%3D"
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
          src="https://sdmntprpolandcentral.oaiusercontent.com/files/00000000-8ff0-620a-a55a-62f747ffb8eb/raw?se=2025-05-09T22%3A02%3A05Z&sp=r&sv=2024-08-04&sr=b&scid=00000000-0000-0000-0000-000000000000&skoid=eb780365-537d-4279-a878-cae64e33aa9c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-09T07%3A21%3A47Z&ske=2025-05-10T07%3A21%3A47Z&sks=b&skv=2024-08-04&sig=vGFnCPrZ9URIVHxb8O1m3CdcY1zzMpSkJTb16IerK/0%3D"
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
          src="https://sdmntprpolandcentral.oaiusercontent.com/files/00000000-650c-620a-8aa1-79eff1fdb5f5/raw?se=2025-05-09T22%3A02%3A05Z&sp=r&sv=2024-08-04&sr=b&scid=00000000-0000-0000-0000-000000000000&skoid=eb780365-537d-4279-a878-cae64e33aa9c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-09T06%3A50%3A38Z&ske=2025-05-10T06%3A50%3A38Z&sks=b&skv=2024-08-04&sig=jM3iUsIMye1cym86ajKW%2Bh9/xuZg9Y1OWbZ%2B7VsnZXM%3D"
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
          src="https://sdmntprpolandcentral.oaiusercontent.com/files/00000000-a4b8-620a-ace1-5fc5547d6ceb/raw?se=2025-05-09T22%3A02%3A05Z&sp=r&sv=2024-08-04&sr=b&scid=00000000-0000-0000-0000-000000000000&skoid=eb780365-537d-4279-a878-cae64e33aa9c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-09T06%3A36%3A06Z&ske=2025-05-10T06%3A36%3A06Z&sks=b&skv=2024-08-04&sig=tsOQX2ERkojalMMzh9fPdwYld2rIRrAEiV9S7MRd9uo%3D"
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
          src="https://sdmntpreastus.oaiusercontent.com/files/00000000-9c64-61f9-8386-6b0640de5dd8/raw?se=2025-05-09T22%3A02%3A05Z&sp=r&sv=2024-08-04&sr=b&scid=00000000-0000-0000-0000-000000000000&skoid=eb780365-537d-4279-a878-cae64e33aa9c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-09T06%3A11%3A11Z&ske=2025-05-10T06%3A11%3A11Z&sks=b&skv=2024-08-04&sig=k4sVX4vqHWSfFRSfeZrQ45rQfdMX3QhAd0BO3SPsExU%3D"
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
