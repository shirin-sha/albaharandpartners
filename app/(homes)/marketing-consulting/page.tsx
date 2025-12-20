import Header7 from "@/components/headers/Header7";
import Services1 from "@/components/common/Services";
import About from "@/components/homes/marketing-consulting/About";
import Brands from "@/components/common/Brands";
import Hero from "@/components/homes/marketing-consulting/Hero";
import React from "react";
import Features from "@/components/homes/marketing-consulting/Features";
import Process from "@/components/common/Process2";
import Services from "@/components/common/Services3";
import Faqs from "@/components/homes/marketing-consulting/Faqs";
import Team from "@/components/common/Team";
import Blogs from "@/components/homes/marketing-consulting/Blogs";
import Cta from "@/components/common/Cta";
import Footer2 from "@/components/footers/Footer2";
import { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Marketing Consulting || FinWice - Business & Finance Consulting - React Nextjs Template",
  description:
    "FinWice - Business & Finance Consulting - React Nextjs Template",
};
export default function page() {
  return (
    <>
      <div className="mb-20" />
      <Header7 />
      <Hero />
      <div className="main-content">
        <About />
        <Brands />
        <Services1 />
        <Features />
        <Process />
        <Services />
        <Faqs />
        <Team />
        <Blogs />
        <Cta />
      </div>
      <Footer2 />
    </>
  );
}
