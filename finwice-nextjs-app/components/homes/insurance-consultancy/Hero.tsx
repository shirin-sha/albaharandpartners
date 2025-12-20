"use client";
import { slides3 } from "@/data/heroSlides";
import Link from "next/link";
import React from "react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Hero() {
  return (
    <Swiper
      dir="ltr"
      className="page-title-home h-6 swiper style-absolute sw-auto mb-40"
      loop
      modules={[Autoplay, EffectFade, Navigation]}
      effect="fade"
      autoplay={{
        delay: 2000,
      }}
      navigation={{
        prevEl: ".snbp4",
        nextEl: ".snbn4",
      }}
    >
      <div className="tf-btn-arrow arrow-left sw-auto-next snbp4">
        <i className="icon-arrow-left" />
      </div>
      {slides3.map((slide, index) => (
        <SwiperSlide className="swiper-slide" key={index}>
          <div className={`page-title-inner img-h6-${index + 1}`}>
            <div className="tf-container">
              <div className="row">
                <div className="col-12">
                  <div className="page-title-content text-center">
                    <h1 className="tf-fade-top fade-item-1">
                      {slide.title.split("\n").map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </h1>
                    <div className="sub-title body-2 tf-fade-top fade-item-2">
                      {slide.subtitle}
                    </div>
                    <div className="tf-fade-top fade-item-3">
                      <Link
                        href={`/our-services-1`}
                        className="tf-btn style-1 bg-white "
                      >
                        <span>View All Services</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
      <div className="tf-btn-arrow arrow-right sw-auto-prev snbn4">
        <i className="icon-arrow-right1" />
      </div>
    </Swiper>
  );
}
