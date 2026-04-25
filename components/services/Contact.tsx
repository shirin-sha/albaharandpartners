"use client";
import React from "react";
import Link from "next/link";

export default function Contact() {
  return (
    <>
      {" "}
   
      <div className="sidebar-contact sidebar-details">
        <div className="section-content position-relative">
          <div className="heading-section style-color-white">
            <Link
              href="#"
              className="tag label text-btn-uppercase color-white mb-16"
            >
              Contact US
            </Link>
            <h4 className="title-section mb-1">Get In Touch</h4>
            <div className="sub-title caption-1">
              Reach out today to discuss how we can
              <br />
              support your business goals.
            </div>
          </div>
          <div className="list-box-contact style-column mb-28">
            <div className="box-contact-item">
              <div className="icon">
                <i className="icon-MapPin" />
              </div>
              <div className="content">
                <div className="caption-1 title-section-contact">
                  Address Business
                </div>
                <a href="#" className="caption-1 text">
                P.O.Box 148 Safat 13002 - Kuwait, Block 1, Street 3, Shuwaikh Industrial 1
                </a>
                <a href="#" className="label text-btn-uppercase">
                  Get direction
                </a>
              </div>
            </div>
            <div className="box-contact-item">
              <div className="icon">
                <i className="icon-PhoneCall" />
              </div>
              <div className="content">
                <div className="caption-1 title-section-contact">
                  Contact Us
                </div>
                <a href="#" className="caption-1 text">
                +965 184 8848
                <br />
                +965 184 8848
                </a>
              </div>
            </div>
            <div className="box-contact-item">
              <div className="icon">
                <i className="icon-Envelope" />
              </div>
              <div className="content">
                <div className="caption-1 title-section-contact">
                Email Us
                </div>
                <a href="mailto:bpc.sales@albahargroup.com" className="caption-1 text">
                bpc.sales@albahargroup.com
                </a>
              
                <a href="mailto:bpc.info@albahargroup.com" className="caption-1 text">
                bpc.info@albahargroup.com
                </a>
              </div>
            </div>
          </div>
          <Link
            href="/contact-us"
            className="tf-btn style-1 bg-white bg-white-style-2 w-full text-center"
          >
            <span> Contact Us </span>
          </Link>
        </div>
      </div>
    </>
  );
}
