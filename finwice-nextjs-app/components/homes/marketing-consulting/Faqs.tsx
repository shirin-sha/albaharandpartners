import Image from "next/image";
import React from "react";

export default function Faqs() {
  return (
    <section className="section-faqs h-5 tf-spacing-2">
      <div className="tf-container position-relative">
        <div className="row rg-60">
          <div className="col-lg-6">
            <div className="section-faqs-left mr-15">
              <div className="image tf-animate-1">
                <Image
                  src="/image/section/img-section-fqa-h5.jpg"
                  alt=""
                  className="lazyloaded"
                  width={615}
                  height={615}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="section-content ml-35">
              <div className="heading-section">
                <div className="wow fadeInUp">
                  <a href="#" className="tag label text-btn-uppercase">
                    FAQs
                  </a>
                </div>
                <h3 className="wow fadeInUp">
                  Find Answers to Your <br />
                  Question
                </h3>
              </div>
              <div className="wg-according style-border" id="According">
                <div className="according-item">
                  <h5>
                    <a
                      href="#according-1"
                      data-bs-toggle="collapse"
                      className="title-according collapsed"
                    >
                      What services do you offer?
                      <span />
                    </a>
                  </h5>
                  <div
                    id="according-1"
                    className="collapse"
                    data-bs-parent="#According"
                  >
                    <div className="according-content">
                      <p>
                        We identify growth opportunities, optimize strategies,
                        and enhance customer engagement for increased revenue.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="according-item">
                  <h5>
                    <a
                      href="#according-2"
                      data-bs-toggle="collapse"
                      className="title-according"
                    >
                      How Can Marketing Consulting Help?
                      <span />
                    </a>
                  </h5>
                  <div
                    id="according-2"
                    className="collapse show"
                    data-bs-parent="#According"
                  >
                    <div className="according-content">
                      <p>
                        We identify growth opportunities, optimize strategies,
                        and enhance customer engagement for increased revenue.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="according-item">
                  <h5>
                    <a
                      href="#according-3"
                      data-bs-toggle="collapse"
                      className="title-according collapsed"
                    >
                      What’s the Duration of a Project?
                      <span />
                    </a>
                  </h5>
                  <div
                    id="according-3"
                    className="collapse"
                    data-bs-parent="#According"
                  >
                    <div className="according-content">
                      <p>
                        We identify growth opportunities, optimize strategies,
                        and enhance customer engagement for increased revenue.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="according-item">
                  <h5>
                    <a
                      href="#according-4"
                      data-bs-toggle="collapse"
                      className="title-according collapsed"
                    >
                      How Do You Measure Success?
                      <span />
                    </a>
                  </h5>
                  <div
                    id="according-4"
                    className="collapse"
                    data-bs-parent="#According"
                  >
                    <div className="according-content">
                      <p>
                        We identify growth opportunities, optimize strategies,
                        and enhance customer engagement for increased revenue.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="according-item">
                  <h5>
                    <a
                      href="#according-5"
                      data-bs-toggle="collapse"
                      className="title-according collapsed"
                    >
                      Do You Work with All Business Sizes?
                      <span />
                    </a>
                  </h5>
                  <div
                    id="according-5"
                    className="collapse"
                    data-bs-parent="#According"
                  >
                    <div className="according-content">
                      <p>
                        We identify growth opportunities, optimize strategies,
                        and enhance customer engagement for increased revenue.
                      </p>
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
