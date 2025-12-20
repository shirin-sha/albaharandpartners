import React from "react";

export default function Faqs() {
  return (
    <>
      {" "}
      <div className="according-item style-arrow style-small">
        <h6>
          <a
            href="#according1"
            data-bs-toggle="collapse"
            className="title-according collapsed"
          >
            What consulting services do you offer?
            <i className="icon-chevron-down" />
          </a>
        </h6>
        <div id="according1" className="collapse" data-bs-parent="#According1">
          <div className="according-content">
            <p>
              We conduct in-depth assessments of your business needs, industry
              landscape, and competitive environment to develop customized
              strategies that align with your specific goals.
            </p>
          </div>
        </div>
      </div>
      <div className="according-item style-arrow style-small">
        <h6>
          <a
            href="#according2"
            data-bs-toggle="collapse"
            className="title-according collapsed"
          >
            How do your services integrate with existing business structures?
            <i className="icon-chevron-down" />
          </a>
        </h6>
        <div id="according2" className="collapse" data-bs-parent="#According1">
          <div className="according-content">
            <p>
              We conduct in-depth assessments of your business needs, industry
              landscape, and competitive environment to develop customized
              strategies that align with your specific goals.
            </p>
          </div>
        </div>
      </div>
      <div className="according-item style-arrow style-small">
        <h6>
          <a
            href="#according3"
            data-bs-toggle="collapse"
            className="title-according collapsed"
          >
            Can I tailor your consulting services to suit my business?{" "}
            <i className="icon-chevron-down" />
          </a>
        </h6>
        <div id="according3" className="collapse" data-bs-parent="#According1">
          <div className="according-content">
            <p>
              We conduct in-depth assessments of your business needs, industry
              landscape, and competitive environment to develop customized
              strategies that align with your specific goals.
            </p>
          </div>
        </div>
      </div>
      <div className="according-item style-arrow style-small">
        <h6>
          <a
            href="#according4"
            data-bs-toggle="collapse"
            className="title-according collapsed"
          >
            What kind of ongoing consultation do you offer after the initial
            service?
            <i className="icon-chevron-down" />
          </a>
        </h6>
        <div id="according4" className="collapse" data-bs-parent="#According1">
          <div className="according-content">
            <p>
              We conduct in-depth assessments of your business needs, industry
              landscape, and competitive environment to develop customized
              strategies that align with your specific goals.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
