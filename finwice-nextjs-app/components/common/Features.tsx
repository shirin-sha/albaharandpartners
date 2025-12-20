import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Features() {
  return (
    <section className="section-why-choose h-4 tf-spacing-2">
      <div className="tf-container position-relative">
        <div className="row rg-60 align-items-center">
          <div className="col-lg-6">
            <div className="section-content">
              <div className="heading-section">
                <div className="text-anime-wave">
                  <a href="#" className="tag label text-btn-uppercase">
                    Why Choose us?
                  </a>
                </div>
                <h3 className="text-anime-wave mb-12">
                  Why Choose Us for Your <br />
                  Digital Transformation?
                </h3>
                <div className="sub-title body-2 text-anime-wave">
                  We offer unparalleled expertise and tailored solutions to
                  navigate your digital journey. Our team combines deep industry
                  knowledge with cutting-edge technology to drive transformative
                  results. Partner with us to experience innovation, efficiency,
                  and sustainable growth.
                </div>
              </div>
              <div className="benefit-lists">
                <div className="benefit-items text-anime-wave">
                  <div className="icon">
                    <i className="icon-checkbox" />
                  </div>
                  <div className="title">
                    Expert Team Top professionals in digital transformation
                  </div>
                </div>
                <div className="benefit-items text-anime-wave">
                  <div className="icon">
                    <i className="icon-checkbox" />
                  </div>
                  <div className="title">
                    Custom Solutions Strategies tailored to your needs
                  </div>
                </div>
                <div className="benefit-items text-anime-wave">
                  <div className="icon">
                    <i className="icon-checkbox" />
                  </div>
                  <div className="title">
                    Innovative Tech Cutting-edge technology for results
                  </div>
                </div>
                <div className="benefit-items text-anime-wave">
                  <div className="icon">
                    <i className="icon-checkbox" />
                  </div>
                  <div className="title">
                    Proven Success Track record of driving growth
                  </div>
                </div>
              </div>
              <div className="text-anime-wave">
                <Link
                  href={`/contact-us`}
                  className="tf-btn style-1 bg-on-suface-container"
                >
                  <span> Schedule A Consultation</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="image tf-animate-4">
              <Image
                src="/image/section/img-section-why-choose-h4.jpg"
                alt=""
                className="lazyload"
                width={615}
                height={615}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
