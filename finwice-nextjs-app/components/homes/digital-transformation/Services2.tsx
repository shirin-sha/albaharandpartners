import Link from "next/link";
import Image from "next/image";
import React from "react";
import { caseStudiesData } from "@/data/services";

export default function Services2() {
  return (
    <section
      className="section-case h-4 tf-spacing-11 bg-surface section-one-page"
      id="project"
    >
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section style-2">
              <div className="left">
                <div className="text-anime-wave">
                  <a href="#" className="tag label text-btn-uppercase bg-white">
                    Case Studies
                  </a>
                </div>
                <h3 className="title-section text-anime-wave">
                  Success Stories
                </h3>
              </div>
              <div className="text-anime-wave-2">
                <Link
                  href="/brands"
                  className="tf-btn style-1 bg-on-suface-container"
                >
                  <span> View Case Studies </span>
                </Link>
              </div>
            </div>
            <div className="section-services-content">
              <div className="flat-animate-tab">
                <div className="wg-tab">
                  <ul className="tab-product min-w-757" role="tablist">
                    {caseStudiesData.map(({ id, tabTitle, isActive }) => (
                      <li className="nav-tab-item" role="presentation" key={id}>
                        <h5>
                          <a
                            href={`#${id}`}
                            data-bs-toggle="tab"
                            role="tab"
                            className={isActive ? "active" : ""}
                          >
                            {tabTitle}
                          </a>
                        </h5>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="tab-content">
                  {caseStudiesData.map(
                    ({
                      id,
                      imgSrc,
                      imgWidth,
                      imgHeight,
                      title,
                      description,
                      benefits,
                      isActive,
                    }) => (
                      <div
                        key={id}
                        className={`tab-pane${isActive ? " active show" : ""}`}
                        id={id}
                        role="tabpanel"
                      >
                        <div className="section-services-item">
                          <div className="image">
                            {/* The empty link wrapper */}
                            <a href="#" className="link" />
                            <Image
                              src={imgSrc}
                              alt={title}
                              className="lazyload"
                              width={imgWidth}
                              height={imgHeight}
                            />
                          </div>
                          <div className="services-content">
                            <div className="heading">
                              <h3>
                                <Link
                                  href="/services-details-1"
                                  className="name-services"
                                >
                                  {title}
                                </Link>
                              </h3>
                              <div className="sub-name body-2">
                                {description}
                              </div>
                            </div>
                            <div className="benefit-lists">
                              {benefits.map((benefit, i) => (
                                <div className="benefit-items" key={i}>
                                  <div className="icon">
                                    <i className="icon-checkbox" />
                                  </div>
                                  <div className="title">{benefit}</div>
                                </div>
                              ))}
                            </div>
                            <Link
                              href="/services-details-1"
                              className="tf-btn style-1 bg-on-suface-container"
                            >
                              <span> Let's Talk </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
