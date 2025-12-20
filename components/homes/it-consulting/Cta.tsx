import Link from "next/link";
import React from "react";

export default function Cta() {
  return (
    <section
      className="section-banner h-8 tf-spacing-2 section-one-page"
      id="cta"
    >
      <div className="tf-container position-relative">
        <div className="row">
          <div className="col-lg-6">
            <div className="section-content">
              <div className="heading-section style-color-white">
                <div className="wow fadeInUp">
                  <Link
                    href={`/contact-us`}
                    className="tag label text-btn-uppercase bg-white"
                  >
                    Contact US
                  </Link>
                </div>
                <h3 className="title-section mb-12 wow fadeInUp">
                  Get in Touch with Us
                </h3>
                <div className="sub-title body-2 wow fadeInUp">
                  Reach out today to discuss how we can support your business
                  goals. Our team is ready to provide answers, offer solutions,
                  and start your journey toward success.
                </div>
              </div>
              <div className="bottom g-20">
                <div className="wow fadeInUp">
                  <Link
                    href={`/contact-us`}
                    className="tf-btn style-1 bg-white"
                  >
                    <span> Schedule A Consultation </span>
                  </Link>
                </div>
                <div className="tf-phone no-border color-white g-14">
                  <a
                    href="#"
                    className="icon wow fadeInUp"
                    data-wow-delay=".1s"
                  >
                    <i className="icon-PhoneCall" />
                  </a>
                  <div className="content wow fadeInUp" data-wow-delay=".2s">
                    <p className="caption-2">Have any Question?</p>
                    <h6>
                      <a href="#">1-555-678-8888</a>
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
