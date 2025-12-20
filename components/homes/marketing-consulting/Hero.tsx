"use client";
import { slides2 } from "@/data/heroSlides";
import Link from "next/link";
import React from "react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Hero() {
  return (
    <Swiper
      dir="ltr"
      className="page-title-home h-5 swiper sw-auto style-absolute"
      loop
      autoplay={{
        delay: 2000,
      }}
      speed={1000}
      effect="fade"
      modules={[Autoplay, EffectFade, Navigation]}
      navigation={{
        prevEl: ".snbp6",
        nextEl: ".snbn6",
      }}
      autoHeight
    >
      <div className="tf-btn-arrow arrow-left sw-auto-next snbp6">
        <i className="icon-arrow-left" />
      </div>
      {slides2.map((slide, index) => (
        <SwiperSlide className="swiper-slide" key={index}>
          <div className={`page-title-inner img-h5-${index + 1}`}>
            <div className="tf-container">
              <div className="row">
                <div className="col-12">
                  <div className="page-title-content">
                    <h1 className="tf-fade-top fade-item-1">
                      {slide.title.split("\n").map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </h1>
                    <div className="sub-title body-2 tf-fade-top fade-item-2">
                      {slide.subtitle.split("\n").map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </div>
                    <div className="tf-fade-top fade-item-3">
                      <Link
                        href={`/our-services-1`}
                        className="tf-btn style-1 bg-white"
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
      <div className="tf-btn-arrow arrow-right sw-auto-prev snbn6">
        <i className="icon-arrow-right1" />
      </div>
    </Swiper>
  );
}
