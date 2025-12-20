"use client";
import { pricingPlans } from "@/data/pricing";
import React, { useState } from "react";

export default function Pricing({
  parentClass = "section-pricing h-3 bg-surface tf-spacing-2",
  cardClass = "pricing-card-items",
}) {
  const [activePlan, setActivePlan] = useState("monthly");

  return (
    <section className={parentClass}>
      <div className="tf-container position-relative">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center">
              <div className="text-anime-wave-1">
                <a href="#" className="tag label text-btn-uppercase bg-white">
                  Pricing &amp; Plans
                </a>
              </div>
              <h3 className="title-section mb-12 text-anime-wave-1 mb-12">
                Pick the Best Plan for Your
                <br />
                Business Success
              </h3>
              <div className="sub-title body-2 text-anime-wave-1">
                One-time fee for the first consultation to assess needs and
                scope. Cost only $200
              </div>
            </div>
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
      <div className="wrap-switch-tabs-content">
        <div className="tabs-content-switch">
          <div id="monthlyPlan" className="tab-item is-active">
            <div className="tf-container position-relative">
              <div className="row rg-30">
                {pricingPlans.map((plan, index) => (
                  <div className="col-md-4" key={index}>
                    <div
                      className={`${cardClass} ${
                        plan.bestValue ? " best-value" : ""
                      }`}
                    >
                      <div className="pricing-card-top">
                        <div className="header-card mb-12">
                          <div className="title color-primary">
                            {plan.title}
                          </div>
                          {plan.bestValue && (
                            <div className="best-value-btn">
                              <div className="icon">
                                <svg
                                  width={21}
                                  height={20}
                                  viewBox="0 0 21 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clipPath="url(#clip0_9360_11443)">
                                    <path
                                      d="M12.833 1.25L11.583 7.5L16.583 9.375L7.83301 18.75L9.08301 12.5L4.08301 10.625L12.833 1.25Z"
                                      stroke="white"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath>
                                      <rect
                                        width={20}
                                        height={20}
                                        fill="white"
                                        transform="translate(0.333008)"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <p>Best Value</p>
                            </div>
                          )}
                        </div>
                        <h2
                          className={`price color-on-suface-container ${plan.spacingClass}`}
                        >
                          $
                          {activePlan === "monthly"
                            ? plan.price
                            : ((plan.price * 12 * 90) / 100).toFixed(0)}
                          <span className="body-2 color-on-suface-variant-2">
                            / per {activePlan === "monthly" ? "month" : "year"}
                          </span>
                        </h2>
                        <a href="#" className={plan.btnClass}>
                          <span>Choose Your Plan</span>
                        </a>
                      </div>
                      <div className="pricing-card-content">
                        <ul>
                          {plan.features.map((feature, i) => (
                            <li className="body-2" key={i}>
                              <i className="icon-checkbox" /> {feature}
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
