import Link from "next/link";
import Image from "next/image";
import React from "react";
import { detailedPosts, smallPosts } from "@/data/blogs";
import NewsLetterForm from "../common/NewsLetterForm";
import Pagination from "../common/Pagination";

export default function Blogs2() {
  return (
    <div className="tf-container">
      <div className="row rg-60">
        <div className="col-xl-3">
          <div className="tf-sidebar">
            <div className="sidebar-item sidebar-search">
              <fieldset>
                <input type="text" placeholder="Search products..." />
                <a href="#" className="tf-btn-search">
                  <i className="icon-MagnifyingGlass" />
                </a>
              </fieldset>
            </div>
            <div className="sidebar-item sidebar-info">
              <div className="info-top">
                <div className="image">
                  <a href="#" className="link" />
                  <Image
                    src="/image/avatar/avt-1.jpg"
                    alt=""
                    className="lazyload"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="top-content">
                  <h5>
                    <a href="#" className="name">
                      Tony Nguyen
                    </a>
                  </h5>
                  <div className="number-follower">200 Follower</div>
                </div>
              </div>
              <div className="introduce">
                Tony Nguyen (@Jessie_ng) is a writer who draws. He’s the
                Bestselling author of “Number of The Year”.
              </div>
              <div className="info-social">
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
                  <li className="item">
                    <a href="#">
                      <div className="icon">
                        <i className="icon-skype" />
                      </div>
                    </a>
                  </li>
                  <li className="item">
                    <a href="#">
                      <div className="icon">
                        <i className="icon-telegram" />
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
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
              {smallPosts.map((post, index) => (
                <div className="tf-post-list style-small hover-img" key={index}>
                  <div className="image">
                    <Link
                      href={`/blog-details-1/${post.id}`}
                      className="link"
                    />
                    <Image
                      src={post.imgSrc}
                      alt=""
                      className="lazyload"
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className="post-content">
                    <div className="post-date caption-1">{post.date}</div>
                    <Link
                      href={`/blog-details-1/${post.id}`}
                      className="name-post"
                    >
                      {post.title}
                    </Link>
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
        <div className="col-xl-9">
          <div className="blog-content blog-left-sidebar-content ml-50">
            {detailedPosts.map((post, index) => (
              <div className="tf-post-list default" key={index}>
                <div className="image tf-animate-2">
                  <Link href={`/blog-details-1/${post.id}`} className="link" />
                  <Image
                    src={post.imgSrc}
                    alt=""
                    className="lazyload"
                    width={400}
                    height={300}
                  />
                  <a href="#" className="date">
                    <span className="day">{post.date.day}</span>
                    <span>{post.date.month}</span>
                  </a>
                </div>
                <div className="tf-list-post-content">
                  <div className="position wow fadeInUp">{post.category}</div>
                  <h4 className="title-post wow fadeInUp">
                    <Link href={`/blog-details-1/${post.id}`}>
                      {post.title}
                    </Link>
                  </h4>
                  <div className="sub-title body-2 wow fadeInUp">
                    {post.description}
                  </div>
                  <div className="wow fadeInUp">
                    <Link
                      href={`/blog-details-1/${post.id}`}
                      className="default-btn"
                    >
                      <span> Reading More</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="wg-pagination ml-50 pt-48">
            <ul className="flex">
              <Pagination />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
