"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useReducer, useState } from "react";
import { categoriesProduct, products } from "@/data/products";
import AddtoCart from "../common/AddtoCart";
import AddToQuickview from "../common/AddToQuickview";
import Slider from "rc-slider";
import DropdownSelect from "../common/DropdownSelect";
import Pagination from "../common/Pagination";
import { initialState, reducer } from "@/reducer/filterReducer";
import { Product } from "@/types/products";
export default function Products() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    price,
    categories,
    filtered,
    sortingOption,
    sorted,

    currentPage,
    itemPerPage,
  } = state;

  const setPrice = (value: any) =>
    dispatch({ type: "SET_PRICE", payload: value });

  const setCategory = (newCategory: string) => {
    if (categories.includes(newCategory)) {
      const updated = [...categories].filter((brand) => brand != newCategory);
      dispatch({ type: "SET_CATEGORIES", payload: updated });
    } else {
      dispatch({
        type: "SET_CATEGORIES",
        payload: [...categories, newCategory],
      });
    }
  };

  const setSortingOption = (value: any) =>
    dispatch({ type: "SET_SORTING_OPTION", payload: value });

  useEffect(() => {
    let filteredArrays: any[] = [];

    if (categories.length) {
      const filteredByCategory = [...products].filter((elm) =>
        categories.every((el: string) => elm.categories.includes(el))
      );
      filteredArrays = [...filteredArrays, filteredByCategory];
    }

    const filteredByPrice = [...products].filter(
      (elm) => elm.price >= price[0] && elm.price <= price[1]
    );
    filteredArrays = [...filteredArrays, filteredByPrice];

    const commonItems = [...products].filter((item) =>
      filteredArrays.every((array) => array.includes(item))
    );
    dispatch({ type: "SET_FILTERED", payload: commonItems });
  }, [price, categories]);

  useEffect(() => {
    if (sortingOption === "Price Ascending") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => a.price - b.price),
      });
    } else if (sortingOption === "Price Descending") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => b.price - a.price),
      });
    } else if (sortingOption === "Title Ascending") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => a.title.localeCompare(b.title)),
      });
    } else if (sortingOption === "Title Descending") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => b.title.localeCompare(a.title)),
      });
    } else {
      dispatch({ type: "SET_SORTED", payload: filtered });
    }
    dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
  }, [filtered, sortingOption]);

  return (
    <div className="section-product-content tf-spacing-2">
      <div className="tf-container">
        <div className="row rg-60">
          <div className="col-xl-9">
            <div className="tf-sort mb-30">
              <div className="tf-sort-left tf-sort-content">
                <div className="text wow fadeInUp">
                  Showing 1-8 of 11 results
                </div>
                <div className="shop-sale wow fadeInUp" data-wow-delay=".1s">
                  <i className="icon-CheckCircle" />
                  Shop sale items only
                </div>
              </div>
              <div className="tf-sort-right tf-sort-content">
                <span
                  className="color-on-suface-variant-1 wow fadeInUp"
                  data-wow-delay=".2s"
                >
                  Sort by:
                </span>

                <DropdownSelect
                  addtionalParentClass="style-border wow fadeInUp"
                  onChange={setSortingOption}
                  options={[
                    "Default",
                    "Title Ascending",
                    "Title Descending",
                    "Price Ascending",
                    "Price Descending",
                  ]}
                />
              </div>
            </div>{" "}
            {sorted.length ? (
              <>
                <div className="row rg-40">
                  {sorted.map((product: Product) => (
                    <div className="col-lg-4 col-md-6" key={product.id}>
                      <div
                        className={`product-item hover-img ${
                          product.oldPrice ? "discount wow fadeInUp" : ""
                        }`}
                      >
                        <div className="image wow fadeInUp">
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
                            <AddToQuickview product={product} />
                          </div>
                        </div>
                        <div className="product-item-content">
                          <Link
                            href={`/products-details/${product.id}`}
                            className="name-product title wow fadeInUp"
                          >
                            {product.title}
                          </Link>
                          <div className="price title wow fadeInUp">
                            ${product.price.toFixed(2)}
                            {product.oldPrice && (
                              <span className="compare-at-price">
                                ${product.oldPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="wg-pagination style-2 wow fadeInUp"
                  data-wow-delay="0s"
                >
                  <ul className="flex">
                    <Pagination />
                  </ul>
                </div>
              </>
            ) : (
              "No item found with for this filter. Please try another filter"
            )}
          </div>
          <div className="col-xl-3">
            <div className="tf-sidebar ml-30">
              <div className="sidebar-item sidebar-search">
                <fieldset>
                  <input type="text" placeholder="Search products..." />
                  <a href="#" className="tf-btn-search">
                    <i className="icon-MagnifyingGlass" />
                  </a>
                </fieldset>
              </div>
              <div className="sidebar-item sidebar-content sidebar-categories">
                <h6 className="title-content">Product Categories</h6>
                <ul className="list">
                  {categoriesProduct.map((label, index) => (
                    <li
                      className={`item ${
                        categories.includes(label) ? "active" : ""
                      } `}
                      key={index}
                    >
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          setCategory(label);
                        }}
                        href="#"
                      >
                        {label}
                      </a>
                      <p>
                        ({" "}
                        {
                          products.filter((elm) =>
                            elm.categories.includes(label)
                          ).length
                        }
                        )
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sidebar-item sidebar-content sidebar-price">
                <h6 className="title-content">Filter By Price</h6>
                <div className="range-slider p-4">
                  <Slider
                    max={100}
                    value={price}
                    onChange={setPrice}
                    min={20}
                    range
                  />
                  <div className="bottom">
                    <div className="value">
                      <div id="skip-value-lower">${price[0].toFixed(2)}</div>
                      <span>-</span>
                      <div id="skip-value-upper">${price[1].toFixed(2)}</div>
                    </div>
                    <a href="" className="tf-btn bg-on-suface-container">
                      <span>Filter</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="sidebar-item sidebar-content sidebar-tags">
                <h6 className="title-content">Popular Tag</h6>
                <div className="tabs-list">
                  <a href="#" className="tabs-item caption-1">
                    Tools
                  </a>
                  <a href="#" className="tabs-item caption-1">
                    Book
                  </a>
                  <a href="#" className="tabs-item caption-1">
                    Software
                  </a>
                  <a href="#" className="tabs-item caption-1">
                    Data
                  </a>
                  <a href="#" className="tabs-item caption-1">
                    Solutions
                  </a>
                  <a href="#" className="tabs-item caption-1">
                    Planning
                  </a>
                  <a href="#" className="tabs-item caption-1">
                    Financial
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
