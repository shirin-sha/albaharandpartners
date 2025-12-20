"use client";
import Link from "next/link";
import Image from "next/image";
import { absolutePosts } from "@/data/blogs";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Blogs() {
  return (
    <section className="section-new h-8 tf-spacing-2 section-one-page" id="new">
      <div className="tf-container position-relative">
        <div className="row">
          <div className="col-12">
            <div className="heading-section style-2">
              <div className="left">
                <div className="text-anime-wave">
                  <a href="#" className="tag label text-btn-uppercase">
                    READ OUR BLOG
                  </a>
                </div>
                <h3 className="title-section mb-12 text-anime-wave">
                  Insights &amp; Ideas
                </h3>
                <div className="sub-title body-2 text-anime-wave">
                  Get the latest insights, expert tips, and updates to stay
                  informed and inspired.
                </div>
              </div>
              <div className="text-anime-wave-2">
                <Link
                  href={`/blog-left-sidebar`}
                  className="tf-btn style-1 bg-on-suface-container"
                >
                  <span>View All Articles</span>
                </Link>
              </div>
            </div>
            <Swiper
              className="swiper sw-new-h8 sw-layout"
              spaceBetween={10}
              breakpoints={{
                0: { slidesPerView: 1 },
                575: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                992: {
                  spaceBetween: 30,
                },
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              modules={[Pagination]}
              pagination={{
                clickable: true,
                el: ".spe7",
              }}
            >
              {absolutePosts.map((post, index) => (
                <SwiperSlide className="swiper-slide" key={index}>
                  <div className="tf-post-grid style-absolute style-3 hover-img">
                    <div className="image">
                      <Image
                        src={post.imgSrc}
                        alt=""
                        className="lazyload"
                        width={post.imgWidth}
                        height={post.imgHeight}
                      />
                      <Link
                        href={`/blog-details-1/${post.id}`}
                        className="link"
                      />
                      <a href="#" className="date">
                        <span className="day">{post.date.day}</span>
                        <span className="label">{post.date.month}</span>
                      </a>
                    </div>
                    <div className="tf-grid-post-content">
                      <div className="position label text-btn-uppercase mb-12">
                        {post.category}
                      </div>
                      <h5 className="title-post">
                        <Link href={`/blog-details-1/${post.id}`}>
                          {post.title}
                        </Link>
                      </h5>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <div className="sw-pagination-layout flex justify-content-center spe7"></div>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
