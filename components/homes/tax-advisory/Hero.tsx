"use client";
import { slides4 } from "@/data/heroSlides";
import Link from "next/link";
import React from "react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Hero() {
  return (
    <Swiper
      className="page-title-home h-7 swiper sw-auto style-absolute"
      loop
      effect="fade"
      modules={[EffectFade, Autoplay, Navigation]}
      navigation={{
        prevEl: ".snbp7",
        nextEl: ".snbn7",
      }}
      autoplay={{
        delay: 4000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }}
    >
      <div className="tf-btn-arrow arrow-left sw-auto-next snbp7">
        <i className="icon-arrow-left" />
      </div>
      {slides4.map((slide, index) => (
        <SwiperSlide className="swiper-slide" key={index}>
          <div 
            className="page-title-inner"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
            }}
          >
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1,
              }}
            />
            <div className="tf-container" style={{ position: 'relative', zIndex: 2 }}>
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
                      {slide.subtitle}
                    </div>
                    <div className="tf-fade-top fade-item-3">
                      <Link
                        href={slide.buttonLink || `/our-services-1`}
                        className="tf-btn style-1 bg-white "
                      >
                        <span>{slide.buttonText || "View All Services"}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
      <div className="tf-btn-arrow arrow-right sw-auto-prev snbn7">
        <i className="icon-arrow-right1" />
      </div>
    </Swiper>
  );
}
