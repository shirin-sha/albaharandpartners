import Image from "next/image";
import React from "react";

export default function Features() {
  return (
    <section className="section-why-choose h-8 bg-surface tf-spacing-7">
      <div className="tf-container position-relative">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center">
              <div className="text-anime-wave-1">
                <a
                  href="#"
                  className="tag label text-btn-uppercase bg-white mb-12"
                >
                  Why Choose us?
                </a>
              </div>
              <h3 className="title-section mb-12 text-anime-wave-1">
                We Drive Growth Through <br />
                Tailored Solutions.
              </h3>
            </div>
          </div>
        </div>
        <div className="row rg-30">
          <div className="col-md-4">
            <div className="list-box-icon">
              <div className="box-icon">
                <div className="icon color-primary wow fadeInUp">
                  <i className="icon-customized" />
                </div>
                <div className="box-content">
                  <h5 className="wow fadeInUp">
                    <a href="#" className="title-box">
                      Customized IT Strategies
                    </a>
                  </h5>
                  <div className="sub-title wow fadeInUp">
                    Tailored solutions to meet your unique IT needs, ensuring
                    alignment with business objectives.
                  </div>
                </div>
              </div>
              <div className="box-icon">
                <div className="icon color-primary wow fadeInUp">
                  <i className="icon-advanced" />
                </div>
                <div className="box-content">
                  <h5 className="wow fadeInUp">
                    <a href="#" className="title-box">
                      Advanced Cybersecurity Measures
                    </a>
                  </h5>
                  <div className="sub-title wow fadeInUp">
                    Protect your digital assets with cutting-edge security
                    solutions and proactive threat management.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="image img-section-why-h-8 tf-animate-2"
              data-delay=".2s"
            >
              <Image
                src="/image/section/img-section-why-h8.png"
                alt=""
                className="lazyload"
                width={410}
                height={522}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="list-box-icon">
              <div className="box-icon">
                <div
                  className="icon color-primary wow fadeInUp"
                  data-wow-delay=".3s"
                >
                  <i className="icon-streamlined" />
                </div>
                <div className="box-content">
                  <h5 className="wow fadeInUp" data-wow-delay=".3s">
                    <a href="#" className="title-box">
                      Streamlined Cloud Integration
                    </a>
                  </h5>
                  <div className="sub-title wow fadeInUp" data-wow-delay=".3s">
                    Enhance efficiency with seamless cloud migration and
                    optimized cloud-based operations.
                  </div>
                </div>
              </div>
              <div className="box-icon">
                <div
                  className="icon color-primary wow fadeInUp"
                  data-wow-delay=".3s"
                >
                  <i className="icon-future" />
                </div>
                <div className="box-content">
                  <h5 className="wow fadeInUp" data-wow-delay=".3s">
                    <a href="#" className="title-box">
                      Future-Ready IT Systems"
                    </a>
                  </h5>
                  <div className="sub-title wow fadeInUp" data-wow-delay=".3s">
                    Leverage scalable technologies and innovative solutions to
                    support long-term growth &amp; adaptability.
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
