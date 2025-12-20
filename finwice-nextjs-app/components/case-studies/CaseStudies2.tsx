"use client";
import Link from "next/link";
import Image from "next/image";
import { smallCaseStudies } from "@/data/caseStudies";

import React, { useEffect, useState } from "react";

export default function CaseStudies2() {
  const tabItems = [
    { id: "tab-1", label: "Retirement Planning" },
    { id: "tab-2", label: "Investment Advisory" },
    { id: "tab-3", label: "Estate Planning" },
    { id: "tab-4", label: "Tax Optimization" },
  ];
  const [activeTab, setActiveTab] = useState("Retirement Planning");
  const [filteres, setFilteres] = useState(smallCaseStudies);
  const [isLoadedMore, setIsLoadedMore] = useState(false);
  useEffect(() => {
    if (isLoadedMore) {
      setFilteres(
        smallCaseStudies.filter((elm) => elm.categories.includes(activeTab))
      );
    } else {
      setFilteres(
        smallCaseStudies
          .slice(0, 6)
          .filter((elm) => elm.categories.includes(activeTab))
      );
    }
  }, [activeTab, isLoadedMore]);

  return (
    <div className="page-case-content tf-spacing-2">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="flat-animate-tab">
              <div className="wg-tab style-2 mb-60">
                <ul className="tab-product" role="tablist">
                  {tabItems.map((tab) => (
                    <li className="nav-tab-item" key={tab.id}>
                      <h6>
                        <a
                          href={`#${tab.id}`}
                          className={activeTab === tab.label ? "active" : ""}
                          onClick={(e) => {
                            e.preventDefault(); // Prevent jump
                            setActiveTab(tab.label);
                          }}
                        >
                          {tab.label}
                        </a>
                      </h6>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="tab-content">
                <div
                  className="tab-pane active show"
                  id="tab-1"
                  role="tabpanel"
                >
                  <div className="layout-grid-3 loadmore-item mb-40">
                    {filteres.map((item, index) => (
                      <div
                        className="tf-post-grid style-small fl-item hover-img"
                        style={{ display: "block" }}
                        key={index}
                      >
                        <div className="image">
                          <Image
                            src={item.imgSrc}
                            alt=""
                            className="lazyload"
                            width={400}
                            height={300}
                          />
                          <Link
                            href={`/case-studies-details`}
                            className="link"
                          />
                        </div>
                        <div className="tf-grid-post-content">
                          <div className="position label text-btn-uppercase">
                            {item.label}
                          </div>
                          <h5 className="title-post">
                            <Link href={`/case-studies-details`}>
                              {item.title}
                            </Link>
                          </h5>
                          <div className="sub-title">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {!isLoadedMore ? (
                    <div
                      onClick={() => setIsLoadedMore(true)}
                      className="btn-load-more text-center view-more-button"
                    >
                      <button className="tf-btn style-1 bg-on-suface-container btn-loadmore">
                        <span>Load More</span>
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
