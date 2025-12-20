"use client";
import Image from "next/image";
import React from "react";
import { swiperPosts } from "@/data/blogs";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";

export default function RelatedBlogs() {
  return (
    <div className="tf-container">
      <div className="row">
        <div className="col-12">
          <div className="related-post">
            <div className="hearding-section mb-40">
              <h3 className="title-heading mb-12">Related Articles</h3>
              <div className="sub-title body-2">
                Get the latest insights, expert tips, and updates to stay
                informed and inspired.
              </div>
            </div>
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
            >
              {swiperPosts.map((post, index) => (
                <SwiperSlide className="swiper-slide" key={index}>
                  <div className="tf-post-grid style-small">
                    <div className="image">
                      <Link
                        href={`/blog-details-1/${post.id}`}
                        className="link"
                      />
                      <Image
                        src={post.imgSrc}
                        alt=""
                        className="lazyload"
                        width={post.imgWidth}
                        height={post.imgHeight}
                      />
                      <a href="#" className="date">
                        <span className="day">{post.date.day}</span>
                        <span>{post.date.month}</span>
                      </a>
                    </div>
                    <div className="tf-grid-post-content">
                      <div className="position caption-1">{post.category}</div>
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
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
