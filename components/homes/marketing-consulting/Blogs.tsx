import Link from "next/link";
import Image from "next/image";
import React from "react";
import { absolute2Posts, small2Posts } from "@/data/blogs";

export default function Blogs() {
  return (
    <section className="section-new h-5 tf-spacing-2 section-one-page" id="new">
      <div className="tf-container position-relative">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center">
              <div className="text-anime-wave-1">
                <a href="#" className="tag label text-btn-uppercase">
                  READ OUR BLOG
                </a>
              </div>
              <h3 className="text-anime-wave-1 mb-12">Insights &amp; Ideas</h3>
              <div className="sub-title body-2 text-anime-wave-1">
                Get the latest insights, expert tips, and updates to stay
                informed and inspired.
              </div>
            </div>
            <div className="row rg-30">
              {absolute2Posts.map((post, i) => (
                <div className="col-lg-6" key={i}>
                  <div className="tf-post-grid style-absolute style-2 hover-img">
                    <Link
                      href={`/blog-details-1/${post.id}`}
                      className=" image d-block "
                    >
                      <Image
                        src={post.imgSrc}
                        alt={post.title}
                        className="lazyload"
                        width={post.imgWidth}
                        height={post.imgHeight}
                      />
                    </Link>

                    <div className="tf-post-grid-content">
                      <div className="left">
                        <a href="#" className="date">
                          <span className="day">{post.date.day}</span>
                          <span>{post.date.month}</span>
                        </a>
                      </div>
                      <div className="content right">
                        <h4 className="title-post">
                          <Link href={`/blog-details-1/${post.id}`}>
                            {post.title}
                          </Link>
                        </h4>
                        <div className="position caption-1">
                          {post.position}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="col-lg-6">
                {small2Posts.map((post, i) => (
                  <div
                    className="tf-post-list style-small small-2 hover-img"
                    key={i}
                  >
                    <div className="image">
                      <Link
                        href={`/blog-details-1/${post.id}`}
                        className="link"
                      />
                      <Image
                        src={post.imgSrc}
                        alt={
                          typeof post.title === "string"
                            ? post.title
                            : "Post image"
                        }
                        className="lazyload"
                        width={post.imgWidth}
                        height={post.imgHeight}
                      />
                    </div>
                    <div className="post-content">
                      <div className="top">
                        <span className="post-date caption-1">{post.date}</span>
                        <span className="label text-btn-uppercase color-primary">
                          {post.label}
                        </span>
                      </div>
                      <h5>
                        <Link
                          href={`/blog-details-1/${post.id}`}
                          className="name-post"
                        >
                          {post.title}
                        </Link>
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
