"use client";

import Image from "next/image";

import React, { useState } from "react";
import { useContextElement } from "@/context/Context";

import DropdownSelect from "../common/DropdownSelect";
import Slider from "./Slider";
import { Product } from "@/types/products";
export default function Details({ product }: { product: Product }) {
  const colorOptions = [
    {
      id: "type-1",
      src: "/image/type-color-item/type-1.jpg",
      width: 40,
      height: 41,
    },
    {
      id: "type-2",
      src: "/image/type-color-item/type-2.jpg",
      width: 38,
      height: 39,
    },
    {
      id: "type-3",
      src: "/image/type-color-item/type-3.jpg",
      width: 40,
      height: 41,
    },
  ];
  const [selected, setSelected] = useState("type-2"); // default active
  const [value, setValue] = useState(1);

  const { addProductToCart, isAddedToCartProducts } = useContextElement();

  return (
    <div className="section-product-details tf-spacing-2">
      <div className="tf-container">
        <div className="row mb-66 rg-60">
          <div className="col-lg-6">
            <div className="thumbs-slider">
              <Slider selected={selected} setSelected={setSelected} />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="tf-product-info-wrap position-relative ml-50">
              <div className="tf-zoom-main" />
              <div className="tf-product-info-sold">
                <div className="icon">
                  <i className="icon-Lightning" />
                </div>
                <div className="text">
                  18&nbsp;sold in last&nbsp;32&nbsp;hours
                </div>
              </div>
              <div className="tf-product-info-heading">
                <h4 className="name-product">{product.title}</h4>
              </div>
              <div className="tf-product-info-desc">
                <div className="tf-product-info-price">
                  <h4 className="price-on-sale font-2 cart-price">
                    ${product.price.toFixed()}
                  </h4>
                  {product.oldPrice ? (
                    <>
                      <h5 className="compare-at-price font-2">
                        ${product.oldPrice.toFixed(2)}
                      </h5>
                      <div className="badges-on-sale text-btn-uppercase">
                        -25%
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <p>
                  The most popular organization items sold together in a set at
                  a discounted price. Each piece is made to sit flush with each
                  other and can be re-arranged to fit your space.
                </p>
              </div>
              <div className="tf-product-info-choose-option">
                <div className="variant-picker-item">
                  <div className="variant-picker-label title">
                    Type:
                    <span className="text-title">White Oak</span>
                  </div>
                  <div className="variant-picker-values">
                    {colorOptions.map((option) => (
                      <React.Fragment key={option.id}>
                        <input
                          type="radio"
                          checked={selected === option.id}
                          readOnly
                        />
                        <label
                          onClick={() => setSelected(option.id)}
                          className={`hover-tooltip tooltip-bot color-btn ${
                            selected === option.id ? "active" : ""
                          }`}
                        >
                          <a
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            className="image"
                          >
                            <Image
                              src={option.src}
                              alt=""
                              className="lazyload"
                              width={option.width}
                              height={option.height}
                            />
                          </a>
                        </label>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div className="tf-product-info-quantity">
                  <div className="title">Quantity:</div>
                  <div className="wg-quantity">
                    <span
                      className="btn-quantity btn-decrease"
                      onClick={() =>
                        setValue((pre) => (pre == 1 ? 1 : pre - 1))
                      }
                    >
                      -
                    </span>
                    <input
                      className="quantity-product"
                      type="text"
                      name="number"
                      value={value}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        if (v > 0) {
                          setValue(v);
                        }
                      }}
                    />
                    <span
                      className="btn-quantity btn-increase"
                      onClick={() => setValue((pre) => pre + 1)}
                    >
                      +
                    </span>
                  </div>
                </div>
                <div className="mb-20">
                  <div className="tf-product-info-by-btn">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        addProductToCart(product.id, value);
                      }}
                      className="tf-btn style-2 w-full text-center bg-on-suface-container btn-add-to-cart"
                    >
                      <span>
                        {isAddedToCartProducts(product.id)
                          ? "Already Added"
                          : "Add To Cart"}{" "}
                        -&nbsp;
                      </span>
                      <span className="cart-total tf-qty-price total-price">
                        ${(product.price * value).toFixed(2)}
                      </span>
                    </a>
                    <a
                      href="#compare"
                      data-bs-toggle="offcanvas"
                      className="icon hover-tooltip compare btn-icon-action"
                    >
                      <i className="icon icon-gitDiff" />
                    </a>
                    <a
                      href="#"
                      className="icon hover-tooltip text-caption-2 wishlist btn-icon-action"
                    >
                      <i className="icon icon-heart" />
                    </a>
                  </div>
                  <a
                    href="#"
                    className="tf-btn w-full style-2 bg-color-primary text-center"
                  >
                    <span>Buy It Now</span>
                  </a>
                </div>
                <div className="tf-product-info-help mb-20">
                  <p className="text-product-info-help mb-8">
                    Pickup available at <a href="#">Shop location</a>. Usually
                    ready in 24 hours
                  </p>
                  <div className="dropdown dropdown-store-location mb-11">
                    <div
                      className="dropdown-title dropdown-backdrop"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      role="group"
                    >
                      <div className="tf-product-info-view">
                        <div className="icon">
                          <i className="icon-MapPin" />
                        </div>
                        <span>View Store Information</span>
                      </div>
                    </div>
                    <div className="dropdown-menu dropdown-menu-end">
                      <div className="dropdown-content">
                        <div className="dropdown-content-heading">
                          <h5>Store Location</h5>
                          <i className="icon icon-close1" />
                        </div>
                        <div className="line-bt" />
                        <div>
                          <h6>Fashion Modave</h6>
                          <p>Pickup available. Usually ready in 24 hours</p>
                        </div>
                        <div>
                          <p>766 Rosalinda Forges Suite 044,</p>
                          <p>Gracielahaven, Oregon</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tf-product-info-time tf-product-info-item mb-12">
                    <div className="icon">
                      <i className="icon-timer" />
                    </div>
                    <p className="text-caption-1">
                      Estimated Delivery:&nbsp;<span>12-26 days</span>
                      (International), <span>3-6 days</span> (United States)
                    </p>
                  </div>
                  <div className="tf-product-info-return tf-product-info-item mb-12">
                    <div className="icon">
                      <i className="icon-arrowclockwise" />
                    </div>
                    <p className="text-caption-1">
                      Return within <span>45 days</span> of purchase. Duties
                      &amp; taxes are non-refundable.
                    </p>
                  </div>
                  <div className="tf-product-info-extra-link">
                    <a
                      href="#delivery_return"
                      data-bs-toggle="modal"
                      className="tf-product-extra-icon"
                    >
                      <div className="icon">
                        <i className="icon-shipping" />
                      </div>
                      <p className="text-caption-1">Delivery &amp; Return</p>
                    </a>
                    <a
                      href="#ask_question"
                      data-bs-toggle="modal"
                      className="tf-product-extra-icon"
                    >
                      <div className="icon">
                        <i className="icon-question" />
                      </div>
                      <p className="text-caption-1">Ask A Question</p>
                    </a>
                    <a
                      href="#share_social"
                      data-bs-toggle="modal"
                      className="tf-product-extra-icon"
                    >
                      <div className="icon">
                        <i className="icon-share" />
                      </div>
                      <p className="text-caption-1">Share</p>
                    </a>
                  </div>
                </div>
                <ul className="tf-product-info-sku">
                  <li>
                    <p className="title-sku">SKU:</p>
                    <p className="content text-1">4321234</p>
                  </li>
                  <li>
                    <p className="title-sku">Available:</p>
                    <p className="content text-1">Instock</p>
                  </li>
                  <li>
                    <p className="title-sku">Categories:</p>
                    <p className="content">
                      <a href="#" className="text-1">
                        tools
                      </a>
                      ,
                      <a href="#" className="text-1">
                        wood
                      </a>
                    </p>
                  </li>
                </ul>
                <div className="tf-product-info-guranteed">
                  <div className="title-guranteed">
                    Guranteed safe checkout:
                  </div>
                  <div className="tf-payment">
                    <a href="#">
                      <Image
                        src="/image/payment/payment-1.png"
                        alt=""
                        className="lazyload"
                        width={100}
                        height={64}
                      />
                    </a>
                    <a href="#">
                      <Image
                        src="/image/payment/payment-2.png"
                        alt=""
                        className="lazyload"
                        width={100}
                        height={64}
                      />
                    </a>
                    <a href="#">
                      <Image
                        src="/image/payment/payment-3.png"
                        alt=""
                        className="lazyload"
                        width={100}
                        height={64}
                      />
                    </a>
                    <a href="#">
                      <Image
                        src="/image/payment/payment-4.png"
                        alt=""
                        className="lazyload"
                        width={98}
                        height={64}
                      />
                    </a>
                    <a href="#">
                      <Image
                        src="/image/payment/payment-5.png"
                        alt=""
                        className="lazyload"
                        width={102}
                        height={64}
                      />
                    </a>
                    <a href="#">
                      <Image
                        src="/image/payment/payment-6.png"
                        alt=""
                        className="lazyload"
                        width={98}
                        height={64}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <div className="widget-tabs-product-review">
              <div className="wg-tab no-border">
                <ul className="tab-product" role="tablist">
                  <li className="nav-tab-item" role="presentation">
                    <h5>
                      <a
                        href="#tab1"
                        data-bs-toggle="tab"
                        role="tab"
                        className=""
                        aria-selected="true"
                      >
                        Description
                      </a>
                    </h5>
                  </li>
                  <li className="nav-tab-item" role="presentation">
                    <h5>
                      <a
                        href="#tab2"
                        data-bs-toggle="tab"
                        role="tab"
                        aria-selected="false"
                        className="active"
                        tabIndex={-1}
                      >
                        Reviews (3)
                      </a>
                    </h5>
                  </li>
                </ul>
              </div>
              <div className="tab-content">
                <div className="tab-pane" id="tab1" role="tabpanel">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla tempora odio dolorum eveniet dignissimos harum ipsam
                    corporis nisi repudiandae rem, quia placeat dolorem sapiente
                    voluptas non reprehenderit alias laboriosam doloremque!
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla tempora odio dolorum eveniet dignissimos harum ipsam
                    corporis nisi repudiandae rem, quia placeat dolorem sapiente
                    voluptas non reprehenderit alias laboriosam doloremque!
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla tempora odio dolorum eveniet dignissimos harum ipsam
                    corporis nisi repudiandae rem, quia placeat dolorem sapiente
                    voluptas non reprehenderit alias laboriosam doloremque!
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla tempora odio dolorum eveniet dignissimos harum ipsam
                    corporis nisi repudiandae rem, quia placeat dolorem sapiente
                    voluptas non reprehenderit alias laboriosam doloremque!
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla tempora odio dolorum eveniet dignissimos harum ipsam
                    corporis nisi repudiandae rem, quia placeat dolorem sapiente
                    voluptas non reprehenderit alias laboriosam doloremque!
                  </p>
                </div>
                <div className="tab-pane active show" id="tab2" role="tabpanel">
                  <div className="review-rating write-cancel-review-wrap">
                    <div className="heading">
                      <div className="score">
                        <h1>4.8</h1>
                        <div className="rating">
                          <i className="icon-star" />
                          <i className="icon-star" />
                          <i className="icon-star" />
                          <i className="icon-star" />
                          <i className="icon-star" />
                          <p className="text">(1,968 Ratings)</p>
                        </div>
                      </div>
                      <div className="progress-rating">
                        <div className="progress-bars">
                          <div className="rating-style-2 text-btn">
                            5
                            <i className="icon-star" />
                          </div>
                          <div className="progress-cart style-2">
                            <div className="value" data-progress={60} />
                          </div>
                          <div className="number-rating text-btn">60%</div>
                        </div>
                        <div className="progress-bars">
                          <div className="rating-style-2 text-btn">
                            4
                            <i className="icon-star" />
                          </div>
                          <div className="progress-cart style-2">
                            <div className="value" data-progress={20} />
                          </div>
                          <div className="number-rating text-btn">20%</div>
                        </div>
                        <div className="progress-bars">
                          <div className="rating-style-2 text-btn">
                            3
                            <i className="icon-star" />
                          </div>
                          <div className="progress-cart style-2">
                            <div className="value" data-progress={10} />
                          </div>
                          <div className="number-rating text-btn">10%</div>
                        </div>
                        <div className="progress-bars">
                          <div className="rating-style-2 text-btn">
                            2
                            <i className="icon-star" />
                          </div>
                          <div className="progress-cart style-2">
                            <div className="value" data-progress={7} />
                          </div>
                          <div className="number-rating text-btn">7%</div>
                        </div>
                        <div className="progress-bars">
                          <div className="rating-style-2 text-btn">
                            1
                            <i className="icon-star" />
                          </div>
                          <div className="progress-cart style-2">
                            <div className="value" data-progress={3} />
                          </div>
                          <div className="number-rating text-btn">3%</div>
                        </div>
                      </div>
                      <div>
                        <a
                          href="#write-review"
                          className="tf-btn style-1 bg-on-suface-container btn-write-review"
                        >
                          <span>Write A Review</span>
                        </a>
                      </div>
                    </div>
                    <div className="comment-review mb-30">
                      <div className="title-comment">
                        <h4>03 Comments</h4>
                        <div className="sort-by">
                          <div className="text">Sort By:</div>

                          <DropdownSelect
                            addtionalParentClass="style-border"
                            options={[
                              "Most Recent",
                              "Most Recent 1",
                              "Most Recent 2",
                            ]}
                          />
                        </div>
                      </div>
                      <div className="wg-comment comment-content">
                        <div className="comment-item style-2">
                          <div className="top">
                            <div className="image">
                              <Image
                                src="/image/avatar/avt-3.jpg"
                                alt=""
                                className="lazyload"
                                width={90}
                                height={90}
                              />
                            </div>
                            <div className="info">
                              <h6>
                                <a href="#" className="name">
                                  Highly impressed!
                                </a>
                              </h6>
                              <div className="time">1 days ago</div>
                            </div>
                          </div>
                          <div className="comment-item-content">
                            <div className="desc body-2">
                              Highly impressed! This storage set not only looks
                              great but also keeps my desk organized and
                              professional. A must-have for any office.
                            </div>
                          </div>
                        </div>
                        <div className="comment-item reply style-2">
                          <div className="top">
                            <div className="image">
                              <Image
                                alt=""
                                src="/image/logo/logo-comment.svg"
                                width={28}
                                height={28}
                              />
                            </div>
                            <div className="info">
                              <h6>
                                <a href="#" className="name">
                                  Reply from FinWice
                                </a>
                              </h6>
                              <div className="time">1 days ago</div>
                            </div>
                          </div>
                          <div className="comment-item-content">
                            <div className="desc body-2">
                              Fantastic product! The sleek design blends
                              perfectly with my office décor, and it holds
                              everything I need. Definitely worth the
                              investment.
                            </div>
                          </div>
                        </div>
                        <div className="comment-item style-2">
                          <div className="top">
                            <div className="image">
                              <Image
                                src="/image/avatar/avt-2.jpg"
                                alt=""
                                className="lazyload"
                                width={90}
                                height={90}
                              />
                            </div>
                            <div className="info">
                              <h6>
                                <a href="#" className="name">
                                  Great quality and design!
                                </a>
                              </h6>
                              <div className="time">1 days ago</div>
                            </div>
                          </div>
                          <div className="comment-item-content">
                            <div className="desc body-2">
                              Great quality and design! The materials feel
                              durable, and it’s helped streamline my workflow.
                              Couldn’t be happier with this purchase.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="wg-comment form-write-review write-review-wrap"
                      id="write-review"
                    >
                      <form
                        onSubmit={(e) => e.preventDefault()}
                        className="write-review comment-content no-border"
                      >
                        <div className="top mb-24">
                          <h4 className="title-form">Write A Review:</h4>
                          <div className="rating-form">
                            <input
                              type="radio"
                              id="star5"
                              name="rating"
                              defaultValue={5}
                            />
                            <label htmlFor="star5" />
                            <input
                              type="radio"
                              id="star4"
                              name="rating"
                              defaultValue={4}
                            />
                            <label htmlFor="star4" />
                            <input
                              type="radio"
                              id="star3"
                              name="rating"
                              defaultValue={3}
                            />
                            <label htmlFor="star3" />
                            <input
                              type="radio"
                              id="star2"
                              name="rating"
                              defaultValue={2}
                            />
                            <label htmlFor="star2" />
                            <input
                              type="radio"
                              id="star1"
                              name="rating"
                              defaultValue={1}
                            />
                            <label htmlFor="star1" />
                          </div>
                        </div>
                        <fieldset className="mb-20">
                          <label htmlFor="review-title" className="mb-8">
                            Review Title
                          </label>
                          <input
                            type="text"
                            placeholder="Give your review a title"
                            id="review-title"
                          />
                        </fieldset>
                        <fieldset>
                          <label htmlFor="review-mess" className="mb-8">
                            Review
                          </label>
                          <textarea
                            placeholder="Write your comment here"
                            id="review-mess"
                            defaultValue={""}
                          />
                        </fieldset>
                        <div className="cols g-20">
                          <fieldset>
                            <input
                              type="text"
                              placeholder="You Name (Public)"
                            />
                          </fieldset>
                          <fieldset>
                            <input
                              type="email"
                              placeholder="Your email (private)"
                            />
                          </fieldset>
                        </div>
                        <fieldset className="check-box mb-20">
                          <input type="checkbox" id="checkbox" />
                          <label htmlFor="checkbox">
                            Save my name, email, and website in this browser for
                            the next time I comment.
                          </label>
                        </fieldset>
                        <div className="bottom-btn">
                          <button
                            type="submit"
                            className="tf-btn style-1 bg-on-suface-container"
                          >
                            <span>Submit Review </span>
                            <i className="icon-arrow-right-2" />
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
