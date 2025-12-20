"use client";
import { boxIconItems2 } from "@/data/benefits";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Benefits() {
  return (
    <section className="section-benefit h-6 mb-40">
      <Swiper
        className="sw-benefit-h6  swiper sw-layout"
        spaceBetween={10}
        breakpoints={{
          0: { slidesPerView: 1 },
          575: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          992: {
            spaceBetween: 40,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: ".spe4",
        }}
      >
        {boxIconItems2.map((item, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="box-icon bg-surface">
              <div className="icon color-primary">
                <i className={item.iconClass} />
              </div>
              <div className="box-content">
                <h5>
                  <a href="#" className="title-box">
                    {item.title}
                  </a>
                </h5>
                <div className="sub-title">{item.description}</div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="sw-pagination-layout flex justify-content-center spe4"></div>
      </Swiper>
    </section>
  );
}
