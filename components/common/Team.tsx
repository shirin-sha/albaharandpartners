import Link from "next/link";
import Image from "next/image";
import { avatarImages } from "@/data/team";
import React from "react";

export default function TeamCircle() {
  return (
    <section
      className="section-team h-5 tf-spacing-23 bg-surface section-one-page"
      id="testimonials"
    >
      <div className="tf-container position-relative">
        <div className="row">
          <div className="col-12">
            <div className="section-team-inner">
              <div className="section-content section-team-left">
                <div className="heading-section">
                  <div className="wow wow fadeInUp">
                    <a
                      href="#"
                      className="tag label text-btn-uppercase bg-white"
                    >
                      Join Our TEam
                    </a>
                  </div>
                  <h3 className="wow fadeInUp mb-12">
                    Shape the Future with Us
                  </h3>
                  <div className="sub-title body-2 wow fadeInUp mb-40">
                    We're looking for passionate individuals to join our dynamic
                    team of <br />
                    experts. Together, we'll drive innovation, solve complex
                    challenges, and <br />
                    create cutting-edge data solutions. If you're ready to make
                    an impact <br />
                    and grow with us, apply today!
                  </div>
                  <div className="wow fadeInUp">
                    <Link
                      href={`/contact-us`}
                      className="tf-btn style-1 bg-on-suface-container"
                    >
                      <span>Apply Now!</span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="section-team-right">
                <div className="tf-group-features">
                  <svg className="dashed-lines" viewBox="0 0 360 360">
                    <circle
                      cx={180}
                      cy={180}
                      r={146}
                      fill="none"
                      stroke="rgba(36, 40, 62, 0.2)"
                      strokeWidth={1}
                      strokeDasharray="6,6"
                    />
                    <line
                      x1={180}
                      y1={180}
                      x2={180}
                      y2={20}
                      stroke="#A2A3AB"
                      strokeWidth={1}
                      strokeDasharray="4,4"
                    />
                    <line
                      x1={180}
                      y1={180}
                      x2={300}
                      y2={90}
                      stroke="#A2A3AB"
                      strokeWidth={1}
                      strokeDasharray="4,4"
                    />
                    <line
                      x1={180}
                      y1={180}
                      x2={340}
                      y2={206}
                      stroke="#A2A3AB"
                      strokeWidth={1}
                      strokeDasharray="4,4"
                    />
                    <line
                      x1={191}
                      y1={160}
                      x2={250}
                      y2={334}
                      stroke="#A2A3AB"
                      strokeWidth={1}
                      strokeDasharray="4,4"
                    />
                    <line
                      x1={180}
                      y1={180}
                      x2={120}
                      y2={300}
                      stroke="#A2A3AB"
                      strokeWidth={1}
                      strokeDasharray="4,4"
                    />
                    <line
                      x1={180}
                      y1={180}
                      x2={20}
                      y2={206}
                      stroke="#A2A3AB"
                      strokeWidth={1}
                      strokeDasharray="4,4"
                    />
                    <line
                      x1={150}
                      y1={160}
                      x2={40}
                      y2={82}
                      stroke="#A2A3AB"
                      strokeWidth={1}
                      strokeDasharray="4,4"
                    />
                  </svg>
                  <div className="image-main">
                    <div className="inner">
                      <a
                        href="https://themeforest.net/user/themesflat/portfolio"
                        target="_blank"
                      >
                        <Image
                          alt=""
                          src="/image/logo/logo-group-features.svg"
                          width={87}
                          height={87}
                        />
                      </a>
                    </div>
                  </div>
                  {avatarImages.map((img, index) => (
                    <div className={`img-item item-${index + 1}`} key={index}>
                      <div className="inner">
                        <a href="#">
                          <Image
                            src={img.src}
                            alt=""
                            className="lazyload"
                            width={img.width}
                            height={img.height}
                          />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
