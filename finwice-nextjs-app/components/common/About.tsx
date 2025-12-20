"use client";
import Link from "next/link";

import React, { useState } from "react";
import OdometerComponent from "./OdometerComponent";
import { counters } from "@/data/cta";
import ModalVideo from "./ModalVideo";

export default function About() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <section className="section-about h-2 section-one-page" id="about">
        <div className="about-inner">
          <div className="section-about-left">
            <div className="about-top">
              <div className="tf-container">
                <div className="row">
                  <div className="col-12">
                    <div className="about-content">
                      <div className="heading-section">
                        <div className="text-anime-wave">
                          <a href="#" className="tag label text-btn-uppercase">
                            WE ARE FinWice
                          </a>
                        </div>
                        <h3 className="title-section mb-28 text-anime-wave">
                          Empowering Your Business
                          <br />
                          Success
                        </h3>
                        <div className="sub-title mb-32 text-anime-wave">
                          At FinWice, we empower businesses with tailored
                          strategies, innovative solutions, and
                          <br />
                          expert consulting. Our industry professionals drive
                          growth and guide you through <br />
                          challenges to achieve success.
                        </div>
                        <div className="text-anime-wave">
                          <Link
                            href={`/about-us`}
                            className="tf-btn style-1 bg-on-suface-container"
                          >
                            <span> About Us </span>
                          </Link>
                        </div>
                      </div>
                      <div className="wg-counter style-column g-40">
                        {counters.map((counter, index) => (
                          <div className="counter-item" key={index}>
                            <div className="counter">
                              <div className="number-counter">
                                <h4 className="number odometer color-primary">
                                  <OdometerComponent max={counter.value} />
                                </h4>
                                <h4 className="plus color-primary">+</h4>
                              </div>
                              <p className="text text-btn-uppercase label">
                                {counter.label}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-bottom">
              <div className="tf-container">
                <div className="row">
                  <div className="col-12">
                    <div className="flat-animate-tab">
                      <div className="wg-tab style-small">
                        <ul className="tab-product min-w-366" role="tablist">
                          <li className="nav-tab-item" role="presentation">
                            <h6>
                              <a
                                href="#expertise"
                                data-bs-toggle="tab"
                                role="tab"
                                className="active"
                              >
                                Expertise
                              </a>
                            </h6>
                          </li>
                          <li className="nav-tab-item" role="presentation">
                            <h6>
                              <a
                                href="#innovation"
                                data-bs-toggle="tab"
                                role="tab"
                              >
                                Innovation
                              </a>
                            </h6>
                          </li>
                          <li className="nav-tab-item" role="presentation">
                            <h6>
                              <a
                                href="#commitment"
                                data-bs-toggle="tab"
                                role="tab"
                              >
                                Commitment
                              </a>
                            </h6>
                          </li>
                        </ul>
                      </div>
                      <div className="tab-content">
                        <div
                          className="tab-pane active show"
                          id="expertise"
                          role="tabpanel"
                        >
                          <p className="text">
                            Our team of experts delivers tailored insights and
                            solutions, guiding you through complex challenges.
                            Partner with us for impactful results and reliable
                            support on your path to success.
                          </p>
                        </div>
                        <div
                          className="tab-pane"
                          id="innovation"
                          role="tabpanel"
                        >
                          <p className="text">
                            Our team of experts delivers tailored insights and
                            solutions, guiding you through complex challenges.
                            Partner with us for impactful results and reliable
                            support on your path to success.
                          </p>
                        </div>
                        <div
                          className="tab-pane"
                          id="commitment"
                          role="tabpanel"
                        >
                          <p className="text">
                            Our team of experts delivers tailored insights and
                            solutions, guiding you through complex challenges.
                            Partner with us for impactful results and reliable
                            support on your path to success.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section-about-right tf-animate-4">
            <div className="wg-video">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(true);
                }}
                className="popup-youtube"
              >
                <div className="icon">
                  <i className="icon-Play" />
                </div>
                <div className="wave" />
                <div className="wave" />
                <div className="wave" />
              </a>
            </div>
          </div>
        </div>
      </section>
      <ModalVideo
        videoId={"XHOmBV4js_E"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}
