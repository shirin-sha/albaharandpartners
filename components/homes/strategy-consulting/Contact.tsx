import Link from "next/link";
import React from "react";

export default function Contact() {
  return (
    <section className="section-cta h-3 section-one-page" id="cta">
      <div className="tf-container position-relative">
        <div className="row">
          <div className="col-lg-6">
            <div className="cta-content">
              <div className="heading-section style-color-white mb-0">
                <div className="wow fadeInUp">
                  <Link
                    href={`/contact-us`}
                    className="tag label text-btn-uppercase color-white"
                  >
                    Contact US
                  </Link>
                </div>
                <h3 className="title-section wow fadeInUp mb-12">
                  Get Expert Help Today
                </h3>
                <div className="sub-title mb-40 body-2 wow fadeInUp">
                  Reach out today to discuss how we can support your business
                  goals. Our team is ready to provide answers, offer solutions,
                  and start your journey toward success.
                </div>
                <div className="bottom">
                  <Link
                    href={`/contact-us`}
                    className="tf-btn style-1 bg-white wow fadeInUp"
                  >
                    <span> Schedule A Consultation </span>
                  </Link>
                  <div className="tf-phone no-border color-white style-big g-14">
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
      </div>
    </section>
  );
}
