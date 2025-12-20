import Link from "next/link";

import About from "@/components/otherPages/About";
import Career from "@/components/otherPages/Career";
import React from "react";
import Breadcumb from "@/components/common/Breadcumb";
import { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Career || FinWice - Business & Finance Consulting - React Nextjs Template",
  description:
    "FinWice - Business & Finance Consulting - React Nextjs Template",
};
export default function page() {
  return (
    <>
      <div className="page-title style-1 bg-img-19">
        <div className="tf-container">
          <div className="page-title-content">
            <Breadcumb pageName="Career" />
            <h2 className="title-page-title">Career</h2>
            <div className="sub-title body-2">
              Join our team of industry experts and make a meaningful impact.
              Discover
              <br />
              opportunities to grow your career with us in a dynamic &amp;
              rewarding environment.
            </div>
          </div>
        </div>
      </div>
      <div className="main-content">
        <About />
        <Career />
      </div>
    </>
  );
}
