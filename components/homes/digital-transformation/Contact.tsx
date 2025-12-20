import Link from "next/link";
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
            src="/image/section/section-contact-home-h4.jpg"
            alt=""
            className="lazyload"
            width={960}
            height={680}
          />
        </div>
      </div>
      <div className="tf-container position-relative">
        <div className="row">
          <div className="col-12">
            <div className="section-contact-home-inner">
              <div className="right">
                <div className="box-agent">
                  <div className="list-img">
                    <div className="img-avata item item-1 wow fadeInUp">
                      <Image
                        src="/image/avatar/box-agent-1.jpg"
                        alt=""
                        className="lazyload"
                        width={96}
                        height={96}
                      />
                    </div>
                    <div
                      className="img-avata item item-2 wow fadeInUp"
                      data-wow-delay=".1s"
                    >
                      <Image
                        src="/image/avatar/box-agent-2.jpg"
                        alt=""
                        className="lazyload"
                        width={96}
                        height={96}
                      />
                    </div>
                    <div
                      className="img-avata item item-3 wow fadeInUp"
                      data-wow-delay=".2s"
                    >
                      <Image
                        src="/image/avatar/box-agent-3.jpg"
                        alt=""
                        className="lazyload"
                        width={96}
                        height={96}
                      />
                    </div>
                    <div
                      className="img-avata item item-4 wow fadeInUp"
                      data-wow-delay=".3s"
                    >
                      <Image
                        src="/image/avatar/box-agent-4.jpg"
                        alt=""
                        className="lazyload"
                        width={90}
                        height={96}
                      />
                    </div>
                    <div
                      className="item item-5 text-item wow fadeInUp"
                      data-wow-delay=".4s"
                    >
                      <p className="label fw-7">10k</p>
                    </div>
                  </div>
                  <div
                    className="text caption-1 color-white wow fadeInUp"
                    data-wow-delay=".5s"
                  >
                    Trusted by Leading Businesses <br />
                    Worldwide for Digital Transformation <br />
                    Solutions
                  </div>
                </div>
                <div className="heading-section style-color-white mb-0">
                  <div className="wow fadeInUp">
                    <Link
                      href={`/contact-us`}
                      className="tag label text-btn-uppercase color-white"
                    >
                      Contact Us
                    </Link>
                  </div>
                  <h3 className="wow fadeInUp mb-12">
                    Ready to Transform Your <br />
                    Business?
                  </h3>
                  <div className="sub-title body-2 mb-40 wow fadeInUp">
                    Unlock the full potential of your organization with our
                    expert digital <br />
                    transformation solutions. Contact us today to start your
                    journey <br />
                    toward enhanced efficiency, innovation, and growth. Let's
                    create a
                    <br />
                    customized strategy that drives your success.
                  </div>
                  <div className="bottom">
                    <div className="wow fadeInUp">
                      <Link
                        href={`/contact-us`}
                        className="tf-btn style-1 bg-white bg-white-style-2"
                      >
                        <span> Schedule A Consultation </span>
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
                        data-wow-delay=".2s"
                      >
                        <p className="caption-2">Have any Question?</p>
                        <a href="#" className="text-btn">
                          1-555-678-8888
                        </a>
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
