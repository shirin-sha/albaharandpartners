"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import NavOnepage from "./NavOnepage";
import Nav from "./Nav";
import CartLength from "../common/CartLength";
import SearchButton from "./SearchButton";

export default function Header4({ onepage = false }) {
  const [isFixed, setIsFixed] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={`header style-2 header-fixed  ${isFixed ? "is-fixed" : ""}`}
      id="header"
    >
      <div className="header-top">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <div className="header-content">
                <div className="header-left w-300">
                  <div
                    className="tf-dropdown-sort tf-language"
                    data-bs-toggle="dropdown"
                  >
                    <div className="btn-select">
                      <span className="text-sort-value label">EN</span>
                      <i className="icon-Arrow-Down" />
                    </div>
                    <div className="dropdown-menu">
                      <div className="select-item" data-sort-value="EN">
                        <span className="text-value-item">EN</span>
                      </div>
                      <div className="select-item" data-sort-value="VN">
                        <span className="text-value-item">VN</span>
                      </div>
                    </div>
                  </div>
                  <div className="top-bar-content">
                    <i className="icon-Envelope" />
                    <a href="#" className="caption-1 color-white">
                      example@gmail.com
                    </a>
                  </div>
                </div>
                <div className="logo">
                  <a href="#">
                    <Image
                      alt=""
                      src="/image/logo/logo-3.svg"
                      width={170}
                      height={40}
                    />
                  </a>
                </div>
                <div className="header-right w-300">
                  <ul className="tf-social">
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
            </div>
          </div>
        </div>
      </div>
      <div className="header-bottom bg-1">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <div className="header-content">
                <div className="logo-mobile">
                  <Link href={`/digital-transformation`}>
                    <Image
                      alt=""
                      src="/image/logo/logo.svg"
                      width={169}
                      height={40}
                    />
                  </Link>
                </div>
                <div className="header-left">
                  <div className="tf-phone no-border">
                    <a href="#" className="icon">
                      <i className="icon-PhoneCall" />
                    </a>
                    <div className="content">
                      <p className="caption-2">Have any Question?</p>
                      <a href="#">1-555-678-8888</a>
                    </div>
                  </div>
                </div>
                <nav className="main-menu">
                  <ul
                    className={` menu-primary-menu ${
                      onepage ? "navigation" : ""
                    } `}
                  >
                    {onepage ? <NavOnepage /> : <Nav />}
                  </ul>
                </nav>
                <div className="header-right">
                  <div className="nav-icon">
                    <div className="nav-search">
                      <SearchButton />
                    </div>
                    <div className="nav-cart">
                      <Link href={`/shopping-cart`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={25}
                          height={25}
                          viewBox="0 0 25 25"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_393_8)">
                            <path
                              d="M21.0547 5.13965H4.55469C4.14047 5.13965 3.80469 5.47543 3.80469 5.88965V19.3896C3.80469 19.8039 4.14047 20.1396 4.55469 20.1396H21.0547C21.4689 20.1396 21.8047 19.8039 21.8047 19.3896V5.88965C21.8047 5.47543 21.4689 5.13965 21.0547 5.13965Z"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M3.80469 8.13965H21.8047"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M16.5547 11.1396C16.5547 12.1342 16.1596 13.088 15.4563 13.7913C14.7531 14.4946 13.7992 14.8896 12.8047 14.8896C11.8101 14.8896 10.8563 14.4946 10.153 13.7913C9.44978 13.088 9.05469 12.1342 9.05469 11.1396"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_393_8">
                              <rect
                                width={24}
                                height={24}
                                fill="white"
                                transform="translate(0.804688 0.639648)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <span className="number label">
                          <CartLength />
                        </span>
                      </Link>
                    </div>
                    <div className="canvas-btn">
                      <a href="#canvnasMegamenu" data-bs-toggle="offcanvas">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M4 6H20.5"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M4 12H16"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M4 18L17.9647 18"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </div>
                    <div className="mobile-button">
                      <a href="#canvasMobile" data-bs-toggle="offcanvas">
                        <span />
                        <span />
                        <span />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
