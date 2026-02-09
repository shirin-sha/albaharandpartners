import Link from "next/link";
import React from "react";
import { CareersContent } from "@/types/careers";

interface Props {
  data: CareersContent;
}

export default function CareerCMS({ data }: Props) {
  if (!data.isActive) return null;

  const activeJobs = (data.jobs || [])
    .filter(job => job.isActive)
    .sort((a, b) => a.order - b.order);

  if (activeJobs.length === 0) return null;

  return (
    <section className="section-new page-career bg-surface tf-spacing-2">
      <div className="tf-container position-relative">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center">
              <div className="text-anime-wave-1">
                <a href="#" className="tag label text-btn-uppercase bg-white">
                  {data.tag}
                </a>
              </div>
              <h3 className="text-anime-wave-1 mb-12">
                {data.heading}
              </h3>
              {data.subheading && (
                <div className="sub-title body-2 text-anime-wave-1">
                  {data.subheading}
                </div>
              )}
            </div>
            <div className="wg-according" id="According1">
              {activeJobs.map((job, index) => (
                <div className="according-item bg-white style-arrow" key={job._id || index}>
                  <h5>
                    <a
                      href={`#according${index + 1}`}
                      data-bs-toggle="collapse"
                      className={index === 0 ? "title-according" : "title-according collapsed"}
                    >
                      {job.title}
                      <i className="icon-chevron-down" />
                    </a>
                  </h5>
                  <div
                    id={`according${index + 1}`}
                    className={index === 0 ? "collapse show" : "collapse"}
                    data-bs-parent="#According1"
                  >
                    <div className="according-content">
                      <div className="content">
                        <div className="job-description item-content item-content-1">
                          <h6 className="title-item">Job Description</h6>
                          <div className="text body-2" dangerouslySetInnerHTML={{ __html: job.description.replace(/\n/g, '<br />') }} />
                        </div>
                        {job.responsibilities && job.responsibilities.length > 0 && (
                          <div className="item-content item-content-1">
                            <h6 className="title-item">The Work You'll Do</h6>
                            <ul>
                              {job.responsibilities.map((responsibility, respIndex) => (
                                <li className="body-2" key={respIndex}>
                                  {responsibility}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div className="item-content item-content-2">
                          <h6 className="title-item">Salary</h6>
                          <div className="price-according mb-20">
                            <h5>{job.salary.amount}</h5>
                            <span>{job.salary.period}</span>
                          </div>
                          <Link
                            href={job.applyLink || "#"}
                            className="tf-btn style-1 bg-on-suface-container"
                          >
                            <span> Apply Job Now </span>
                          </Link>
                        </div>
                      </div>
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
