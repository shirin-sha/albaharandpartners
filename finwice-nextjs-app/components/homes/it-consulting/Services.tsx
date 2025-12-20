import Link from "next/link";
import Image from "next/image";
import React from "react";
import { servicesData2 } from "@/data/services";

export default function Services() {
  return (
    <section
      className="section-services h-8 tf-spacing-18 section-one-page"
      id="services"
    >
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center">
              <div className="text-anime-wave-1">
                <a href="#" className="tag label text-btn-uppercase">
                  Our Services
                </a>
              </div>
              <h3 className="title-section text-anime-wave-1 mb-12">
                Custom Strategies for Your Goals
              </h3>
              <div className="sub-title body-2 text-anime-wave-1">
                See the impact of our solutions through clear, measurable
                results.
              </div>
            </div>
            <div className="flat-animate-tab">
              <div className="wg-tab">
                <ul
                  className="tab-product g-40 justify-content-between min-w-1131"
                  role="tablist"
                >
                  {servicesData2.map(({ id, tabTitle, isActive }) => (
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
                {servicesData2.map(
                  ({
                    id,
                    title,
                    description,
                    benefits,
                    imgSrc,
                    imgWidth,
                    imgHeight,
                    isActive,
                  }) => (
                    <div
                      key={id}
                      className={`tab-pane${isActive ? " active show" : ""}`}
                      id={id}
                      role="tabpanel"
                    >
                      <div className="services-inner bg-surface">
                        <div className="services-content">
                          <h4 className="title-content mb-12">
                            <Link href="/services-details-1">{title}</Link>
                          </h4>
                          <div className="sub-title mb-28 body-2">
                            {description}
                          </div>
                          <div className="cols mb-20">
                            {/* Split benefits in two columns */}
                            <div className="benefit-lists item">
                              {benefits.slice(0, 3).map((benefit, i) => (
                                <div className="benefit-items" key={i}>
                                  <div className="icon">
                                    <i className="icon-checkbox" />
                                  </div>
                                  <div className="title">{benefit}</div>
                                </div>
                              ))}
                            </div>
                            <div className="benefit-lists item">
                              {benefits.slice(3).map((benefit, i) => (
                                <div className="benefit-items" key={i}>
                                  <div className="icon">
                                    <i className="icon-checkbox" />
                                  </div>
                                  <div className="title">{benefit}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <Link
                            href="/services-details-1"
                            className="tf-btn style-1 bg-on-suface-container"
                          >
                            <span>Let's Talk</span>
                          </Link>
                        </div>
                        <div className="image">
                          <Image
                            src={imgSrc}
                            alt={title}
                            className="lazyload"
                            width={imgWidth}
                            height={imgHeight}
                          />
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
    </section>
  );
}
