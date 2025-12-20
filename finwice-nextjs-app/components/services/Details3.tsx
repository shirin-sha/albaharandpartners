import Link from "next/link";
import Image from "next/image";
import React from "react";
import Steps from "./Steps";
import Solutions from "./Solutions";
import Faqs from "./Faqs";
import Contact from "./Contact";
import Performance from "./Performance";

export default function Details3() {
  return (
    <div className="tf-container position-relative tf-spacing-2">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="overflow-auto">
            <ul className="menu-sidebar-tab style-2 mb-60" role="tablist">
              <li className="nav-tab-item" role="presentation">
                <h6>
                  <a
                    href="#tab-1"
                    data-bs-toggle="tab"
                    role="tab"
                    className="active"
                  >
                    Retirement Planning
                  </a>
                </h6>
              </li>
              <li className="nav-tab-item" role="presentation">
                <h6>
                  <a href="#tab-2" data-bs-toggle="tab" role="tab">
                    Investment Advisory
                  </a>
                </h6>
              </li>
              <li className="nav-tab-item" role="presentation">
                <h6>
                  <a href="#tab-3" data-bs-toggle="tab" role="tab">
                    Estate Planning
                  </a>
                </h6>
              </li>
              <li className="nav-tab-item" role="presentation">
                <h6>
                  <a href="#tab-4" data-bs-toggle="tab" role="tab">
                    Tax Optimization
                  </a>
                </h6>
              </li>
            </ul>
          </div>
          <div className="tab-content">
            <div className="tab-pane active show" id="tab-1" role="tabpanel">
              <div className="service-details-content">
                <div className="image-details image mb-60">
                  <Image
                    src="/image/section/img-details-service-1.jpg"
                    alt=""
                    className="lazyload"
                    width={850}
                    height={512}
                  />
                </div>
                <div className="detalis-content mb-60" id="menu-sidebar-1">
                  <Solutions />
                </div>
                <div className="detalis-content mb-60" id="menu-sidebar-2">
                  <Performance />
                </div>
                <div className="detalis-content mb-60" id="menu-sidebar-3">
                  <Steps />
                </div>
                <div className="detalis-content" id="menu-sidebar-4">
                  <h4 className="title-content mb-20">FAQs</h4>
                  {/* according-item-style-3 */}
                  <div className="wg-according" id="According1">
                    <Faqs />
                  </div>
                  {/* according-item-style-3 */}
                </div>
              </div>
            </div>
            <div className="tab-pane" id="tab-2" role="tabpanel">
              <div className="service-details-content">
                <div className="image-details image mb-60">
                  <Image
                    src="/image/section/img-details-service-2.jpg"
                    alt=""
                    className="lazyload"
                    width={850}
                    height={512}
                  />
                </div>
                <div className="detalis-content mb-60" id="menu-sidebar-1">
                  <Solutions />
                </div>
                <div className="detalis-content mb-60" id="menu-sidebar-2">
                  <Performance />
                </div>
                <div className="detalis-content mb-60" id="menu-sidebar-3">
                  <Steps />
                </div>
                <div className="detalis-content" id="menu-sidebar-4">
                  <h4 className="title-content mb-20">FAQs</h4>
                  {/* according-item-style-3 */}
                  <div className="wg-according" id="According1">
                    <Faqs />
                  </div>
                  {/* according-item-style-3 */}
                </div>
              </div>
            </div>
            <div className="tab-pane" id="tab-3" role="tabpanel">
              <div className="service-details-content">
                <div className="image-details image mb-60">
                  <Image
                    src="/image/section/img-details-service-3.jpg"
                    alt=""
                    className="lazyload"
                    width={1070}
                    height={602}
                  />
                </div>
                <div className="detalis-content mb-60" id="menu-sidebar-1">
                  <Solutions />
                </div>
                <div className="detalis-content mb-60" id="menu-sidebar-2">
                  <Performance />
                </div>
                <div className="detalis-content mb-60" id="menu-sidebar-3">
                  <Steps />
                </div>
                <div className="detalis-content" id="menu-sidebar-4">
                  <h4 className="title-content mb-20">FAQs</h4>
                  {/* according-item-style-3 */}
                  <div className="wg-according" id="According1">
                    <Faqs />
                  </div>
                  {/* according-item-style-3 */}
                </div>
              </div>
            </div>
            <div className="tab-pane" id="tab-4" role="tabpanel">
              <div className="service-details-content">
                <div className="image-details image mb-60">
                  <Image
                    src="/image/section/img-details-service-4.jpg"
                    alt=""
                    className="lazyload"
                    width={1275}
                    height={768}
                  />
                </div>
                <div className="detalis-content mb-60" id="menu-sidebar-1">
                  <Solutions />
                </div>
                <div className="detalis-content mb-60" id="menu-sidebar-2">
                  <Performance />
                </div>
                <div className="detalis-content mb-60" id="menu-sidebar-3">
                  <Steps />
                </div>
                <div className="detalis-content" id="menu-sidebar-4">
                  <h4 className="title-content mb-20">FAQs</h4>
                  {/* according-item-style-3 */}
                  <div className="wg-according" id="According1">
                    <Faqs />
                  </div>
                  {/* according-item-style-3 */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
