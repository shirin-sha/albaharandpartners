import React from "react";

export default function Benefits() {
  return (
    <section className="section-benefit h-3">
      <div className="box-icon-list">
        <div className="box-icon">
          <div className="icon color-primary">
            <i className="icon-tailored-business" />
          </div>
          <div className="box-content">
            <h5>
              <a href="#" className="title-box">
                Tailored Business Strategies
              </a>
            </h5>
            <div className="sub-title">
              Customized solutions that align with your specific business goals,
              driving long-term.
            </div>
          </div>
        </div>
        <div className="box-icon">
          <div className="icon color-primary">
            <i className="icon-expert-market" />
          </div>
          <div className="box-content">
            <h5>
              <a href="#" className="title-box">
                {" "}
                Expert Market Insights{" "}
              </a>
            </h5>
            <div className="sub-title">
              Gain access to in-depth market analysis and trends, helping you
              make informed decisions.
            </div>
          </div>
        </div>
        <div className="box-icon">
          <div className="icon color-primary">
            <i className="icon-strategic-planning" />
          </div>
          <div className="box-content">
            <h5>
              <a href="#" className="title-box">
                {" "}
                Operational Efficiency{" "}
              </a>
            </h5>
            <div className="sub-title">
              Improve processes and optimize resources for better performance
              and cost.
            </div>
          </div>
        </div>
        <div className="box-icon">
          <div className="icon color-primary">
            <i className="icon-tax" />
          </div>
          <div className="box-content">
            <h5>
              <a href="#" className="title-box">
                {" "}
                Sustainable Growth{" "}
              </a>
            </h5>
            <div className="sub-title">
              Achieve steady, sustainable growth through innovative strategies
              designed for.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
