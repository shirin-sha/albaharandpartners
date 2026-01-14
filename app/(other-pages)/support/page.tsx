import Link from "next/link";

import Awards from "@/components/common/Awards";
import SupportContact from "@/components/otherPages/SupportContact";
import Cta from "@/components/common/Cta";
import SupportServices from "@/components/otherPages/SupportServices";
import React from "react";
import Breadcumb from "@/components/common/Breadcumb";
import { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Support",
  description:
    "Al Bahar & Partners - Technology Solutions",
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
              From incident resolution to preventive maintenance, our support teams keep
              <br />
              your operations secure, stable, and always available.
            </div>
          </div>
        </div>
      </div>
      <div className="main-content">
        <SupportServices />
        <SupportContact />
        {/* <Awards parentClass="section-awards h-1 tf-spacing-18" /> */}
        {/* <Cta /> */}
      </div>
    </>
  );
}


















