"use client";
import React, { useRef, useState } from "react";
import style from "./style.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import './styles.css'

// import required modules
import { Pagination, Navigation } from "swiper/modules";

const Slider = () => {
  return (
    <div className={style.containerSwiper}>
      <div className={style.containerSwiper_services}>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img
              src="https://www.mantenimientoseu.com/images/banner1.png"
              alt="..."
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://www.mantenimientoseu.com/images/banner2.png"
              alt="..."
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://www.mantenimientoseu.com/images/banner3.png"
              alt="..."
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
