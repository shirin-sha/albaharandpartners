"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { BlogsSection as BlogsSectionType } from "@/types/homepage";

interface BlogsSectionProps {
  content: BlogsSectionType;
  language?: 'ltr' | 'rtl';
}

export default function BlogsSection({ content, language = 'ltr' }: BlogsSectionProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!content.isActive) {
    return null;
  }

  const activePosts = content.posts
    .filter(post => post.isActive);

  if (activePosts.length === 0) {
    return null;
  }

  return (
    <section className="section-new h-8 tf-spacing-2 section-one-page" id="new" dir={language}>
      <div className="tf-container position-relative">
        <div className="row">
          <div className="col-12">
            <div className="heading-section style-2">
              <div className="left">
                <div className="text-anime-wave">
                  <a href="#" className="tag label text-btn-uppercase">
                    {content.tag}
                  </a>
                </div>
                <h3 className="title-section mb-12 text-anime-wave">
                  {content.heading}
                </h3>
                <div className="sub-title body-2 text-anime-wave">
                  {content.subheading}
                </div>
              </div>
              <div className="text-anime-wave-2">
                <Link
                  href={content.buttonLink || '/news-updates'}
                  className="tf-btn style-1 bg-color-primary"
                >
                  <span>{content.buttonText}</span>
                </Link>
              </div>
            </div>
            {isMounted && (
              <Swiper
                className="swiper sw-new-h8 sw-layout"
                spaceBetween={10}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  575: { slidesPerView: 2 },
                  768: { slidesPerView: 2, spaceBetween: 20 },
                  992: { spaceBetween: 30 },
                  1200: { slidesPerView: 3, spaceBetween: 30 },
                }}
                modules={[Pagination]}
                pagination={{
                  clickable: true,
                  el: ".spe7",
                }}
              >
                {activePosts.map((post, index) => (
                  <SwiperSlide className="swiper-slide" key={index}>
                    <div className="tf-post-grid style-absolute style-3 hover-img">
                      <div className="image" style={{ aspectRatio: "473 / 630" }}>
                        <Image
                          src={post.imagePath}
                          alt={post.title}
                          fill
                          sizes="(max-width: 575px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          style={{ objectFit: "cover" }}
                        />
                        <Link href={post.link || "#"} className="link" />
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
                          <Link href={post.link || "#"}>
                            {post.title}
                          </Link>
                        </h5>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                <div className="sw-pagination-layout flex justify-content-center spe7"></div>
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
