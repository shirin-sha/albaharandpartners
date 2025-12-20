import Blogs from "@/components/common/Blogs";
import Cta from "@/components/common/Cta";
import Footer2 from "@/components/footers/Footer2";
import Header7 from "@/components/headers/Header7";
import About from "@/components/homes/digital-transformation/About";
import Awards from "@/components/homes/digital-transformation/Awards";
import Contact from "@/components/homes/digital-transformation/Contact";
import Features from "@/components/common/Features";
import Hero from "@/components/homes/digital-transformation/Hero";
import Services from "@/components/homes/digital-transformation/Services";
import Services2 from "@/components/homes/digital-transformation/Services2";
import Team from "@/components/homes/digital-transformation/Team";
import VideoSection from "@/components/homes/digital-transformation/VideoSection";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Digital Transformation One Page || FinWice - Business & Finance Consulting - React Nextjs Template",
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
        <VideoSection />
        <Services />
        <Features />
        <Services2 />
        <Cta />
        <Team />
        <Contact />
        <Blogs />
        <Awards />
      </div>
      <Footer2 />
    </>
  );
}
