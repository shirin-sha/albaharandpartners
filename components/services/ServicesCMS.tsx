import Link from "next/link";
import Image from "next/image";
import React from "react";
import { SolutionsContent } from "@/types/solutions";

interface Props {
  data: SolutionsContent;
}

export default function ServicesCMS({ data }: Props) {
  if (!data.isActive) return null;

  const solutions = data.solutions || [];

  return (
    <div className="tf-container">
      <div className="row">
        <div className="col-12">
          <div className="list-section-services-item tf-spacing-2">
            {solutions.map((solution, index) => {
              if (!solution.isActive) return null;
              
              return (
                <div className="section-services-item style-border" key={solution.id || index}>
                  <div className="image tf-animate-1">
                    <Link
                      href={`/services-details-1?id=${solution.id}`}
                      className="link"
                    />
                    <Image
                      src={solution.imgSrc}
                      alt={solution.title}
                      className="lazyload"
                      width={solution.imgWidth || 590}
                      height={solution.imgHeight || 590}
                    />
                  </div>
                  <div className="services-content">
                    <div className="heading">
                      <h3 className="wow fadeInUp">
                        <Link
                          href={`/services-details-1?id=${solution.id}`}
                          className="name-services"
                        >
                          {solution.title}
                        </Link>
                      </h3>
                      <div
                        className="sub-name body-2 wow fadeInUp"
                        dangerouslySetInnerHTML={{ __html: solution.description }}
                      ></div>
                    </div>
                    {solution.benefits && solution.benefits.length > 0 && (
                      <div className="benefit-lists">
                        {solution.benefits.map((benefit, bIndex) => (
                          <div className="benefit-items" key={bIndex}>
                            <div className="icon wow fadeInUp">
                              <i className="icon-checkbox" />
                            </div>
                            <div
                              className="title wow fadeInUp"
                              data-wow-delay=".1s"
                            >
                              {benefit}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="wow fadeInUp">
                      <Link
                        href={`/services-details-1?id=${solution.id}`}
                        className="tf-btn style-1 bg-color-primary"
                      >
                        <span> View Services </span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
