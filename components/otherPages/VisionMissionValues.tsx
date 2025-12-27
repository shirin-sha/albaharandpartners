import Image from "next/image";
import React from "react";

export default function VisionMissionValues() {
  const items = [
    {
      id: 1,
      imgSrc: "/image/section/process-item-1.jpg", // Replace with your vision image
      imgWidth: 321,
      imgHeight: 320,
      label: "Vision",
      title: "Our long-term direction and aspiration.",
      description: "To Always be the Most Trusted and Best-in-Class Partner.",
      points: [], // Vision doesn't have bullet points
    },
    {
      id: 2,
      imgSrc: "/image/section/process-item-2.jpg", // Replace with your mission image
      imgWidth: 321,
      imgHeight: 320,
      label: "Mission",
      title: "How we create value every day.",
      description:
        "Delivering excellence and success by directing our values, talents, resources and expertise to maximize customer satisfaction and to achieve sustainable growth for all stakeholders.",
      points: [], // Mission doesn't have bullet points
    },
    {
      id: 3,
      imgSrc: "/image/section/process-item-3.jpg", // Replace with your values image
      imgWidth: 321,
      imgHeight: 320,
      label: "Values",
      title: "Principles that guide our behaviour and decisions.",
      description: "",
      points: [
        "We deliver on our commitments.",
        "We view our people as the source of our strength.",
        "We work together as a team.",
        "We listen, we care, we respect.",
        "We seek continual self and work improvement.",
      ],
    },
  ];

  return (
    <section
      className="section-process h-5 bg-surface tf-spacing-2 section-one-page"
      id="vision-mission-values"
    >
      <div className="tf-container position-relative">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center">
              <div className="text-anime-wave-1">
                <a href="#" className="tag label text-btn-uppercase">
                  What Guides Us
                </a>
              </div>
              <h3 className="text-anime-wave-1 mb-12">
                What Guides Us and Drives Our Future
              </h3>
              <div className="sub-title body-2 text-anime-wave-1">
                Guided by a clear vision, driven by a shared mission and
                anchored in strong values, we partner with stakeholders to
                create sustainable, long-term success.
              </div>
            </div>
            <div className="process-list" style={{ alignItems: "flex-start" }}>
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="process-item style-2 hover-img"
                  style={{ alignSelf: "flex-start" }}
                >
                  <div className="image">
                    <Image
                      src={item.imgSrc}
                      alt={item.label}
                      className="lazyload"
                      width={item.imgWidth}
                      height={item.imgHeight}
                    />
                  </div>
                  <span className="label text-btn-uppercase color-primary">
                    {item.label}
                  </span>
                  <div className="process-content">
                    <h5>
                      <a href="#" className="name-process">
                        {item.title}
                      </a>
                    </h5>
                    <div className="desc">
                      {item.description}
                      {item.points && item.points.length > 0 && (
                        <div className="benefit-lists mt-20">
                          {item.points.map((point, i) => (
                            <div key={i} className="benefit-items">
                              <div className="icon">
                                <i className="icon-checkbox" />
                              </div>
                              <div className="title">{point}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

