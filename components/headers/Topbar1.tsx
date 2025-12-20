import React from "react";
import LanguageDropdown from "./LanguageSelect";

export default function Topbar1() {
  return (
    <div className="top-bar">
      <div className="tf-container w-1870">
        <div className="row">
          <div className="col-12">
            <div className="top-bar-inner">
              <div className="tf-tb-left">
                <div className="top-bar-content">
                  <i className="icon-MapPin" />
                  <p className="caption-1">
                    101 E 129th St, East Chicago, IN 46312, US
                  </p>
                </div>
                <div className="top-bar-content">
                  <i className="icon-Envelope" />
                  <a href="#" className="caption-1 color-white">
                    example@gmail.com
                  </a>
                </div>
                <LanguageDropdown />
              </div>
              <div className="tf-tb-right">
                <div className="top-bar-content tf-phone-topbar">
                  <div className="icon">
                    <i className="icon-PhoneCall" />
                  </div>
                  <p className="text-btn">1-555-678-8888</p>
                </div>
                <div className="tf-tb-social">
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
    </div>
  );
}
