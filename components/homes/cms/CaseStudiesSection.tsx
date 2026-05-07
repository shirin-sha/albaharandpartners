"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { Pagination } from "swiper/modules";
import { CaseStudiesSection as CaseStudiesSectionType } from "@/types/homepage";

interface CaseStudiesSectionProps {
  content: CaseStudiesSectionType;
  language?: 'ltr' | 'rtl';
}

export default function CaseStudiesSection({ content, language = 'ltr' }: CaseStudiesSectionProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!content.isActive) {
    return null;
  }

  const activeCaseStudies = content.caseStudies
    .filter(cs => cs.isActive);

  if (activeCaseStudies.length === 0) {
    return null;
  }

  return (
    <section
      className="section-case h-3 h-8 bg-surface tf-spacing-26 section-one-page"
      id="project"
      dir={language}
    >
      <div className="tf-container position-relative">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center">
              <div className="text-anime-wave-1">
                <span className="tag label text-btn-uppercase bg-white">
                  {content.tag}
                </span>
              </div>
              <h3 className="title-section text-anime-wave-1 mb-12">
                {content.heading}
              </h3>
              <div className="sub-title body-2 text-anime-wave-1">
                {content.subheading}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        {isMounted && (
          <Swiper
          className="sw-project-list swiper sw-layout"
          spaceBetween={10}
          breakpoints={{
            0: { slidesPerView: 1 },
            575: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spe8",
          }}
        >
          {activeCaseStudies.map((caseStudy, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="case-studies-item style-bg-content hover-img style-2">
                <Link
                  href={caseStudy.link || "#"}
                  className="image d-block"
                  aria-label={`View case study ${caseStudy.title}`}
                  style={{ aspectRatio: "473 / 630" }}
                >
                  <Image
                    src={caseStudy.imagePath}
                    alt={caseStudy.title}
                    fill
                    sizes="(max-width: 575px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    style={{ objectFit: "cover" }}
                  />
                </Link>
                <Link href={caseStudy.link || "#"} className="btn-arrow-item" aria-label={`Open ${caseStudy.title}`}>
                  <i className="icon-arrowRight" />
                </Link>
                <div className="case-studies-content">
                  <h5>
                    <Link href={caseStudy.link || "#"} className="name">
                      {caseStudy.title}
                    </Link>
                  </h5>
                  <div className="desc">{caseStudy.description}</div>
                  <Link href={caseStudy.link || "#"} className="tf-btn-arrow-t-r">
                    <span>View Case Study</span>
                    <div className="icon">
                      <i className="icon-arrow-top-right" />
                    </div>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-pagination-layout flex justify-content-center spe8"></div>
        </Swiper>
        )}
      </div>
    </section>
  );
}
