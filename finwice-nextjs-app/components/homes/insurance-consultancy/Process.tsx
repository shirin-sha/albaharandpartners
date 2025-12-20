import Image from "next/image";
import React from "react";

export default function Process() {
  return (
    <section className="section-process h-6 mb-40">
      <div className="section-process-inner">
        <div className="image tf-animate-1">
          <Image
            src="/image/section/img-section-process-h6.jpg"
            alt=""
            className="lazyload"
            width={900}
            height={900}
          />
        </div>
        <div className="section-process-content">
          <div className="heading-section style-color-white mb-48">
            <div className="wow fadeInUp">
              <a href="#" className="tag label text-btn-uppercase bg-white">
                Our Process
              </a>
            </div>
            <h2 className="title-section mb-12 wow fadeInUp">
              Our Process for Success
            </h2>
            <div className="sub-title body-2 wow fadeInUp">
              Our structured approach ensures tailored insurance solutions,
              offering peace of mind and comprehensive support every step of the
              way.
            </div>
          </div>
          <div className="process-list style-column hover-active-step">
            <div className="process-item style-color-white style-3 step-hover">
              <div className="title number-process wow fadeInUp">1</div>
              <div className="process-content">
                <h5 className="wow fadeInUp" data-wow-delay=".1s">
                  <a href="#" className="name-process mb-10">
                    Consult &amp; Assess Risks
                  </a>
                </h5>
                <div className="desc wow fadeInUp" data-wow-delay=".1s">
                  Meet with clients to understand needs and assess potential
                  risks, forming a clear picture of <br />
                  required coverage.
                </div>
              </div>
            </div>
            <div className="process-item style-color-white style-3 step-hover">
              <div className="title number-process wow fadeInUp">2</div>
              <div className="circle wow fadeInUp" />
              <div className="process-content">
                <h5 className="wow fadeInUp" data-wow-delay=".1s">
                  <a href="#" className="name-process mb-10">
                    Recommend Policies
                  </a>
                </h5>
                <div className="desc wow fadeInUp" data-wow-delay=".1s">
                  Design tailored insurance solutions, comparing options across
                  providers to align with client goals and risk profiles.
                </div>
              </div>
            </div>
            <div className="process-item style-color-white style-3 step-hover">
              <div className="title number-process wow fadeInUp">3</div>
              <div className="circle wow fadeInUp" />
              <div className="process-content">
                <h5 className="wow fadeInUp" data-wow-delay=".1s">
                  <a href="#" className="name-process mb-10">
                    Implement Coverage
                  </a>
                </h5>
                <div className="desc wow fadeInUp" data-wow-delay=".1s">
                  Facilitate the purchase and setup of selected policies,
                  ensuring seamless onboarding and policy accuracy.
                </div>
              </div>
            </div>
            <div className="process-item style-color-white style-3 step-hover">
              <div className="title number-process wow fadeInUp">4</div>
              <div className="circle wow fadeInUp" />
              <div className="process-content">
                <h5 className="wow fadeInUp" data-wow-delay=".1s">
                  <a href="#" className="name-process mb-10">
                    Support &amp; Claims
                  </a>
                </h5>
                <div className="desc wow fadeInUp" data-wow-delay=".1s">
                  Provide continuous support for policy adjustments, renewals,
                  and guidance through claims processes when needed.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
