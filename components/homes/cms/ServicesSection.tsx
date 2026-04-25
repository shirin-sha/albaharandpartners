"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ServicesSection as ServicesSectionType } from "@/types/homepage";

interface ServicesSectionProps {
  content: ServicesSectionType;
  language?: 'ltr' | 'rtl';
}

export default function ServicesSection({ content, language = 'ltr' }: ServicesSectionProps) {
  if (!content.isActive) {
    return null;
  }

  // Filter and sort active services
  const activeServices = content.services
    .filter(service => service.isActive)
    .sort((a, b) => a.order - b.order);

  if (activeServices.length === 0) {
    return null;
  }

  return (
    <section
      className="section-services h-8 tf-spacing-18 section-one-page"
      id="services"
      dir={language}
    >
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center">
              <div className="text-anime-wave-1">
                <a href="#" className="tag label text-btn-uppercase">
                  {content.tag}
                </a>
              </div>
              <h3 className="title-section text-anime-wave-1 mb-12">
                {content.heading}
              </h3>
              <div className="sub-title body-2 text-anime-wave-1">
                {content.subheading}
              </div>
            </div>
            <div className="flat-animate-tab">
              <div className="wg-tab">
                <ul
                  className="tab-product g-40 justify-content-between min-w-1131"
                  role="tablist"
                >
                  {activeServices.map((service, index) => (
                    <li className="nav-tab-item" role="presentation" key={service.id}>
                      <h5>
                        <a
                          href={`#${service.id}`}
                          data-bs-toggle="tab"
                          role="tab"
                          className={index === 0 ? "active" : ""}
                        >
                          {service.tabTitle}
                        </a>
                      </h5>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="tab-content">
                {activeServices.map((service, index) => (
                  <div
                    key={service.id}
                    className={`tab-pane${index === 0 ? " active show" : ""}`}
                    id={service.id}
                    role="tabpanel"
                  >
                    <div className="services-inner bg-surface">
                      <div className="services-content p-40" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
                        <h4 className="title-content mb-12">
                          <Link href="/services-details-1">{service.title}</Link>
                        </h4>
                        <div className="sub-title mb-28 body-2">
                          {service.description.split('<br/>').map((line, i, array) => (
                            <React.Fragment key={i}>
                              {line}
                              {i < array.length - 1 && <br />}
                            </React.Fragment>
                          ))}
                        </div>
                        <div className="benefit-lists mb-20">
                          {service.benefits.map((benefit, i) => (
                            <div className="benefit-items" key={i}>
                              <div className="icon">
                                <i className="icon-checkbox" />
                              </div>
                              <div className="title">{benefit}</div>
                            </div>
                          ))}
                        </div>
                        <Link
                          href="#"
                          className="tf-btn style-1 bg-color-primary"
                        >
                          <span>Learn More</span>
                        </Link>
                      </div>
                      <div className="image" style={{ width: '100%', height: '100%', minHeight: '500px', position: 'relative', overflow: 'hidden' }}>
                        <Image
                          src={service.imgSrc}
                          alt={service.title}
                          className="lazyload"
                          width={960}
                          height={720}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
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
