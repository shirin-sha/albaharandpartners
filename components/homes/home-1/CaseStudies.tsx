"use client";

import Link from "next/link";
import Image from "next/image";
import { projects as projectsData } from "@/data/caseStudies";
import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Project } from "@/types/project";

/* --------------------------------- Types --------------------------------- */

const projects = projectsData as unknown as Project[];

export default function CaseStudies() {
  const projectRefs = useRef<HTMLDivElement[]>([]);
  const imageRefs = useRef<HTMLDivElement[]>([]);

  // store event handlers for cleanup without mutating DOM nodes
  const handlerMapRef = useRef<Map<HTMLElement, (ev: Event) => void>>(
    new Map()
  );

  // Clear and reassign refs on each render to rebuild from mapped list
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

    // Attach listeners
    projectRefs.current.forEach((item, index) => {
      const handler = handleInteraction(index);
      item.addEventListener("mouseenter", handler as EventListener);
      item.addEventListener("click", handler as EventListener);
      handlerMapRef.current.set(item, handler);
    });

    return () => {
      // Cleanup all listeners safely
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
      className="section-project h-1 bg-on-suface-container section-one-page"
      id="project"
    >
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section style-color-white text-center">
              <div className="text-anime-wave-1">
                <a
                  href="#"
                  className="tag label text-btn-uppercase color-white"
                >
                  Our Featured Projects
                </a>
              </div>
              <h3 className="title-section text-anime-wave-1 mb-12">
                Success Stories
              </h3>
              <div className="sub-title body-2 text-anime-wave-1">
                Discover how we’ve helped clients achieve remarkable results.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-project-inner">
        <div className="list-case">
          <Swiper
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
            {projects.map((project, index) => (
              <SwiperSlide className="swiper-slide" key={index}>
                <div
                  className={`project-item${project.active ? " active" : ""}`}
                  ref={addToProjectRefs}
                >
                  <Link href="/case-studies-details" className="link" />
                  <div className="project-content">
                    <h5>
                      <Link href="/case-studies-details" className="name">
                        {project.title}
                      </Link>
                    </h5>
                    <div className="text text-btn-uppercase label">
                      {project.label}
                    </div>
                    <div className="desc">{project.description}</div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="list-image-project">
          {projects.map((project, index) => (
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
