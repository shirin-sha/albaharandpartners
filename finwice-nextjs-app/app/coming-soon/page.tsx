import NewsLetterForm from "@/components/common/NewsLetterForm";
import Image from "next/image";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Comming Soon || FinWice - Business & Finance Consulting - React Nextjs Template",
  description:
    "FinWice - Business & Finance Consulting - React Nextjs Template",
};
export default function page() {
  return (
    <>
      <div className="main-content">
        {/* coming-soon */}
        <section className="coming-soon">
          <div className="coming-soon-inner">
            <div className="left">
              <div className="content">
                <h1 className="heading title-display mb-40">Coming Soon</h1>
                <div className="footer-subscribe style-bg-white mb-40 pb-0">
                  <h5 className="color-white mb-20">
                    Subscribe to enter the waitlist
                  </h5>
                  <NewsLetterForm />
                  <div className="text">
                    By clicking subscribe you agree to our Terms &amp;
                    conditions
                  </div>
                </div>
                <div className="box-agent g-20 no-border align-items-center">
                  <div className="list-img">
                    <div className="img-avata item item-1 no-border">
                      <Image
                        src="/image/avatar/box-agent-5.jpg"
                        alt=""
                        className="lazyload"
                        width={48}
                        height={48}
                      />
                    </div>
                    <div className="img-avata item item-2 no-border">
                      <Image
                        src="/image/avatar/box-agent-6.jpg"
                        alt=""
                        className="lazyload"
                        width={48}
                        height={48}
                      />
                    </div>
                    <div className="img-avata item item-3 no-border">
                      <Image
                        src="/image/avatar/box-agent-7.jpg"
                        alt=""
                        className="lazyload"
                        width={48}
                        height={48}
                      />
                    </div>
                    <div className="img-avata item item-4 no-border">
                      <Image
                        src="/image/avatar/box-agent-8.jpg"
                        alt=""
                        className="lazyload"
                        width={48}
                        height={48}
                      />
                    </div>
                  </div>
                  <div className="text color-white">
                    <span className="title">4k+</span>
                    <span className="body-2"> clients already subscribed</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="tf-countdown-lg">
                <div
                  className="js-countdown"
                  data-timer={1099102}
                  data-labels="Days,Hours,Min,Sec"
                />
              </div>
            </div>
          </div>
        </section>
        {/* /coming-soon */}
      </div>
    </>
  );
}
