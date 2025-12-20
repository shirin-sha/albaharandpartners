import Link from "next/link";

import Details1 from "@/components/blogs/Details1";
import RelatedBlogs from "@/components/blogs/RelatedBlogs";
import React from "react";
import { allBlogs } from "@/data/blogs";
type Params = { id: string };

type Blog = {
  id: number;
  imgSrc: string;
  title?: string;
  // Add other properties as needed, e.g. description, content, etc.
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post =
    allBlogs.filter((p) => String(p.id) === String(id))[0] || allBlogs[0];

  return {
    title:
      "Blog Details || FinWice - Business & Finance Consulting - React Nextjs Template",
    description:
      "FinWice - Business & Finance Consulting - React Nextjs Template",
    openGraph: {
      title:
        "Blog Details || FinWice - Business & Finance Consulting - React Nextjs Template",
      description:
        "FinWice - Business & Finance Consulting - React Nextjs Template",
      type: "article",
      url: `/blog-details-1/${post.id}`,
    },
  };
}
export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const blog: Blog =
    allBlogs.filter((p) => String(p.id) === String(id))[0] || allBlogs[0];
  return (
    <>
      <div className="page-title style-2 bg-img-3">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
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
                  <span className="caption-1 home">Blog</span>{" "}
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
                  <span className="caption-1 page-breadkcum">
                    {blog.title?.split(" ").slice(0, 5).join(" ") ??
                      "How to Effectively Manage Business"}
                    ...
                  </span>
                </div>
                <div className="content">
                  <h2 className="title-page-title">
                    {blog.title?.split(" ").slice(0, 5).join(" ") ??
                      "How to Effectively Manage Business"}
                    <br />
                    {blog.title?.split(" ").slice(5).join(" ") ??
                      "Risks in a Volatile Market"}
                  </h2>
                  <div className="meta">
                    <div className="meta-content">
                      <div className="icon">
                        <i className="icon-calendarBlank" />
                      </div>
                      <div className="text body-2">February 28, 2025</div>
                    </div>
                    <div className="meta-content">
                      <div className="icon">
                        <i className="icon-user" />
                      </div>
                      <div className="text body-2">Tony Nguyen</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-content tf-spacing-2">
        <Details1 />
        <RelatedBlogs />
      </div>
    </>
  );
}
