import React from "react";

export default function Benefits() {
  return (
    <section
      className="section-benefit h-1 tf-spacing-3 section-one-page"
      id="benefit"
    >
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="box-icon-list">
              <div className="box-icon">
                <div className="icon wow fadeInUp">
                  <i className="icon-tailored" />
                </div>
                <div className="box-content">
                  <h5 className="wow fadeInUp">
                    <a href="#" className="title-box">
                      {" "}
                      Tailored Strategies{" "}
                    </a>
                  </h5>
                  <div className="sub-title wow fadeInUp">
                    Customized financial plans designed to meet your unique
                    goals and financial situation.
                  </div>
                </div>
              </div>
              <div className="box-icon">
                <div className="icon wow fadeInUp" data-wow-delay=".1s">
                  <i className="icon-investment" />
                </div>
                <div className="box-content">
                  <h5 className="wow fadeInUp" data-wow-delay=".1s">
                    <a href="#" className="title-box">
                      {" "}
                      Investment Growth{" "}
                    </a>
                  </h5>
                  <div className="sub-title wow fadeInUp" data-wow-delay=".1s">
                    Expert strategies to enhance investment returns and drive
                    consistent growth for you.
                  </div>
                </div>
              </div>
              <div className="box-icon">
                <div className="icon wow fadeInUp" data-wow-delay=".2s">
                  <i className="icon-financial" />
                </div>
                <div className="box-content">
                  <h5 className="wow fadeInUp" data-wow-delay=".2s">
                    <a href="#" className="title-box">
                      {" "}
                      Financial Security{" "}
                    </a>
                  </h5>
                  <div className="sub-title wow fadeInUp" data-wow-delay=".2s">
                    Comprehensive solutions to safeguard assets and ensure
                    long-term financial stability and safety.
                  </div>
                </div>
              </div>
              <div className="box-icon">
                <div className="icon wow fadeInUp" data-wow-delay=".3s">
                  <i className="icon-tax" />
                </div>
                <div className="box-content">
                  <h5 className="wow fadeInUp" data-wow-delay=".3s">
                    <a href="#" className="title-box">
                      {" "}
                      Tax Savings{" "}
                    </a>
                  </h5>
                  <div className="sub-title wow fadeInUp" data-wow-delay=".3s">
                    Effective strategies to minimize tax liabilities and enhance
                    financial returns and savings.
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
