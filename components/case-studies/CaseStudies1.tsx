"use client";
import Link from "next/link";
import Image from "next/image";
import { caseStudySlides } from "@/data/caseStudies";
import React, { useEffect, useState } from "react";

export default function CaseStudies1() {
  const [filteres, setFilteres] = useState(caseStudySlides.slice(0, 6));
  const [isLoadedMore, setIsLoadedMore] = useState(false);
  useEffect(() => {
    if (isLoadedMore) {
      setFilteres(caseStudySlides);
    } else {
      setFilteres(caseStudySlides.slice(0, 6));
    }
  }, [isLoadedMore]);

  return (
    <div className="page-case-content tf-spacing-2">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="flat-animate-tab">
              <div className="case-list">
                    <div className="layout-grid-3 g-30 loadmore-item style-2 mb-40">
                      {filteres.map((item, index) => (
                        <div
                          className="case-studies-item style-bg-content hover-img fl-item"
                          style={{ display: "block" }}
                          key={index}
                        >
                          <div className="image">
                            <Image
                              src={item.imgSrc}
                              alt={item.title}
                              className="lazyload"
                              width={473}
                              height={630}
                            />
                            <Link
                              href={`/case-studies-details`}
                              className="link"
                            />
                          </div>
                          <Link
                            href={`/case-studies-details`}
                            className="btn-arrow-item"
                          >
                            <i className="icon-arrowRight" />
                          </Link>
                          <div className="case-studies-content">
                            <h5>
                              <Link
                                href={`/case-studies-details`}
                                className="name"
                              >
                                {item.title}
                              </Link>
                            </h5>
                            <div className="desc">{item.description}</div>
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
  );
}
