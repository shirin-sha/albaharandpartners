import TyperComponent from "@/components/common/TyperComponent";
import React from "react";

export default function Hero() {
  return (
    <div dir="ltr" className="page-title-home img-3 style-absolute">
      <div className="page-title-inner">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <div className="page-title-content">
                <h2 className="color-white mb-36">
                  Execute your B2B sales with
                  <div className="d-block animationtext clip color-text-1">
                    <TyperComponent
                      className="color-text-1 item-text"
                      strings={[
                        "AI & Automation Solutions",
                        "Cloud Migration Solutions",
                        "Data Analytics",
                        "Cubersecurity Solutions",
                      ]}
                    />
                    |
                  </div>
                  for sustained
                  <br />
                  growth
                </h2>
                <a href="#" className="tf-btn style-1 bg-white">
                  <span>Get A Free Consultation</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
