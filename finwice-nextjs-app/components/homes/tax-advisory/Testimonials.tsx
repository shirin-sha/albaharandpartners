import Link from "next/link";
import Image from "next/image";
import { testimonialsStyle2 } from "@/data/testimonials";
import React from "react";

export default function Testimonials() {
  return (
    <section
      className="section-testimonials h-7 tf-spacing-2 section-one-page"
      id="testimonials"
    >
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section style-2">
              <div className="left">
                <div className="text-anime-wave">
                  <a href="#" className="tag label text-btn-uppercase">
                    Testimonials
                  </a>
                </div>
                <h3 className="mb-12 text-anime-wave">
                  What Say Our Honored Clients
                </h3>
                <div className="sub-title body-2 text-anime-wave">
                  See the impact of our solutions through clear, measurable
                  results.
                </div>
              </div>
              <div className="text-anime-wave-2">
                <Link
                  href={`/testimonials`}
                  className="tf-btn style-1 bg-on-suface-container"
                >
                  <span> Read All Testimonials </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row rg-30">
          {testimonialsStyle2.map((item, index) => (
            <div className="col-lg-6" key={index}>
              <div className="testimonial-item style-2 hover-img">
                <div className="testimonial-content">
                  <h5>
                    <a href="#" className="name-testimonials">
                      {item.title}
                    </a>
                  </h5>
                  <div className="desc">{item.text}</div>
                  <div className="bottom">
                    <a href="#" className="name-user text-btn">
                      {item.name}
                    </a>
                    <p className="caption-2">{item.position}</p>
                  </div>
                </div>
                <div className="image">
                  <Image
                    src={item.imgSrc}
                    alt={item.name}
                    className="lazyload"
                    width={210}
                    height={280}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
