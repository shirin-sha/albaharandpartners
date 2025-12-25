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
    <section className="section-why-choose h-2 tf-spacing-2">
      <div className="tf-container position-relative">
        <div className="row rg-60 align-items-center">
          <div className="col-lg-6">
            <div className="image mr-15 tf-animate-1">
              <Image
                src="/image/section/bpc.jpg" // Replace with your BPC image
                alt="Al-Bahar and Partners (BPC)"
                className="lazyload"
                width={615}
                height={615}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="section-content ml-15">
              <div className="heading-section">
                <div className="wow fadeInUp">
                  <a href="#" className="tag label text-btn-uppercase">
                    About BPC
                  </a>
                </div>
                <h3 className="title-section wow fadeInUp mb-12">
                  Al-Bahar and Partners (BPC) was established in 1961
                </h3>
                <div className="sub-title body-2 wow fadeInUp mb-20">
                  as a hybrid business leveraging our strengths as a financially
                  solid group in distribution, and turnkey project delivery. We
                  offer a diverse brand portfolio of world renowned products,
                  supported by a full gamut of support services including supply
                  chain, logistics, field operations and market activation teams.
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
                  It is able to deliver comprehensive solutions in 5 core
                  industries:
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
        </div>
      </div>
    </section>
  );
}

