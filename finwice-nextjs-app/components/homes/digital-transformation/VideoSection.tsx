"use client";

import ModalVideo from "@/components/common/ModalVideo";
import { useState } from "react";

export default function VideoSection() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="tf-container position-relative tf-spacing-3">
        <div className="row">
          <div className="col-12">
            <div className="wg-video w-full">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(true);
                }}
                className="popup-youtube"
              >
                <div className="icon">
                  <i className="icon-Play" />
                </div>
                <div className="wave" />
                <div className="wave" />
                <div className="wave" />
              </a>
            </div>
          </div>
        </div>
      </div>{" "}
      <ModalVideo
        videoId={"XHOmBV4js_E"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}
