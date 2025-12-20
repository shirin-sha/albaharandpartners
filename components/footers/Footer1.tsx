"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect } from "react";
import NewsLetterForm from "../common/NewsLetterForm";

export default function Footer1({ parentClass = "footer" }) {
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
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="footer-top">
              <div className="footer-left">
                <div className="logo-footer">
                  <Link href={`/`} className="logo">
                    <Image
                      alt=""
                      src="/image/logo/logo-footer.svg"
                      width={169}
                      height={41}
                    />
                  </Link>
                </div>
                <div className="text caption-1">
                  Welcome to your trusted financial partner! Explore
                  <br />
                  personalized strategies and expert guidance to secure
                  <br />
                  your financial future and achieve success.
                </div>
                <div className="contact-footer">
                  <div className="address contact-top contact-footer-content">
                    <p className="caption-2">Our address</p>
                    <a href="#">101 E 129th St, East Chicago, IN 46312, US</a>
                  </div>
                  <div className="contact-bottom">
                    <div className="contact-footer-content">
                      <p className="caption-2">Support 24/7</p>
                      <a href="#">1-555-678-8888</a>
                    </div>
                    <div className="contact-footer-content">
                      <p className="caption-2">Email Address</p>
                      <a href="#">example@gmail.com</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="footer-center">
                <div className="footer-content our-services footer-col-block">
                  <div className="title-mobile label text-btn-uppercase">
                    Categories
                    <i className="icon-arrow-51" />
                  </div>
                  <div className="tf-collapse-content">
                    <ul>
                      <li className="support-item-footer caption-1">
                        <Link href={`/strategy-consulting`}>
                          Strategy Consulting
                        </Link>
                      </li>
                      <li className="support-item-footer caption-1">
                        <Link href={`/`}>Financial Advisory</Link>
                      </li>
                      <li className="support-item-footer caption-1">
                        <Link href={`/services-details-1`}>Operational </Link>
                      </li>
                      <li className="support-item-footer caption-1">
                        <Link href={`/services-details-2`}>Improvement</Link>
                      </li>
                      <li className="support-item-footer caption-1">
                        <Link href={`/marketing-consulting`}>
                          Marketing Strategy
                        </Link>
                      </li>
                      <li className="support-item-footer caption-1">
                        <Link href={`/digital-transformation`}>
                          Digital Transformation
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="footer-content our-services footer-col-block">
                  <div className="title-mobile label text-btn-uppercase">
                    Quick Links
                    <i className="icon-arrow-51" />
                  </div>
                  <div className="tf-collapse-content">
                    <ul>
                      <li className="support-item-footer caption-1">
                        <Link href={`/about-us`}>About Us</Link>
                      </li>
                      <li className="support-item-footer caption-1">
                        <Link href={`/our-teams`}>Our Team</Link>
                      </li>
                      <li className="support-item-footer caption-1">
                        <a href="#">My Account</a>
                      </li>
                      <li className="support-item-footer caption-1">
                        <Link href={`/blog-left-sidebar`}>Blog</Link>
                      </li>
                      <li className="support-item-footer caption-1">
                        <Link href={`/brands`}>Case studies</Link>
                      </li>
                      <li className="support-item-footer caption-1">
                        <Link href={`/contact-us`}>Contact</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="footer-right">
                <div className="footer-subscribe">
                  <div className="label text-btn-uppercase">
                    Subscribe for all the top news!
                  </div>
                  <NewsLetterForm />
                  <div className="text caption-2">
                    Sign up for updates on our latest news and events. No spam,
                    just valuable insights!
                  </div>
                </div>
                <div className="footer-social">
                  <div className="title-footer">Follow Us:</div>
                  <ul className="tf-social style-border radius-50 g-8 style-2">
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
                    ©2025 FinWice. All Rights Reserved.
                  </div>
                </div>
                <div className="right">
                  <ul>
                    <li>
                      <a href="#" className="caption-1">
                        Terms Of Services
                      </a>
                    </li>
                    <li>
                      <a href="#" className="caption-1">
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a href="#" className="caption-1">
                        Cookie Policy
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
