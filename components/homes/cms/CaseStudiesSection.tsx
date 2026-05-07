import Image from "next/image";
import React from "react";
import Link from "next/link";
import { CaseStudiesSection as CaseStudiesSectionType } from "@/types/homepage";

interface CaseStudiesSectionProps {
  content: CaseStudiesSectionType;
  language?: 'ltr' | 'rtl';
}

export default function CaseStudiesSection({ content, language = 'ltr' }: CaseStudiesSectionProps) {
  if (!content.isActive) {
    return null;
  }

  const activeCaseStudies = content.caseStudies
    .filter(cs => cs.isActive);

  if (activeCaseStudies.length === 0) {
    return null;
  }

  return (
    <section
      className="section-case h-3 h-8 bg-surface tf-spacing-26 section-one-page"
      id="project"
      dir={language}
    >
      <div className="tf-container position-relative">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center">
              <div className="text-anime-wave-1">
                <span className="tag label text-btn-uppercase bg-white">
                  {content.tag}
                </span>
              </div>
              <h3 className="title-section text-anime-wave-1 mb-12">
                {content.heading}
              </h3>
              <div className="sub-title body-2 text-anime-wave-1">
                {content.subheading}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div
          className="sw-project-list sw-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
          }}
        >
          {activeCaseStudies.map((caseStudy, index) => (
            <div key={index}>
              <div className="case-studies-item style-bg-content hover-img style-2">
                <Link
                  href={caseStudy.link || "#"}
                  className="image d-block"
                  aria-label={`View case study ${caseStudy.title}`}
                  style={{ aspectRatio: "473 / 630" }}
                >
                  <Image
                    src={caseStudy.imagePath}
                    alt={caseStudy.title}
                    fill
                    sizes="(max-width: 575px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    style={{ objectFit: "cover" }}
                  />
                </Link>
                <Link href={caseStudy.link || "#"} className="btn-arrow-item" aria-label={`Open ${caseStudy.title}`}>
                  <i className="icon-arrowRight" />
                </Link>
                <div className="case-studies-content">
                  <h5>
                    <Link href={caseStudy.link || "#"} className="name">
                      {caseStudy.title}
                    </Link>
                  </h5>
                  <div className="desc">{caseStudy.description}</div>
                  <Link href={caseStudy.link || "#"} className="tf-btn-arrow-t-r">
                    <span>View Case Study</span>
                    <div className="icon">
                      <i className="icon-arrow-top-right" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
