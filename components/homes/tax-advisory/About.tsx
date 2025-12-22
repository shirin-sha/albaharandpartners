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
                ABOUT AL BAHAR & PARTNERS
              </a>
            </div>
            <h3 className="mb-0 text-anime-wave">
              Empowering Business Through <br/> Trusted Partnerships
            </h3>
          </div>
        </div>
        <div className="about-right">
          <div className="section-content">
            <div className="text body-2 color-on-suface-container text-anime-wave-2">
              Al Bahar & Partners delivers reliable, partner-backed technology solutions  <br/>for
              organizations across Kuwait. We combine deep domain understanding <br/>with
              proven delivery,
               helping clients implement solutions with confidence,<br/>  efficiency,
              and long-term support.
            </div>
            <div className="bottom g-40 text-anime-wave-2">
              <Link
                href={`/contact-us`}
                className="tf-btn bg-on-suface-container style-1"
              >
                <span>Schedule a Consultation</span>
              </Link>
              <div className="tf-phone">
                <div className="content">
                  <p>Or Call Us:</p>
                  <h5>
                    <a href="#" className="color-primary">
                    +965 XXX XXXX
                    </a>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /.section-about */}

    </>
  );
}
