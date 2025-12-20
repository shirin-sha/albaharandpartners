"use client";
import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
const processSteps = [
  {
    step: "Step 1",
    title: "Assessment",
    description: "Gather client’s financial information, goals, and needs.",
    icon: (
      <svg
        width={48}
        height={48}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_9360_10043)">
          <path
            d="M6.30025 27.2812C5.51922 23.0656 6.26859 18.7096 8.41349 14.9972C10.5584 11.2849 13.9579 8.46011 18.0002 7.03125V20.5312L6.30025 27.2812Z"
            stroke="#24283E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M24 24.0787V6C27.1537 6.00047 30.2519 6.82949 32.9843 8.40405C35.7168 9.9786 37.9876 12.2434 39.5694 14.9717C41.1512 17.7 41.9884 20.796 41.9972 23.9496C42.0061 27.1033 41.1862 30.2039 39.6197 32.941C38.0532 35.6781 35.7951 37.9556 33.0715 39.5454C30.3479 41.1352 27.2544 41.9816 24.1008 41.9997C20.9472 42.0178 17.8442 41.2071 15.1025 39.6487C12.3608 38.0903 10.0766 35.8389 8.47876 33.12L24 24.0787Z"
            stroke="#24283E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_9360_10043">
            <rect width={48} height={48} fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    step: "Step 2",
    title: "Goal Setting",
    description: "Define short-term and long-term financial objectives.",
    icon: (
      <svg
        width={48}
        height={48}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_9360_10053)">
          <path
            d="M24 43.5V37.5M24 40.5C33.1127 40.5 40.5 33.1127 40.5 24C40.5 14.8873 33.1127 7.5 24 7.5C14.8873 7.5 7.5 14.8873 7.5 24C7.5 33.1127 14.8873 40.5 24 40.5ZM24 4.5V10.5M4.5 24H10.5M43.5 24H37.5M24 30C27.3137 30 30 27.3137 30 24C30 20.6863 27.3137 18 24 18C20.6863 18 18 20.6863 18 24C18 27.3137 20.6863 30 24 30Z"
            stroke="#24283E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_9360_10053">
            <rect width={48} height={48} fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    step: "Step 3",
    title: "Plan Development",
    description: "Create a customized financial strategy based on analysis.",
    icon: (
      <svg
        width={48}
        height={48}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_9360_10067)">
          <path
            d="M42 39H6V9M37.5 13.5L24 27L18 21L6 33M37.5 21V13.5H30"
            stroke="#24283E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_9360_10067">
            <rect width={48} height={48} fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    step: "Step 4",
    title: "Ongoing Review",
    description:
      "Implement the plan and regularly review progress for adjustments.",
    icon: (
      <svg
        width={48}
        height={48}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_9360_10078)">
          <path
            d="M40.5 21V10.5C40.5 10.1022 40.342 9.72064 40.0607 9.43934C39.7794 9.15804 39.3978 9 39 9H9C8.60218 9 8.22064 9.15804 7.93934 9.43934C7.65804 9.72064 7.5 10.1022 7.5 10.5V21C7.5 39 24 43.5 24 43.5C24 43.5 40.5 39 40.5 21Z"
            stroke="#24283E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.5 25.5L21 30L31.5 19.5"
            stroke="#24283E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_9360_10078">
            <rect width={48} height={48} fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
];

export default function Process() {
  return (
    <section className="section-process h-8 tf-spacing-2 hover-active-step">
      <div className="tf-container position-relative">
        <div className="row">
          <div className="col-12">
            <div className="heading-section style-2 style-color-white">
              <div className="left">
                <div className="text-anime-wave">
                  <a
                    href="#"
                    className="tag label text-btn-uppercase color-white"
                  >
                    steps to success
                  </a>
                </div>
                <h3 className="title-section mb-12 text-anime-wave">
                  How Does It Work?
                </h3>
                <div className="sub-title body-2 text-anime-wave">
                  Follow our proven steps to achieve your goals and drive your
                  business to success.
                </div>
              </div>
              <div className="text-anime-wave-2">
                <Link href={`/contact-us`} className="tf-btn style-1 bg-white">
                  <span>Schedule A Consultation</span>
                </Link>
              </div>
            </div>
            <Swiper
              className="sw-case-studies swiper sw-layout"
              spaceBetween={10}
              dir="ltr"
              breakpoints={{
                0: { slidesPerView: 1 },
                575: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1200: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
            >
              {processSteps.map((item, index) => (
                <SwiperSlide className="swiper-slide" key={index}>
                  <div className="process-item bg-1 bg-1-style-2 step-hover">
                    <div className="process-top">
                      <div className="icon">{item.icon}</div>
                      <span className="label text-btn-uppercase">
                        {item.step}
                      </span>
                    </div>
                    <div className="process-content">
                      <h5>
                        <a href="#" className="name-process">
                          {item.title}
                        </a>
                      </h5>
                      <div className="desc">{item.description}</div>
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
