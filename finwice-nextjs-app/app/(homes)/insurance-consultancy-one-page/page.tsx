import Footer1 from "@/components/footers/Footer1";
import Header7 from "@/components/headers/Header7";
import About from "@/components/homes/insurance-consultancy/About";
import Benefits from "@/components/homes/insurance-consultancy/Benefits";
import CaseStudies from "@/components/homes/insurance-consultancy/CaseStudies";
import Cta from "@/components/homes/insurance-consultancy/Cta";
import Hero from "@/components/homes/insurance-consultancy/Hero";
import Process from "@/components/homes/insurance-consultancy/Process";
import Services from "@/components/homes/insurance-consultancy/Services";
import Team from "@/components/homes/insurance-consultancy/Team";
import Testimonials from "@/components/homes/insurance-consultancy/Testimonials";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Insurance Consultancy One Page || FinWice - Business & Finance Consulting - React Nextjs Template",
  description:
    "FinWice - Business & Finance Consulting - React Nextjs Template",
};
export default function page() {
  return (
    <>
      <div className="mb-20" />
      <div className="m-40">
        <Header7 onepage />
        <Hero />
        <div className="main-content">
          <Benefits />
          <About />
          <Services />
          <Process />
          <Team />
          <Testimonials />
          <CaseStudies />
          <Cta />
        </div>
        <Footer1 parentClass="footer h-6" />
      </div>
    </>
  );
}
