import Details2 from "@/components/blogs/Details2";
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
      <div className="main-content tf-spacing-3">
        <Details2 blog={blog} />
        <RelatedBlogs />
      </div>
    </>
  );
}
