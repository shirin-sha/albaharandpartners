"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { absolutePosts2, posts4 } from "@/data/blogs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

export default function Blogs3() {
  const [filteres, setFilteres] = useState(posts4);
  const [isLoadedMore, setIsLoadedMore] = useState(false);
  useEffect(() => {
    if (isLoadedMore) {
      setFilteres(posts4);
    } else {
      setFilteres(posts4.slice(0, 6));
    }
  }, [isLoadedMore]);
  return (
    <div className="tf-container">
      <div className="row">
        <div className="col-12">
          <div className="blog-content blog-no-sidebar-content">
            <div className="tf-slideshow blog-no-sidebar-slide">
              <Swiper
                className="swiper sw-single"
                modules={[Navigation]}
                navigation={{
                  prevEl: ".snbp1",
                  nextEl: ".snbn1",
                }}
              >
                <div className="tf-btn-arrow arrow-left sw-single-prev snbp1">
                  <i className="icon-arrow-left" />
                </div>
                {absolutePosts2.map((post, i) => (
                  <SwiperSlide className="swiper-slide" key={i}>
                    <div
                      className={`tf-post-grid style-absolute ${
                        post.animate ? "tf-animate-2" : ""
                      }`}
                    >
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
                      <div
                        className={`tf-post-grid-content ${
                          post.animate ? "text-anime-wave" : ""
                        }`}
                      >
                        <div
                          className="position"
                          {...(post.animate ? { "data-delay": ".3s" } : {})}
                        >
                          {post.category}
                        </div>
                        <h4
                          className="title-post"
                          {...(post.animate ? { "data-delay": ".3s" } : {})}
                        >
                          <Link href={`/blog-details-1/${post.id}`}>
                            {post.title}
                          </Link>
                        </h4>
                        <div
                          className="sub-title body-2"
                          {...(post.animate ? { "data-delay": ".3s" } : {})}
                        >
                          {post.description}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                <div className="tf-btn-arrow arrow-right sw-single-next snbn1">
                  <i className="icon-arrow-right1" />
                </div>
              </Swiper>
            </div>
            <div className="layout-grid-3 loadmore-item">
              {filteres.map((post, index) => (
                <div
                  className="tf-post-grid style-small fl-item d-block"
                  key={index}
                >
                  <div className="image">
                    <Link
                      href={`/blog-details-2/${post.id}`}
                      className="link"
                    />
                    <Image
                      src={post.imgSrc}
                      alt={post.title}
                      width={post.imgWidth}
                      height={post.imgHeight}
                      className="lazyload"
                    />
                    <a href="#" className="date">
                      <span className="day"> {post.date.day} </span>
                      <span>{post.date.month}</span>
                    </a>
                  </div>
                  <div className="tf-grid-post-content">
                    <div
                      className="position caption-1 wow fadeInUp"
                      data-wow-delay={post.delay}
                    >
                      {post.category}
                    </div>
                    <h5
                      className="title-post wow fadeInUp"
                      data-wow-delay={post.delay}
                    >
                      <Link href={`/blog-details-2/${post.id}`}>
                        {post.title}
                      </Link>
                    </h5>
                    <div
                      className="sub-title wow fadeInUp"
                      data-wow-delay={post.delay}
                    >
                      {post.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {!isLoadedMore ? (
              <div className="btn-load-more text-center view-more-button wow fadeInUp">
                <button
                  onClick={() => setIsLoadedMore(true)}
                  className="tf-btn style-1 bg-on-suface-container btn-loadmore"
                >
                  <span>Load More</span>
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
