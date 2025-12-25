import Link from "next/link";

import React from "react";
import OdometerComponent from "@/components/common/OdometerComponent";

export default function AboutAlBahar() {
  

  return (
    <section
      className="section-about h-1 h-3 tf-spacing-2 section-one-page"
      id="about"
    >
      <div className="tf-container">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <div className="heading-section about-content-left">
              <div className="text-anime-wave">
                <a href="#" className="tag label text-btn-uppercase">
                  About Al-Bahar Group
                </a>
              </div>
              <h3 className="title-section mb-40">
                Al-Bahar Group was founded<br /> in 1937 by Mr. Mohamed<br /> Abdulrahman
                Al-Bahar as<br /> a  General Trading Company.
              </h3>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="about-content-right p-0">
              <div className="counter-item">
                <div className="counter">
                  <div className="number-counter mb-0">
                    <h2 className="number odometer color-primary">
                      <OdometerComponent max={88} />
                    </h2>
                    <h2 className="plus color-primary">+</h2>
                  </div>
                  <p className="text text-btn-uppercase label color-on-suface-variant-1">
                    Years of Excellence & Impact
                  </p>
                </div>
              </div>
              <div className="flat-animate-tab">
                <div className="wg-tab style-small">
                  <ul className="tab-product min-w-366" role="tablist">
                    <li className="nav-tab-item" role="presentation">
                      <h6>
                        <a
                          href="#growth"
                          data-bs-toggle="tab"
                          role="tab"
                          className="active"
                        >
                          Growth
                        </a>
                      </h6>
                    </li>
                    <li className="nav-tab-item" role="presentation">
                      <h6>
                        <a href="#partnerships" data-bs-toggle="tab" role="tab">
                          Partnerships
                        </a>
                      </h6>
                    </li>
                    <li className="nav-tab-item" role="presentation">
                      <h6>
                        <a href="#community" data-bs-toggle="tab" role="tab">
                          Community
                        </a>
                      </h6>
                    </li>
                  </ul>
                </div>
                <div className="tab-content">
                  <div
                    className="tab-pane active show"
                    id="growth"
                    role="tabpanel"
                  >
                    <p className="text">
                      Over the decades, we've grown to become a leading force in
                      regional markets across a variety of industries. Our
                      diverse portfolio spans everything from consumer goods,
                      home appliances, cutting-edge electronics, shipping,
                      office technology, IT solutions, and beyond.
                    </p>
                  </div>
                  <div className="tab-pane" id="partnerships" role="tabpanel">
                    <p className="text">
                      Partnering with global titans like Unilever, Canon, and GE
                      appliances, we bring Kuwait's shoppers the latest in
                      innovation and best practices. Our ethos thrives on
                      collaboration, fostering enduring relationships that
                      benefit both brands and customers alike.
                    </p>
                  </div>
                  <div className="tab-pane" id="community" role="tabpanel">
                    <p className="text">
                      More than just commerce, we're committed to community.
                      Through our foundations and corporate social initiatives,
                      we're dedicated to giving back, enriching the lives of
                      those we serve. Join us as we continue our proud tradition
                      of excellence and impact in Kuwait and the region.
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
