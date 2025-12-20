import Link from "next/link";
import Image from "next/image";
import React from "react";
import { counters4 } from "@/data/cta";
import OdometerComponent from "@/components/common/OdometerComponent";

export default function Hero() {
  return (
    <div className="page-title-home style-2">
      <div className="page-title-inner">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <div className="page-title-content">
                <div className="page-title-home-left">
                  <h1>
                    Transform Your
                    <br />
                    Vision into <br />
                    Reality
                  </h1>
                  <div className="sub-title body-2">
                    Our expert strategies empower your business to achieve
                    long-term
                    <br />
                    success. Start shaping your future today!
                  </div>
                  <Link
                    href={`/contact-us`}
                    className="tf-btn style-1 bg-on-suface-container"
                  >
                    <span>Schedule A Consultation</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="page-title-home-right">
          <div className="image">
            <Image
              src="/image/page-title/page-title-home-3.jpg"
              data-sort-value=""
              alt=""
              className="lazyload"
              width={959}
              height={644}
            />
          </div>
          <div className="wg-counter g-20">
            {counters4.map((counter, index) => (
              <div className="counter-item style-4" key={index}>
                <div className="counter">
                  <div className="number-counter">
                    <h3 className="number odometer">
                      <OdometerComponent max={counter.value} />
                    </h3>
                    <h3 className="plus">+</h3>
                  </div>
                  <p className="text text-btn-uppercase label">
                    {counter.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
