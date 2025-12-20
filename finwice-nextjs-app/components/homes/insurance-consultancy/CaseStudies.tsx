"use client";

import Image from "next/image";
import { caseStudiesItems } from "@/data/caseStudies";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { Pagination } from "swiper/modules";

export default function CaseStudies() {
  return (
    <section className="section-case h-6 mb-40 section-one-page" id="project">
      <Swiper
        className="sw-case-studies swiper sw-layout"
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
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: ".spe5",
        }}
      >
        {caseStudiesItems.map((item, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div
              className="case-studies-item style-bg-content style-no-color wow fadeInUp"
              {...(item.wowDelay && { "data-wow-delay": item.wowDelay })}
            >
              <div
                className=" wow fadeInUp"
                {...(item.wowDelay && { "data-wow-delay": item.wowDelay })}
              >
                <Link href={`/case-studies-details`} className="link" />
                <Image
                  src={item.imgSrc}
                  alt=""
                  className="lazyload"
                  width={item.width}
                  height={item.height}
                />
              </div>
              <div className="case-studies-content">
                <h5
                  className="wow fadeInUp"
                  {...(item.wowDelay && { "data-wow-delay": item.wowDelay })}
                >
                  <Link href={`/case-studies-details`} className="name">
                    {item.title}
                  </Link>
                </h5>
                <div
                  className="text text-btn-uppercase label wow fadeInUp"
                  {...(item.wowDelay && { "data-wow-delay": item.wowDelay })}
                >
                  {item.label}
                </div>
                <div className="desc">{item.description}</div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="sw-pagination-layout flex justify-content-center spe5"></div>
      </Swiper>
    </section>
  );
}
