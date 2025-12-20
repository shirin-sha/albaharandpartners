"use client";
import Link from "next/link";
import Image from "next/image";
import { testimonials } from "@/data/testimonials";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import OdometerComponent from "@/components/common/OdometerComponent";

export default function Testimonials() {
  return (
    <section
      className="section-testimonials h-1 tf-spacing-2 section-one-page"
      id="testimonials"
    >
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section style-2">
              <div className="left">
                <div className="text-anime-wave">
                  <a href="#" className="tag label text-btn-uppercase">
                    Testimonials
                  </a>
                </div>
                <h3 className="title-section mb-12 text-anime-wave">
                  Proven Results You Can See
                </h3>
                <div className="sub-title body-2 text-anime-wave">
                  See the impact of our solutions through clear, measurable
                  results.
                </div>
              </div>
              <div className="text-anime-wave-2">
                <Link
                  href={`/testimonials`}
                  className="tf-btn style-1 bg-on-suface-container"
                >
                  <span> Read All Testimonials </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <Swiper
              className="sw-case-studies swiper sw-layout"
              spaceBetween={10}
              breakpoints={{
                0: { slidesPerView: 1 },
                575: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
            >
              {testimonials.map((item, index) => (
                <SwiperSlide className="swiper-slide" key={index}>
                  <div className="testimonial-item">
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
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
