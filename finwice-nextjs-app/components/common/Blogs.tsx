"use client";
import Link from "next/link";
import Image from "next/image";
import { posts } from "@/data/blogs";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Blogs() {
  return (
    <section
      className="section-new h-1 tf-spacing-12 section-one-page"
      id="new"
    >
      <div className="tf-container">
        <div className="col-12">
          <div className="heading-section text-center">
            <div className="text-anime-wave-1">
              <a href="#" className="tag label text-btn-uppercase">
                READ OUR BLOG
              </a>
            </div>
            <h3 className="title-section text-anime-wave-1 mb-12">
              Insights &amp; Ideas
            </h3>
            <div className="sub-title body-2 text-anime-wave-1">
              Get the latest insights, expert tips, and updates to stay informed
              and inspired.
            </div>
          </div>
        </div>
      </div>
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <Swiper
              className="swiper sw-new sw-layout"
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
              modules={[Pagination]}
              pagination={{
                clickable: true,
                el: ".spe1",
              }}
            >
              {posts.map((post, index) => (
                <SwiperSlide className="swiper-slide" key={index}>
                  <div className="tf-post-grid style-small hover-img">
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
                      <div className="position label text-btn-uppercase">
                        {post.category}
                      </div>
                      <h5 className="title-post">
                        <Link href={`/blog-details-1/${post.id}`}>
                          {post.title}
                        </Link>
                      </h5>
                      <div className="sub-title">{post.description}</div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <div className="sw-pagination-layout flex justify-content-center spe1"></div>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
