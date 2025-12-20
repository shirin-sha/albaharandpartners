import Link from "next/link";
import React from "react";

export default function Process() {
  return (
    <section
      className="section-process h-1 tf-spacing-2 hover-active-step section-one-page"
      id="process"
    >
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section style-2 mb-40">
              <div className="left">
                <div className="text-anime-wave">
                  <a href="#" className="tag label text-btn-uppercase">
                    steps to success
                  </a>
                </div>
                <h3 className="title-section text-anime-wave">
                  Pathway to Success
                </h3>
              </div>
              <div className="text-anime-wave-2">
                <Link
                  href={`/contact-us`}
                  className="tf-btn style-1 bg-on-suface-container"
                >
                  <span> Schedule A Consultation </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row rg-30">
          <div className="col-lg-3 col-sm-6">
            <div className="process-item step-hover">
              <div className="process-top wow fadeInUp">
                <div className="icon wow fadeInUp">
                  <svg
                    width={48}
                    height={48}
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_9360_10043)">
                      <path
                        d="M6.30025 27.2812C5.51922 23.0656 6.26859 18.7096 8.41349 14.9972C10.5584 11.2849 13.9579 8.46011 18.0002 7.03125V20.5312L6.30025 27.2812Z"
                        stroke="#24283E"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M24 24.0787V6C27.1537 6.00047 30.2519 6.82949 32.9843 8.40405C35.7168 9.9786 37.9876 12.2434 39.5694 14.9717C41.1512 17.7 41.9884 20.796 41.9972 23.9496C42.0061 27.1033 41.1862 30.2039 39.6197 32.941C38.0532 35.6781 35.7951 37.9556 33.0715 39.5454C30.3479 41.1352 27.2544 41.9816 24.1008 41.9997C20.9472 42.0178 17.8442 41.2071 15.1025 39.6487C12.3608 38.0903 10.0766 35.8389 8.47876 33.12L24 24.0787Z"
                        stroke="#24283E"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_9360_10043">
                        <rect width={48} height={48} fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <span className="label text-btn-uppercase wow fadeInUp">
                  Step 1
                </span>
              </div>
              <div className="process-content">
                <h5 className="wow fadeInUp">
                  <a href="#" className="name-process">
                    Assessment
                  </a>
                </h5>
                <div className="desc wow fadeInUp">
                  Gather client’s financial information, goals, and needs.
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="process-item step-hover">
              <div className="process-top wow fadeInUp" data-wow-delay=".1s">
                <div className="icon wow fadeInUp" data-wow-delay=".1s">
                  <svg
                    width={48}
                    height={48}
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_9360_10053)">
                      <path
                        d="M24 43.5V37.5"
                        stroke="#24283E"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M24 40.5C33.1127 40.5 40.5 33.1127 40.5 24C40.5 14.8873 33.1127 7.5 24 7.5C14.8873 7.5 7.5 14.8873 7.5 24C7.5 33.1127 14.8873 40.5 24 40.5Z"
                        stroke="#24283E"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M24 4.5V10.5"
                        stroke="#24283E"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4.5 24H10.5"
                        stroke="#24283E"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M43.5 24H37.5"
                        stroke="#24283E"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M24 30C27.3137 30 30 27.3137 30 24C30 20.6863 27.3137 18 24 18C20.6863 18 18 20.6863 18 24C18 27.3137 20.6863 30 24 30Z"
                        stroke="#24283E"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_9360_10053">
                        <rect width={48} height={48} fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <span
                  className="label text-btn-uppercase wow fadeInUp"
                  data-wow-delay=".1s"
                >
                  Step 2
                </span>
              </div>
              <div className="process-content">
                <h5 className="wow fadeInUp" data-wow-delay=".1s">
                  <a href="#" className="name-process">
                    Goal Setting
                  </a>
                </h5>
                <div className="desc wow fadeInUp" data-wow-delay=".1s">
                  Define short-term and long-term financial objectives.
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="process-item step-hover">
              <div className="process-top wow fadeInUp" data-wow-delay=".2s">
                <div className="icon wow fadeInUp" data-wow-delay=".2s">
                  <svg
                    width={48}
                    height={48}
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_9360_10067)">
                      <path
                        d="M42 39H6V9"
                        stroke="#24283E"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M37.5 13.5L24 27L18 21L6 33"
                        stroke="#24283E"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M37.5 21V13.5H30"
                        stroke="#24283E"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_9360_10067">
                        <rect width={48} height={48} fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <span
                  className="label text-btn-uppercase wow fadeInUp"
                  data-wow-delay=".2s"
                >
                  Step 3
                </span>
              </div>
              <div className="process-content">
                <h5 className="wow fadeInUp" data-wow-delay=".2s">
                  <a href="#" className="name-process">
                    Plan Development
                  </a>
                </h5>
                <div className="desc wow fadeInUp" data-wow-delay=".2s">
                  Create a customized financial strategy based on analysis.
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="process-item step-hover">
              <div className="process-top wow fadeInUp" data-wow-delay=".3s">
                <div className="icon wow fadeInUp" data-wow-delay=".3s">
                  <svg
                    width={48}
                    height={48}
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_9360_10078)">
                      <path
                        d="M40.5 21V10.5C40.5 10.1022 40.342 9.72064 40.0607 9.43934C39.7794 9.15804 39.3978 9 39 9H9C8.60218 9 8.22064 9.15804 7.93934 9.43934C7.65804 9.72064 7.5 10.1022 7.5 10.5V21C7.5 39 24 43.5 24 43.5C24 43.5 40.5 39 40.5 21Z"
                        stroke="#24283E"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.5 25.5L21 30L31.5 19.5"
                        stroke="#24283E"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_9360_10078">
                        <rect width={48} height={48} fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <span
                  className="label text-btn-uppercase wow fadeInUp"
                  data-wow-delay=".3s"
                >
                  Step 4
                </span>
              </div>
              <div className="process-content">
                <h5 className="wow fadeInUp" data-wow-delay=".3s">
                  <a href="#" className="name-process">
                    Ongoing Review
                  </a>
                </h5>
                <div className="desc wow fadeInUp" data-wow-delay=".3s">
                  Implement the plan and regularly review progress for
                  adjustments.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
