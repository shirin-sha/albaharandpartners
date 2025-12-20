"use client";
import { slides } from "@/data/heroSlides";
import Link from "next/link";
import React from "react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Hero() {
  return (
    <div className="page-title-home h-2">
      <Swiper
        dir="ltr"
        className="swiper sw-auto"
        modules={[EffectFade, Autoplay, Navigation]}
        effect="fade"
        autoplay={{
          delay: 2000,
        }}
        speed={1000}
        navigation={{
          prevEl: ".snbp2",
          nextEl: ".snbn2",
        }}
      >
        <div className="tf-btn-arrow arrow-left sw-auto-next snbp2">
          <i className="icon-arrow-left" />
        </div>
        {slides.map((slide, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className={`page-title-inner img-h2-${index + 1}`}>
              <div className="tf-container">
                <div className="row">
                  <div className="col-12">
                    <div className="page-title-content">
                      <h1 className="tf-fade-top fade-item-1">
                        {slide.title.split("\n").map((line, i) => (
                          <React.Fragment key={i}>
                            {line + " "}
                            <br />
                          </React.Fragment>
                        ))}
                      </h1>
                      <div className="sub-title body-2 tf-fade-top fade-item-2">
                        {slide.subtitle}
                      </div>
                      <div className="tf-fade-top fade-item-3">
                        <Link
                          href={`/about-us`}
                          className="tf-btn style-1 bg-white"
                        >
                          <span>Schedule A Consultation</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="tf-btn-arrow arrow-right sw-auto-prev snbn2">
          <i className="icon-arrow-right1" />
        </div>
      </Swiper>
    </div>
  );
}
