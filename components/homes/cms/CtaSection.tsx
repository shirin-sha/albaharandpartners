import Link from "next/link";
import React from "react";
import { CtaSection as CtaSectionType } from "@/types/homepage";

interface CtaSectionProps {
  content: CtaSectionType;
  language?: 'ltr' | 'rtl';
}

export default function CtaSection({ content, language = 'ltr' }: CtaSectionProps) {
  if (!content.isActive) {
    return null;
  }

  return (
    <section
      className="section-banner h-8 tf-spacing-2 section-one-page"
      id="cta"
      dir={language}
    >
      <div className="tf-container position-relative">
        <div className="row">
          <div className="col-lg-6">
            <div className="section-content">
              <div className="heading-section style-color-white">
                <div className="wow fadeInUp">
                  <Link
                    href={content.buttonLink || '/contact-us'}
                    className="tag label text-btn-uppercase bg-white"
                  >
                    {content.tag}
                  </Link>
                </div>
                <h3 className="title-section mb-12 wow fadeInUp">
                  {content.heading}
                </h3>
                <div className="sub-title body-2 wow fadeInUp">
                  {content.description}
                </div>
              </div>
              <div className="bottom g-20">
                <div className="wow fadeInUp">
                  <Link
                    href={content.buttonLink || '/contact-us'}
                    className="tf-btn style-1 bg-white"
                  >
                    <span>{content.buttonText}</span>
                  </Link>
                </div>
                <div className="tf-phone no-border color-white g-14">
                  <a
                    href={`tel:${content.phoneNumber}`}
                    className="icon wow fadeInUp"
                    data-wow-delay=".1s"
                  >
                    <i className="icon-PhoneCall" />
                  </a>
                  <div className="content wow fadeInUp" data-wow-delay=".2s">
                    <p className="caption-2">{content.phoneLabel}</p>
                    <h6>
                      <a href={`tel:${content.phoneNumber}`}>{content.phoneNumber}</a>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
