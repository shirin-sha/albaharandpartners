"use client";

import Link from "next/link";
import Image from "next/image";
import { taxProjects as taxProjectsData } from "@/data/caseStudies";
import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

/* --------------------------------- Types --------------------------------- */
export interface TaxProject {
  title: string;
  label: string;
  imgSrc: string;
  active?: boolean;
}

const taxProjects = taxProjectsData as unknown as TaxProject[];

export default function CaseStudies() {
  const projectRefs = useRef<HTMLDivElement[]>([]);
  const imageRefs = useRef<HTMLDivElement[]>([]);

  // Keep a map of handlers for proper cleanup (avoid mutating DOM nodes)
  const handlerMapRef = useRef<Map<HTMLElement, (ev: Event) => void>>(
    new Map()
  );

  // Clear and reassign refs on re-render
  projectRefs.current = [];
  imageRefs.current = [];

  const addToProjectRefs = (el: HTMLDivElement | null) => {
    if (el && !projectRefs.current.includes(el)) {
      projectRefs.current.push(el);
    }
  };

  const addToImageRefs = (el: HTMLDivElement | null) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
    }
  };

  useEffect(() => {
    const handleInteraction = (index: number) => () => {
      projectRefs.current.forEach((el) => el.classList.remove("active"));
      imageRefs.current.forEach((el) => el.classList.remove("active"));

      projectRefs.current[index]?.classList.add("active");
      imageRefs.current[index]?.classList.add("active");
    };

    projectRefs.current.forEach((item, index) => {
      const handler = handleInteraction(index);
      item.addEventListener("mouseenter", handler as EventListener);
      item.addEventListener("click", handler as EventListener);
      handlerMapRef.current.set(item, handler);
    });

    return () => {
      projectRefs.current.forEach((item) => {
        const h = handlerMapRef.current.get(item);
        if (h) {
          item.removeEventListener("mouseenter", h as EventListener);
          item.removeEventListener("click", h as EventListener);
        }
      });
      handlerMapRef.current.clear();
    };
  }, []);

  return (
    <section
      className="section-project h-7 tf-spacing-2 section-one-page"
      id="project"
    >
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center">
              <div className="text-anime-wave-1">
                <a href="#" className="tag label text-btn-uppercase">
                  Our Featured Projects
                </a>
              </div>
              <h3 className="text-anime-wave-1 mb-12">Success Stories</h3>
              <div className="sub-title body-2 color-on-suface-container text-anime-wave-1">
                Discover how we’ve helped clients achieve remarkable results.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-project-inner">
        <div className="list-case">
          <Swiper
            dir="ltr"
            className="sw-case-studies swiper sw-layout"
            breakpoints={
              {
                0: { slidesPerView: 1 },
                575: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1200: { slidesPerView: 4 },
              } as any
            }
          >
            {taxProjects.map((item, index) => (
              <SwiperSlide className="swiper-slide" key={index}>
                <div
                  className={`project-item style-2${
                    item.active ? " active" : ""
                  }`}
                  ref={addToProjectRefs}
                >
                  <div className="project-content">
                    <h5>
                      <Link href="/case-studies-details">{item.title}</Link>
                    </h5>
                    <p className="label text-btn-uppercase">{item.label}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="list-image-project">
          {taxProjects.map((project, index) => (
            <div
              className={`image-project ${project.active ? "active" : ""}`}
              key={index}
              ref={addToImageRefs}
            >
              <Image
                src={project.imgSrc}
                alt="Case study image"
                className="lazyload"
                width={1920}
                height={634}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
