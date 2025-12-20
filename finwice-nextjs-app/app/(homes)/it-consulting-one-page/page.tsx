import Header7 from "@/components/headers/Header7";
import Benefits from "@/components/homes/it-consulting/Benefits";
import Hero from "@/components/homes/it-consulting/Hero";
import Process from "@/components/homes/it-consulting/Process";
import Services from "@/components/homes/it-consulting/Services";
import Testimonials from "@/components/homes/it-consulting/Testimonials";
import Brands from "@/components/common/Brands";
import React from "react";
import CaseStudies from "@/components/homes/it-consulting/CaseStudies";
import Pricing from "@/components/homes/strategy-consulting/Pricing";
import Features from "@/components/homes/it-consulting/Features";
import Blogs from "@/components/homes/it-consulting/Blogs";
import Cta from "@/components/homes/it-consulting/Cta";
import Footer2 from "@/components/footers/Footer2";
import { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "It Consulting One Page || FinWice - Business & Finance Consulting - React Nextjs Template",
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
        <Services />
        <Process />
        <Testimonials />
        <Brands />
        <CaseStudies />
        <Pricing
          parentClass="section-pricing h-3 h-8 tf-spacing-2"
          cardClass="pricing-card-items bg-surface"
        />
        <Features />
        <Blogs />
        <Cta />
      </div>
      <Footer2 parentClass="footer style-2 bg-color-white" light />
    </>
  );
}
