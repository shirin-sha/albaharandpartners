"use client";
import Image from "next/image";
import { socialIcons, teamStyle2 } from "@/data/team";
import React from "react";
import { useContextElement } from "@/context/Context";
import Link from "next/link";

export default function Team() {
  const { setCurrentTeamMember } = useContextElement();
  return (
    <section className="section-team h-6 mb-40">
      <div className="section-team-inner">
        <div className="section-content">
          <div className="heading-section style-color-white">
            <div className="wow fadeInUp">
              <a href="#" className="tag label text-btn-uppercase bg-white">
                Our Team
              </a>
            </div>
            <h3 className="title-section wow fadeInUp mb-12">
              Meet Our Experts
            </h3>
            <div className="sub-title body-2 wow fadeInUp">
              Our expert team is here to drive your success with
              <br />
              tailored, innovative solutions.
            </div>
          </div>
          <div className="wow fadeInUp">
            <Link
              href={`/contact-us`}
              className="tf-btn style-1 bg-white mb-40"
            >
              <span> Apply Now! </span>
            </Link>
          </div>
          <div className="box-agent no-border position-relative">
            <div className="list-img">
              <div className="img-avata item item-1 wow fadeInUp">
                <Image
                  src="/image/avatar/box-agent-1.jpg"
                  alt=""
                  className="lazyload"
                  width={96}
                  height={96}
                />
              </div>
              <div
                className="img-avata item item-2 wow fadeInUp"
                data-wow-delay=".1s"
              >
                <Image
                  src="/image/avatar/box-agent-2.jpg"
                  alt=""
                  className="lazyload"
                  width={96}
                  height={96}
                />
              </div>
              <div
                className="img-avata item item-3 wow fadeInUp"
                data-wow-delay=".2s"
              >
                <Image
                  src="/image/avatar/box-agent-3.jpg"
                  alt=""
                  className="lazyload"
                  width={96}
                  height={96}
                />
              </div>
              <div
                className="img-avata item item-4 wow fadeInUp"
                data-wow-delay=".3s"
              >
                <Image
                  src="/image/avatar/box-agent-4.jpg"
                  alt=""
                  className="lazyload"
                  width={90}
                  height={96}
                />
              </div>
            </div>
            <Link
              href={`/contact-us`}
              className="text color-white wow fadeInUp"
              data-wow-delay=".4s"
            >
              Join Our Team!
            </Link>
          </div>
        </div>
        <div className="list-team-item">
          {teamStyle2.map((member, index) => (
            <div
              className="team-item style-2 position-relative hover-img wow fadeInUp"
              data-wow-delay={member.wowDelay}
              key={index}
            >
              <div
                className="image wow fadeInUp"
                data-wow-delay={member.wowDelay}
              >
                <Image
                  src={member.imgSrc}
                  alt={member.name}
                  className="lazyload"
                  width={259}
                  height={259}
                />
                <a
                  href="#canvnasTeamsDetails"
                  data-bs-toggle="offcanvas"
                  className="link"
                  onClick={() => setCurrentTeamMember(member)}
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
                <h5
                  className="name-team wow fadeInUp"
                  data-wow-delay={member.wowDelay}
                >
                  <a
                    href="#canvnasTeamsDetails"
                    onClick={() => setCurrentTeamMember(member)}
                    data-bs-toggle="offcanvas"
                  >
                    {member.name}
                  </a>
                </h5>
                <div
                  className="position caption-1 wow fadeInUp"
                  data-wow-delay={member.wowDelay}
                >
                  {member.position}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
