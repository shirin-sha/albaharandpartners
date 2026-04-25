import Image from "next/image";
import React from "react";

export default function AboutBPC() {
  const industries = [
    "Electronic Chip Cards and Payments",
    "Audio Visual Technologies",
    "Cyber Security & Digital Transformation",
    "Surveillance Automation",
    "Digitisation and Printing",
  ];

  return (
    <section className="section-about h-6 bpc-half-split">
      <div className="section-about-inner">
        <div className="image tf-animate-1">
          <Image
            src="/image/section/bpc.jpg"
            alt="Al-Bahar and Partners (BPC)"
            className="lazyload"
            width={900}
            height={900}
          />
        </div>
        <div className="section-about-content">
          <div className="heading-section style-color-white mb-0">
            <h3 className="title-section wow fadeInUp mb-20">About BPC</h3>
            <div className="sub-title body-2 wow fadeInUp mb-20">
              Al-Bahar and Partners (BPC) was established in 1961 as a hybrid business leveraging our strengths as a financially
              solid group in distribution, and turnkey project delivery. We offer a diverse brand portfolio of world renowned products,
              supported by a full gamut of support services including supply chain, logistics, field operations and market activation teams.
            </div>
            <div className="sub-title body-2 wow fadeInUp mb-20">
              BPC is comprised of two distinct service offerings:
            </div>
            <div className="benefit-lists mb-20">
              <div className="benefit-items">
                <div className="icon wow fadeInUp">
                  <i className="icon-checkbox" />
                </div>
                <div className="title wow fadeInUp" data-wow-delay=".1s">
                  BDS: Our Business Digital Solutions
                </div>
              </div>
              <div className="benefit-items">
                <div className="icon wow fadeInUp">
                  <i className="icon-checkbox" />
                </div>
                <div className="title wow fadeInUp" data-wow-delay=".1s">
                  PAT: Printing & Audio Technology
                </div>
              </div>
            </div>
            <div className="sub-title body-2 wow fadeInUp mb-12">
              It is able to deliver comprehensive solutions in 5 core industries:
            </div>
            <div className="benefit-lists">
              {industries.map((industry, index) => (
                <div key={index} className="benefit-items">
                  <div className="icon wow fadeInUp">
                    <i className="icon-checkbox" />
                  </div>
                  <div
                    className="title wow fadeInUp"
                    data-wow-delay={`${(index + 1) * 0.1}s`}
                  >
                    {industry}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

