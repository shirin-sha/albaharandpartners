"use client";

import ModalVideo from "@/components/common/ModalVideo";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const textRotateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = textRotateRef.current;

    if (container && container.querySelector(".text")) {
      const text = "It Consuling * It Consuling * It Consuling *";
      const chars = text.split("");
      const degree = 360 / chars.length;

      const textElement = container.querySelector(".text");
      if (!textElement) return;
      textElement.innerHTML = ""; // Clear previous content

      chars.forEach((char, i) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.transform = `rotate(${i * degree}deg)`;
        textElement.appendChild(span);
      });
    }
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="page-title-home style-3 bg-surface scroll-tranform-section">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <div className="heading-section style-2">
                <div className="left">
                  <div className="text-anime-wave">
                    <a className="tag text-btn-uppercase label bg-white mb-28">
                      WE ARE FinWice
                    </a>
                  </div>
                  <h3 className="title-heading text-anime-wave">
                    At FinWice, we offer expert
                    <br />
                    financial planning to help you <br />
                    reach your goals.
                  </h3>
                </div>
                <div className="right">
                  <div className="sub-title mb-28 text-anime-wave-2">
                    Our team of experts delivers tailored insights and
                    solutions, guiding
                    <br />
                    you through complex challenges. Partner with us for
                    impactful results <br />
                    and reliable support on your path to success.
                  </div>
                  <div className="bottom g-40 text-anime-wave-2">
                    <Link
                      href={`/contact-us`}
                      className="tf-btn bg-on-suface-container style-1"
                    >
                      <span>Schedule A Consultation</span>
                    </Link>
                    <div className="tf-phone">
                      <div className="content">
                        <p>Or Call Us:</p>
                        <h5>
                          <a href="#" className="color-primary">
                            1-555-678-8888
                          </a>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="image-title-home">
          <div className="wg-curve-text">
            <a
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(true);
              }}
              className="icon wg-curve-text-video"
            >
              <i className="icon-Play" />
            </a>
            <div className="text-rotate" ref={textRotateRef}>
              <div className="circle">
                <div className="text" id="circularText">
                  It Consuling * It Consuling * It Consuling *
                </div>
              </div>
            </div>
          </div>
          <div className="image">
            <div className="img-paralax">
              <Image
                src="/image/page-title/page-title-home-8.jpg"
                alt=""
                className="lazyload"
                width={1920}
                height={1000}
              />
            </div>
          </div>
        </div>
      </div>{" "}
      <ModalVideo
        videoId={"XHOmBV4js_E"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />{" "}
    </>
  );
}
