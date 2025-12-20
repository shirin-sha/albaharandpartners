import Header7 from "@/components/headers/Header7";
import About from "@/components/common/About";
import Benefits from "@/components/common/Benefits";
import CaseStudies from "@/components/homes/consulting-agency/CaseStudies";
import Contact from "@/components/common/Contact";
import Features from "@/components/common/Features2";
import Hero from "@/components/homes/consulting-agency/Hero";
import Process from "@/components/common/Process";
import Services from "@/components/common/Services2";
import Testimonials from "@/components/common/Testimonials";
import Blogs from "@/components/common/Blogs";
import React from "react";
import Cta from "@/components/common/Cta";
import Footer1 from "@/components/footers/Footer1";
import { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Consulting Agency One Page || FinWice - Business & Finance Consulting - React Nextjs Template",
  description:
    "FinWice - Business & Finance Consulting - React Nextjs Template",
};
export default function page() {
  return (
    <>
      <div className="mb-20" />
      <Header7 onepage />
      <Hero />
      <div className="main-content">
        <Benefits />
        <About />
        <Services />
        <Process />
        <Features />
        <CaseStudies />
        <Testimonials />
        <Contact />
        <Blogs />
        <Cta />
      </div>
      <Footer1 />
    </>
  );
}
