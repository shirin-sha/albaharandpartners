"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { products } from "@/data/products";
import { Swiper, SwiperSlide } from "swiper/react";
import AddtoCart from "../common/AddtoCart";
import AddToQuickview from "../common/AddToQuickview";
import { Pagination } from "swiper/modules";

export default function RelatedProducts() {
  return (
    <section className="section-related-products tf-spacing-3">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center">
              <h4>Related Products</h4>
            </div>
            <Swiper
              dir="ltr"
              className="swiper sw-layout sw-product"
              breakpoints={{
                0: { slidesPerView: 1 },
                575: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                992: {
                  spaceBetween: 30,
                },
                1200: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
              modules={[Pagination]}
              pagination={{
                clickable: true,
                el: ".spe10",
              }}
            >
              {products.slice(0, 4).map((product, i) => (
                <SwiperSlide className="swiper-slide">
                  <div className="product-item hover-img">
                    <div className="image">
                      <Link href={`/products-details/${product.id}`}>
                        <Image
                          src={product.imgSrc}
                          alt={product.title}
                          className="lazyload"
                          width={300}
                          height={300}
                        />
                      </Link>
                      <AddtoCart product={product} />
                      <div className="list-icon">
                        <div className="icon icon-1">
                          <a href="#">
                            <i className="icon-heart" />
                          </a>
                        </div>
                        <div className="icon icon-2">
                          <a href="#">
                            <i className="icon-gitDiff" />
                          </a>
                        </div>
                        <AddToQuickview product={product} />
                      </div>
                    </div>
                    <div className="product-item-content">
                      <ul className="ratings">
                        <li>
                          <i className="icon-star" />
                        </li>
                        <li>
                          <i className="icon-star" />
                        </li>
                        <li>
                          <i className="icon-star" />
                        </li>
                        <li>
                          <i className="icon-star" />
                        </li>
                        <li>
                          <i className="icon-star" />
                        </li>
                        <li>
                          <span className="color-on-suface-variant-1">
                            (1.234)
                          </span>
                        </li>
                      </ul>
                      <Link
                        href={`/products-details/${product.id}`}
                        className="name-product title"
                      >
                        {product.title}
                      </Link>
                      <div className="price title">
                        {" "}
                        ${product.price.toFixed(2)}
                        {product.oldPrice && (
                          <span className="compare-at-price">
                            ${product.oldPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <div className="sw-pagination-layout flex justify-content-center spe10" />
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
