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
                        width={280}
                        height={55}
                        style={{ width: '280px', height: '55px', objectFit: 'contain' }}
                      />
                    </a>
                  </div>
                  <div className="marquee-child-item" style={{ marginRight: '60px' }}>
                    <a href="#" className="brand-item">
                      <Image
                        alt=""
                        src="/image/brand/pure.png"
                        width={280}
                        height={55}
                        style={{ width: '280px', height: '55px', objectFit: 'contain' }}
                      />
                    </a>
                  </div>
                  <div className="marquee-child-item" style={{ marginRight: '60px' }}>
                    <a href="#" className="brand-item">
                      <Image
                        alt=""
                        src="/image/brand/team.png"
                        width={280}
                        height={55}
                        style={{ width: '280px', height: '55px', objectFit: 'contain' }}
                      />
                    </a>
                  </div>
                  <div className="marquee-child-item" style={{ marginRight: '60px' }}>
                    <a href="#" className="brand-item">
                      <Image
                        alt=""
                        src="/image/brand/hita.png"
                        width={280}
                        height={55}
                        style={{ width: '280px', height: '55px', objectFit: 'contain' }}
                      />
                    </a>
                  </div>
                  <div className="marquee-child-item" style={{ marginRight: '60px' }}>
                    <a href="#" className="brand-item">
                      <Image
                        alt=""
                        src="/image/brand/axo.png"
                        width={280}
                        height={55}
                        style={{ width: '280px', height: '55px', objectFit: 'contain' }}
                      />
                    </a>
                  </div>
                  {/* Duplicate set for seamless loop */}
                  <div className="marquee-child-item" style={{ marginRight: '60px' }}>
                    <a href="#" className="brand-item">
                      <Image
                        alt=""
                        src="/image/brand/alhua.png"
                        width={280}
                        height={55}
                        style={{ width: '280px', height: '55px', objectFit: 'contain' }}
                      />
                    </a>
                  </div>
                  <div className="marquee-child-item" style={{ marginRight: '60px' }}>
                    <a href="#" className="brand-item">
                      <Image
                        alt=""
                        src="/image/brand/crowd.png"
                        width={280}
                        height={55}
                        style={{ width: '280px', height: '55px', objectFit: 'contain' }}
                      />
                    </a>
                  </div>
                  <div className="marquee-child-item" style={{ marginRight: '60px' }}>
                    <a href="#" className="brand-item">
                      <Image
                        alt=""
                        src="/image/brand/entrust.png"
                        width={280}
                        height={55}
                        style={{ width: '280px', height: '55px', objectFit: 'contain' }}
                      />
                    </a>
                  </div>
                  <div className="marquee-child-item" style={{ marginRight: '60px' }}>
                    <a href="#" className="brand-item">
                      <Image
                        alt=""
                        src="/image/brand/hik.png"
                        width={280}
                        height={55}
                        style={{ width: '280px', height: '55px', objectFit: 'contain' }}
                      />
                    </a>
                  </div>
                  <div className="marquee-child-item" style={{ marginRight: '60px' }}>
                    <a href="#" className="brand-item">
                      <Image
                        alt=""
                        src="/image/brand/logi.png"
                        width={280}
                        height={55}
                        style={{ width: '280px', height: '55px', objectFit: 'contain' }}
                      />
                    </a>
                  </div>
                  <div className="marquee-child-item" style={{ marginRight: '60px' }}>
                    <a href="#" className="brand-item">
                      <Image
                        alt=""
                        src="/image/brand/nexus.png"
                        width={280}
                        height={55}
                        style={{ width: '280px', height: '55px', objectFit: 'contain' }}
                      />
                    </a>
                  </div>
                  <div className="marquee-child-item" style={{ marginRight: '60px' }}>
                    <a href="#" className="brand-item">
                      <Image
                        alt=""
                        src="/image/brand/sedco.png"
                        width={280}
                        height={55}
                        style={{ width: '280px', height: '55px', objectFit: 'contain' }}
                      />
                    </a>
                  </div>
                  <div className="marquee-child-item" style={{ marginRight: '60px' }}>
                    <a href="#" className="brand-item">
                      <Image
                        alt=""
                        src="/image/brand/thales.png"
                        width={280}
                        height={55}
                        style={{ width: '280px', height: '55px', objectFit: 'contain' }}
                      />
                    </a>
                  </div>
                  <div className="marquee-child-item" style={{ marginRight: '60px' }}>
                    <a href="#" className="brand-item">
                      <Image
                        alt=""
                        src="/image/brand/tri.png"
                        width={280}
                        height={55}
                        style={{ width: '280px', height: '55px', objectFit: 'contain' }}
                      />
                    </a>
                  </div>
                  <div className="marquee-child-item" style={{ marginRight: '60px' }}>
                    <a href="#" className="brand-item">
                      <Image
                        alt=""
                        src="/image/brand/view.png"
                        width={280}
                        height={55}
                        style={{ width: '280px', height: '55px', objectFit: 'contain' }}
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
