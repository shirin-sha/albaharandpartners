import Footer2 from "@/components/footers/Footer2";
import Header7 from "@/components/headers/Header7";
import About from "@/components/homes/tax-advisory/About";
import Blogs from "@/components/homes/tax-advisory/Blogs";
import Brands from "@/components/homes/tax-advisory/Brands";
import CaseStudies from "@/components/homes/it-consulting/CaseStudies";
import Faqs from "@/components/homes/tax-advisory/Faqs";
import Features from "@/components/homes/tax-advisory/Features";
import Hero from "@/components/homes/tax-advisory/Hero";
import Process from "@/components/homes/tax-advisory/Process";
import Services from "@/components/homes/it-consulting/Services";
import Testimonials from "@/components/homes/it-consulting/Testimonials";
import React from "react";
import { Metadata } from "next";
import Processconsult from "@/components/homes/it-consulting/Process";
export const metadata: Metadata = {
  title:
    "Al bahar partners",
  description:
    "",
};
export default function page() {
  return (
    <>
      <div className="mb-20" />
      <Header7 />
      <Hero />
      <div className="main-content">
        <About />
        <Processconsult />
    
        <Services />
        <Testimonials />
        <Brands />
        <CaseStudies />
 
        <Features />
      
    
      </div>
      <Footer2 />
    </>
  );
}
