import Link from "next/link";

import TeamCircle from "@/components/common/Team";
import Team from "@/components/otherPages/Team";
import React from "react";
import Breadcumb from "@/components/common/Breadcumb";
import { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Our Team || FinWice - Business & Finance Consulting - React Nextjs Template",
  description:
    "FinWice - Business & Finance Consulting - React Nextjs Template",
};
export default function page() {
  return (
    <>
      <div className="page-title style-1 bg-img-7">
        <div className="tf-container">
          <div className="page-title-content">
            <Breadcumb pageName="Our Teams" />
            <h2 className="title-page-title">Meet Our Teams</h2>
            <div className="sub-title body-2">
              Meet the dedicated professionals behind our success. With
              expertise in finance
              <br />
              and business consulting, our team is here to guide you every step
              of the way.
            </div>
          </div>
        </div>
      </div>
      <div className="main-content">
        <Team />
        <TeamCircle />
      </div>
    </>
  );
}
