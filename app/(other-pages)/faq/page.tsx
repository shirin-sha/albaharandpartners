import Link from "next/link";

import Faqs from "@/components/otherPages/Faqs";
import React from "react";
import Breadcumb from "@/components/common/Breadcumb";
import { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Faqs || FinWice - Business & Finance Consulting - React Nextjs Template",
  description:
    "FinWice - Business & Finance Consulting - React Nextjs Template",
};
export default function page() {
  return (
    <>
      <div className="page-title style-1 bg-img-18">
        <div className="tf-container">
          <div className="page-title-content">
            <Breadcumb pageName="Faqs" />
            <h2 className="title-page-title">FAQs</h2>
            <div className="sub-title body-2">
              Have questions? Explore our Frequently Asked Questions for quick
              answers on
              <br />
              products, services, and expert insights.
            </div>
          </div>
        </div>
      </div>
      <div className="main-content">
        <Faqs />
      </div>
    </>
  );
}
