import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Awards() {
  return (
    <section className="section-awards h-4 tf-spacing-3">
      <div className="tf-container position-relative">
        <div className="row">
          <div className="col-12">
            <div className="section-awards-list bg-surface">
              <h4 className="title-section wow fadeInUp">
                Recognized Excellence And <br />
                Certified Expertise
              </h4>
              <div className="awards-list">
                <div className="image img-1 wow fadeInUp">
                  <Image
                    src="/image/section/awards-img-1.png"
                    alt=""
                    className="lazyload"
                    width={140}
                    height={150}
                  />
                </div>
                <div className="image img-1 wow fadeInUp" data-wow-delay=".1s">
                  <Image
                    src="/image/section/awards-img-2.png"
                    alt=""
                    className="lazyload"
                    width={140}
                    height={150}
                  />
                </div>
                <div className="image img-1 wow fadeInUp" data-wow-delay=".2s">
                  <Image
                    src="/image/section/awards-img-3.png"
                    alt=""
                    className="lazyload"
                    width={140}
                    height={150}
                  />
                </div>
                <div className="image img-2 wow fadeInUp" data-wow-delay=".3s">
                  <Image
                    src="/image/section/awards-img-4.png"
                    alt=""
                    className="lazyload"
                    width={176}
                    height={150}
                  />
                </div>
                <div className="image img-2 wow fadeInUp" data-wow-delay=".4s">
                  <Image
                    src="/image/section/awards-img-5.png"
                    alt=""
                    className="lazyload"
                    width={176}
                    height={150}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
