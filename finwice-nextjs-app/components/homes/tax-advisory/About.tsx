import Link from "next/link";
import React from "react";

export default function About() {
  return (
    <>
      {/* Section-about */}
      <section dir="ltr" className="section-about h-7">
        <div className="about-left bg-surface">
          <div className="heading-section mb-0">
            <div className="text-anime-wave">
              <a href="#" className="tag label text-btn-uppercase bg-white">
                Leading the Way in Data Analytics
              </a>
            </div>
            <h3 className="mb-0 text-anime-wave">
              Empowering Your Business <br />
              Success
            </h3>
          </div>
        </div>
        <div className="about-right">
          <div className="section-content">
            <div className="text body-2 color-on-suface-container text-anime-wave-2">
              With highly qualified psychologists, we offer effective and
              tailored <br />
              therapy for your unique needs. Trust us to support you fully.
            </div>
            <div className="bottom g-40 text-anime-wave-2">
              <Link
                href={`/contact-us`}
                className="tf-btn bg-on-suface-container style-1"
              >
                <span>Schedule A Consultation</span>
              </Link>
              <div className="tf-phone">
                <div className="content">
                  <p>Or Call Us:</p>
                  <h5>
                    <a href="#" className="color-primary">
                      1-555-678-8888
                    </a>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /.section-about */}
      {/* Section-benefit */}
      <section
        className="section-benefit h-7 tf-spacing-31 section-one-page"
        id="about"
      >
        <div className="tf-container position-relative">
          <div className="row">
            <div className="col-12">
              <div className="heading-section text-center style-color-white">
                <div className="text-anime-wave-1">
                  <a
                    href="#"
                    className="tag label text-btn-uppercase color-white"
                  >
                    OUR Benefit
                  </a>
                </div>
                <h3 className="text-anime-wave-1 mb-12">
                  Solutions for Business Growth
                </h3>
                <div className="sub-title body-2 text-anime-wave-1">
                  Innovative financial solutions designed to elevate your
                  business performance.
                </div>
              </div>
              <div className="box-icon-list">
                <div className="box-icon color-white">
                  <div className="icon">
                    <i className="icon-tailored" />
                  </div>
                  <div className="box-content">
                    <h5>
                      <a href="#" className="title-box">
                        {" "}
                        Tailored Strategies{" "}
                      </a>
                    </h5>
                    <div className="sub-title">
                      Customized financial plans designed <br />
                      to meet your unique goals and <br />
                      financial situation.
                    </div>
                  </div>
                </div>
                <div className="box-icon color-white">
                  <div className="icon">
                    <i className="icon-investment" />
                  </div>
                  <div className="box-content">
                    <h5>
                      <a href="#" className="title-box">
                        {" "}
                        Investment Growth{" "}
                      </a>
                    </h5>
                    <div className="sub-title">
                      Expert strategies to enhance <br />
                      investment returns and drive <br />
                      consistent growth for you.
                    </div>
                  </div>
                </div>
                <div className="box-icon color-white">
                  <div className="icon">
                    <i className="icon-financial" />
                  </div>
                  <div className="box-content">
                    <h5>
                      <a href="#" className="title-box">
                        {" "}
                        Financial Security{" "}
                      </a>
                    </h5>
                    <div className="sub-title">
                      Comprehensive solutions to <br />
                      safeguard assets and ensure long- <br />
                      term financial stability and safety.
                    </div>
                  </div>
                </div>
                <div className="box-icon color-white">
                  <div className="icon">
                    <i className="icon-tax" />
                  </div>
                  <div className="box-content">
                    <h5>
                      <a href="#" className="title-box">
                        {" "}
                        Tax Savings{" "}
                      </a>
                    </h5>
                    <div className="sub-title">
                      Effective strategies to minimize tax <br />
                      liabilities and enhance financial <br />
                      returns and savings.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /.section-benefit */}
    </>
  );
}
