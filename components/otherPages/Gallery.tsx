"use client";
import { galleryItems } from "@/data/gallery";
import Image from "next/image";

import React, { useEffect, useState } from "react";
export default function Gallery() {
  const [filteres, setFilteres] = useState(galleryItems);
  const [isLoadedMore, setIsLoadedMore] = useState(false);
  useEffect(() => {
    if (isLoadedMore) {
      setFilteres(galleryItems);
    } else {
      setFilteres(galleryItems.slice(0, 9));
    }
  }, [isLoadedMore]);
  return (
    <div className="loadmore-item-1 gallery-list">
      <div className="tf-container position-relative">
        <div className="row rg-40">
          {filteres.map(({ src, item }, index) => (
            <div key={index} className="col-lg-4 col-md-6 fl-item-1 d-block">
              <div className={`gallery-item item-${item} hover-img`}>
                <div className="image">
                  <Image
                    src={src}
                    alt={`Gallery ${item}`}
                    className="lazyload"
                    width={410}
                    height={546}
                  />
                  <a href="#" className="link" />
                </div>
                <div className="gallery-content">
                  <a href="#" className="icon">
                    <i className="icon-Eye" />
                  </a>
                </div>
              </div>
            </div>
          ))}
          {!isLoadedMore ? (
            <div className="col-12">
              <div
                onClick={() => setIsLoadedMore(true)}
                className="btn-load-more text-center view-more-button-1"
              >
                <button className="tf-btn style-1 bg-on-suface-container btn-loadmore-1">
                  <span>Load More</span>
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
