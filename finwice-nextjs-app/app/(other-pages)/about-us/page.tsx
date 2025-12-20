import Link from "next/link";

import Benefits from "@/components/common/Benefits";
import About from "@/components/common/About";
import React from "react";
import History from "@/components/otherPages/History";
import Features from "@/components/common/Features2";
import Testimonials from "@/components/otherPages/Testimonials";
import Cta from "@/components/common/Cta2";
import Awards from "@/components/common/Awards";
import Breadcumb from "@/components/common/Breadcumb";
import { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "About us || FinWice - Business & Finance Consulting - React Nextjs Template",
  description:
    "FinWice - Business & Finance Consulting - React Nextjs Template",
};
export default function page() {
  return (
    <>
      <div className="page-title style-1 bg-img-4">
        <div className="tf-container">
          <div className="page-title-content">
            <Breadcumb pageName="About Us" />
            <h2 className="title-page-title">About Us</h2>
            <div className="sub-title body-2">
              Discover our mission to empower clients with expert solutions for
              confident,
              <br />
              sustainable growth and success.
            </div>
          </div>
        </div>
      </div>
      <div className="main-content">
        <Benefits />
        <About />
        <History />
        <Features hasBorder parentClass="section-why-choose h-2 page-about" />
        <Testimonials />
        <Cta />
        <Awards />
      </div>
    </>
  );
}
