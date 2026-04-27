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

  return (
    <div className="tf-container">
      <div className="row">
        <div className="col-12">
          <div className="blog-content blog-no-sidebar-content">
            <div className="blog-no-sidebar-slide">
              <div className="tf-post-grid style-absolute">
                <div className="image">
                  <Link href={featuredPost.link || "#"} className="link" />
                  <Image
                    src={featuredPost.imagePath}
                    alt={featuredPost.title}
                    width={featuredPost.imgWidth || 1290}
                    height={featuredPost.imgHeight || 600}
                    className="lazyload"
                  />
                  <a href={featuredPost.link || "#"} className="date">
                    <span className="day">{featuredPost.date.day}</span>
                    <span>{featuredPost.date.month}</span>
                  </a>
                </div>
                <div className="tf-post-grid-content">
                  <div className="position">{featuredPost.category}</div>
                  <h4 className="title-post">
                    <Link href={featuredPost.link || "#"}>{featuredPost.title}</Link>
                  </h4>
                </div>
              </div>
            </div>

            <div className="layout-grid-3 loadmore-item">
              {filteredPosts.map((post, index) => (
                <div
                  className="tf-post-grid style-small fl-item d-block"
                  key={post._id || index}
                >
                  <div className="image">
                    <Link
                      href={post.link || "#"}
                      className="link"
                    />
                    <Image
                      src={post.imagePath}
                      alt={post.title}
                      width={post.imgWidth || 410}
                      height={post.imgHeight || 546}
                      className="lazyload"
                    />
                    <a href={post.link || "#"} className="date">
                      <span className="day"> {post.date.day} </span>
                      <span>{post.date.month}</span>
                    </a>
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
                      <Link href={post.link || "#"}>
                        {post.title}
                      </Link>
                    </h5>
                  </div>
                </div>
              ))}
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
