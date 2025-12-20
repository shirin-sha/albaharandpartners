import Footer2 from "@/components/footers/Footer2";
import Header7 from "@/components/headers/Header7";
import About from "@/components/homes/tax-advisory/About";
import Blogs from "@/components/homes/tax-advisory/Blogs";
import Brands from "@/components/homes/tax-advisory/Brands";
import CaseStudies from "@/components/homes/tax-advisory/CaseStudies";
import Faqs from "@/components/homes/tax-advisory/Faqs";
import Features from "@/components/homes/tax-advisory/Features";
import Hero from "@/components/homes/tax-advisory/Hero";
import Process from "@/components/homes/tax-advisory/Process";
import Services from "@/components/homes/tax-advisory/Services";
import Testimonials from "@/components/homes/tax-advisory/Testimonials";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Tax Advisory One Page || FinWice - Business & Finance Consulting - React Nextjs Template",
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
        <About />
        <Services />
        <CaseStudies />
        <Process />
        <Features />
        <Testimonials />
        <Faqs />
        <Blogs />
        <Brands />
      </div>
      <Footer2 />
    </>
  );
}
