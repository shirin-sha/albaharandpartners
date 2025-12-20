import Image from "next/image";
import React from "react";
import CommentForm from "./CommentForm";
import Comments from "./Comments";

interface Blog {
  title?: string;
  // Add other properties as needed
}

interface Details2Props {
  blog: Blog;
}

export default function Details2({ blog }: Details2Props) {
  return (
    <>
      <div className="image img-top">
        <Image
          src="/image/page-title/page-title-4.jpg"
          alt=""
          className="lazyload"
          width={1920}
          height={804}
        />
      </div>
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="blog-content blog-details-2-content blog-details-content">
              <div className="blog-details-top">
                <a href="#" className="tag label text-btn-uppercase">
                  Finance
                </a>
                <h2>
                  {blog.title?.split(" ").slice(0, 4).join(" ") ??
                    "How to Effectively Manage"}{" "}
                  <br />
                  {blog.title?.split(" ").slice(4).join(" ") ??
                    "Business Cash Flow"}
                </h2>
                <div className="meta">
                  <a href="#" className="meta-content">
                    <div className="icon">
                      <i className="icon-calendarBlank" />
                    </div>
                    <div className="text body-2">February 28, 2025</div>
                  </a>
                  <a href="#" className="meta-content">
                    <div className="icon">
                      <i className="icon-user" />
                    </div>
                    <div className="text body-2">Tony Nguyen</div>
                  </a>
                </div>
              </div>
              <div className="image-blog">
                <Image
                  src={"/image/blog/image-blog-4.jpg"}
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
                  technological advancements, and shifting consumer behaviors.
                  For businesses, this means that risks are inevitable—but they
                  can also be managed effectively. The key is to develop a
                  proactive risk management strategy that allows your business
                  to thrive even in uncertain conditions.
                </p>
                <p className="body-2">
                  Test your crisis management plan with regular simulations to
                  ensure that your team knows what to do if an emergency arises.
                  A well-prepared team can minimize downtime and protect your
                  reputation.
                </p>
              </div>
              <div className="cols-img">
                <div className="image-blog">
                  <Image
                    src="/image/blog/image-blog-5.jpg"
                    alt=""
                    className="lazyload"
                    width={444}
                    height={334}
                  />
                </div>
                <div className="image-blog">
                  <Image
                    src="/image/blog/image-blog-6.jpg"
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
                    your business faces. This includes both internal and
                    external risks such as financial instability, supply chain
                    disruptions, cybersecurity threats, and market fluctuations.
                    Conduct a thorough risk assessment to identify and
                    categorize risks based on their potential impact and
                    likelihood of occurrence.
                  </p>
                </div>
                <div className="desc-blog">
                  <h5 className="title-desc">
                    2. Diversify Your Business Operations
                  </h5>
                  <p className="body-2">
                    Diversification is one of the most effective ways to
                    mitigate risk. By expanding your products, services, or
                    markets, you reduce your dependency on a single source of
                    revenue. In a volatile market, diversification provides a
                    safety net, as declines in one area can be offset by growth
                    in another.
                  </p>
                </div>
                <div className="desc-blog">
                  <h5 className="title-desc">
                    3. Build a Strong Financial Buffer
                  </h5>
                  <p className="body-2">
                    Cash flow is the lifeblood of any business, and during
                    volatile periods, having a strong financial buffer is
                    critical. Ensure your business has access to adequate
                    working capital to cover unforeseen expenses or downturns.
                    This might mean reducing non-essential spending or setting
                    up an emergency fund.
                  </p>
                </div>
              </div>
              <div className="desc-blog">
                <h5 className="title-desc">Conclusion</h5>
                <p className="body-2">
                  Managing business risks in a volatile market requires a
                  combination of foresight, preparation, and agility. By
                  conducting thorough risk assessments, diversifying your
                  operations, building financial resilience, staying informed,
                  and having a solid crisis management plan, you can navigate
                  uncertainty and turn potential threats into opportunities for
                  growth.
                </p>
              </div>
              <div className="tab-list">
                <div className="left tab-item">
                  <div className="text">Tag:</div>
                  <div className="tabs-list">
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
        </div>
        {/* /.main-content */}
      </div>
    </>
  );
}
