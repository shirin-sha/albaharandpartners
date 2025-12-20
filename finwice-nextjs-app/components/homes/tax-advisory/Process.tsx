import Link from "next/link";
import React from "react";

export default function Process() {
  return (
    <section className="section-process h-7 tf-spacing-3 hover-active-step">
      <div className="tf-container position-relative">
        <div className="row">
          <div className="col-12">
            <div className="heading-section style-2">
              <div className="left">
                <div className="text-anime-wave">
                  <a href="#" className="tag label text-btn-uppercase">
                    steps to success
                  </a>
                </div>
                <h3 className="title-section mb-12 text-anime-wave">
                  Pathway to Success
                </h3>
                <div className="sub-title body-2 text-anime-wave">
                  Follow our proven steps to achieve your goals and drive your
                  business to success.
                </div>
              </div>
              <div className="text-anime-wave-2">
                <Link
                  href={`/contact-us`}
                  className="tf-btn style-1 bg-on-suface-container"
                >
                  <span> Schedule A Consultation </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row rg-30">
          <div className="col-md-4">
            <div className="process-item style-border step-hover">
              <div className="process-top">
                <div className="icon">
                  <i className="icon-ChartDonut" />
                </div>
                <span className="label text-btn-uppercase">Step 1</span>
              </div>
              <div className="process-content">
                <h5>
                  <a href="#" className="name-process">
                    Discovery &amp; Analysis
                  </a>
                </h5>
                <div className="desc color-on-suface-variant-1">
                  We assess your business and industry to identify challenges
                  and opportunities.
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="process-item style-border step-hover">
              <div className="process-top">
                <div className="icon">
                  <i className="icon-Crosshair" />
                </div>
                <span className="label text-btn-uppercase">Step 2</span>
              </div>
              <div className="process-content">
                <h5>
                  <a href="#" className="name-process">
                    Strategic Planning
                  </a>
                </h5>
                <div className="desc color-on-suface-variant-1">
                  We create a tailored strategy with actionable steps and clear
                  objectives.
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="process-item style-border step-hover">
              <div className="process-top">
                <div className="icon">
                  <i className="icon-Briefcase" />
                </div>
                <span className="label text-btn-uppercase">Step 3</span>
              </div>
              <div className="process-content">
                <h5>
                  <a href="#" className="name-process">
                    Execution &amp; Monitoring
                  </a>
                </h5>
                <div className="desc color-on-suface-variant-1">
                  We implement the plan, track progress, and adjust as needed to
                  achieve your goals.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
