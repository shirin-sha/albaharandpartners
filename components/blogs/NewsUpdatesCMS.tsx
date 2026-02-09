"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { NewsUpdatesContent } from "@/types/news-updates";

interface Props {
  data: NewsUpdatesContent;
}

export default function NewsUpdatesCMS({ data }: Props) {
  const [filteres, setFilteres] = useState<typeof data.posts>([]);
  const [isLoadedMore, setIsLoadedMore] = useState(false);

  useEffect(() => {
    if (isLoadedMore) {
      setFilteres(data.posts.filter(p => p.isActive).sort((a, b) => a.order - b.order));
    } else {
      setFilteres(data.posts.filter(p => p.isActive).sort((a, b) => a.order - b.order).slice(0, 6));
    }
  }, [isLoadedMore, data.posts]);

  if (!data.isActive) return null;

  const activePosts = data.posts.filter(p => p.isActive).sort((a, b) => a.order - b.order);
  if (activePosts.length === 0) return null;

  return (
    <div className="tf-container">
      <div className="row">
        <div className="col-12">
          <div className="blog-content blog-no-sidebar-content">
            <div className="layout-grid-3 loadmore-item">
              {filteres.map((post, index) => (
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
            {!isLoadedMore && activePosts.length > 6 && (
              <div className="btn-load-more text-center view-more-button wow fadeInUp">
                <button
                  onClick={() => setIsLoadedMore(true)}
                  className="tf-btn style-1 bg-on-suface-container btn-loadmore"
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
