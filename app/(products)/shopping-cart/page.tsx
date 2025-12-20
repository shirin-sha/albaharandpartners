import RelatedProducts from "@/components/products/RelatedProducts";
import ShopCart from "@/components/products/ShopCart";
import React from "react";
import Breadcumb from "@/components/common/Breadcumb";
import { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Shopping Cart || FinWice - Business & Finance Consulting - React Nextjs Template",
  description:
    "FinWice - Business & Finance Consulting - React Nextjs Template",
};
export default function page() {
  return (
    <>
      <div className="page-title style-1 bg-img-12">
        <div className="tf-container">
          <div className="page-title-content">
            <Breadcumb pageName="Shopping Cart" />
            <h2 className="title-page-title">Shopping Cart</h2>
            <div className="sub-title body-2">
              Review your selected products and financial tools, tailored to
              support your
              <br />
              business growth—just a few steps away from transforming your
              strategy.
            </div>
          </div>
        </div>
      </div>
      <div className="main-content">
        <ShopCart />
        <RelatedProducts />
      </div>
    </>
  );
}
