"use client";
import { useContextElement } from "@/context/Context";
import { TeamMember } from "@/types/team";

import Image from "next/image";
import React from "react";

export default function TeamModal() {
  const { currentTeamMember } = useContextElement() as {
    currentTeamMember: TeamMember;
  };
  return (
    <div
      className="offcanvas offcanvas-end offcanvasTeamsDetails"
      id="canvnasTeamsDetails"
    >
      <button
        className="close-btn"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      >
        <i className="icon-close1" />
      </button>
      <div className="wg-team-details">
        <div className="image">
          <Image
            src={currentTeamMember.imgSrc}
            data-=""
            alt=""
            className="lazyload"
            width={480}
            height={640}
          />
        </div>
        <div className="team-details-content">
          <div className="top-team-details mb-40">
            <div className="position text-btn text-btn-uppercase mb-12">
              {currentTeamMember.position}
            </div>
            <h3 className="name mb-24">{currentTeamMember.name}</h3>
            <ul className="tf-social color-on-suface-container style-border radius-50 g-12 mb-24">
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
            <div className="desc body-2">
              Emily Johnson is a highly respected investment strategist with
              over 15 years of experience in the financial sector. Specializing
              in portfolio management and long-term investment planning, she is
              dedicated to helping businesses and individuals achieve their
              financial goals. Emily employs a strategic and personalized
              approach, tailoring investment solutions to each client’s unique
              financial needs. Her commitment to delivering results and
              promoting financial growth makes her a key member of our team,
              guiding clients toward sustainable and profitable investments.
            </div>
          </div>
          <div className="infomation-team content mb-40">
            <h4 className="mb-16">Infomation</h4>
            <div className="cols">
              <div className="age infomation-content item">
                <div className="label">AGE:</div>
                <h6 className="content">28 years old</h6>
              </div>
              <div className="age infomation-content item">
                <div className="label">EMAIL:</div>
                <h6 className="content">
                  <a href="#"> themesflat@gmail.com</a>
                </h6>
              </div>
            </div>
            <div className="cols">
              <div className="age infomation-content item">
                <div className="label">WHATSAPP:</div>
                <h6 className="content">
                  <a href="#">(555) 123-4567</a>
                </h6>
              </div>
              <div className="age infomation-content item">
                <div className="label">FROM</div>
                <h6 className="content">
                  <a href="#">Los Angeles,California</a>
                </h6>
              </div>
            </div>
          </div>
          <div className="content experience-team">
            <h4 className="mb-16">Experience</h4>
            <div className="experience-item">
              <div className="label text-btn-uppercase">EDUCATION:</div>
              <h6>
                Master's in Finance from
                <br />
                Harvard University
              </h6>
            </div>
            <div className="experience-item">
              <div className="label text-btn-uppercase">EXPERIENCE:</div>
              <h6>
                Goldman Sachs
                <br />
                JP Morgan
              </h6>
            </div>
            <div className="experience-item">
              <div className="label text-btn-uppercase">AWARDS:</div>
              <h6>
                Top Investment of the Year
                <br />
                Excellence in Financial <br />
                Planning
              </h6>
            </div>
            <div className="experience-item">
              <div className="label text-btn-uppercase">
                YEARS OF EXPERIENCE:
              </div>
              <h6>15 years</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
