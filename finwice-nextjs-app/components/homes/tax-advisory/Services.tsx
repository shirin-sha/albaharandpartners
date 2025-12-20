import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Services() {
  return (
    <section
      className="section-services h-7 bg-surface tf-spacing-31 section-one-page"
      id="services"
    >
      <div className="tf-container position-relative">
        <div className="row">
          <div className="col-12">
            <div className="section-services-inner">
              <div className="heading-section style-2">
                <div className="left">
                  <div className="text-anime-wave">
                    <a
                      href="#"
                      className="tag label text-btn-uppercase bg-white"
                    >
                      Our Services
                    </a>
                  </div>
                  <h3 className="text-anime-wave">
                    Custom Strategies for Your Goals
                  </h3>
                </div>
                <div className="text-anime-wave-2">
                  <Link
                    href="/our-services-1"
                    className="tf-btn style-1 bg-on-suface-container"
                  >
                    <span> View All Services </span>
                  </Link>
                </div>
              </div>
              <div className="flat-animate-tab style-row">
                <div className="wg-tab style-3">
                  <ul className="tab-product" role="tablist">
                    <li className="nav-tab-item" role="presentation">
                      <h5>
                        <a
                          href="#corporate-tax-planning"
                          data-bs-toggle="tab"
                          role="tab"
                        >
                          Corporate Tax Planning
                        </a>
                      </h5>
                    </li>
                    <li className="nav-tab-item" role="presentation">
                      <h5>
                        <a
                          href="#individual-tax-consulting"
                          className="active"
                          data-bs-toggle="tab"
                          role="tab"
                        >
                          Individual Tax Consulting
                        </a>
                      </h5>
                    </li>
                    <li className="nav-tab-item" role="presentation">
                      <h5>
                        <a
                          href="#tax-compliance-and-reporting"
                          data-bs-toggle="tab"
                          role="tab"
                        >
                          Tax Compliance and Reporting
                        </a>
                      </h5>
                    </li>
                    <li className="nav-tab-item" role="presentation">
                      <h5>
                        <a
                          href="#audit-representation"
                          data-bs-toggle="tab"
                          role="tab"
                        >
                          Audit Representation
                        </a>
                      </h5>
                    </li>
                    <li className="nav-tab-item" role="presentation">
                      <h5>
                        <a
                          href="#international-tax-solutions"
                          data-bs-toggle="tab"
                          role="tab"
                        >
                          International Tax Solutions
                        </a>
                      </h5>
                    </li>
                  </ul>
                </div>
                <div className="tab-content">
                  <div
                    className="tab-pane"
                    id="corporate-tax-planning"
                    role="tabpanel"
                  >
                    <div className="item-content">
                      <div className="image mb-20">
                        <Image
                          src="/image/section/img-services-h7.jpg"
                          alt=""
                          className="lazyload"
                          width={760}
                          height={427}
                        />
                      </div>
                      <div className="content">
                        <h4 className="mb-12">Corporate Tax Planning</h4>
                        <div className="desc body-2">
                          Get personalized guidance to optimize your income,
                          deductions, and tax credits, ensuring a seamless and
                          stress-free tax filing process. Benefit from expert
                          insights to maximize savings and avoid costly errors.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane active show"
                    id="individual-tax-consulting"
                    role="tabpanel"
                  >
                    <div className="item-content">
                      <div className="image mb-20">
                        <Image
                          src="/image/section/img-services-h7.jpg"
                          alt=""
                          className="lazyload"
                          width={760}
                          height={427}
                        />
                      </div>
                      <div className="content">
                        <h4 className="mb-12">Individual Tax Consulting</h4>
                        <div className="desc body-2">
                          Get personalized guidance to optimize your income,
                          deductions, and tax credits, ensuring a seamless and
                          stress-free tax filing process. Benefit from expert
                          insights to maximize savings and avoid costly errors.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane"
                    id="tax-compliance-and-reporting"
                    role="tabpanel"
                  >
                    <div className="item-content">
                      <div className="image mb-20">
                        <Image
                          src="/image/section/img-services-h7.jpg"
                          alt=""
                          className="lazyload"
                          width={760}
                          height={427}
                        />
                      </div>
                      <div className="content">
                        <h4 className="mb-12">Tax Compliance and Reporting</h4>
                        <div className="desc body-2">
                          Get personalized guidance to optimize your income,
                          deductions, and tax credits, ensuring a seamless and
                          stress-free tax filing process. Benefit from expert
                          insights to maximize savings and avoid costly errors.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane"
                    id="audit-representation"
                    role="tabpanel"
                  >
                    <div className="item-content">
                      <div className="image mb-20">
                        <Image
                          src="/image/section/img-services-h7.jpg"
                          alt=""
                          className="lazyload"
                          width={760}
                          height={427}
                        />
                      </div>
                      <div className="content">
                        <h4 className="mb-12">Audit Representation</h4>
                        <div className="desc body-2">
                          Get personalized guidance to optimize your income,
                          deductions, and tax credits, ensuring a seamless and
                          stress-free tax filing process. Benefit from expert
                          insights to maximize savings and avoid costly errors.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane"
                    id="international-tax-solutions"
                    role="tabpanel"
                  >
                    <div className="item-content">
                      <div className="image mb-20">
                        <Image
                          src="/image/section/img-services-h7.jpg"
                          alt=""
                          className="lazyload"
                          width={760}
                          height={427}
                        />
                      </div>
                      <div className="content">
                        <h4 className="mb-12">International Tax Solutions</h4>
                        <div className="desc body-2">
                          Get personalized guidance to optimize your income,
                          deductions, and tax credits, ensuring a seamless and
                          stress-free tax filing process. Benefit from expert
                          insights to maximize savings and avoid costly errors.
                        </div>
                      </div>
                    </div>
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
