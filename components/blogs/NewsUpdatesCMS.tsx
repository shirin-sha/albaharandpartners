"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { NewsUpdatesContent } from "@/types/news-updates";

interface Props {
  data: NewsUpdatesContent;
}

export default function NewsUpdatesCMS({ data }: Props) {
  const [filteredPosts, setFilteredPosts] = useState<typeof data.posts>([]);
  const [isLoadedMore, setIsLoadedMore] = useState(false);

  useEffect(() => {
    const activePosts = data.posts.filter((p) => p.isActive);
    const remainingPosts = activePosts.slice(1);

    if (isLoadedMore) {
      setFilteredPosts(remainingPosts);
    } else {
      // Keep first post as featured hero card, then show 5 cards below initially.
      setFilteredPosts(remainingPosts.slice(0, 5));
    }
  }, [isLoadedMore, data.posts]);

  if (!data.isActive) return null;

  const activePosts = data.posts.filter((p) => p.isActive);
  if (activePosts.length === 0) return null;
  const featuredIndex = activePosts.findIndex((p) => p.isFeatured === true);
  const featuredPost = featuredIndex >= 0 ? activePosts[featuredIndex] : activePosts[0];
  const remainingPosts = activePosts.filter((p) => p !== featuredPost);

  const getPostHref = (post: (typeof activePosts)[number], index: number) => {
    const fallbackId = post._id || String(index + 1);
    return `/news-updates/${fallbackId}`;
  };

  const featuredPostHref = getPostHref(featuredPost, featuredIndex >= 0 ? featuredIndex : 0);

  const formatDate = (post: (typeof activePosts)[number]) => {
    if (post.dateIso) {
      const d = new Date(post.dateIso);
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
    const dd = String(post.date?.day || "").padStart(2, "0");
    const mm = monthMap[(post.date?.month || "").toUpperCase()] || "01";
    return `${dd}/${mm}/${String(new Date().getFullYear()).slice(-2)}`;
  };

  return (
    <div className="tf-container">
      <div className="row">
        <div className="col-12">
          <div className="blog-content blog-no-sidebar-content">
            <div className="blog-no-sidebar-slide">
              <div className="tf-post-grid style-absolute news-featured-post">
                <div className="image">
                  <Link href={featuredPostHref} className="link" />
                  <Image
                    src={featuredPost.imagePath}
                    alt={featuredPost.title}
                    width={featuredPost.imgWidth || 1290}
                    height={featuredPost.imgHeight || 600}
                    className="lazyload"
                  />
                  <Link href={featuredPostHref} className="date">
                    <span className="day">{formatDate(featuredPost)}</span>
                  </Link>
                </div>
                <div className="tf-post-grid-content">
                  <div className="position">{featuredPost.category}</div>
                  <h4 className="title-post">
                    <Link href={featuredPostHref}>{featuredPost.title}</Link>
                  </h4>
                  {featuredPost.shortDescription && (
                    <div className="sub-title body-2">{featuredPost.shortDescription}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="layout-grid-3 loadmore-item">
              {filteredPosts.map((post, index) => {
                const absoluteIndex = remainingPosts.findIndex((p) => p === post);
                const href = getPostHref(post, absoluteIndex >= 0 ? absoluteIndex + 1 : index + 1);
                return (
                <div
                  className="tf-post-grid style-small fl-item d-block"
                  key={post._id || index}
                >
                  <div className="image">
                    <Link
                      href={href}
                      className="link"
                    />
                    <Image
                      src={post.imagePath}
                      alt={post.title}
                      width={post.imgWidth || 410}
                      height={post.imgHeight || 546}
                      className="lazyload"
                    />
                    <Link href={href} className="date">
                      <span className="day">{formatDate(post)}</span>
                    </Link>
                  </div>
                  <div className="tf-grid-post-content">
                    <div
                      className="position caption-1 wow fadeInUp"
                    >
                      {post.category}
                    </div>
                    <h5
                      className="title-post wow fadeInUp"
                    >
                      <Link href={href}>
                        {post.title}
                      </Link>
                    </h5>
                    {post.shortDescription && (
                      <div className="sub-title body-2">{post.shortDescription}</div>
                    )}
                  </div>
                </div>
              )})}
            </div>
            {!isLoadedMore && remainingPosts.length > 5 && (
              <div className="btn-load-more text-center view-more-button wow fadeInUp">
                <button
                  onClick={() => setIsLoadedMore(true)}
                  className="tf-btn style-1 bg-color-primary btn-loadmore"
                >
                  <span>Load More</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
