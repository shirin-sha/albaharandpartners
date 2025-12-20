"use client";
import React from "react";
import Link from "next/link";
import ContactForm from "../common/ContactForm";

export default function Contact() {
  return (
    <>
      {" "}
      <div className="sidebar-details mb-40">
        <ContactForm />
      </div>
      <div className="sidebar-contact sidebar-details">
        <div className="section-content position-relative">
          <div className="heading-section style-color-white">
            <Link
              href={`/contact-us`}
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
                  101 E 129th St, East Chicago, IN 46312, US
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
                  1-555-678-8888
                  <br />
                  1-333-123-6666
                </a>
              </div>
            </div>
            <div className="box-contact-item">
              <div className="icon">
                <svg
                  width={33}
                  height={33}
                  viewBox="0 0 33 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_9360_10609)">
                    <path
                      d="M16.3335 28.75C22.4086 28.75 27.3335 23.8251 27.3335 17.75C27.3335 11.6749 22.4086 6.75 16.3335 6.75C10.2584 6.75 5.3335 11.6749 5.3335 17.75C5.3335 23.8251 10.2584 28.75 16.3335 28.75Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.3335 4.75L3.3335 8.75"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M25.3335 4.75L29.3335 8.75"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.3335 10.75V17.75H23.3335"
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
                        transform="translate(0.333496 0.75)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="content">
                <div className="caption-1 title-section-contact">
                  Working Time
                </div>
                <a href="#" className="caption-1 text">
                  Mon-Sat:8:00am - 18:00pm <br />
                  Sun: Closed
                </a>
              </div>
            </div>
          </div>
          <Link
            href={`/contact-us`}
            className="tf-btn style-1 bg-white bg-white-style-2 w-full text-center"
          >
            <span> Contact Us </span>
          </Link>
        </div>
      </div>
    </>
  );
}
