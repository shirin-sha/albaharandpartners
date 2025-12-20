import Blogs1 from "@/components/blogs/Blogs1";
import React from "react";
import Breadcumb from "@/components/common/Breadcumb";
import { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Blog Right Sidebar || FinWice - Business & Finance Consulting - React Nextjs Template",
  description:
    "FinWice - Business & Finance Consulting - React Nextjs Template",
};
export default function page() {
  return (
    <>
      <div className="page-title style-1 bg-img-1">
        <div className="tf-container">
          <div className="page-title-content">
            <Breadcumb pageName="Blog" />
            <h2 className="title-page-title">Blog Right Sidebar</h2>
            <div className="sub-title body-2">
              Stay updated with insights, tips, and trends in finance and
              business strategy—
              <br />
              curated by our experts to keep you informed and ahead.
            </div>
          </div>
        </div>
      </div>
      <div className="main-content tf-spacing-1">
        <Blogs1 />
      </div>
    </>
  );
}
