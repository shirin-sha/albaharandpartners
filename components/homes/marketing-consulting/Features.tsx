"use client";
import dynamic from "next/dynamic";
const WeeklyBarChart = dynamic(
  () => import("@/components/charts/WeeklyBarChart"),
  { ssr: false }
);
import DropdownSelect from "@/components/common/DropdownSelect";
import React from "react";
import Link from "next/link";

export default function Features() {
  return (
    <section className="section-why-choose h-5 tf-spacing-21">
      <div className="tf-container position-relative">
        <div className="row">
          <div className="col-12">
            <div className="section-why-inner">
              <div className="section-left">
                <div className="card-chart w-627">
                  <div className="top-cart flex justify-content-end">
                    <DropdownSelect
                      addtionalParentClass="no-border"
                      options={["Week", "Month", "Year"]}
                    />
                  </div>
                  <div className="card-chart-content">
                    <WeeklyBarChart />
                  </div>
                </div>

                <div className="progress-box">
                  <div className="top-box mb-20">
                    <div className="left">
                      <div className="sub-title body-2">Progress</div>
                      <h3 className="number fw-7">4751</h3>
                    </div>
                    <h6 className="progress-bars-number">75.5%</h6>
                  </div>
                  <div className="progress-cart">
                    <div className="value" style={{ width: "76%" }} />
                  </div>
                </div>
              </div>
              <div className="section-content section-right">
                <div className="heading-section">
                  <div className="wow fadeInUp">
                    <a href="#" className="tag label text-btn-uppercase">
                      Why Choose Us?
                    </a>
                  </div>
                  <h3 className="title-section mb-12 wow fadeInUp">
                    Why Choose Us FinWice?
                  </h3>
                  <div className="sub-title body-2 color-on-suface-variant-1 wow fadeInUp">
                    Our expert team delivers tailored, data-driven strategies
                    that align with your unique business goals. With a proven
                    track record, we ensure sustainable growth and enhanced
                    brand visibility in a competitive market.
                  </div>
                </div>
                <div className="benefit-lists mb-30">
                  <div className="benefit-items">
                    <div className="icon wow fadeInUp">
                      <i className="icon-checkbox" />
                    </div>
                    <div className="title wow fadeInUp" data-wow-delay=".1s">
                      Experienced Marketing Professionals at Your Service
                    </div>
                  </div>
                  <div className="benefit-items">
                    <div className="icon wow fadeInUp">
                      <i className="icon-checkbox" />
                    </div>
                    <div className="title wow fadeInUp" data-wow-delay=".1s">
                      Data-Driven Insights for Informed Decisions
                    </div>
                  </div>
                  <div className="benefit-items">
                    <div className="icon wow fadeInUp">
                      <i className="icon-checkbox" />
                    </div>
                    <div className="title wow fadeInUp" data-wow-delay=".1s">
                      Tailored Strategies for Unique Challenges
                    </div>
                  </div>
                  <div className="benefit-items">
                    <div className="icon wow fadeInUp">
                      <i className="icon-checkbox" />
                    </div>
                    <div className="title wow fadeInUp" data-wow-delay=".1s">
                      Collaborative Partnership for Shared Success
                    </div>
                  </div>
                </div>
                <div className="wow fadeInUp">
                  <Link
                    href={`/contact-us`}
                    className="tf-btn style-1 bg-on-suface-container"
                  >
                    <span>Schedule A Consultation</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
