import Link from "next/link";
import Image from "next/image";
import React from "react";
import { blogThumbnails } from "@/data/blogs";

export default function SideOffcanvas() {
  return (
    <div
      className="offcanvas offcanvas-end offcanvasMegamenu"
      id="canvnasMegamenu"
    >
      <div className="heading">
        <button
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div className="meag-menu-item">
        <h4 className="title-content fw-7">Finwice Construction</h4>
        <p>
          Nam augue velit, fermentum sed erat non, efficitur interdum lectus.
          Donec hendrerit lorem a dui euismod tempus. Vivamus auctor blandit
          tellus et interdum.
        </p>
      </div>
      <div className="contact-mega-menu meag-menu-item">
        <h4 className="title-content fw-7">Contact Us</h4>
        <ul className="contact-list-mega-menu">
          <li>
            <p>
              Address:
              <a href="#" target="_blank">
                55 East 10th Street, New York, NY 10003, United States
              </a>
            </p>
          </li>
          <li>
            <p>
              Email:
              <a href="mailto:example@gmail.com"> example@gmail.com </a>
            </p>
          </li>
          <li>
            <p>
              Call: <a href="tel:+00012345688"> +000 (123) 456 88</a>
            </p>
          </li>
        </ul>
      </div>
      <div className="list-img">
        {blogThumbnails.map((item, index) => (
          <Link
            className="me-2"
            href={`/blog-details-1/${item.id}`}
            key={index}
          >
            <Image
              src={item.imgSrc}
              alt=""
              className="lazyload"
              width={80}
              height={80}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
