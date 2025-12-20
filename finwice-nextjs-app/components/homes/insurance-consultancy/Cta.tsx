import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Cta() {
  return (
    <section className="section-cta h-6 mb-40 section-one-page" id="cta">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="cta-inner">
              <div className="image">
                <Image
                  src="/image/section/img-cta-1.png"
                  alt=""
                  className="lazyload"
                  width={344}
                  height={447}
                />
              </div>
              <div className="cta-content">
                <div className="heading-section style-color-white">
                  <div className="wow fadeInUp">
                    <Link
                      href={`/contact-us`}
                      className="tag label text-btn-uppercase bg-white"
                    >
                      Contact US
                    </Link>
                  </div>
                  <h3 className="title-section wow fadeInUp mb-12">
                    Get in Touch with Us
                  </h3>
                  <div className="sub-title mb-28 body-2 wow fadeInUp">
                    Reach out today to discuss how we can support your business
                    goals. Our <br />
                    team is ready to provide answers, offer solutions, and start
                    your journey
                    <br />
                    toward success.
                  </div>
                  <div className="bottom">
                    <div className="wow fadeInUp">
                      <Link
                        href={`/contact-us`}
                        className="tf-btn style-1 bg-white"
                      >
                        <span> Schedule A Consultation</span>
                      </Link>
                    </div>
                    <div className="tf-phone no-border color-white">
                      <a
                        href="#"
                        className="icon wow fadeInUp"
                        data-wow-delay=".1s"
                      >
                        <i className="icon-PhoneCall" />
                      </a>
                      <div
                        className="content wow fadeInUp"
                        data-wow-delay=".1s"
                      >
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
      </div>
    </section>
  );
}
