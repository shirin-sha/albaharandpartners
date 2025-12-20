"use client";
import Link from "next/link";

import React, { useState } from "react";
import OdometerComponent from "../common/OdometerComponent";
import ModalVideo from "../common/ModalVideo";

export default function About() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <section className="section-about h-1 page-career tf-spacing-27">
        <div className="tf-container">
          <div className="row mb-60 align-items-center">
            <div className="col-lg-8">
              <div className="heading-section about-content-left">
                <div className="text-anime-wave">
                  <a href="#" className="tag label text-btn-uppercase">
                    WE ARE FinWice
                  </a>
                </div>
                <h3 className="text-color-change mb-40">
                  Explore the Passion and Vision Behind
                  <br />
                  Our Consulting Firm, Dedicated to <br />
                  Transforming Your Business Goals
                </h3>
                <Link
                  href={`/about-us`}
                  className="tf-btn style-1 bg-on-suface-container"
                >
                  <span> About Us </span>
                </Link>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="about-content-right">
                <div className="counter-item">
                  <div className="counter">
                    <div className="number-counter">
                      <h2 className="number odometer color-primary mb-2">
                        <OdometerComponent max={20} />
                      </h2>
                      <h2 className="plus color-primary">+</h2>
                    </div>
                    <p className="text text-btn-uppercase label">
                      Years of Strategy Consulting Expertise
                    </p>
                  </div>
                </div>
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
                          <a href="#innovation" data-bs-toggle="tab" role="tab">
                            Innovation
                          </a>
                        </h6>
                      </li>
                      <li className="nav-tab-item" role="presentation">
                        <h6>
                          <a href="#commitment" data-bs-toggle="tab" role="tab">
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
                    <div className="tab-pane" id="innovation" role="tabpanel">
                      <p className="text">
                        Our team of experts delivers tailored insights and
                        solutions, guiding you through complex challenges.
                        Partner with us for impactful results and reliable
                        support on your path to success.
                      </p>
                    </div>
                    <div className="tab-pane" id="commitment" role="tabpanel">
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
          <div className="row">
            <div className="col-12">
              <div className="wg-video w-full img-2 mb-40">
                <a
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
              <h5 className="text-center">
                Explore the diverse expertise of our licensed professionals,
                dedicated to delivering tailored financial <br />
                solutions and strategic advice for your business success.
              </h5>
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
