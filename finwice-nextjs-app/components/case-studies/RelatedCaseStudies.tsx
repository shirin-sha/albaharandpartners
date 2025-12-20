"use client";
import Link from "next/link";
import Image from "next/image";
import { smallCaseStudies } from "@/data/caseStudies";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

export default function RelatedCaseStudies() {
  return (
    <section className="section-related tf-spacing-3">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section">
              <h3 className="mb-12">Related Projects</h3>
              <div className="sub-title body-2">
                Discover how we’ve helped clients achieve remarkable results.
              </div>
            </div>
            <Swiper
              className="swiper sw-new sw-new-2 sw-layout"
              breakpoints={{
                0: { slidesPerView: 1 },
                575: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 2,
                },
                1200: {
                  slidesPerView: 3,
                },
              }}
            >
              {smallCaseStudies.slice(0, 3).map((item, i) => (
                <SwiperSlide key={i} className="swiper-slide">
                  <div className="tf-post-grid style-small hover-img">
                    <div className="image">
                      <Link href={`/case-studies-details`} className="link" />
                      <Image
                        src={item.imgSrc}
                        alt=""
                        className="lazyload"
                        width={400}
                        height={300}
                      />
                    </div>
                    <div className="tf-grid-post-content">
                      <div className="position label text-btn-uppercase">
                        {item.label}
                      </div>
                      <h5 className="title-post">
                        <Link href={`/case-studies-details`}>{item.title}</Link>
                      </h5>
                      <div className="sub-title">{item.desc}</div>
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
