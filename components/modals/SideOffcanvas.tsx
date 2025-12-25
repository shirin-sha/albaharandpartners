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
        <h4 className="title-content fw-7">Start Your Consultation</h4>
        <p>
          Partner-led technology solutions in Kuwait—delivered with structured
          implementation, security-first practices, and dependable post-deployment
          support.
        </p>
      </div>
      <div className="contact-mega-menu meag-menu-item">
        <h4 className="title-content fw-7">Reach Us</h4>
        <ul className="contact-list-mega-menu">
          <li>
            <p>
              Email:
              <a href="mailto:enquiries@albaharandpartners.com">
                {" "}
                enquiries@albaharandpartners.com{" "}
              </a>
            </p>
          </li>
          <li>
            <p>
              Call: <a href="tel:+965XXXXXXXX"> +965 XXXXXXXX</a>
            </p>
          </li>
          <li>
            <p>
              Service Requests:
              <a href="mailto:support@albaharandpartners.com">
                {" "}
                support@albaharandpartners.com{" "}
              </a>
            </p>
          </li>
          <li>
            <p>
              Location: <span>Kuwait</span>
            </p>
          </li>
        </ul>
      </div>
      {/* <div className="list-img">
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
      </div> */}
    </div>
  );
}
