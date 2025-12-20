"use client";
import { offices } from "@/data/locations";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Locations() {
  return (
    <section className="section-list-banner tf-spacing-3">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <Swiper
              className="swiper sw-layout sw-product"
              breakpoints={{
                0: { slidesPerView: 1 },
                575: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                992: {
                  spaceBetween: 60,
                },
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 60,
                },
              }}
              spaceBetween={20}
            >
              {offices.map((office, index) => (
                <SwiperSlide className="swiper-slide" key={index}>
                  <div className="banner-item hover-img">
                    <div className="image">
                      <a href="#">
                        <Image
                          src={office.imgSrc}
                          alt={office.name}
                          className="lazyload"
                          width={office.imgWidth}
                          height={office.imgHeight}
                        />
                      </a>
                    </div>
                    <div className="banner-item-content">
                      <h4 className="name-banner">
                        <a href="#">{office.name}</a>
                      </h4>
                      <div className="details">
                        <ul>
                          <li>
                            <a href="#" className="arrdess">
                              {office.address}
                            </a>
                          </li>
                          <li>
                            <span>Phone: </span>
                            <a href="#">{office.phone}</a>
                          </li>
                          <li>
                            <span>Email: </span>
                            <a href="#">{office.email}</a>
                          </li>
                        </ul>
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
