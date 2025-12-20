"use client";

import Image from "next/image";
import { testimonials3 } from "@/data/testimonials";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import OdometerComponent from "@/components/common/OdometerComponent";
import { Pagination } from "swiper/modules";

export default function Testimonials() {
  return (
    <section
      className="section-testimonials h-6 mb-40 section-one-page"
      id="testimonials"
    >
      <Swiper
        className="sw-testimonial swiper sw-layout"
        spaceBetween={10}
        breakpoints={{
          0: { slidesPerView: 1 },
          575: {
            slidesPerView: 1,
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
          el: ".spe6",
        }}
      >
        {testimonials3.map((item, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="testimonial-item no-border bg-surface">
              <div className="testimonial-top">
                <div className="counter-item">
                  <div className="counter">
                    <div className="number-counter">
                      <h4 className="number odometer color-primary">
                        <OdometerComponent max={item.percentage} />
                      </h4>
                      <h4 className="plus color-primary">%</h4>
                    </div>
                    <h5 className="text">{item.label}</h5>
                  </div>
                </div>
              </div>
              <div className="item-content">
                <div className="text">{item.text}</div>
                <div className="info-user">
                  <div className="image">
                    <Image
                      src={item.imgSrc}
                      alt={item.name}
                      className="lazyload"
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className="info-content">
                    <a href="#" className="name text-btn">
                      {item.name}
                    </a>
                    <div className="position-user caption-2">
                      {item.position}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="sw-pagination-layout flex justify-content-center spe6"></div>
      </Swiper>
    </section>
  );
}
