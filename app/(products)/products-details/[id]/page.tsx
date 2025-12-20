import Link from "next/link";

import Details from "@/components/products/Details";
import RelatedProducts from "@/components/products/RelatedProducts";
import React from "react";
import { products } from "@/data/products";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product =
    products.filter((p) => String(p.id) === String(id))[0] || products[0];

  return {
    title:
      product.title +
      " || FinWice - Business & Finance Consulting - React Nextjs Template",
    description:
      "FinWice - Business & Finance Consulting - React Nextjs Template",
    openGraph: {
      title:
        product.title +
        " || FinWice - Business & Finance Consulting - React Nextjs Template",
      description:
        "FinWice - Business & Finance Consulting - React Nextjs Template",

      url: `/products-details/${product.id}`,
    },
  };
}
export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product =
    products.filter((p) => String(p.id) === String(id))[0] || products[0];
  return (
    <>
      <div className="page-title style-1 bg-img-11">
        <div className="tf-container">
          <div className="page-title-content">
            <div className="breadkcum">
              <Link href={`/`} className="caption-1 home">
                Homepage
              </Link>{" "}
              <span className="arrow-svg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g clipPath="url(#clip0_9360_28061)">
                    <path
                      d="M3.125 10H16.875"
                      stroke="#A2A3AB"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.25 4.375L16.875 10L11.25 15.625"
                      stroke="#A2A3AB"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath>
                      <rect width={20} height={20} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>{" "}
              <Link href={`/`} className="caption-1 home">
                Shop
              </Link>{" "}
              <span className="arrow-svg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g clipPath="url(#clip0_9360_28061)">
                    <path
                      d="M3.125 10H16.875"
                      stroke="#A2A3AB"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.25 4.375L16.875 10L11.25 15.625"
                      stroke="#A2A3AB"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath>
                      <rect width={20} height={20} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>{" "}
              <span className="caption-1 page-breadkcum">{product.title}</span>
            </div>
            <h2 className="title-page-title">Product Details</h2>
            <div className="sub-title body-2">
              Explore in-depth specifications and unique features of our
              financial tools, crafted
              <br />
              to empower your business decisions and streamline operations.
            </div>
          </div>
        </div>
      </div>{" "}
      <div className="main-content">
        <Details product={product} />
        <RelatedProducts />
      </div>
    </>
  );
}
