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
      className="section-testimonials h-8 section-one-page"
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
           
                <SwiperSlide className="swiper-slide">
                  <div className="image-testimonials img-item">
                    <Image
                      src={"/image/section/Al-Bahar-founder.jpg"}
                      alt="Mohamed Abdulrahman Al-Bahar"
                      className="lazyload"
                      width={605}
                      height={605}
                    />
                    <div className="content tf-fade-top fade-item-1">
                      <h6>
                        <a href="#" className="name">
                            {"Mohamed Abdulrahman Al-Bahar"}
                        </a>
                      </h6>
                      <div className="position">{"Founder and CEO of Al-Bahar and Partners"}</div>
                    </div>
                  </div>
                </SwiperSlide>
      
            </Swiper>
          </div>
          <div className="col-lg-6">
            <div className="section-testimonials-content ml-25">
              <div className="section-content">
                <div className="heading-section">
                  <div className="wow fadeInUp">
                    <a href="#" className="tag label text-btn-uppercase">
                    Who We Are

                    </a>
                  </div>
                  <h3 className="title-section wow fadeInUp mb-12">
                  Al-Bahar and Partners (BPC)
                  </h3>
                  <div className="sub-title body-2 wow fadeInUp">
                  Al-Bahar and Partners (BPC) is a Kuwait-based business solutions provider
focused on delivering trusted technologies through strong global partnerships.
We support organizations with structured planning, professional deployment,
and dependable after-sales service—helping clients improve performance,
strengthen reliability, and move forward with confidence.
                  </div>
                </div>
                <h4 className="mb-16 wow fadeInUp">Business Digital Solutions (BDS) Division</h4>
                <div className="text color-on-suface-variant-1 body-2 wow fadeInUp">
                The Business Digital Solutions (BDS) Division drives digital transformation
through practical, scalable solutions tailored to operational needs. From
strategy and solution design to implementation and ongoing support, BDS
helps businesses streamline workflows, enhance customer experience, and
build secure, future-ready digital capabilities.
                </div>
                
              </div>
              
           
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
