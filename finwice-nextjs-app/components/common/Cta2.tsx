import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Cta() {
  return (
    <section className="section-cta h-1 tf-spacing-3 section-one-page" id="cta">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="cta-inner">
              <div className="image tf-animate-1">
                <Image
                  src="/image/section/img-cta-1.png"
                  alt=""
                  className="lazyload"
                  width={344}
                  height={447}
                />
              </div>
              <div className="cta-content">
                <div className="heading-section style-color-white mb-0">
                  <Link
                    href={`/contact-us`}
                    className="tag label text-btn-uppercase bg-white wow fadeInUp"
                  >
                    Contact US
                  </Link>
                  <h3 className="title-section wow fadeInUp mb-12">
                    Get in Touch with Us
                  </h3>
                  <div className="sub-title mb-28 body-2 wow fadeInUp">
                    Reach out today to discuss how we can support your business
                    goals. Our team is ready to provide answers, offer
                    solutions, and start your journey toward success.
                  </div>
                  <div className="bottom">
                    <Link
                      href={`/contact-us`}
                      className="tf-btn style-1 bg-white wow fadeInUp"
                    >
                      <span>Schedule a Consultation</span>
                    </Link>
                    <div className="tf-phone no-border color-white g-14">
                      <a href="#" className="icon wow fadeInUp">
                        <i className="icon-PhoneCall" />
                      </a>
                      <div className="content wow fadeInUp">
                        <p className="caption-2 mb-2">Have any Question?</p>
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
      </div>
    </section>
  );
}
