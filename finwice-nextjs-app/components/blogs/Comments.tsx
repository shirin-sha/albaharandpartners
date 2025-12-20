import Image from "next/image";
import React from "react";

export default function Comments() {
  return (
    <div className="wg-comment comment-content">
      <h4 className="title-wg-comment">03 Comments</h4>
      <div className="comment-item">
        <div className="image">
          <Image
            src="/image/avatar/avt-2.jpg"
            alt=""
            className="lazyload"
            width={90}
            height={90}
          />
        </div>
        <div className="comment-item-content">
          <div className="top">
            <div className="info">
              <a href="#" className="name title">
                {" "}
                Guy Hawkins{" "}
              </a>
              <div className="time">1 days ago</div>
            </div>
          </div>
          <div className="desc body-2">
            This article really hits the mark! Diversifying business operations
            is something we've been working on, and it has definitely helped us
            navigate the ups and downs of the market.
          </div>
          <a href="#comment-form" className="tf-btn-reply">
            {" "}
            Reply{" "}
          </a>
        </div>
      </div>
      <div className="comment-item reply">
        <div className="image">
          <Image
            src="/image/avatar/avt-3.jpg"
            alt=""
            className="lazyload"
            width={90}
            height={90}
          />
        </div>
        <div className="comment-item-content">
          <div className="top">
            <div className="info">
              <a href="#" className="name">
                {" "}
                Tony Nguyen{" "}
              </a>
              <div className="time caption-1">2 days ago</div>
            </div>
          </div>
          <div className="desc body-2">
            Glad you found it helpful! Diversification has been a game-changer
            for many businesses, especially during volatile periods. Building a
            strong financial buffer really does provide peace of mind, doesn’t
            it?
          </div>
          <a href="#comment-form" className="tf-btn-reply">
            {" "}
            Reply{" "}
          </a>
        </div>
      </div>
      <div className="comment-item">
        <div className="image">
          <Image
            src="/image/avatar/avt-3.jpg"
            alt=""
            className="lazyload"
            width={90}
            height={90}
          />
        </div>
        <div className="comment-item-content">
          <div className="top">
            <div className="info">
              <a href="#" className="name title">
                {" "}
                John Smith{" "}
              </a>
              <div className="time">3 days ago</div>
            </div>
          </div>
          <div className="desc body-2">
            Interesting read, but I’m actually looking for advice on improving
            customer retention. Any articles or resources you can recommend on
            that topic?
          </div>
          <a href="#comment-form" className="tf-btn-reply">
            {" "}
            Reply{" "}
          </a>
        </div>
      </div>
    </div>
  );
}
