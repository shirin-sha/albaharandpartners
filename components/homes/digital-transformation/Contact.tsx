import Image from "next/image";
import React from "react";

export default function Contact() {
  return (
    <section
      className="section-contact-home h-4 bg-on-suface-container section-one-page"
      id="cta"
    >
      <div className="left">
        <div className="image tf-animate-1">
          <Image
            src="/image/section/section-contact-home-h.jpg"
            alt=""
            className="lazyload"
            width={960}
            height={706}
          />
        </div>
      </div>
      <div className="tf-container position-relative">
        <div className="row">
          <div className="col-12">
            <div className="section-contact-home-inner">
              <div className="right">
                <div className="heading-section style-color-white mb-0">
                  <h3 className="wow fadeInUp mb-40">
                    About BPC
                  </h3>
                  <div className="sub-title body-2 mb-32 wow fadeInUp">
                    Established in 1961, Al-Bahar and Partners (BPC) is a <br />
                    financially solid group specializing in distribution and turnkey <br />
                    project delivery. We offer world-renowned products with <br />
                    comprehensive support services.
                  </div>
                  <div className="sub-title body-2 mb-32 wow fadeInUp" data-wow-delay=".1s">
                    <strong>Two Service Offerings:</strong>
                    <br />
                    <span className="d-block mt-12">
                      <strong>BDS:</strong> Business Digital Solutions
                    </span>
                    <span className="d-block">
                      <strong>PAT:</strong> Printing & Audio Technology
                    </span>
                  </div>
                  <div className="sub-title body-2 wow fadeInUp" data-wow-delay=".2s">
                    <strong>5 Core Industries:</strong>
                    <br />
                    <span className="d-block mt-12">• Electronic Chip Cards & Payments</span>
                    <span className="d-block">• Audio Visual Technologies</span>
                    <span className="d-block">• Cyber Security & Digital Transformation</span>
                    <span className="d-block">• Surveillance Automation</span>
                    <span className="d-block">• Digitisation & Printing</span>
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
