import Link from "next/link";
import React from "react";

export default function Breadcumb({ pageName = "Blog" }) {
  return (
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
              <rect id="clip0_9360_28061" width={20} height={20} fill="white" />
            </clipPath>
          </defs>
        </svg>
      </span>{" "}
      <span className="caption-1 page-breadkcum">{pageName}</span>
    </div>
  );
}
