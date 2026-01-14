"use client";
import React from "react";
import Link from "next/link";
import ContactForm from "@/components/common/ContactForm";

export default function SupportContact() {
  return (
    <section className="section-contact-home h-2 tf-spacing-15">
      <div className="tf-container position-relative">
        <div className="row">
          <div className="col-12">
            <div className="section-contact-home-inner">
              <div className="section-content">
                <div className="heading-section mb-28 style-color-white">
                  <div className="wow fadeInUp">
                    <Link
                      href={`#`}
                      className="tag label text-btn-uppercase color-white"
                    >
                      CONTACT FOR SUPPORT
                    </Link>
                  </div>
                  <h3 className="title-section mb-12 wow fadeInUp">
                    Get in Touch with Our Support Team
                  </h3>
                  <div className="sub-title body-2 wow fadeInUp">
                    Need technical assistance or service information? Our support desk is ready to
                    help you resolve incidents, manage service requests, and maintain your
                    solutions across Banking, Payment & Identity, IT Infrastructure, Cybersecurity,
                    Printing & Imaging, and Audio-Visual systems.
                  </div>
                </div>
                <div className="cols">
                  <div className="benefit-lists">
                    <div className="benefit-items style-small-2">
                      <div className="icon wow fadeInUp">
                        <i className="icon-checkbox" />
                      </div>
                      <div
                        className="caption-1 wow fadeInUp"
                        data-wow-delay=".1s"
                      >
                        24/7 options for critical systems (as per SLA)
                      </div>
                    </div>
                    <div className="benefit-items style-small-2">
                      <div className="icon wow fadeInUp">
                        <i className="icon-checkbox" />
                      </div>
                      <div
                        className="caption-1 wow fadeInUp"
                        data-wow-delay=".1s"
                      >
                        Remote support and on-site assistance
                      </div>
                    </div>
                  </div>
                  <div className="benefit-lists">
                    <div className="benefit-items style-small-2">
                      <div className="icon wow fadeInUp" data-wow-delay=".2s">
                        <i className="icon-checkbox" />
                      </div>
                      <div
                        className="caption-1 wow fadeInUp"
                        data-wow-delay=".3s"
                      >
                        Preventive maintenance & health checks
                      </div>
                    </div>
                    <div className="benefit-items style-small-2">
                      <div className="icon wow fadeInUp" data-wow-delay=".2s">
                        <i className="icon-checkbox" />
                      </div>
                      <div
                        className="caption-1 wow fadeInUp"
                        data-wow-delay=".3s"
                      >
                        Certified engineers and trusted escalation paths
                      </div>
                    </div>
                  </div>
                </div>
                <div className="list-box-contact">
                  <div className="box-contact-item">
                    <div className="icon wow fadeInUp">
                      <i className="icon-MapPin" />
                    </div>
                    <div className="content">
                      <div
                        className="caption-1 title-section-contact wow fadeInUp"
                        data-wow-delay=".1s"
                      >
                        Location
                      </div>
                      <a
                        href="#"
                        className="caption-1 text wow fadeInUp"
                        data-wow-delay=".1s"
                      >
                        Kuwait City, Kuwait
                      </a>
                    </div>
                  </div>
                  <div className="box-contact-item">
                    <div className="icon wow fadeInUp" data-wow-delay=".2s">
                      <i className="icon-PhoneCall" />
                    </div>
                    <div className="content">
                      <div
                        className="caption-1 title-section-contact wow fadeInUp"
                        data-wow-delay=".3s"
                      >
                        Support Hotline
                      </div>
                      <a href="#">
                        <p
                          className="caption-1 text wow fadeInUp"
                          data-wow-delay=".3s"
                        >
                          +965 XXXXXXXX
                        </p>
                        <p
                          className="caption-1 text wow fadeInUp"
                          data-wow-delay=".3s"
                        >
                          +965 XXXXXXXX
                        </p>
                      </a>
                    </div>
                  </div>
                  <div className="box-contact-item">
                    <div className="icon wow fadeInUp" data-wow-delay=".4s">
                      <i className="icon-Envelope" />
                    </div>
                    <div className="content">
                      <div
                        className="caption-1 title-section-contact wow fadeInUp"
                        data-wow-delay=".5s"
                      >
                        Support Email
                      </div>
                      <a
                        href="mailto:support@albahargroup.com"
                        className="caption-1 text wow fadeInUp"
                        data-wow-delay=".5s"
                      >
                        support@albahargroup.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <ContactForm
                parentClass="form-contact-home"
                title="Schedule a free consultation"
                btnClass="tf-btn style-1 bg-white w-full text-center"
                isTitleCenter={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
