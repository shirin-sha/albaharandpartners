import Image from "next/image";
import React from "react";
import { TestimonialSection as TestimonialSectionType } from "@/types/homepage";

interface TestimonialSectionProps {
  content: TestimonialSectionType;
  language?: 'ltr' | 'rtl';
}

export default function TestimonialSection({ content, language = 'ltr' }: TestimonialSectionProps) {
  if (!content.isActive) {
    return null;
  }

  return (
    <section className="section-testimonials h-8 section-one-page" id="testimonials" dir={language}>
      <div className="tf-container position-relative">
        <div className="row rg-60">
          <div className="col-lg-6">
            <div className="image-testimonials img-item">
              <Image
                src={content.imagePath}
                alt={content.personName}
                className="lazyload"
                width={605}
                height={605}
              />
              <div className="content tf-fade-top fade-item-1">
                <h6>
                  <a href="#" className="name">
                    {content.personName}
                  </a>
                </h6>
                <div className="position">{content.personTitle}</div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="section-testimonials-content ml-25">
              <div className="section-content">
                <div className="heading-section">
                  <div className="wow fadeInUp">
                    <a href="#" className="tag label text-btn-uppercase">
                      {content.tag}
                    </a>
                  </div>
                  <h3 className="title-section wow fadeInUp mb-12">
                    {content.heading}
                  </h3>
                  <div className="sub-title body-2 wow fadeInUp">
                    {content.description}
                  </div>
                </div>
                {content.secondaryHeading && (
                  <h4 className="mb-16 wow fadeInUp">{content.secondaryHeading}</h4>
                )}
                {content.secondaryDescription && (
                  <div className="text color-on-suface-variant-1 body-2 wow fadeInUp">
                    {content.secondaryDescription}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
