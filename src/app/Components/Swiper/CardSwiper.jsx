"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";

import { EffectCards } from "swiper/modules";

export function CardSwiper() {
  return (
    <Swiper
      effect="cards"
      grabCursor={true}
      modules={[EffectCards]}
      className="mySwiper w-[300px] h-[400px]"
    >
      <SwiperSlide className="w-full h-full rounded-2xl overflow-hidden"><img className="w-full h-full object-cover bg-center" src="/assets/1.jpg" alt="" /></SwiperSlide>
      <SwiperSlide className="w-full h-full rounded-2xl overflow-hidden"><img className="w-full h-full object-cover bg-center" src="/assets/2.jpg" alt="" /></SwiperSlide>
      <SwiperSlide className="w-full h-full rounded-2xl overflow-hidden"><img className="w-full h-full object-cover bg-center" src="/assets/3.jpg" alt="" /></SwiperSlide>
      <SwiperSlide className="w-full h-full rounded-2xl overflow-hidden"><img className="w-full h-full object-cover bg-center" src="/assets/4.jpg" alt="" /></SwiperSlide>
      <SwiperSlide className="w-full h-full rounded-2xl overflow-hidden"><img className="w-full h-full object-cover bg-center" src="/assets/5.jpg" alt="" /></SwiperSlide>
    </Swiper>
  );
}
