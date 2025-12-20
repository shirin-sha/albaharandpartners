import React from "react";

export default function Faqs() {
  return (
    <section className="section-faqs h-3 tf-spacing-17">
      <div className="tf-container position-relative">
        <div className="row">
          <div className="col-12">
            <div className="heading-section m-lr-100 mb-36">
              <div className="text-anime-wave">
                <a href="#" className="tag label text-btn-uppercase">
                  FAQs
                </a>
              </div>
              <h3 className="text-anime-wave mb-12">
                Proven Results You Can See
              </h3>
              <div className="sub-title body-2 text-anime-wave">
                Find answers to some of the most common questions about
                financial planning, from budgeting and investment strategies to
                <br />
                retirement planning and managing debt.
              </div>
            </div>
            <div className="wg-according style-border m-lr-100" id="According">
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
                      We conduct in-depth assessments of your business needs,
                      industry landscape, and competitive environment to develop
                      customized strategies that align with your specific goals.
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
                    How do you tailor your strategies for each client?
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
                      We conduct in-depth assessments of your business needs,
                      industry landscape, and competitive environment to develop
                      customized strategies that align with your specific goals.
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
                    What industries do you specialize in?
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
                      We conduct in-depth assessments of your business needs,
                      industry landscape, and competitive environment to develop
                      customized strategies that align with your specific goals.
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
                    How do you measure success?
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
                      We conduct in-depth assessments of your business needs,
                      industry landscape, and competitive environment to develop
                      customized strategies that align with your specific goals.
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
                    What is your approach to client collaboration?
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
                      We conduct in-depth assessments of your business needs,
                      industry landscape, and competitive environment to develop
                      customized strategies that align with your specific goals.
                    </p>
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
