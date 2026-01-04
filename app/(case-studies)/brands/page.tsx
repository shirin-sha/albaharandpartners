import CaseStudies2 from "@/components/case-studies/CaseStudies2";
import React from "react";
import Breadcumb from "@/components/common/Breadcumb";
import { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Al bahar and partners",
  description:
    "",
};
export default function page() {
  return (
    <>
      <div className="page-title style-1 bg-img-15">
        <div className="tf-container">
          <div className="page-title-content">
            <Breadcumb pageName="Brands" />
            <h2 className="title-page-title">Brands</h2>
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
        <CaseStudies2 />
      </div>
    </>
  );
}
