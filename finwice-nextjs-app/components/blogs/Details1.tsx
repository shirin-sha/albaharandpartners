import Link from "next/link";
import Image from "next/image";
import React from "react";
import { postListItems } from "@/data/blogs";
import CommentForm from "./CommentForm";
import NewsLetterForm from "../common/NewsLetterForm";
import Comments from "./Comments";

export default function Details1() {
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
              <p className="body-2">
                In today's rapidly changing economic landscape, volatility is
                the new normal. Markets are affected by global events,
                technological advancements, and shifting consumer behaviors. For
                businesses, this means that risks are inevitable—but they can
                also be managed effectively. The key is to develop a proactive
                risk management strategy that allows your business to thrive
                even in uncertain conditions.
              </p>
              <p className="body-2">
                Test your crisis management plan with regular simulations to
                ensure that your team knows what to do if an emergency arises. A
                well-prepared team can minimize downtime and protect your
                reputation.
              </p>
            </div>
            <div className="cols-img">
              <div className="image-blog">
                <Image
                  src="/image/blog/image-blog-2.jpg"
                  alt=""
                  className="lazyload"
                  width={444}
                  height={334}
                />
              </div>
              <div className="image-blog">
                <Image
                  src="/image/blog/image-blog-3.jpg"
                  alt=""
                  className="lazyload"
                  width={444}
                  height={334}
                />
              </div>
            </div>
            <div className="list-desc">
              <div className="desc-blog">
                <h5 className="title-desc">
                  1. Conduct a Comprehensive Risk Assessment
                </h5>
                <p className="body-2">
                  The first step in managing risk is to understand what risks
                  your business faces. This includes both internal and external
                  risks such as financial instability, supply chain disruptions,
                  cybersecurity threats, and market fluctuations. Conduct a
                  thorough risk assessment to identify and categorize risks
                  based on their potential impact and likelihood of occurrence.
                </p>
              </div>
              <div className="desc-blog">
                <h5 className="title-desc">
                  2. Diversify Your Business Operations
                </h5>
                <p className="body-2">
                  Diversification is one of the most effective ways to mitigate
                  risk. By expanding your products, services, or markets, you
                  reduce your dependency on a single source of revenue. In a
                  volatile market, diversification provides a safety net, as
                  declines in one area can be offset by growth in another.
                </p>
              </div>
              <div className="desc-blog">
                <h5 className="title-desc">
                  3. Build a Strong Financial Buffer
                </h5>
                <p className="body-2">
                  Cash flow is the lifeblood of any business, and during
                  volatile periods, having a strong financial buffer is
                  critical. Ensure your business has access to adequate working
                  capital to cover unforeseen expenses or downturns. This might
                  mean reducing non-essential spending or setting up an
                  emergency fund.
                </p>
              </div>
            </div>
            <div className="desc-blog">
              <h5 className="title-desc">Conclusion</h5>
              <p className="body-2">
                Managing business risks in a volatile market requires a
                combination of foresight, preparation, and agility. By
                conducting thorough risk assessments, diversifying your
                operations, building financial resilience, staying informed, and
                having a solid crisis management plan, you can navigate
                uncertainty and turn potential threats into opportunities for
                growth.
              </p>
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
            <Comments />
            <CommentForm />
          </div>
        </div>
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
