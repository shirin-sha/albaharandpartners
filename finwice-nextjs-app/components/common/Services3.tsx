import Link from "next/link";
import React from "react";

export default function Services() {
  return (
    <section className="section-industry h-5 tf-spacing-22 bg-on-suface-container">
      <div className="tf-container position-relative">
        <div className="row">
          <div className="col-12 text-center">
            <div className="heading-section text-center style-color-white">
              <div className="text-anime-wave-1">
                <a href="#" className="tag label text-btn-uppercase bg-white">
                  industries we help
                </a>
              </div>
              <h3 className="text-anime-wave-1 mb-12">
                Risk &amp; Compliance services <br />
                tailored to each industry.
              </h3>
              <div className="sub-title body-2 text-anime-wave-1">
                Tailored solutions to drive your business growth and success.
              </div>
            </div>
            <>
              <div className="industry-list">
                <h6 className="industry-item style-color-white">
                  <Link href={`/services-details-1`}>
                    <i className="icon-Bank" />
                    Financial Services
                  </Link>
                </h6>
                <h6 className="industry-item style-color-white">
                  <Link href={`/services-details-1`}>
                    <i className="icon-FirstAidKit" />
                    Healthcare
                  </Link>
                </h6>
                <h6 className="industry-item style-color-white">
                  <Link href={`/services-details-1`}>
                    <svg
                      width={32}
                      height={32}
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_9360_11765)">
                        <path
                          d="M6 24L26 24C27.1046 24 28 23.1046 28 22L28 8C28 6.89543 27.1046 6 26 6L6 6C4.89543 6 4 6.89543 4 8L4 22C4 23.1046 4.89543 24 6 24Z"
                          stroke="#ffffff"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M20 28H12"
                          stroke="#ffffff"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath>
                          <rect width={32} height={32} fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    Technology
                  </Link>
                </h6>
                <h6 className="industry-item style-color-white">
                  <Link href={`/services-details-1`}>
                    <i className="icon-LightbulbFilament" />
                    Energy
                  </Link>
                </h6>
                <h6 className="industry-item style-color-white">
                  <Link href={`/services-details-1`}>
                    <i className="icon-AirplaneTakeoff" />
                    Logistics
                  </Link>
                </h6>
                <h6 className="industry-item style-color-white">
                  <Link href={`/services-details-1`}>
                    <i className="icon-Wrench" />
                    Manufacturing
                  </Link>
                </h6>
                <h6 className="industry-item style-color-white">
                  <Link href={`/services-details-1`}>
                    <i className="icon-Warehouse" />
                    Real Estate
                  </Link>
                </h6>
                <h6 className="industry-item style-color-white">
                  <Link href={`/services-details-1`}>
                    <i className="icon-Basket" />
                    Retail
                  </Link>
                </h6>
                <h6 className="industry-item style-color-white">
                  <Link href={`/services-details-1`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={33}
                      height={32}
                      viewBox="0 0 33 32"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_9360_14522)">
                        <path
                          d="M18.8431 5.65691L6.15582 18.3442C3.94692 20.5531 3.94692 24.1344 6.15582 26.3433L6.15671 26.3442C8.36561 28.5531 11.9469 28.5531 14.1559 26.3442L26.8431 13.6569C29.052 11.448 29.052 7.8667 26.8431 5.6578L26.8422 5.65691C24.6333 3.44801 21.052 3.44801 18.8431 5.65691Z"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.5 12L20.5 20"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M20.5 14L23.5 11"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath>
                          <rect
                            width={32}
                            height={32}
                            fill="white"
                            transform="translate(0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    Pharmaceuticals
                  </Link>
                </h6>
              </div>
              <Link
                href={`/support`}
                className="default-btn style-color-white"
              >
                {" "}
                <span>Discovery More All Industry</span>
              </Link>
            </>
          </div>
        </div>
      </div>
    </section>
  );
}
