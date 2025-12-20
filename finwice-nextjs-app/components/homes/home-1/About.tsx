import Link from "next/link";

import React from "react";
import OdometerComponent from "@/components/common/OdometerComponent";

export default function About() {
  return (
    <section
      className="section-about h-1 tf-spacing-2 section-one-page"
      id="about"
    >
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-8">
            <div className="heading-section about-content-left">
              <div className="text-anime-wave">
                <a href="#" className="tag label text-btn-uppercase">
                  WE ARE FinWice
                </a>
              </div>
              <h3 className="text-color-change mb-40">
                At FinWice, we offer expert financial <br />
                planning to help you reach your goals. <br />
                Our team provides tailored strategies <br />
                and solutions for your financial success
                <br />
                and security.
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
                  <div className="number-counter mb--3">
                    <h2 className="number odometer color-primary mb-2">
                      <OdometerComponent max={20} />
                    </h2>
                    <h2 className="plus color-primary">+</h2>
                  </div>
                  <p className="text text-btn-uppercase label">
                    Years of Financial Planning Expertise
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
                      solutions, guiding you through complex challenges. Partner
                      with us for impactful results and reliable support on your
                      path to success.
                    </p>
                  </div>
                  <div className="tab-pane" id="innovation" role="tabpanel">
                    <p className="text">
                      Our team of experts delivers tailored insights and
                      solutions, guiding you through complex challenges. Partner
                      with us for impactful results and reliable support on your
                      path to success.
                    </p>
                  </div>
                  <div className="tab-pane" id="commitment" role="tabpanel">
                    <p className="text">
                      Our team of experts delivers tailored insights and
                      solutions, guiding you through complex challenges. Partner
                      with us for impactful results and reliable support on your
                      path to success.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
