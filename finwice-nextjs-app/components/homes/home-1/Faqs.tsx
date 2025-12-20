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
                      FAQs
                    </a>
                  </div>
                  <h3 className="title-section mb-12 text-anime-wave">
                    Proven Results You Can See
                  </h3>
                  <div className="sub-title body-2 text-anime-wave mb-40">
                    Find answers to some of the most common questions about
                    financial planning, from budgeting and investment strategies
                    to retirement planning and managing debt.
                  </div>
                  <div className="text-anime-wave">
                    <Link
                      href={`/contact-us`}
                      className="tf-btn style-1 bg-on-suface-container"
                    >
                      <span> Schedule A Consultation </span>
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
                        What is financial planning? <span />
                      </a>
                    </h5>
                    <div
                      id="according-1"
                      className="collapse"
                      data-bs-parent="#According"
                    >
                      <div className="according-content">
                        <p>
                          Financial planning helps you understand your financial
                          situation, set achievable goals, and create a roadmap
                          to reach those goals. It can provide peace of mind,
                          help you make informed decisions, and prepare for
                          unexpected events.
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
                        Why is financial planning important?
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
                          Financial planning helps you understand your financial
                          situation, set achievable goals, and create a roadmap
                          to reach those goals. It can provide peace of mind,
                          help you make informed decisions, and prepare for
                          unexpected events.
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
                        How often should I review my financial plan?
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
                          Financial planning helps you understand your financial
                          situation, set achievable goals, and create a roadmap
                          to reach those goals. It can provide peace of mind,
                          help you make informed decisions, and prepare for
                          unexpected events.
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
                        What are the key components of a financial plan?
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
                          Financial planning helps you understand your financial
                          situation, set achievable goals, and create a roadmap
                          to reach those goals. It can provide peace of mind,
                          help you make informed decisions, and prepare for
                          unexpected events.
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
                        Do I need a financial advisor to create a financial
                        plan? <span />
                      </a>
                    </h5>
                    <div
                      id="according-5"
                      className="collapse"
                      data-bs-parent="#According"
                    >
                      <div className="according-content">
                        <p>
                          Financial planning helps you understand your financial
                          situation, set achievable goals, and create a roadmap
                          to reach those goals. It can provide peace of mind,
                          help you make informed decisions, and prepare for
                          unexpected events.
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
