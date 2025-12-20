"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { testimonials4 } from "@/data/testimonials";
import OdometerComponent from "../common/OdometerComponent";

export default function Testimonials2() {
  const [filteres, setFilteres] = useState(testimonials4);
  const [isLoadedMore, setIsLoadedMore] = useState(false);
  useEffect(() => {
    if (isLoadedMore) {
      setFilteres(testimonials4);
    } else {
      setFilteres(testimonials4.slice(0, 9));
    }
  }, [isLoadedMore]);
  return (
    <section className="section-testimonials tf-spacing-2">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center">
              <a href="#" className="tag label text-btn-uppercase">
                Testimonials
              </a>
              <h3 className="title-section mb-12">
                Proven Results You Can See
              </h3>
              <div className="sub-title body-2">
                See the impact of our solutions through clear, measurable
                results.
              </div>
            </div>
          </div>
        </div>
        <div className="row rg-40 loadmore-item-5 mb-40">
          {filteres.map((item, index) => (
            <div className="col-lg-4 col-md-6 fl-item-5 d-block" key={index}>
              <div className="testimonial-item">
                <div className="testimonial-top">
                  <div className="counter-item">
                    <div className="counter">
                      <div className="number-counter">
                        <h4 className="number odometer color-primary">
                          <OdometerComponent max={item.percentage} />
                        </h4>
                        <h4 className="plus color-primary">%</h4>
                      </div>
                      <h5 className="text">{item.label}</h5>
                    </div>
                  </div>
                </div>
                <div className="item-content">
                  <div className="text">{item.text}</div>
                  <div className="info-user">
                    <div className="image">
                      <Image
                        src={item.imgSrc}
                        alt={item.name}
                        className="lazyload"
                        width={48}
                        height={48}
                      />
                    </div>
                    <div className="info-content">
                      <a href="#" className="name text-btn">
                        {item.name}
                      </a>
                      <div className="position-user caption-2">
                        {item.position}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {!isLoadedMore ? (
          <div className="row">
            <div className="col-12">
              <div
                onClick={() => setIsLoadedMore(true)}
                className="btn-load-more text-center view-more-button-5"
              >
                <button className="tf-btn style-1 bg-on-suface-container btn-loadmore-5">
                  <span>Load More</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}
