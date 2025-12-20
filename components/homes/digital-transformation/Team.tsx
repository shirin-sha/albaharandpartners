"use client";

import Image from "next/image";
import { socialIcons, teamMembers } from "@/data/team";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useContextElement } from "@/context/Context";
import { Pagination } from "swiper/modules";

export default function Team() {
  const { setCurrentTeamMember } = useContextElement();
  return (
    <section
      className="section-team h-4 tf-spacing-2 section-one-page"
      id="testimonials"
    >
      <div className="tf-container position-relative">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center">
              <div className="text-anime-wave-1">
                <a href="#" className="tag label text-btn-uppercase">
                  Our Team
                </a>
              </div>
              <h3 className="title-section text-anime-wave-1 mb-12">
                Meet Our Experts
              </h3>
              <div className="sub-title body-2 text-anime-wave-1">
                Our expert team is here to drive your success with tailored,
                innovative solutions.
              </div>
            </div>
            <Swiper
              dir="ltr"
              className="sw-team-list swiper sw-layout"
              spaceBetween={10}
              breakpoints={{
                0: { slidesPerView: 1 },
                575: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1200: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
              modules={[Pagination]}
              pagination={{
                clickable: true,
                el: ".spe23",
              }}
            >
              {teamMembers.map((member, index) => (
                <SwiperSlide className="swiper-slide" key={index}>
                  <div className="team-item hover-img">
                    <div className="image">
                      <Image
                        src={member.imgSrc}
                        alt={member.name}
                        className="lazyload"
                        width={300}
                        height={401}
                      />
                      <a
                        href="#canvnasTeamsDetails"
                        data-bs-toggle="offcanvas"
                        className="link"
                        onClick={() => setCurrentTeamMember(member)}
                      />
                      <div className="team-social">
                        <ul className="tf-social bg-1 radius-50 g-8">
                          {socialIcons.map((icon, i) => (
                            <li className="item" key={i}>
                              <a href="#">
                                <div className="icon">
                                  <i className={icon} />
                                </div>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="team-content">
                      <h5 className="name-team">
                        <a
                          href="#canvnasTeamsDetails"
                          data-bs-toggle="offcanvas"
                          onClick={() => setCurrentTeamMember(member)}
                        >
                          {member.name}
                        </a>
                      </h5>
                      <div className="position caption-1">
                        {member.position}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <div className="sw-pagination-layout  flex justify-content-center spe23"></div>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
