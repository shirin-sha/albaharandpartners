import Blogs3 from "@/components/blogs/Blogs3";
import React from "react";
import Breadcumb from "@/components/common/Breadcumb";
import { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "News & Updates ",
  description:
    "",
};
export default function page() {
  return (
    <>
      <div className="page-title style-1 bg-img-2">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <div className="page-title-content">
                <Breadcumb pageName="News & Updates" />
                <h2 className="title-page-title">News & Updates</h2>
                <div className="sub-title body-2">
                  Stay updated with insights, tips, and trends in finance and
                  business strategy—
                  <br />
                  curated by our experts to keep you informed and ahead.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-content tf-spacing-2">
        <Blogs3 />
      </div>
    </>
  );
}


















