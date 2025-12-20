import Footer1 from "@/components/footers/Footer1";
import Header7 from "@/components/headers/Header7";
import About from "@/components/homes/home-1/About";
import Awards from "@/components/common/Awards";
import Benefits from "@/components/homes/home-1/Benefits";
import Blogs from "@/components/common/Blogs";
import CaseStudies from "@/components/homes/home-1/CaseStudies";
import Cta from "@/components/common/Cta2";
import Faqs from "@/components/homes/home-1/Faqs";
import Hero from "@/components/homes/home-1/Hero";
import Process from "@/components/homes/home-1/Process";
import Services from "@/components/common/Services";
import Testimonials from "@/components/homes/home-1/Testimonials";
import { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Home One page || FinWice - Business & Finance Consulting - React Nextjs Template",
  description:
    "FinWice - Business & Finance Consulting - React Nextjs Template",
};
export default function Home() {
  return (
    <>
      <div className="mb-20" />
      <Header7 onepage />
      <Hero />
      <div className="main-content">
        <About />
        <Benefits />
        <Services />
        <Process />
        <CaseStudies />
        <Testimonials />
        <Faqs />
        <Blogs />
        <Awards />
        <Cta />
      </div>
      <Footer1 />
    </>
  );
}
