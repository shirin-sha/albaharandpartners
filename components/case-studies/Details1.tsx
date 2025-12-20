"use client";
import Image from "next/image";
import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
const AreaLineChart = dynamic(() => import("../charts/CrealineChart"), {
  ssr: false,
});

export default function Details1() {
  return (
    <div className="tf-container tf-spacing-2">
      <div className="row rg-60">
        <div className="col-lg-8">
          <div className="case-studies-details">
            <div className="image-details image mb-40">
              <Image
                src="/image/section/img-details-case.jpg"
                alt=""
                className="lazyload"
                width={850}
                height={512}
              />
            </div>
            <div className="detalis-content mb-40">
              <h4 className="title-content mb-16">Project Overview</h4>
              <div className="desc mb-16 body-2">
                Our team worked with a mid-sized manufacturing client aiming to
                streamline operations and boost efficiency across its production
                processes. Faced with costly delays and resource allocation
                challenges, the company sought a structured approach to reduce
                bottlenecks and optimize output.
              </div>
            </div>
            <div className="detalis-content mb-40">
              <h4 className="title-content mb-16">Our Approach</h4>
              <div className="desc mb-20 body-2">
                We conducted an in-depth operational audit to identify key areas
                for improvement, analyzing workflow patterns and resource usage.
                Our team introduced a combination of process automation,
                employee retraining programs, and data-driven workflow
                management tools. Additionally, we implemented real-time
                tracking systems to monitor productivity and adjust operations
                dynamically.
              </div>
              <div className="mb-20">
                <h6 className="mb-8">1. Comprehensive Operational Audit</h6>
                <div className="body-2 desc">
                  We started with a thorough analysis of the client's production
                  workflows to identify inefficiencies, bottlenecks, and areas
                  for improvement. This step provided us with actionable
                  insights into resource usage and process flow.
                </div>
              </div>
              <div className="mb-20">
                <h6 className="mb-8">
                  2. Process Optimization and Employee Training
                </h6>
                <div className="body-2 desc">
                  We implemented automation solutions to streamline repetitive
                  tasks and introduced targeted training programs for employees,
                  ensuring they adapted smoothly to the new workflows.
                </div>
              </div>
              <div className="mb-20">
                <h6 className="mb-8">
                  3. Real-Time Tracking and Workflow Management
                </h6>
                <div className="body-2 desc">
                  To support dynamic adjustments, we integrated real-time
                  tracking systems and data-driven management tools, enabling
                  the client to monitor productivity closely and optimize
                  resource allocation effectively.
                </div>
              </div>
            </div>
            <div className="detalis-content mb-40">
              <h4 className="title-content mb-16">Growth Metrics Overview</h4>
              <div className="wg-box-chart">
                <div className="top-wg-box-char">
                  <div className="left">
                    <h5 className="color-on-suface-container">
                      Revenue Generated
                    </h5>
                    <h5 className="number">
                      <i className="icon-TrendUp" />
                      18%
                    </h5>
                    <p className="color-on-suface-container">
                      Compared to last year
                    </p>
                  </div>
                  <div className="right">
                    <div className="flat-animate-tab">
                      <div className="wg-tab">
                        <ul className="tab-product mb-0" role="tablist">
                          <li className="nav-tab-item" role="presentation">
                            <a
                              href="#weekly"
                              data-bs-toggle="tab"
                              role="tab"
                              className="active text-btn"
                            >
                              Weekly
                            </a>
                          </li>
                          <li className="nav-tab-item" role="presentation">
                            <a
                              href="#monthly"
                              data-bs-toggle="tab"
                              role="tab"
                              className="text-btn"
                            >
                              Monthly
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="tab-content">
                        <div
                          className="tab-pane active show"
                          id="weekly"
                          role="tabpanel"
                        />
                        <div
                          className="tab-pane"
                          id="monthly"
                          role="tabpanel"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <AreaLineChart />
              </div>
            </div>
            <div className="detalis-content mb-34">
              <h4 className="title-content mb-16">Results Achieved</h4>
              <div className="benefit-lists">
                <div className="benefit-items">
                  <div className="icon">
                    <i className="icon-checkbox" />
                  </div>
                  <div className="title">
                    Increased production efficiency by 30%, leading to faster
                    turnaround times.
                  </div>
                </div>
                <div className="benefit-items">
                  <div className="icon">
                    <i className="icon-checkbox" />
                  </div>
                  <div className="title">
                    Reduced operational costs by 20% through streamlined
                    processes.
                  </div>
                </div>
                <div className="benefit-items">
                  <div className="icon">
                    <i className="icon-checkbox" />
                  </div>
                  <div className="title">
                    Minimized downtime, enhancing product quality and
                    consistency.
                  </div>
                </div>
                <div className="benefit-items">
                  <div className="icon">
                    <i className="icon-checkbox" />
                  </div>
                  <div className="title">
                    Improved resource allocation, ensuring optimal use of
                    materials and labor.
                  </div>
                </div>
                <div className="benefit-items">
                  <div className="icon">
                    <i className="icon-checkbox" />
                  </div>
                  <div className="title">
                    Established a sustainable framework for ongoing operational
                    improvements.
                  </div>
                </div>
              </div>
            </div>
            <div className="pre-next-blog">
              <div className="pre pre-next-blog-item">
                <a href="#" className="pre-next-btn">
                  PREVIOUS
                </a>
                <h6>
                  <a href="#" className="name-blog">
                    Supply Chain Optimization for Cost
                    <br />
                    Reduction
                  </a>
                </h6>
              </div>
              <div className="line" />
              <div className="next pre-next-blog-item">
                <a href="#" className="pre-next-btn">
                  NEXT
                </a>
                <h6>
                  <a href="#" className="name-blog">
                    Financial Revamp for Sustainable
                    <br />
                    Profitability
                  </a>
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="tf-sidebar sidebar-details ml-50">
            <div className="sideber-details">
              <div className="case-details-box mb-40">
                <h5 className="color-on-suface-container">Case Details</h5>
                <div className="box-item client flex justify-content-between align-items-center">
                  <span className="color-on-suface-variant-1">Client:</span>
                  <span className="text-btn color-on-suface-container">
                    Avitex Company
                  </span>
                </div>
                <div className="box-item flex justify-content-between align-items-center">
                  <span className="color-on-suface-variant-1">Tag:</span>
                  <span className="text-btn color-on-suface-container">
                    Planning, Estate
                  </span>
                </div>
                <div className="box-item flex justify-content-between align-items-center">
                  <span className="color-on-suface-variant-1">Start Day:</span>
                  <span className="text-btn color-on-suface-container">
                    10/26/2024
                  </span>
                </div>
                <div className="box-item flex justify-content-between align-items-center">
                  <span className="color-on-suface-variant-1">Duration:</span>
                  <span className="text-btn color-on-suface-container number-month">
                    1 Month
                  </span>
                </div>
              </div>
            </div>
            <div className="sidebar-contact sidebar-details">
              <div className="section-content position-relative">
                <div className="heading-section style-color-white">
                  <Link
                    href={`/contact-us`}
                    className="tag label text-btn-uppercase color-white mb-16"
                  >
                    Contact US
                  </Link>
                  <h4 className="title-section mb-1">Get In Touch</h4>
                  <div className="sub-title caption-1">
                    Reach out today to discuss how we can
                    <br />
                    support your business goals.
                  </div>
                </div>
                <div className="list-box-contact style-column mb-28">
                  <div className="box-contact-item">
                    <div className="icon">
                      <i className="icon-MapPin" />
                    </div>
                    <div className="content">
                      <div className="caption-1 title-section-contact">
                        Address Business
                      </div>
                      <a href="#" className="caption-1 text">
                        101 E 129th St, East <br />
                        Chicago, IN 46312, US
                      </a>
                      <a href="#" className="label text-btn-uppercase">
                        Get direction
                      </a>
                    </div>
                  </div>
                  <div className="box-contact-item">
                    <div className="icon">
                      <i className="icon-PhoneCall" />
                    </div>
                    <div className="content">
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
                  <div className="box-contact-item">
                    <div className="icon">
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
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7.3335 4.75L3.3335 8.75"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M25.3335 4.75L29.3335 8.75"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16.3335 10.75V17.75H23.3335"
                            stroke="white"
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
                    <div className="content">
                      <div className="caption-1 title-section-contact">
                        Working Time
                      </div>
                      <a href="#" className="caption-1 text">
                        Mon-Sat:8:00am - 18:00pm <br />
                        Sun: Closed
                      </a>
                    </div>
                  </div>
                </div>
                <Link
                  href={`/contact-us`}
                  className="tf-btn style-1 bg-white bg-white-style-2 w-full text-center"
                >
                  <span> Contact Us </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
