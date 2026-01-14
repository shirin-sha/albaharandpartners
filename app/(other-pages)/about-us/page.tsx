import Link from "next/link";

import Benefits from "@/components/common/Benefits";
import About from "@/components/common/About";
import React from "react";
import History from "@/components/otherPages/History";
import Features from "@/components/common/Features2";
import Testimonials from "@/components/otherPages/Testimonials";
import Cta from "@/components/common/Cta2";
import Awards from "@/components/common/Awards";
import Breadcumb from "@/components/common/Breadcumb";
import { Metadata } from "next";
import AboutAlBahar from "@/components/otherPages/AboutAlBahar";
import Team from "@/components/homes/digital-transformation/Team";
import Faqs from "@/components/homes/home-1/Faqs";
import VisionMissionValues from "@/components/otherPages/VisionMissionValues";
import Heritage from "@/components/otherPages/Heritage";
import AboutBPC from "@/components/otherPages/AboutBPC";
import AboutBDS from "@/components/otherPages/AboutBDS";
import Contact from "@/components/homes/digital-transformation/Contact";
export const metadata: Metadata = {
  title:
    "About us || Al bahar and partners",
  description:
    "Al bahar and partners",
};
export default function page() {
  return (
    <>
      <div className="page-title style-1 bg-img-8">
        <div className="tf-container">
          <div className="page-title-content">
            <Breadcumb pageName="About Us" />
            <h2 className="title-page-title">About Us</h2>
            <div className="sub-title body-2">
              Discover our mission to empower clients with expert solutions for
              confident,
              <br />
              sustainable growth and success.
            </div>
          </div>
        </div>
      </div>
      <div className="main-content">
        <AboutAlBahar />
        <VisionMissionValues />
        <Heritage />
        <AboutBDS />
        <Contact />
     
      
     
        <Team />
      
      
        <History />
        <Faqs />
    
      
   \
      </div>
    </>
  );
}
