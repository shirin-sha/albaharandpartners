import Link from "next/link";

import Awards from "@/components/common/Awards";
import Contact from "@/components/common/Contact";
import Cta from "@/components/common/Cta";
import Services from "@/components/otherPages/Services";
import React from "react";
import Breadcumb from "@/components/common/Breadcumb";
import { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Support || FinWice - Business & Finance Consulting - React Nextjs Template",
  description:
    "FinWice - Business & Finance Consulting - React Nextjs Template",
};
export default function page() {
  return (
    <>
      <div className="page-title style-1 bg-img-8">
        <div className="tf-container">
          <div className="page-title-content">
            <Breadcumb pageName="Support" />
            <h2 className="title-page-title">Support</h2>
            <div className="sub-title body-2">
              Explore success stories from businesses that achieved growth
              through our tailored
              <br />
              strategies and solutions.
            </div>
          </div>
        </div>
      </div>
      <div className="main-content">
        <Services />
        <Contact />
        <Awards parentClass="section-awards h-1 tf-spacing-18" />
        <Cta />
      </div>
    </>
  );
}








