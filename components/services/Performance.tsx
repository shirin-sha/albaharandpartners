"use client";
import dynamic from "next/dynamic";
import React from "react";
const AreaLineChart = dynamic(() => import("../charts/CrealineChart"), {
  ssr: false,
});

export default function Performance() {
  return (
    <>
      <h4 className="title-content mb-16">
        Retirement Planning Performance Chart
      </h4>
      <div className="desc mb-32 body-2 color-on-suface-variant-1">
        Visualize your retirement journey with our performance charts. Our
        service provides detailed charts tracking key indicators—savings growth,
        investment returns, and projected expenses—so you can see how your
        retirement plan aligns with your goals. Monitor your progress in
        real-time, make data-driven adjustments, and gain confidence in your
        financial future with clear, visual insights that keep your retirement
        plan on track.
      </div>
      <div className="wg-box-chart">
        <div className="top-wg-box-char">
          <div className="left">
            <h5 className="color-on-suface-container">Revenue Generated</h5>
            <h5 className="number">
              <i className="icon-TrendUp" />
              18%
            </h5>
            <p className="color-on-suface-container">Compared to last year</p>
          </div>
          <div className="right">
            <div className="flat-animate-tab">
              <div className="wg-tab">
                <ul className="tab-product mb-0" role="tablist">
                  <li className="nav-tab-item" role="presentation">
                    <a
                      href="#weekly"
                      data-bs-toggle="tab"
                      role="tab"
                      className="active text-btn"
                    >
                      Weekly
                    </a>
                  </li>
                  <li className="nav-tab-item" role="presentation">
                    <a
                      href="#monthly"
                      data-bs-toggle="tab"
                      role="tab"
                      className="text-btn"
                    >
                      Monthly
                    </a>
                  </li>
                </ul>
              </div>
              <div className="tab-content">
                <div
                  className="tab-pane active show"
                  id="weekly"
                  role="tabpanel"
                />
                <div className="tab-pane" id="monthly" role="tabpanel" />
              </div>
            </div>
          </div>
        </div>
        <AreaLineChart />
      </div>
    </>
  );
}
