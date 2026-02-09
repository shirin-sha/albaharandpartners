import Link from "next/link";
import React from "react";
import { Metadata } from "next";
import Breadcumb from "@/components/common/Breadcumb";
import AboutAlBaharCMS from "@/components/otherPages/AboutAlBaharCMS";
import VisionMissionValuesCMS from "@/components/otherPages/VisionMissionValuesCMS";
import HeritageCMS from "@/components/otherPages/HeritageCMS";
import AboutBDSCMS from "@/components/otherPages/AboutBDSCMS";
import Team from "@/components/homes/digital-transformation/Team";
import History from "@/components/otherPages/History";
import Faqs from "@/components/homes/home-1/Faqs";
import Contact from "@/components/homes/digital-transformation/Contact";
import { AboutUsContent } from "@/types/aboutus";

export const metadata: Metadata = {
  title: "About us || Al bahar and partners",
  description: "Al bahar and partners",
};

async function getAboutUsContent(): Promise<AboutUsContent | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/aboutus?language=ltr`, {
      cache: 'no-store', // Always get fresh data
    });
    
    if (!response.ok) {
      console.error('Failed to fetch about us content');
      return null;
    }
    
    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error('Error fetching about us content:', error);
    return null;
  }
}

export default async function AboutUsPage() {
  const content = await getAboutUsContent();

  // Fallback content if CMS data is not available
  const headerData = content?.header || {
    breadcrumb: "About Us",
    title: "About Us",
    subtitle: "Discover our mission to empower clients with expert solutions for confident, sustainable growth and success.",
    language: "ltr" as const,
    isActive: true,
  };

  return (
    <>
      {headerData.isActive && (
        <div className="page-title style-1 bg-img-8">
          <div className="tf-container">
            <div className="page-title-content">
              <Breadcumb pageName={headerData.breadcrumb} />
              <h2 className="title-page-title">{headerData.title}</h2>
              <div className="sub-title body-2" dangerouslySetInnerHTML={{ __html: headerData.subtitle }} />
            </div>
          </div>
        </div>
      )}
      
      <div className="main-content">
        {content?.aboutAlBahar && <AboutAlBaharCMS data={content.aboutAlBahar} />}
        {content?.visionMissionValues && <VisionMissionValuesCMS data={content.visionMissionValues} />}
        {content?.heritage && <HeritageCMS data={content.heritage} />}
        {content?.aboutBDS && <AboutBDSCMS data={content.aboutBDS} />}
        <Contact />
        <Team />
        <History />
        <Faqs />
      </div>
    </>
  );
}
