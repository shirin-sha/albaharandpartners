"use client";
import dynamic from "next/dynamic";
import Link from "next/link";

const Chart1 = dynamic(() => import("@/components/charts/Chart1"), {
  ssr: false,
});
const CustomBarChart = dynamic(
  () => import("@/components/charts/CustomBarChart"),
  { ssr: false }
);
const DistributedBarChart = dynamic(
  () => import("@/components/charts/DistributeBarChart"),
  { ssr: false }
);
const MonthlyBarChart = dynamic(
  () => import("@/components/charts/MonthlyBarChart"),
  { ssr: false }
);

import React from "react";

export default function Features() {
  return (
    <section className="section-why-choose h-3 tf-spacing-3 overflow-clip">
      <div className="section-why-choose-inner">
        <div className="tf-container position-relative">
          <div className="row rg-60 align-items-center">
            <div className="col-lg-6">
              <div className="mr-65 ml-51">
                <div className="list-card mb-20 mb-20">
                  <div className="card-chart card-chart-1">
                    <div className="top-card">
                      <div className="text body-2">Category</div>
                    </div>
                    <div className="arrow-card-btn">
                      <div className="card-chart-arrow-btn">
                        <i className="icon-arrowleft2" />
                      </div>
                      <div className="card-chart-arrow-btn">
                        <i className="icon-arrowright2" />
                      </div>
                    </div>
                    <div className="number">
                      <div className="number-char">82k</div>
                      <p className="number-plus caption-1">+136</p>
                    </div>
                    <div className="card-chart-content">
                      <Chart1 />
                      <div className="number-percent">
                        <span className="number-char">75</span>
                        <span className="percent">%</span>
                      </div>
                    </div>
                    <p className="text-center body-2">Total Revenue</p>
                  </div>
                  <div className="card-chart style-2 card-chart-2">
                    <div className="card-content">
                      <div className="left">
                        <div className="text">JAN</div>
                        <h4>12k</h4>
                        <p className="number-plus body-2">+432</p>
                      </div>
                      <div className="right">
                        <div className="card-chart-content">
                          <DistributedBarChart />
                        </div>
                      </div>
                    </div>
                    <div className="card-content">
                      <div className="left">
                        <div className="text">FEB</div>
                        <h4>1.2m</h4>
                        <p className="number-plus body-2">+3k</p>
                      </div>
                      <div className="right">
                        <div className="card-chart-content">
                          <CustomBarChart />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-chart style-3 card-chart-3">
                  <div className="card-content">
                    <div className="left">
                      <div className="top">
                        <div className="text color-text-3">Lorem</div>
                        <div className="price-card">$843.00</div>
                      </div>
                      <div className="number-plus style-2">
                        <div className="icon">
                          <i className="icon-arrow-top-right" />
                        </div>
                        <span className="body-2">3.31%</span>
                      </div>
                    </div>
                    <div className="right flex-1">
                      <div className="card-chart-content">
                        <MonthlyBarChart />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="section-content ml-15">
                <div className="heading-section">
                  <div className="wow fadeInUp">
                    <a href="#" className="tag label text-btn-uppercase">
                      Why Choose us?
                    </a>
                  </div>
                  <h3 className="title-section mb-12 wow fadeInUp">
                    Why Choose Us?
                  </h3>
                  <div className="sub-title body-2 wow fadeInUp">
                    At FinWice, we pride ourselves on being a trusted partner
                    for businesses seeking strategic growth and transformation.
                    Here are key reasons why we stand out.
                  </div>
                </div>
                <div className="benefit-lists mb-30">
                  <div className="benefit-items">
                    <div className="icon wow fadeInUp">
                      <i className="icon-checkbox" />
                    </div>
                    <div className="title wow fadeInUp" data-wow-delay=".1s">
                      Trusted Expertise for Informed Decision-Making
                    </div>
                  </div>
                  <div className="benefit-items">
                    <div className="icon wow fadeInUp">
                      <i className="icon-checkbox" />
                    </div>
                    <div className="title wow fadeInUp" data-wow-delay=".1s">
                      Customized Solutions for Unique Business Needs
                    </div>
                  </div>
                  <div className="benefit-items">
                    <div className="icon wow fadeInUp">
                      <i className="icon-checkbox" />
                    </div>
                    <div className="title wow fadeInUp" data-wow-delay=".1s">
                      Proven Success with Measurable Outcomes
                    </div>
                  </div>
                  <div className="benefit-items">
                    <div className="icon wow fadeInUp">
                      <i className="icon-checkbox" />
                    </div>
                    <div className="title wow fadeInUp" data-wow-delay=".1s">
                      Collaborative Approach to Strong Partnerships
                    </div>
                  </div>
                  <div className="benefit-items">
                    <div className="icon wow fadeInUp">
                      <i className="icon-checkbox" />
                    </div>
                    <div className="title wow fadeInUp" data-wow-delay=".1s">
                      Ongoing Support for Long-Term Success
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
