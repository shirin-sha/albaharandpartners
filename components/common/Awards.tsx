import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Awards({
  parentClass = "section-awards h-1 tf-spacing-3 section-one-page",
}) {
  return (
    <section className={parentClass} id="awards">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center">
              <div className="text-anime-wave-1">
                <a href="#" className="tag label text-btn-uppercase">
                  Our Award &amp; Certified
                </a>
              </div>
              <h3 className="title-section mb-0 text-anime-wave-1">
                Recognized Excellence and <br />
                Certified Expertise
              </h3>
            </div>
            <div className="awards-list">
              <div className="image-awards wow fadeInUp">
                <Image
                  src="/image/section/awards-img-1.png"
                  alt=""
                  className="lazyload"
                  width={140}
                  height={150}
                />
              </div>
              <div className="image-awards wow fadeInUp" data-wow-delay=".1s">
                <Image
                  src="/image/section/awards-img-2.png"
                  alt=""
                  className="lazyload"
                  width={140}
                  height={150}
                />
              </div>
              <div className="image-awards wow fadeInUp" data-wow-delay=".2s">
                <Image
                  src="/image/section/awards-img-3.png"
                  alt=""
                  className="lazyload"
                  width={140}
                  height={150}
                />
              </div>
              <div className="image-awards wow fadeInUp" data-wow-delay=".3s">
                <Image
                  src="/image/section/awards-img-4.png"
                  alt=""
                  className="lazyload"
                  width={176}
                  height={150}
                />
              </div>
              <div className="image-awards wow fadeInUp" data-wow-delay=".4s">
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
    </section>
  );
}
