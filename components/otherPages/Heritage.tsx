import Image from "next/image";
import React from "react";

export default function Heritage() {
  return (
    <section className="section-why-choose h-2 tf-spacing-2">
      <div className="tf-container position-relative">
        <div className="row rg-60 align-items-center">
          <div className="col-lg-6">
            <div className="image mr-15 tf-animate-1">
              <Image
                src="/image/section/founder.jpg" // Replace with your founder image
                alt="Mr. Mohamed Abdulrahman Al-Bahar"
                className="lazyload"
                width={615}
                height={615}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="section-content ml-15">
              <div className="heading-section">
                <div className="wow fadeInUp">
                  <a href="#" className="tag label text-btn-uppercase">
                    Our Heritage
                  </a>
                </div>
                <h3 className="title-section wow fadeInUp mb-12">
                  Our founder, Mr. Mohamed
                  <br />
                  Abdulrahman Al-Bahar
                </h3>
                <div className="sub-title body-2 wow fadeInUp">
                  <p className="mb-20">
                    Stands as the visionary behind the growth of our company
                    since its inception in 1937. His impact reverberates through
                    the corridors of modern Kuwait, where he helped pioneer
                    several cornerstones of the country's blossoming economy.
                  </p>
                  <p className="mb-20">
                    Mr. Mohamed Al-Bahar's influence also extended far beyond
                    business. He was instrumental in shaping Kuwait's public
                    institutions, including the Kuwait Chamber of Commerce,
                    Educational Council, Health Council, and more, steering the
                    nation towards modernity and self-sufficiency.
                  </p>
                  <p>
                    A true humanitarian, he espoused the ethos of community
                    service across a variety of causes. Among his many accolades,
                    he was honored with the "Order of the British Empire" (OBE)
                    by Queen Elizabeth in 2003, a testament to his enduring
                    legacy of excellence and compassion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

