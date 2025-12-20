"use client";
import Image from "next/image";
import React, { useState } from "react";
import ModalVideo from "../common/ModalVideo";
import { socialIcons, teamData } from "@/data/team";
import { useContextElement } from "@/context/Context";

export default function Team() {
  const [isOpen, setIsOpen] = useState(false);
  const { setCurrentTeamMember } = useContextElement();
  return (
    <>
      <section className="section-about page-team tf-spacing-2">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <div className="heading-section text-center">
                <div className="text-anime-wave-1">
                  <a href="#" className="tag label text-btn-uppercase">
                    WE ARE FinWice
                  </a>
                </div>
                <h3 className="title-section mb-20 text-anime-wave-1">
                  Delivering Excellence with Every Client
                  <br />
                  Partnership
                </h3>
                <div className="sub-title body-2 color-on-suface-container text-anime-wave-1">
                  Explore the diverse expertise of our licensed professionals,
                  dedicated to delivering tailored
                  <br />
                  financial solutions and strategic advice for your business
                  success.
                </div>
              </div>
              <div className="wg-video w-full img-2">
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
        </div>
      </section>
      <div className="section-team page-team tf-spacing-3">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <div className="heading-section text-center">
                <div className="text-anime-wave-1">
                  <a href="#" className="tag label text-btn-uppercase">
                    Our Teams
                  </a>
                </div>
                <h3 className="title-section text-anime-wave-1 mb-12">
                  Meet Our Expert Consultants
                </h3>
                <div className="sub-title body-2 color-on-suface-container text-anime-wave-1">
                  Experienced professionals committed to driving your business
                  success.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tf-container">
          <div className="row rg-30">
            {teamData.map((member, index) => (
              <div className="col-lg-3 col-sm-6" key={index}>
                <div className="team-item hover-img">
                  <div className="image">
                    <Image
                      src={member.imgSrc}
                      alt={member.name}
                      className="lazyload"
                      width={300}
                      height={401}
                    />
                    <a
                      href="#canvnasTeamsDetails"
                      onClick={() => setCurrentTeamMember(member)}
                      data-bs-toggle="offcanvas"
                      className="link"
                    />
                    <div className="team-social">
                      <ul className="tf-social bg-1 radius-50 g-8">
                        {socialIcons.map((icon, i) => (
                          <li className="item" key={i}>
                            <a href="#">
                              <div className="icon">
                                <i className={icon} />
                              </div>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="team-content">
                    <h5 className="name-team">
                      <a
                        href="#canvnasTeamsDetails"
                        onClick={() => setCurrentTeamMember(member)}
                        data-bs-toggle="offcanvas"
                      >
                        {member.name}
                      </a>
                    </h5>
                    <div className="position caption-1">{member.position}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ModalVideo
        videoId={"XHOmBV4js_E"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}
