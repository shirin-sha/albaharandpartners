import Link from "next/link";
import Image from "next/image";
import React from "react";
import { postListItems, blogContent } from "@/data/blogs";
import NewsLetterForm from "../common/NewsLetterForm";

export default function Details1({ blogId }: { blogId?: number }) {
  const content = blogId ? blogContent[blogId as keyof typeof blogContent] : null;
  if (!content) {
    return (
      <div className="tf-container tf-spacing-3">
        <div className="row rg-60">
          <div className="col-xl-9">
            <div className="blog-content blog-details-content mr-50">
              <p className="body-2">Blog content not found.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tf-container tf-spacing-3">
      <div className="row rg-60">
        <div className="col-xl-9">
          <div className="blog-content blog-details-content mr-50">
            <div className="image-blog">
              <Image
                src={"/image/blog/image-blog-1.jpg"}
                alt=""
                className="lazyload"
                width={910}
                height={512}
              />
            </div>
            <div className="desc-blog">
              <h4 className="title-desc mb-20">{content.subheading}</h4>
              {content.content.map((item, index) => {
                if (item.type === "paragraph") {
                  return (
                    <p key={index} className="body-2">
                      {item.text}
                    </p>
                  );
                } else if (item.type === "heading") {
                  return (
                    <h5 key={index} className="title-desc mt-30 mb-12">
                      {item.text}
                    </h5>
                  );
                } else if (item.type === "list" && "items" in item && item.items) {
                  return (
                    <ul key={index} className="list-desc mt-12 mb-20" style={{ listStyleType: "disc", paddingLeft: "30px", marginLeft: "0" }}>
                      {item.items.map((listItem: string, listIndex: number) => (
                        <li key={listIndex} className="body-2 mb-8" style={{ display: "list-item", listStyleType: "disc", paddingLeft: "8px" }}>
                          {listItem}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return null;
              })}
            </div>
            <div className="tab-list">
              <div className="left tab-item">
                <div className="text">Tag:</div>
                <div className="tabs-list g-12">
                  <a href="#" className="tabs-item caption-1">
                    Finance
                  </a>
                  <a href="#" className="tabs-item caption-1">
                    Consulting
                  </a>
                </div>
              </div>
              <div className="right tab-item">
                <div className="text">Share this post:</div>
                <ul className="tf-social radius-50 style-border g-12 color-on-suface-container">
                  <li className="item">
                    <a href="#">
                      <div className="icon">
                        <i className="icon-messenger" />
                      </div>
                    </a>
                  </li>
                  <li className="item">
                    <a href="#">
                      <div className="icon">
                        <i className="icon-x" />
                      </div>
                    </a>
                  </li>
                  <li className="item">
                    <a href="#">
                      <div className="icon">
                        <i className="icon-ig1" />
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="pre-next-blog">
              <div className="pre pre-next-blog-item">
                <a href="#" className="pre-next-btn">
                  PREVIOUS
                </a>
                <h6>
                  <a href="#" className="name-blog">
                    Increasing Profit Margins with Efficient
                    <br />
                    Business Operations
                  </a>
                </h6>
              </div>
              <div className="line" />
              <div className="next pre-next-blog-item">
                <a href="#" className="pre-next-btn">
                  NEXT
                </a>
                <h6>
                  <a href="#" className="name-blog">
                    Navigating Market Trends to Stay
                    <br />
                    Competitive
                  </a>
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3">
          <div className="tf-sidebar">
          
        
            <div className="sidebar-item sidebar-content sidebar-categories">
              <h6 className="title-content">Categories</h6>
              <ul className="list">
                <li className="item">
                  <a href="#">Business Consulting</a>
                  <p>(112)</p>
                </li>
                <li className="item">
                  <a href="#">Finance Consulting</a>
                  <p>(32)</p>
                </li>
                <li className="item">
                  <a href="#">Investment Tips</a>
                  <p>(42)</p>
                </li>
                <li className="item">
                  <a href="#">Tax Solutions</a>
                  <p>(65)</p>
                </li>
                <li className="item">
                  <a href="#">Risk Management</a>
                  <p>(13)</p>
                </li>
                <li className="item">
                  <a href="#">Leadership Strategies</a>
                  <p>(32)</p>
                </li>
              </ul>
            </div>
            <div className="sidebar-item sidebar-content sidebar-recent-posts">
              <h6 className="title-content">Recent posts</h6>
              {postListItems.map((post, i) => (
                <div className="tf-post-list style-small hover-img" key={i}>
                  <div className="image">
                    <Link
                      href={`/blog-details-1/${post.id}`}
                      className="link"
                    />
                    <Image
                      src={post.imgSrc}
                      alt={post.title}
                      className="lazyload"
                      width={post.imgWidth}
                      height={post.imgHeight}
                    />
                  </div>
                  <div className="post-content">
                    <div className="post-date caption-1">{post.date}</div>
                    <a href="#" className="name-post">
                      {post.title}
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div className="sidebar-item sidebar-content sidebar-newsletter">
              <h6 className="title-content">Subscribe Newsletter</h6>
              <NewsLetterForm placeholder="Email address" />
            </div>
            <div className="sidebar-item sidebar-content sidebar-tags">
              <h6 className="title-content">Tags</h6>
              <div className="tabs-list">
                <a href="#" className="tabs-item caption-1">
                  Finance
                </a>
                <a href="#" className="tabs-item caption-1">
                  Growth
                </a>
                <a href="#" className="tabs-item caption-1">
                  Strategy
                </a>
                <a href="#" className="tabs-item caption-1">
                  Risk
                </a>
                <a href="#" className="tabs-item caption-1">
                  Tax
                </a>
                <a href="#" className="tabs-item caption-1">
                  Investment
                </a>
                <a href="#" className="tabs-item caption-1">
                  Business
                </a>
                <a href="#" className="tabs-item caption-1">
                  Market
                </a>
                <a href="#" className="tabs-item caption-1">
                  Consulting
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /.main-content */}
    </div>
  );
}
