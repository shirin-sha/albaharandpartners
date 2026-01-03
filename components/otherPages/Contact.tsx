"use client";
import React from "react";
import DropdownSelect from "../common/DropdownSelect";
import Link from "next/link";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section className="section-contact-home page-contact tf-spacing-2">
      <div className="tf-container position-relative">
        <div className="row rg-60">
          <div className="col-lg-7">
            <div className="section-contact-home-inner mr-30">
              <div className="section-content">
                <div className="heading-section mb-28">
                  <div className="wow fadeInUp">
                    <Link
                      href={`/contact-us`}
                      className="tag label text-btn-uppercase mb-12"
                    >
                      Contact US
                    </Link>
                  </div>
                  <h3 className="title-section mb-12 wow fadeInUp">
                    Get in Touch with Us
                  </h3>
                  <div className="sub-title body-2 color-on-suface-container wow fadeInUp">
                    Reach out today to discuss how we can support your business
                    goals. Our team is
                    <br />
                    ready to provide answers, offer solutions, and start your
                    journey toward success.
                  </div>
                </div>
                <div className="cols">
                  <div className="benefit-lists item">
                    <div className="benefit-items">
                      <div className="icon wow fadeInUp">
                        <i className="icon-checkbox" />
                      </div>
                      <div
                        className="caption-1 wow fadeInUp"
                        data-wow-delay=".1s"
                      >
                        24/7 Expert Support
                      </div>
                    </div>
                    <div className="benefit-items">
                      <div className="icon wow fadeInUp">
                        <i className="icon-checkbox" />
                      </div>
                      <div
                        className="caption-1 wow fadeInUp"
                        data-wow-delay=".1s"
                      >
                        Free Consultation Before You Commit
                      </div>
                    </div>
                  </div>
                  <div className="benefit-lists item">
                    <div className="benefit-items">
                      <div className="icon wow fadeInUp" data-wow-delay=".2s">
                        <i className="icon-checkbox" />
                      </div>
                      <div
                        className="caption-1 wow fadeInUp"
                        data-wow-delay=".3s"
                      >
                        Business-Focused Guidance
                      </div>
                    </div>
                    <div className="benefit-items">
                      <div className="icon wow fadeInUp" data-wow-delay=".2s">
                        <i className="icon-checkbox" />
                      </div>
                      <div
                        className="caption-1 wow fadeInUp"
                        data-wow-delay=".3s"
                      >
                        Trusted and Qualified Advisors
                      </div>
                    </div>
                  </div>
                </div>
                <div className="list-box-contact">
                  <div className="box-contact-item style-bg-white">
                    <div className="icon wow fadeInUp">
                      <i className="icon-MapPin" />
                    </div>
                    <div className="content wow fadeInUp" data-wow-delay=".1s">
                      <div className="caption-1 title-section-contact">
                        Address
                      </div>
                      <a href="#" className="caption-1 text">
                      P.O. Box 148 Safat 13002-Kuwait,<br /> Block 1,  Street 3, <br />
                          Shuwaikh Industrial 1
                       
                      </a>
                    </div>
                  </div>
                  <div className="box-contact-item style-bg-white">
                    <div className="icon wow fadeInUp" data-wow-delay=".2s">
                      <i className="icon-PhoneCall" />
                    </div>
                    <div className="content wow fadeInUp" data-wow-delay=".3s">
                      <div className="caption-1 title-section-contact">
                        Telephone
                      </div>
                      <a href="tel:+9651848848" className="caption-1 text">
                        +965 184 8848
                      </a>
                    </div>
                  </div>
                  <div className="box-contact-item style-bg-white">
                    <div className="icon wow fadeInUp" data-wow-delay=".4s">
                      <i className="icon-Envelope" />
                    </div>
                    <div className="content wow fadeInUp" data-wow-delay=".5s">
                      <div className="caption-1 title-section-contact">
                        Email
                      </div>
                      <div className="caption-1 text">
                    
                        <a href="mailto:info.bpc@albahargroup.com" className="caption-1 text">
                          info.bpc@albahargroup.com
                        </a>
                       
                      
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
