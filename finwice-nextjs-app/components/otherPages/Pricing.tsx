"use client";
import { pricingPlans2 } from "@/data/pricing";
import React, { useState } from "react";

export default function Pricing() {
  const [activePlan, setActivePlan] = useState("monthly");

  return (
    <section className="section-pricing page-price tf-spacing-30">
      <div className="tf-container position-relative">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center">
              <div className="text-anime-wave-1">
                <a href="#" className="tag label text-btn-uppercase mb-12">
                  Pricing &amp; Plans
                </a>
              </div>
              <h3 className="title-section mb-12 text-anime-wave-1">
                Find Your Right Plan
              </h3>
              <div className="sub-title body-2 text-anime-wave-1">
                We offer a variety of pricing packages to meet the unique needs
                of our services.
                <br />
                Contact us today to discuss which package is right for you.
              </div>
            </div>
            <div className="wrap-switch-tabs-content">
              <div className="switch-container mb-40">
                <h5
                  className={`switch-label ${
                    activePlan === "monthly" ? "is-active" : ""
                  }`}
                  id="monthlyLabel"
                  onClick={() => setActivePlan("monthly")}
                >
                  Monthly
                </h5>

                <div
                  className={`switch ${
                    activePlan == "yearly" ? "is-active" : ""
                  } `}
                  id="toggleSwitch"
                  onClick={() =>
                    setActivePlan((pre) =>
                      pre == "yearly" ? "monthly" : "yearly"
                    )
                  }
                >
                  <div
                    className={`toggle ${
                      activePlan === "yearly" ? "toggled" : ""
                    }`}
                  />
                </div>

                <h5
                  className={`switch-label ${
                    activePlan === "yearly" ? "is-active" : ""
                  }`}
                  id="yearlyLabel"
                  onClick={() => setActivePlan("yearly")}
                >
                  Yearly <span className="text-btn">(save 10%)</span>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="wrap-switch-tabs-content">
        <div className="tabs-content-switch">
          <div id="monthlyPlan" className="tab-item is-active">
            <div className="tf-container position-relative">
              <div className="row rg-30">
                {pricingPlans2.map((plan, index) => (
                  <div className="col-md-4" key={index}>
                    <div
                      className={`pricing-card-items wow fadeInUp ${
                        plan.isBestValue
                          ? "best-value bg-on-suface-container"
                          : ""
                      }`}
                      data-wow-delay={`.${index}s`}
                    >
                      <div className="pricing-card-top">
                        <div className="header-card mb-15">
                          <div
                            className="title color-primary wow fadeInUp"
                            data-wow-delay={`.${index}s`}
                          >
                            {plan.title}
                          </div>
                          {plan.isBestValue && (
                            <div
                              className="best-value-btn wow fadeInUp"
                              data-wow-delay={`.${index + 1}s`}
                            >
                              <div className="icon">
                                <svg
                                  width={21}
                                  height={20}
                                  viewBox="0 0 21 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12.833 1.25L11.583 7.5L16.583 9.375L7.83301 18.75L9.08301 12.5L4.08301 10.625L12.833 1.25Z"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <p>Best Value</p>
                            </div>
                          )}
                        </div>
                        <h2
                          className={`price mb-24 wow fadeInUp ${
                            plan.isBestValue ? "" : "color-on-suface-container"
                          }`}
                          data-wow-delay={`.${index}s`}
                        >
                          $
                          {activePlan === "monthly"
                            ? plan.price
                            : (plan.price * 12 * 90) / 100}
                          <span className="body-2 color-on-suface-variant-2">
                            / per month
                          </span>
                        </h2>
                        <a
                          href="#"
                          className={`tf-btn style-1 w-full text-center wow fadeInUp ${
                            plan.isBestValue
                              ? "bg-white bg-white-style-2"
                              : "bg-on-suface-container"
                          }`}
                          data-wow-delay={`.${index}s`}
                        >
                          <span>Choose Your Plan</span>
                        </a>
                      </div>
                      <div className="pricing-card-content">
                        <ul>
                          {plan.features.map((feature, i) => (
                            <li
                              key={i}
                              className={`body-2 wow fadeInUp ${
                                feature.available
                                  ? ""
                                  : "color-on-suface-variant-2"
                              }`}
                              data-wow-delay={`.${index}s`}
                            >
                              <i
                                className={
                                  feature.available
                                    ? "icon-checkbox"
                                    : "icon-close1"
                                }
                              />
                              {feature.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
