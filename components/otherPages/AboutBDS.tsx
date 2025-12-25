import React from "react";

export default function AboutBDS() {
  const services = [
    "Banking and payment systems with various transaction methods and digital onboarding",
    "Internet of Things (IoT) solutions with real-time data analysis and machine learning",
    "Tokenization technology for enhanced data security",
    "Physical and digital issuance of financial instruments",
    "Advanced secure authentication methods",
    "Robust networking solutions",
    "Asset management for efficient IT resource use",
    "Storage solutions with flexible, future-ready infrastructure",
    "Access control and surveillance systems",
    "Remote access and support",
    "Endpoint security and cybersecurity services",
    "Asset management, SaaS management, and continuous threat monitoring",
  ];

  // Split services into two columns
  const midPoint = Math.ceil(services.length / 2);
  const leftColumn = services.slice(0, midPoint);
  const rightColumn = services.slice(midPoint);

  return (
    <section className="section-why-choose h-2 tf-spacing-2 bg-surface">
      <div className="tf-container position-relative">
        <div className="row">
          <div className="col-12">
            <div className="heading-section">
              <div className="wow fadeInUp">
                <a href="#" className="tag label text-btn-uppercase">
                  About BDS
                </a>
              </div>
              <h3 className="title-section wow fadeInUp mb-12">
                Our Business Digital Solutions (BDS) Division
              </h3>
              <div className="sub-title body-2 wow fadeInUp mb-40">
                offers a comprehensive suite of services designed to enhance
                business operations and security. We support banking and payment
                systems by implementing various transaction methods and
                facilitating digital onboarding with secure, automated
                identification verification.
              </div>
              <div className="sub-title body-2 wow fadeInUp mb-20">
                Our services include:
              </div>
            </div>
            <div className="row rg-30">
              <div className="col-lg-6">
                <div className="benefit-lists">
                  {leftColumn.map((service, index) => (
                    <div key={index} className="benefit-items">
                      <div className="icon wow fadeInUp">
                        <i className="icon-checkbox" />
                      </div>
                      <div
                        className="title wow fadeInUp"
                        data-wow-delay={`${(index + 1) * 0.1}s`}
                      >
                        {service}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="benefit-lists">
                  {rightColumn.map((service, index) => (
                    <div key={index} className="benefit-items">
                      <div className="icon wow fadeInUp">
                        <i className="icon-checkbox" />
                      </div>
                      <div
                        className="title wow fadeInUp"
                        data-wow-delay={`${(index + midPoint + 1) * 0.1}s`}
                      >
                        {service}
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

