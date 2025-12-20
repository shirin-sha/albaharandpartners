import Image from "next/image";
import React from "react";

export default function Process() {
  return (
    <section
      className="section-process h-5 bg-surface tf-spacing-2 section-one-page"
      id="project"
    >
      <div className="tf-container position-relative">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center">
              <div className="text-anime-wave-1">
                <a href="#" className="tag label text-btn-uppercase">
                  Our Process
                </a>
              </div>
              <h3 className="text-anime-wave-1 mb-12">
                Our Data Analytics Process
              </h3>
              <div className="sub-title body-2 text-anime-wave-1">
                Our approach to data analytics is built around delivering
                actionable insights that drive success
              </div>
            </div>
            <div className="process-list hover-active-step">
              <div className="process-item style-2 hover-img step-hover">
                <div className="image">
                  <Image
                    src="/image/section/process-item-1.jpg"
                    alt=""
                    className="lazyload"
                    width={321}
                    height={320}
                  />
                </div>
                <span className="label text-btn-uppercase color-primary">
                  Step 1
                </span>
                <div className="process-content text-center">
                  <h5>
                    <a href="#" className="name-process">
                      Market Analysis
                    </a>
                  </h5>
                  <div className="desc">
                    We analyze trends and competitor strategies to uncover
                    opportunities.
                  </div>
                </div>
              </div>
              <div className="process-item style-2 hover-img step-hover">
                <div className="image">
                  <Image
                    src="/image/section/process-item-2.jpg"
                    alt=""
                    className="lazyload"
                    width={321}
                    height={320}
                  />
                </div>
                <span className="label text-btn-uppercase color-primary">
                  Step 2
                </span>
                <div className="process-content text-center">
                  <h5>
                    <a href="#" className="name-process">
                      Strategy Development
                    </a>
                  </h5>
                  <div className="desc">
                    We create tailored marketing strategies to meet your
                    business goals.
                  </div>
                </div>
                <div className="icon-list item-1">
                  <i className="icon-connect-line-2" />
                </div>
              </div>
              <div className="process-item style-2 hover-img step-hover">
                <div className="image">
                  <Image
                    src="/image/section/process-item-3.jpg"
                    alt=""
                    className="lazyload"
                    width={321}
                    height={320}
                  />
                </div>
                <span className="label text-btn-uppercase color-primary">
                  Step 3
                </span>
                <div className="process-content text-center">
                  <h5>
                    <a href="#" className="name-process">
                      Implementation
                    </a>
                  </h5>
                  <div className="desc">
                    Our team executes the plan and manages campaigns for optimal
                    results.
                  </div>
                </div>
                <div className="icon-list item-2">
                  <i className="icon-connect-line-1" />
                </div>
              </div>
              <div className="process-item style-2 hover-img step-hover">
                <div className="image">
                  <Image
                    src="/image/section/process-item-4.jpg"
                    alt=""
                    className="lazyload"
                    width={321}
                    height={320}
                  />
                </div>
                <span className="label text-btn-uppercase">Step 4</span>
                <div className="process-content text-center">
                  <h5>
                    <a href="#" className="name-process">
                      Performance Tracking
                    </a>
                  </h5>
                  <div className="desc">
                    We track KPIs to refine strategies and enhance campaign
                    effectiveness.
                  </div>
                </div>
                <div className="icon-list item-3">
                  <i className="icon-connect-line-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
