import Link from "next/link";
import React from "react";

export default function Faqs() {
  return (
    <section
      className="section-faqs h-1 tf-spacing-2 section-one-page"
      id="faqs"
    >
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="section-faqs-inner">
              <div className="left">
                <div className="heading-section">
                  <div className="text-anime-wave">
                    <a
                      href="#"
                      className="tag label text-btn-uppercase bg-white"
                    >
                    Questions
                    </a>
                  </div>
                  <h3 className="title-section mb-12 text-anime-wave">
                  Have any questions? here some answers.
                  </h3>
                  <div className="sub-title body-2 text-anime-wave mb-40">
                  In relation to websites and apps, UI design considers the look, interactivity of the making product. It's all about making sure that the user interface.
                  </div>
                  <div className="text-anime-wave">
                    <Link
                      href={`/contact-us`}
                      className="tf-btn style-1 bg-on-suface-container"
                    >
                      <span> Ask Your Question </span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="wg-according" id="According">
                  <div className="according-item">
                    <h5>
                      <a
                        href="#according-1"
                        data-bs-toggle="collapse"
                        className="title-according collapsed"
                      >
                        What types of brands does Al Bahar Group represent? <span />
                      </a>
                    </h5>
                    <div
                      id="according-1"
                      className="collapse"
                      data-bs-parent="#According"
                    >
                      <div className="according-content">
                        <p>
                        We work with internationally recognised leaders in consumer goods, technology, shipping, travel and retail. Our partners trust us to represent their brands with the same care and standards they expect in their home markets.
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
                     How can a new principal explore partnership opportunities?
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
                        You can contact our group office through the website or our main telephone number. Our leadership team will review your proposal, assess market fit and connect you with the relevant business vertical.
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
                    In which channels do you operate?
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
                        Our businesses serve a wide range of channels – from large modern trade and hypermarkets to traditional retail, corporate accounts, government entities, and specialised sectors such as education and logistics.
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
                     How can I apply for a role at Al Bahar Group?
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
                        Visit our Careers section to view current opportunities and submit your application online. We regularly participate in career fairs and campus events to meet new talent.
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
                      Do you support long-term development of your employees?<span />
                      </a>
                    </h5>
                    <div
                      id="according-5"
                      className="collapse"
                      data-bs-parent="#According"
                    >
                      <div className="according-content">
                        <p>
                        Yes. Training, coaching and structured learning programs are integral to our HR strategy. We believe investing in our people is essential to sustaining high performance and delivering value to our partners.
                        </p>
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
