"use client";

import Image from "next/image";
import { caseStudySlides } from "@/data/caseStudies";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { Pagination } from "swiper/modules";

export default function CaseStudies() {
  return (
    <section className="section-case h-3 section-one-page" id="project">
      <Swiper
        className="sw-project-list swiper sw-layout"
        spaceBetween={10}
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
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: ".spe9",
        }}
      >
        {caseStudySlides.map((item, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="case-studies-item style-bg-content hover-img style-2">
              <div className="image">
                <Image
                  src={item.imgSrc}
                  alt=""
                  className="lazyload"
                  width={473}
                  height={630}
                />

                <Link href={`/services-details-1`} className="link" />
              </div>
              <Link href={`/services-details-1`} className="btn-arrow-item">
                <i className="icon-arrowRight" />
              </Link>
              <div className="case-studies-content">
                <h5>
                  <Link href={`/services-details-1`} className="name">
                    {item.title}
                  </Link>
                </h5>
                <div className="desc">{item.description}</div>
                <Link href={`/services-details-1`} className="tf-btn-arrow-t-r">
                  <span>View Services</span>
                  <div className="icon">
                    <i className="icon-arrow-top-right" />
                  </div>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="sw-pagination-layout flex justify-content-center spe9"></div>
      </Swiper>
    </section>
  );
}
