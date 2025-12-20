import Link from "next/link";
import Image from "next/image";
import { postList } from "@/data/blogs";
import React from "react";

export default function Blogs() {
  return (
    <section className="section-new h-7 tf-spacing-2 section-one-page" id="new">
      <div className="tf-container position-relative">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center">
              <div className="text-anime-wave-1">
                <a href="#" className="tag label text-btn-uppercase">
                  READ OUR BLOG
                </a>
              </div>
              <h3 className="title-section text-anime-wave-1 mb-12">
                Insights &amp; Ideas
              </h3>
              <div className="sub-title body-2 text-anime-wave-1">
                Get the latest insights, expert tips, and updates to stay
                informed and inspired.
              </div>
            </div>
          </div>
        </div>
        <div className="row rg-30">
          <div className="col-lg-6">
            <div className="list-post">
              {postList.slice(0, 2).map((post, index) => (
                <div
                  className="tf-post-list style-small-2 hover-img"
                  key={index}
                >
                  <div className="top-post position-relative">
                    <Link
                      href={`/blog-details-1/${post.id}`}
                      className="image d-block"
                    >
                      <Image
                        src={post.imgSrc}
                        alt=""
                        className="lazyload"
                        width={post.imgWidth}
                        height={post.imgHeight}
                      />
                    </Link>
                    <a href="#" className="date">
                      <span className="day">{post.date.day}</span>
                      <span className="label">{post.date.month}</span>
                    </a>
                  </div>
                  <div className="tf-list-post-content">
                    <div className="position label text-btn-uppercase">
                      {post.category}
                    </div>
                    <h5 className="title-post">
                      <Link href={`/blog-details-1/${post.id}`}>
                        {post.title}
                      </Link>
                    </h5>
                    <div className="sub-title">{post.description}</div>
                    <Link
                      href={`/blog-details-1/${post.id}`}
                      className="default-btn"
                    >
                      <span>Readmore</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="list-post">
              {postList.slice(2, 4).map((post, index) => (
                <div
                  className="tf-post-list style-small-2 hover-img"
                  key={index}
                >
                  <div className="top-post position-relative">
                    <Link
                      href={`/blog-details-1/${post.id}`}
                      className="image d-block"
                    >
                      <Image
                        src={post.imgSrc}
                        alt=""
                        className="lazyload"
                        width={post.imgWidth}
                        height={post.imgHeight}
                      />
                    </Link>
                    <a href="#" className="date">
                      <span className="day">{post.date.day}</span>
                      <span className="label">{post.date.month}</span>
                    </a>
                  </div>
                  <div className="tf-list-post-content">
                    <div className="position label text-btn-uppercase">
                      {post.category}
                    </div>
                    <h5 className="title-post">
                      <Link href={`/blog-details-1/${post.id}`}>
                        {post.title}
                      </Link>
                    </h5>
                    <div className="sub-title">{post.description}</div>
                    <Link
                      href={`/blog-details-1/${post.id}`}
                      className="default-btn"
                    >
                      <span>Readmore</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
