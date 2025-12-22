import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Brands() {
  return (
    <section className="section-brand h-7 section-one-page" id="cta">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="text-heading">
              <h5>
                <span> Trusted by partners and supported by leading technologies worldwide.</span>
              </h5>
            </div>
            <div className="tf-marquee tf-spacing-25">
              <div className="marquee-wrapper">
                <div className="initial-child-container">
                  {/* Original set */}
                  <div className="marquee-child-item" style={{ marginRight: '60px' }}>
                    <a href="#" className="brand-item">
                      <Image
                        alt=""
                        src="/image/brand/fort.png"
                        width={226}
                        height={44}
                      />
                    </a>
                  </div>
                  <div className="marquee-child-item" style={{ marginRight: '60px' }}>
                    <a href="#" className="brand-item">
                      <Image
                        alt=""
                        src="/image/brand/pure.png"
                        width={226}
                        height={44}
                      />
                    </a>
                  </div>
                  <div className="marquee-child-item" style={{ marginRight: '60px' }}>
                    <a href="#" className="brand-item">
                      <Image
                        alt=""
                        src="/image/brand/team.png"
                        width={226}
                        height={44}
                      />
                    </a>
                  </div>
                  <div className="marquee-child-item" style={{ marginRight: '60px' }}>
                    <a href="#" className="brand-item">
                      <Image
                        alt=""
                        src="/image/brand/hita.png"
                        width={226}
                        height={44}
                      />
                    </a>
                  </div>
                  <div className="marquee-child-item" style={{ marginRight: '60px' }}>
                    <a href="#" className="brand-item">
                      <Image
                        alt=""
                        src="/image/brand/axo.png"
                        width={226}
                        height={44}
                      />
                    </a>
                  </div>
                  {/* Duplicate set for seamless loop */}
                  <div className="marquee-child-item" style={{ marginRight: '60px' }}>
                    <a href="#" className="brand-item">
                      <Image
                        alt=""
                        src="/image/brand/fort.png"
                        width={226}
                        height={44}
                      />
                    </a>
                  </div>
                  <div className="marquee-child-item" style={{ marginRight: '60px' }}>
                    <a href="#" className="brand-item">
                      <Image
                        alt=""
                        src="/image/brand/pure.png"
                        width={226}
                        height={44}
                      />
                    </a>
                  </div>
                  <div className="marquee-child-item" style={{ marginRight: '60px' }}>
                    <a href="#" className="brand-item">
                      <Image
                        alt=""
                        src="/image/brand/team.png"
                        width={226}
                        height={44}
                      />
                    </a>
                  </div>
                  <div className="marquee-child-item" style={{ marginRight: '60px' }}>
                    <a href="#" className="brand-item">
                      <Image
                        alt=""
                        src="/image/brand/hita.png"
                        width={226}
                        height={44}
                      />
                    </a>
                  </div>
                  <div className="marquee-child-item" style={{ marginRight: '60px' }}>
                    <a href="#" className="brand-item">
                      <Image
                        alt=""
                        src="/image/brand/axo.png"
                        width={226}
                        height={44}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
