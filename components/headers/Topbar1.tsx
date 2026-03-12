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
                  Kuwait City, Kuwait
                  </p>
                </div>
                <div className="top-bar-content">
                  <i className="icon-Envelope" />
                  <a href="#" className="caption-1 color-white">
                  info@albahargroup.com
                  </a>
                </div>
                {/* <LanguageDropdown /> */}
              </div>
              <div className="tf-tb-right">
                <div className="top-bar-content tf-phone-topbar">
                  <div className="icon">
                    <i className="icon-PhoneCall" />
                  </div>
                  <p className="text-btn">+965 XXXXXXXX</p>
                </div>
                <div className="tf-tb-social">
                  <ul className="tf-social">
                    <li className="item">
                      <a href="#" aria-label="LinkedIn">
                        <div className="icon">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.784 2.167A1.667 1.667 0 1 1 .45 2.166a1.667 1.667 0 0 1 3.334.001m.05 2.9H.5v10.434h3.334zm5.266 0H5.784v10.434h3.283v-5.475c0-3.05 3.975-3.334 3.975 0V15.5h3.292V8.892c0-5.141-5.884-4.95-7.267-2.425z"/>
                          </svg>
                        </div>
                      </a>
                    </li>
                    <li className="item">
                      <a href="#" aria-label="Instagram">
                        <div className="icon">
                          <i className="icon-ig1" />
                        </div>
                      </a>
                    </li>
                    <li className="item">
                      <a href="#" aria-label="X (Twitter)">
                        <div className="icon">
                          <i className="icon-x" />
                        </div>
                      </a>
                    </li>
                    <li className="item">
                      <a href="#" aria-label="Facebook">
                        <div className="icon">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.666 10.255H8.75l.833-3.333H6.666V5.255c0-.858 0-1.666 1.667-1.666h1.25v-2.8a23 23 0 0 0-2.38-.117c-2.263 0-3.87 1.38-3.87 3.916v2.334h-2.5v3.333h2.5v7.083h3.333z"/>
                          </svg>
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
