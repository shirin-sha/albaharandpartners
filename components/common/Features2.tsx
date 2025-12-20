import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Features({
  parentClass = "section-why-choose h-2 tf-spacing-31",
  hasBorder = false,
}) {
  return (
    <section className={parentClass}>
      <div className="tf-container position-relative">
        <div
          className={` ${
            hasBorder
              ? "row rg-60 border-bottom tf-spacing-31"
              : "row rg-60 align-items-center"
          } `}
        >
          <div className="col-lg-6">
            <div className="image mr-15 tf-animate-1">
              <Image
                src="/image/section/img-section-why-choose-h2.jpg"
                alt=""
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
                    Why Choose us?
                  </a>
                </div>
                <h3 className="title-section wow fadeInUp mb-12">
                  We Drive Growth Through
                  <br />
                  Tailored Solutions.
                </h3>
                <div className="sub-title body-2 wow fadeInUp">
                  Choose us for unparalleled expertise, tailored solutions, and
                  a commitment to your success. We deliver exceptional results
                  through a strategic and collaborative approach.
                </div>
              </div>
              <div className="benefit-lists">
                <div className="benefit-items">
                  <div className="icon wow fadeInUp">
                    <i className="icon-checkbox" />
                  </div>
                  <div className="title wow fadeInUp" data-wow-delay=".1s">
                    In-depth knowledge across sectors for specialized insights.
                  </div>
                </div>
                <div className="benefit-items">
                  <div className="icon wow fadeInUp">
                    <i className="icon-checkbox" />
                  </div>
                  <div className="title wow fadeInUp" data-wow-delay=".1s">
                    Customized strategies addressing unique challenges and
                    goals.
                  </div>
                </div>
                <div className="benefit-items">
                  <div className="icon wow fadeInUp">
                    <i className="icon-checkbox" />
                  </div>
                  <div className="title wow fadeInUp" data-wow-delay=".1">
                    Proven success delivering impactful results to clients.
                  </div>
                </div>
                <div className="benefit-items">
                  <div className="icon wow fadeInUp">
                    <i className="icon-checkbox" />
                  </div>
                  <div className="title wow fadeInUp" data-wow-delay=".1s">
                    Collaborative partnership ensuring effective implementation.
                  </div>
                </div>
                <div className="benefit-items">
                  <div className="icon wow fadeInUp">
                    <i className="icon-checkbox" />
                  </div>
                  <div className="title wow fadeInUp" data-wow-delay=".1s">
                    Ongoing support to adjust and refine strategies.
                  </div>
                </div>
              </div>
              <Link
                href={`/contact-us`}
                className="tf-btn style-1 bg-on-suface-container wow fadeInUp"
              >
                <span> Schedule A Consultation </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
