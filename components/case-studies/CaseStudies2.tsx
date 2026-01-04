"use client";
import Link from "next/link";
import Image from "next/image";
import { smallCaseStudies } from "@/data/caseStudies";

import React, { useEffect, useState } from "react";

export default function CaseStudies2() {
  const tabItems = [
    { id: "tab-1", label: "Kuwait" },
    { id: "tab-2", label: "International" },
  ];
  const [activeTab, setActiveTab] = useState("Kuwait");
  const [filteres, setFilteres] = useState(
    smallCaseStudies.filter((elm) => elm.region === "Kuwait").slice(0, 6)
  );
  const [isLoadedMore, setIsLoadedMore] = useState(false);
  useEffect(() => {
    if (isLoadedMore) {
      setFilteres(
        smallCaseStudies.filter((elm) => elm.region === activeTab)
      );
    } else {
      setFilteres(
        smallCaseStudies
          .filter((elm) => elm.region === activeTab)
          .slice(0, 6)
      );
    }
  }, [activeTab, isLoadedMore]);

  useEffect(() => {
    // Remove any overlays and ensure consistent image display
    const style = document.createElement("style");
    style.textContent = `
      .tf-post-grid .image::before {
        display: none !important;
        background: transparent !important;
      }
      .tf-post-grid .image img {
        filter: none !important;
        opacity: 1 !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

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
                        <div 
                          className="image" 
                          style={{ 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center",
                            backgroundColor: "#fff",
                            padding: "40px",
                            minHeight: "300px",
                            position: "relative"
                          }}
                        >
                          <Image
                            src={item.imgSrc}
                            alt={item.title}
                            className="lazyload"
                            width={200}
                            height={200}
                            style={{ 
                              objectFit: "contain",
                              maxWidth: "100%",
                              height: "auto"
                            }}
                          />
                          <Link
                            href={`#`}
                            className="link"
                          />
                        </div>
                        <div className="tf-grid-post-content">
                          {/* <div className="position label text-btn-uppercase">
                            {item.label}
                          </div> */}
                          <h5 className="title-post">
                            <Link href={`#`}>
                              {item.title}
                            </Link>
                          </h5>
                          {/* <div className="sub-title">{item.desc}</div> */}
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
