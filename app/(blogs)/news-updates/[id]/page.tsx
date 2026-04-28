import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Metadata } from "next";
import { getNewsUpdatesContent } from "@/lib/data-fetch";

interface PageProps {
  params: Promise<{ id: string }>;
}

function resolvePostById(
  id: string,
  posts: Array<{
    _id?: string;
    title: string;
    category: string;
    shortDescription?: string;
    longDescription?: string;
    imagePath: string;
    detailImagePath?: string;
    dateIso?: string;
    date: { day: string; month: string };
    link: string;
    isActive: boolean;
  }>
) {
  const activePosts = posts.filter((p) => p.isActive);
  if (activePosts.length === 0) return null;

  const byObjectId = activePosts.find((p) => String(p._id || "") === id);
  if (byObjectId) return byObjectId;

  const numericId = Number(id);
  if (Number.isInteger(numericId) && numericId > 0 && numericId <= activePosts.length) {
    return activePosts[numericId - 1];
  }

  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const content = await getNewsUpdatesContent("ltr");
  const post = resolvePostById(id, content?.posts || []);

  const title = post?.title || "News Details || Al Bahar & Partners";
  return {
    title,
    description: "Al Bahar & Partners",
    openGraph: {
      title,
      description: "Al Bahar & Partners",
      type: "article",
      url: `/news-updates/${id}`,
    },
  };
}

export default async function NewsDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const content = await getNewsUpdatesContent("ltr");
  const post = resolvePostById(id, content?.posts || []);
  const activePosts = (content?.posts || []).filter((p) => p.isActive);

  const getPostHref = (
    p: {
      _id?: string;
      title: string;
      category: string;
      shortDescription?: string;
      longDescription?: string;
      imagePath: string;
      detailImagePath?: string;
      dateIso?: string;
      date: { day: string; month: string };
      link: string;
      isActive: boolean;
    },
    index: number
  ) => {
    return `/news-updates/${p._id || String(index + 1)}`;
  };

  const formatDate = (p: { dateIso?: string; date: { day: string; month: string } }) => {
    if (p.dateIso) {
      const d = new Date(p.dateIso);
      if (!Number.isNaN(d.getTime())) {
        const dd = String(d.getDate()).padStart(2, "0");
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const yy = String(d.getFullYear()).slice(-2);
        return `${dd}/${mm}/${yy}`;
      }
    }
    const monthMap: Record<string, string> = {
      JAN: "01",
      FEB: "02",
      MAR: "03",
      APR: "04",
      MAY: "05",
      JUN: "06",
      JUL: "07",
      AUG: "08",
      SEP: "09",
      OCT: "10",
      NOV: "11",
      DEC: "12",
    };
    const dd = String(p.date?.day || "").padStart(2, "0");
    const mm = monthMap[(p.date?.month || "").toUpperCase()] || "01";
    return `${dd}/${mm}/${String(new Date().getFullYear()).slice(-2)}`;
  };

  if (!post) {
    return (
      <div className="tf-container tf-spacing-2">
        <h3>News post not found</h3>
        <Link href="/news-updates" className="tf-btn style-1 bg-color-primary">
          <span>Back to News</span>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="page-title style-2 bg-img-3">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <div className="page-title-content">
                <div className="breadkcum">
                  <Link href="/" className="caption-1 home">
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
                      <g clipPath="url(#clip0_news_1)">
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
                        <clipPath id="clip0_news_1">
                          <rect width={20} height={20} fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>{" "}
                  <Link href="/news-updates" className="caption-1 home">
                    News
                  </Link>{" "}
                  <span className="arrow-svg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_news_2)">
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
                        <clipPath id="clip0_news_2">
                          <rect width={20} height={20} fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>{" "}
                  <span className="caption-1 page-breadkcum">{post.title}</span>
                </div>
                <div className="content">
                  <h2 className="title-page-title">
                    {post.title.split(" ").slice(0, 5).join(" ")}
                    <br />
                    {post.title.split(" ").slice(5).join(" ")}
                  </h2>
                  <div className="meta">
                    <div className="meta-content">
                      <div className="icon">
                        <i className="icon-calendarBlank" />
                      </div>
                      <div className="text body-2">{formatDate(post)}</div>
                    </div>
                    <div className="meta-content">
                      <div className="icon">
                        <i className="icon-price-tag" />
                      </div>
                      <div className="text body-2">{post.category}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main-content tf-spacing-2">
        <div className="tf-container tf-spacing-3">
          <div className="row rg-60">
            <div className="col-xl-9">
              <div className="blog-content blog-details-content mr-50">
                <div className="image-blog">
                  <Image
                    src={post.detailImagePath || post.imagePath}
                    alt={post.title}
                    width={910}
                    height={512}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div className="desc-blog">
                  <h4 className="title-desc mb-20">{post.title}</h4>
                  {post.longDescription && (
                    <div
                      className="body-2 mt-20"
                      dangerouslySetInnerHTML={{ __html: post.longDescription }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="col-xl-3">
              <div className="tf-sidebar style-position-sticky top-140 news-details-sidebar">
                <div className="sidebar-item sidebar-content sidebar-recent-posts">
                  <h6 className="title-content">Recent posts</h6>
                  {activePosts
                    .filter((p) => p !== post)
                    .slice(0, 4)
                    .map((recentPost, index) => (
                      <div className="tf-post-list style-small hover-img" key={recentPost._id || index}>
                        <div className="image">
                          <Link href={getPostHref(recentPost, index)} className="link" />
                          <Image
                            src={recentPost.imagePath}
                            alt={recentPost.title}
                            width={120}
                            height={90}
                            className="lazyload"
                          />
                        </div>
                        <div className="post-content">
                          <div className="post-date caption-1">{formatDate(recentPost)}</div>
                          <Link href={getPostHref(recentPost, index)} className="name-post">
                            {recentPost.title}
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

