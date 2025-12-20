import Contact from "@/components/common/Contact";
import Process from "@/components/common/Process";
import Services from "@/components/common/Services2";
import Testimonials from "@/components/otherPages/Testimonials";
import React from "react";
import Breadcumb from "@/components/common/Breadcumb";
import { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Services 01 || FinWice - Business & Finance Consulting - React Nextjs Template",
  description:
    "FinWice - Business & Finance Consulting - React Nextjs Template",
};
export default function page() {
  return (
    <>
      <div className="page-title style-1 bg-img-5">
        <div className="tf-container">
          <div className="page-title-content">
            <Breadcumb pageName="Our Services" />
            <h2 className="title-page-title">Our Services</h2>
            <div className="sub-title body-2">
              Discover a diverse array of services designed to help businesses
              excel through our
              <br />
              customized strategies and expert guidance.
            </div>
          </div>
        </div>
      </div>
      <div className="main-content">
        <Services />
        <Process />
        <Testimonials />
        <Contact />
      </div>
    </>
  );
}
