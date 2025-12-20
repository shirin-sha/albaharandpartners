import Link from "next/link";
import React from "react";

export default function Cta() {
  return (
    <section className="section-cta h-2 section-one-page" id="cta">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="cta-inner style-2">
              <div className="cta-content">
                <h4 className="title-content">
                  Ready To Take Your Business To The Next Level? Let’s Build
                  Your
                  <br />
                  Success Together Today!
                </h4>
                <Link
                  href={`/contact-us`}
                  className="tf-btn style-1 bg-white text-center"
                >
                  <span> Schedule A Consultation </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
