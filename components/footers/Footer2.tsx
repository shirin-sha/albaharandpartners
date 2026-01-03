"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect } from "react";
import NewsLetterForm from "../common/NewsLetterForm";

export default function Footer2({
  parentClass = "footer style-2",
  light = false,
}) {
  useEffect(() => {
    const headings = document.querySelectorAll(".title-mobile");

    const toggleOpen = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const parent = target.closest(".footer-col-block") as HTMLElement | null;
      if (!parent) return;
      const content = parent.querySelector(
        ".tf-collapse-content"
      ) as HTMLElement | null;
      if (!content) return;

      if (parent.classList.contains("open")) {
        parent.classList.remove("open");
        content.style.height = "0px";
      } else {
        parent.classList.add("open");
        content.style.height = content.scrollHeight + 10 + "px";
      }
    };

    headings.forEach((heading) => {
      heading.addEventListener("click", toggleOpen);
    });

    // Clean up event listeners when the component unmounts
    return () => {
      headings.forEach((heading) => {
        heading.removeEventListener("click", toggleOpen);
      });
    };
  }, []); // Empty dependency array means this will run only once on mount

  return (
    <footer className={parentClass} id="footer">
      <div className="tf-container position-relative z-5">
        <div className="row">
          <div className="col-12">
            <div className="footer-top">
              <div className="footer-left">
                <div className="logo-footer">
                  <Link href={`/`} className="logo">
                    <Image
                      alt=""
                      src={
                        light
                          ? "/image/logo/logo-2.png"
                          : "/image/logo/logo-footer.svg"
                      }
                      width={169}
                      height={41}
                    />
                  </Link>
                </div>
                <div className="text caption-1">
                  Welcome to Al Bahar & Partners (BPC). We deliver partner-led technology solutions across
                  <br />
                  banking, identity, infrastructure, and cybersecurity, supported by reliable implementation
                  <br />
                  and long-term support.
                </div>
                <div className="footer-social">
                  <div className="title-footer">Follow Us:</div>
                  <ul
                    className={`tf-social style-border radius-50 g-8 style-2 ${
                      light ? "color-on-suface-container" : ""
                    }`}
                  >
                    <li className="item">
                      <a href="#">
                        <div className="icon">
                          <i className="icon-messenger" />
                        </div>
                      </a>
                    </li>
                    <li className="item">
                      <a href="#">
                        <div className="icon">
                          <i className="icon-x" />
                        </div>
                      </a>
                    </li>
                    <li className="item">
                      <a href="#">
                        <div className="icon">
                          <i className="icon-ig1" />
                        </div>
                      </a>
                    </li>
                    <li className="item">
                      <a href="#">
                        <div className="icon">
                          <i className="icon-skype" />
                        </div>
                      </a>
                    </li>
                    <li className="item">
                      <a href="#">
                        <div className="icon">
                          <i className="icon-telegram" />
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="footer-right">
                <div className="footer-subscribe">
                  <h4 className={`${light ? "" : "color-white"}`}>
                    Subscribe for Updates & Insights
                  </h4>
                  <div className="footer-subscribe-content">
                    <NewsLetterForm placeholder="Enter your email address" />
                    <div className="text caption-2">
                      Get occasional updates on solutions, case studies, and company news. No spam.
                    </div>
                  </div>
                </div>
                <div className="footer-center">
                  <div className="footer-content our-services footer-col-block quick-links">
                    <div className="title-mobile label text-btn-uppercase">
                      Quick Links
                      <i className="icon-arrow-51" />
                    </div>
                    <div className="tf-collapse-content">
                      <div className="flex g-12">
                        <ul>
                          <li className="support-item-footer caption-1">
                            <Link href={`/about-us`}>About Us</Link>
                          </li>
                          <li className="support-item-footer caption-1">
                            <Link href={`/solutions`}>Solutions</Link>
                          </li>
                          <li className="support-item-footer caption-1">
                            <Link href={`/case-studies-1`}>Case Studies</Link>
                          </li>
                        </ul>
                        <ul>
                          <li className="support-item-footer caption-1">
                            <Link href={`/our-partners`}>Our Partners</Link>
                          </li>
                          <li className="support-item-footer caption-1">
                            <Link href={`/blog-left-sidebar`}>News & Insights</Link>
                          </li>
                          <li className="support-item-footer caption-1">
                            <Link href={`/careers`}>Careers</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="footer-content footer-col-block">
                    <div className="title-mobile label text-btn-uppercase mb-12">
                      Service & Assistance
                      <i className="icon-arrow-51" />
                    </div>
                    <div className="tf-collapse-content">
                      <ul>
                        <li className="support-item-footer caption-1">
                          <span>Service: +965 XXXXXX</span>
                        </li>
                        <li className="support-item-footer caption-1">
                          <span>Complaints: +965 XXXXX</span>
                        </li>
                        <li className="support-item-footer caption-1">
                          <span>Help Mail: support@abahargroup.com</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="footer-content footer-contact footer-col-block contact-footer">
                    <div className="title-mobile label text-btn-uppercase">
                      Contact Us
                      <i className="icon-arrow-51" />
                    </div>
                    <div className="tf-collapse-content">
                      <ul>
                        <li className="support-item-footer caption-1">
                          <span>
                            Kuwait City, Kuwait
                          </span>
                        </li>
                        <li className="support-item-footer caption-1">
                          <span>Phone: +965 XXXXXXXX</span>
                        </li>
                        <li className="support-item-footer caption-1">
                          <span>Email: info@albahargroup.com</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <div className="footer-bottom-inner">
                <div className="left">
                  <div className="text caption-1">
                    © 2025 Al Bahar & Partners. All Rights Reserved.
                  </div>
                </div>
                <div className="right">
                  <ul>
                    <li>
                      <Link href={`/contact-us`} className="caption-1">
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <a href="#" className="caption-1">
                        Support
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="image img-item">
        <Image
          src="/image/section/bg-footer-style-2.png"
          alt=""
          className="lazyload"
          width={846}
          height={423}
        />
      </div>
    </footer>
  );
}
