"use client";
import { timelineItems } from "@/data/timeline";
import React, { useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function History() {
  const [hoveredItems, setHoveredItems] = useState<number[]>([]);
  return (
    <section className="section-history section-about bg-on-suface-container tf-spacing-2 hover-active-step">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center style-color-white mb-60">
              <div className="text-anime-wave-1">
                <a
                  href="#"
                  className="tag label text-btn-uppercase color-white"
                >
                  Our History
                </a>
              </div>
              <h3 className="title-section mb-12 text-anime-wave-1">
                Our Journey So Far
              </h3>
              <div className="sub-title body-2 text-anime-wave-1">
                Explore the milestones that have shaped our growth and
                commitment to excellence.
              </div>
            </div>
            <div className="wg-time-line">
              <div className="sw-layout-1 swiper-time-line">
                <div className="tf-btn-arrow style-3 arrow-left nav-prev-layout-1 snbp8">
                  <i className="icon-arrow-left" />
                </div>
                <Swiper
                  breakpoints={{
                    0: { slidesPerView: 1 },
                    575: {
                      slidesPerView: 2,
                    },
                    768: {
                      slidesPerView: 3,
                    },
                    1200: {
                      slidesPerView: 4,
                    },
                  }}
                  dir="ltr"
                  className="swiper sw-layout1"
                  modules={[Navigation]}
                  navigation={{
                    prevEl: ".snbp8",
                    nextEl: ".snbn8",
                  }}
                >
                  {timelineItems.map((item, index) => (
                    <SwiperSlide className="swiper-slide" key={index}>
                      <div
                        className={`time-line-item step-hover ${
                          hoveredItems.includes(index) ? "active" : ""
                        } `}
                        onMouseOver={() =>
                          setHoveredItems((pre) => [...pre, index])
                        }
                      >
                        <div className="time-line-content">
                          <div className="heading">
                            <div className="label">{item.year}</div>
                            <h5 className="title-content">{item.title}</h5>
                          </div>
                          <div className="desc">{item.description}</div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="tf-btn-arrow style-3 arrow-right nav-next-layout-1 snbn8">
                  <i className="icon-arrow-right1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
