"use client";
import React from "react";
import DropdownSelect from "../common/DropdownSelect";
import Link from "next/link";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section className="section-contact-home page-contact tf-spacing-2">
      <div className="tf-container position-relative">
        <div className="row rg-60">
          <div className="col-lg-7">
            <div className="section-contact-home-inner mr-30">
              <div className="section-content">
                <div className="heading-section mb-28">
                  <div className="wow fadeInUp">
                    <Link
                      href={`/contact-us`}
                      className="tag label text-btn-uppercase mb-12"
                    >
                      Contact US
                    </Link>
                  </div>
                  <h3 className="title-section mb-12 wow fadeInUp">
                    Get in Touch with Us
                  </h3>
                  <div className="sub-title body-2 color-on-suface-container wow fadeInUp">
                    Reach out today to discuss how we can support your business
                    goals. Our team is
                    <br />
                    ready to provide answers, offer solutions, and start your
                    journey toward success.
                  </div>
                </div>
                <div className="cols">
                  <div className="benefit-lists item">
                    <div className="benefit-items">
                      <div className="icon wow fadeInUp">
                        <i className="icon-checkbox" />
                      </div>
                      <div
                        className="caption-1 wow fadeInUp"
                        data-wow-delay=".1s"
                      >
                        24/7 Expert Support
                      </div>
                    </div>
                    <div className="benefit-items">
                      <div className="icon wow fadeInUp">
                        <i className="icon-checkbox" />
                      </div>
                      <div
                        className="caption-1 wow fadeInUp"
                        data-wow-delay=".1s"
                      >
                        Free Consultation Before You Commit
                      </div>
                    </div>
                  </div>
                  <div className="benefit-lists item">
                    <div className="benefit-items">
                      <div className="icon wow fadeInUp" data-wow-delay=".2s">
                        <i className="icon-checkbox" />
                      </div>
                      <div
                        className="caption-1 wow fadeInUp"
                        data-wow-delay=".3s"
                      >
                        Business-Focused Guidance
                      </div>
                    </div>
                    <div className="benefit-items">
                      <div className="icon wow fadeInUp" data-wow-delay=".2s">
                        <i className="icon-checkbox" />
                      </div>
                      <div
                        className="caption-1 wow fadeInUp"
                        data-wow-delay=".3s"
                      >
                        Trusted and Qualified Advisors
                      </div>
                    </div>
                  </div>
                </div>
                <div className="list-box-contact">
                  <div className="box-contact-item style-bg-white">
                    <div className="icon wow fadeInUp">
                      <i className="icon-MapPin" />
                    </div>
                    <div className="content wow fadeInUp" data-wow-delay=".1s">
                      <div className="caption-1 title-section-contact">
                        Address Business
                      </div>
                      <a href="#" className="caption-1 text">
                        101 E 129th St, East <br />
                        Chicago, IN 46312,
                        <br />
                        US
                      </a>
                    </div>
                  </div>
                  <div className="box-contact-item style-bg-white">
                    <div className="icon wow fadeInUp" data-wow-delay=".2s">
                      <i className="icon-PhoneCall" />
                    </div>
                    <div className="content wow fadeInUp" data-wow-delay=".3s">
                      <div className="caption-1 title-section-contact">
                        Contact Us
                      </div>
                      <a href="#" className="caption-1 text">
                        1-555-678-8888
                        <br />
                        1-333-123-6666
                      </a>
                    </div>
                  </div>
                  <div className="box-contact-item style-bg-white">
                    <div className="icon wow fadeInUp" data-wow-delay=".4s">
                      <svg
                        width={33}
                        height={33}
                        viewBox="0 0 33 33"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_9360_10609)">
                          <path
                            d="M16.3335 28.75C22.4086 28.75 27.3335 23.8251 27.3335 17.75C27.3335 11.6749 22.4086 6.75 16.3335 6.75C10.2584 6.75 5.3335 11.6749 5.3335 17.75C5.3335 23.8251 10.2584 28.75 16.3335 28.75Z"
                            stroke="#24283E"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7.3335 4.75L3.3335 8.75"
                            stroke="#24283E"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M25.3335 4.75L29.3335 8.75"
                            stroke="#24283E"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16.3335 10.75V17.75H23.3335"
                            stroke="#24283E"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath>
                            <rect
                              width={32}
                              height={32}
                              fill="white"
                              transform="translate(0.333496 0.75)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="content wow fadeInUp" data-wow-delay=".5s">
                      <div className="caption-1 title-section-contact">
                        Working Time
                      </div>
                      <a href="#" className="caption-1 text">
                        Week-Day: 8:00 -
                        <br />
                        18:00 <br />
                        Sunday: Closed
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
