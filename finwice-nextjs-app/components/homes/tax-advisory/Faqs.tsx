import React from "react";

export default function Faqs() {
  return (
    <section className="section-faqs h-7 tf-spacing-24 bg-surface">
      <div className="tf-container position-relative">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center">
              <div className="text-anime-wave-1">
                <a href="#" className="tag label text-btn-uppercase bg-white">
                  Faqs
                </a>
              </div>
              <h3 className="title-section mb-20 text-anime-wave-1">
                Your Questions, Answered
              </h3>
              <div className="sub-title body-2 color-on-suface-container text-anime-wave-1">
                Get clear solutions to your top questions, ensuring confidence
                at every step
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-10 mx-auto">
            <div className="wg-according style-border" id="According">
              <div className="according-item">
                <h5>
                  <a
                    href="#according-1"
                    data-bs-toggle="collapse"
                    className="title-according collapsed"
                  >
                    What services do you offer? <span />
                  </a>
                </h5>
                <div
                  id="according-1"
                  className="collapse"
                  data-bs-parent="#According"
                >
                  <div className="according-content">
                    <p>
                      We identify growth opportunities, optimize strategies, and
                      enhance customer engagement for increased revenue, and
                      enhance customer engagement for increased revenue.
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
                    How Can Marketing Consulting Help? <span />
                  </a>
                </h5>
                <div
                  id="according-2"
                  className="collapse show"
                  data-bs-parent="#According"
                >
                  <div className="according-content">
                    <p>
                      We identify growth opportunities, optimize strategies, and
                      enhance customer engagement for increased revenue, and
                      enhance customer engagement for increased revenue.
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
                    What’s the Duration of a Project? <span />
                  </a>
                </h5>
                <div
                  id="according-3"
                  className="collapse"
                  data-bs-parent="#According"
                >
                  <div className="according-content">
                    <p>
                      We identify growth opportunities, optimize strategies, and
                      enhance customer engagement for increased revenue, and
                      enhance customer engagement for increased revenue.
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
                    How Do You Measure Success? <span />
                  </a>
                </h5>
                <div
                  id="according-4"
                  className="collapse"
                  data-bs-parent="#According"
                >
                  <div className="according-content">
                    <p>
                      We identify growth opportunities, optimize strategies, and
                      enhance customer engagement for increased revenue, and
                      enhance customer engagement for increased revenue.
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
                    Do You Work with All Business Sizes? <span />
                  </a>
                </h5>
                <div
                  id="according-5"
                  className="collapse"
                  data-bs-parent="#According"
                >
                  <div className="according-content">
                    <p>
                      We identify growth opportunities, optimize strategies, and
                      enhance customer engagement for increased revenue, and
                      enhance customer engagement for increased revenue.
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
