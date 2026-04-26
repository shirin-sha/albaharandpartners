import Link from "next/link";
import React from "react";
import { AboutSection as AboutSectionType } from "@/types/homepage";

interface AboutSectionProps {
  content: AboutSectionType;
  language?: 'ltr' | 'rtl';
}

export default function AboutSection({ content, language = 'ltr' }: AboutSectionProps) {
  if (!content.isActive) {
    return null;
  }
  const isRtl = language === "rtl";

  const aboutLeft = (
    <div className="about-left bg-surface">
      <div className="heading-section mb-0">
        <div className="text-anime-wave">
          <a href="#" className="tag label text-btn-uppercase bg-white">
            {content.tag}
          </a>
        </div>
        <h3 className="mb-0 text-anime-wave">
          {content.heading.split('<br/>').map((line, index, array) => (
            <React.Fragment key={index}>
              {line}
              {index < array.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h3>
      </div>
    </div>
  );

  const aboutRight = (
    <div className="about-right">
      <div className="section-content">
        <div className="text body-2 color-on-suface-container text-anime-wave-2">
          {content.description.split('<br/>').map((line, index, array) => (
            <React.Fragment key={index}>
              {line}
              {index < array.length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
        <div className="bottom g-40 text-anime-wave-2">
          <Link
            href={content.buttonLink || '/contact-us'}
            className="tf-btn bg-color-primary style-1"
          >
            <span>{content.buttonText}</span>
          </Link>
          <div className="tf-phone">
            <div className="content">
              <p>{content.phoneLabel}</p>
              <h5>
                <a href={`tel:${content.phoneNumber}`} className="color-primary">
                  {content.phoneNumber}
                </a>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section dir={language} className="section-about h-7">
      {isRtl ? (
        <>
          {aboutRight}
          {aboutLeft}
        </>
      ) : (
        <>
          {aboutLeft}
          {aboutRight}
        </>
      )}
    </section>
  );
}
