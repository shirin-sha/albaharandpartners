"use client";
import Link from "next/link";
import Image from "next/image";
import { testimonialImages } from "@/data/testimonials";
import React, { useState } from "react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

export default function Testimonials() {
  const [thumbswiper, setThumbswiper] = useState<SwiperType | null>(null);
  return (
    <section
      className="section-testimonials h-8 tf-spacing-2 section-one-page"
      id="testimonials"
    >
      <div className="tf-container position-relative">
        <div className="row rg-60">
          <div className="col-lg-6">
            <Swiper
              dir="ltr"
              className="swiper tf-testimonials-main mr-25 tf-animate-1"
              {...{
                slidesPerView: 1,
                centeredSlides: true,
                speed: 1000,
                thumbs: {
                  swiper: thumbswiper,
                },
                modules: [Navigation, Thumbs],
                navigation: {
                  nextEl: ".slider-testimonial-next",
                  prevEl: ".slider-testimonial-prev",
                },
              }}
            >
              {testimonialImages.map((item, index) => (
                <SwiperSlide className="swiper-slide" key={index}>
                  <div className="image-testimonials img-item">
                    <Image
                      src={item.imgSrc}
                      alt={item.name}
                      className="lazyload"
                      width={605}
                      height={605}
                    />
                    <div className="content tf-fade-top fade-item-1">
                      <h6>
                        <a href="#" className="name">
                          {item.name}
                        </a>
                      </h6>
                      <div className="position">{item.position}</div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="col-lg-6">
            <div className="section-testimonials-content ml-25">
              <div className="section-content">
                <div className="heading-section">
                  <div className="wow fadeInUp">
                    <a href="#" className="tag label text-btn-uppercase">
                      Testimonials
                    </a>
                  </div>
                  <h3 className="title-section wow fadeInUp mb-12">
                    Proven Results You Can See
                  </h3>
                  <div className="sub-title body-2 wow fadeInUp">
                    See the impact of our solutions through clear, measurable
                    results.
                  </div>
                </div>
                <h4 className="mb-16 wow fadeInUp">Simplified Tax Solutions</h4>
                <div className="text color-on-suface-variant-1 body-2 wow fadeInUp">
                  With FinWice support and strategy, we achieved 25% sales
                  growth and streamlined processes. Their adaptive approach
                  ensured we met our goals efficiently.
                </div>
              </div>
              <div className="swiper-testimonials-h8">
                <Swiper
                  dir="ltr"
                  className="swiper tf-testimonials-thumbs"
                  {...{
                    slidesPerView: 3,
                    spaceBetween: 20,
                    freeMode: true,

                    watchSlidesProgress: true,
                    allowTouchMove: false,
                    breakpoints: {
                      300: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                      },
                      500: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                      },
                    },
                  }}
                  onSwiper={setThumbswiper}
                  modules={[Thumbs]}
                >
                  {testimonialImages.map((item, i) => (
                    <SwiperSlide key={i} className="swiper-slide">
                      <div className="image-testimonials img-thumb">
                        <Image
                          src={item.imgSrc}
                          alt=""
                          className="lazyload"
                          width={605}
                          height={605}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="list-arrow-btn">
                  <div className="tf-btn-arrow style-2 arrow-left slider-testimonial-prev mb-12">
                    <i className="icon-arrow-left" />
                  </div>
                  <div className="tf-btn-arrow style-2 arrow-right slider-testimonial-next">
                    <i className="icon-arrow-right1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
