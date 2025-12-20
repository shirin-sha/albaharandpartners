import Link from "next/link";
import Image from "next/image";
import React from "react";
import { counters3 } from "@/data/cta";
import OdometerComponent from "@/components/common/OdometerComponent";

export default function Features() {
  return (
    <section className="section-why-choose h-7 bg-surface tf-spacing-31">
      <div className="tf-container position-relative tf-spacing-3">
        <div className="row rg-60">
          <div className="col-xl-6">
            <div className="image mr-15">
              <Image
                src="/image/section/img-section-why-choose-h7.jpg"
                alt=""
                className="lazyload"
                width={615}
                height={615}
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="section-content ml-15">
              <div className="heading-section">
                <div className="wow fadeInUp">
                  <a href="#" className="tag label text-btn-uppercase bg-white">
                    Why Choose us?
                  </a>
                </div>
                <h3 className="wow fadeInUp mb-12">
                  Why Choose Us for Your <br />
                  Digital Transformation?
                </h3>
                <div className="sub-title body-2 wow fadeInUp">
                  We offer unparalleled expertise and tailored solutions to
                  navigate your digital journey. Our team combines deep industry
                  knowledge with cutting-edge technology to drive transformative
                  results. Partner with us to experience innovation, efficiency,
                  and sustainable growth.
                </div>
              </div>
              <div className="cols g-10 mb-36">
                <div className="benefit-lists">
                  <div className="benefit-items">
                    <div className="icon wow fadeInUp">
                      <i className="icon-checkbox" />
                    </div>
                    <div className="title wow fadeInUp" data-wow-delay=".1s">
                      Expert Team Top professionals
                      <br />
                      in digital transformation
                    </div>
                  </div>
                  <div className="benefit-items">
                    <div className="icon wow fadeInUp">
                      <i className="icon-checkbox" />
                    </div>
                    <div className="title wow fadeInUp" data-wow-delay=".1s">
                      Innovative Tech Cutting-edge technology for results
                    </div>
                  </div>
                </div>
                <div className="benefit-lists">
                  <div className="benefit-items">
                    <div className="icon wow fadeInUp" data-wow-delay=".2s">
                      <i className="icon-checkbox" />
                    </div>
                    <div className="title wow fadeInUp" data-wow-delay=".3s">
                      Custom Solutions Strategies tailored to your needs
                    </div>
                  </div>
                  <div className="benefit-items">
                    <div className="icon wow fadeInUp" data-wow-delay=".2s">
                      <i className="icon-checkbox" />
                    </div>
                    <div className="title wow fadeInUp" data-wow-delay=".3s">
                      Proven Success Track record
                      <br />
                      of driving growth
                    </div>
                  </div>
                </div>
              </div>
              <div className="wow fadeInUp">
                <Link
                  href={`/contact-us`}
                  className="tf-btn style-1 bg-on-suface-container"
                >
                  <span> Schedule A Consultation </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tf-container position-relative">
        <div className="row">
          <div className="col-12">
            <div className="wg-counter justify-content-between">
              {counters3.map((counter, index) => (
                <div className="counter-item style-3" key={index}>
                  <div className="counter">
                    <div className="number-counter">
                      <h2 className="number odometer">
                        <OdometerComponent max={counter.value} />
                      </h2>
                      <h2 className="plus">+</h2>
                    </div>
                    <h6
                      className="text"
                      dangerouslySetInnerHTML={{ __html: counter.label }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
