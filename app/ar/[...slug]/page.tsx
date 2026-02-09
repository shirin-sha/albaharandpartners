import { notFound } from 'next/navigation';
import Footer2 from "@/components/footers/Footer2";
import FooterCMS from "@/components/footers/FooterCMS";
import HeaderCMS from "@/components/headers/HeaderCMS";
import Header7 from "@/components/headers/Header7";
import React from "react";
import { Metadata } from "next";
import { getHeaderContent, getFooterContent, getAboutUsContent, getSolutionsContent, getContactUsContent, getSupportContent, getCareersContent, getCustomerStoriesContent, getNewsUpdatesContent, getBrandsContent } from "@/lib/data-fetch";
import Breadcumb from "@/components/common/Breadcumb";
import AboutAlBaharCMS from "@/components/otherPages/AboutAlBaharCMS";
import VisionMissionValuesCMS from "@/components/otherPages/VisionMissionValuesCMS";
import HeritageCMS from "@/components/otherPages/HeritageCMS";
import AboutBDSCMS from "@/components/otherPages/AboutBDSCMS";
import AboutBPCCMS from "@/components/otherPages/AboutBPCCMS";
import TeamCMS from "@/components/otherPages/TeamCMS";
import HistoryCMS from "@/components/otherPages/HistoryCMS";
import FaqsCMS from "@/components/otherPages/FaqsCMS";
import ServicesCMS from "@/components/services/ServicesCMS";
import ContactCMS from "@/components/otherPages/ContactCMS";
import MapCMS from "@/components/otherPages/MapCMS";
import SupportServicesCMS from "@/components/otherPages/SupportServicesCMS";
import SupportContactCMS from "@/components/otherPages/SupportContactCMS";
import About from "@/components/otherPages/About";
import CareerCMS from "@/components/otherPages/CareerCMS";
import CustomerStoriesCMS from "@/components/case-studies/CustomerStoriesCMS";
import NewsUpdatesCMS from "@/components/blogs/NewsUpdatesCMS";
import BrandsCMS from "@/components/case-studies/BrandsCMS";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: slugArray } = await params;
  const slug = slugArray?.[0] || '';
  const pageName = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
  
  return {
    title: `Al bahar partners - ${pageName} (Arabic)`,
    description: "",
  };
}

export default async function ArabicPage({ params }: PageProps) {
  const { slug: slugArray } = await params;
  const slug = slugArray?.[0] || '';
  const language: 'ltr' | 'rtl' = 'rtl';

  // If no slug, redirect to home (handled by /ar/page.tsx)
  if (!slug || slug === '') {
    notFound();
  }

  // Get header and footer for RTL
  const [headerContent, footerContent] = await Promise.all([
    getHeaderContent(language),
    getFooterContent(language),
  ]);

  // Render page content based on slug
  let pageContent: React.ReactNode = null;

  switch (slug) {
    case 'about-us': {
      const content = await getAboutUsContent(language);
      const headerData = content?.header || {
        breadcrumb: "About Us",
        title: "About Us",
        subtitle: "Discover our mission to empower clients with expert solutions for confident, sustainable growth and success.",
        language: "rtl" as const,
        isActive: true,
      };
      pageContent = (
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
            {content?.aboutBPC && <AboutBPCCMS data={content.aboutBPC} />}
            {content?.team && <TeamCMS data={content.team} />}
            {content?.history && <HistoryCMS data={content.history} />}
            {content?.faqs && <FaqsCMS data={content.faqs} />}
          </div>
        </>
      );
      break;
    }

    case 'solutions': {
      const content = await getSolutionsContent(language);
      const headerData = content?.header || {
        breadcrumb: "Solutions",
        title: "Solutions",
        subtitle: "",
        language: "rtl" as const,
        isActive: true,
      };
      pageContent = (
        <>
          {headerData.isActive && (
            <div className="page-title style-1 bg-img-8">
              <div className="tf-container">
                <div className="page-title-content">
                  <Breadcumb pageName={headerData.breadcrumb} />
                  <h2 className="title-page-title">{headerData.title}</h2>
                  {headerData.subtitle && (
                    <div className="sub-title body-2" dangerouslySetInnerHTML={{ __html: headerData.subtitle }} />
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="main-content">
            {content && <ServicesCMS data={content} />}
          </div>
        </>
      );
      break;
    }

    case 'contact-us': {
      const content = await getContactUsContent(language);
      const headerData = content?.header || {
        breadcrumb: "Contact Us",
        title: "Contact Us",
        subtitle: "Explore success stories from businesses that achieved growth through our tailored strategies and solutions.",
        language: "rtl" as const,
        isActive: true,
      };
      pageContent = (
        <>
          {headerData.isActive && (
            <div className="page-title style-1 bg-img-8">
              <div className="tf-container position-relative">
                <div className="page-title-content">
                  <Breadcumb pageName={headerData.breadcrumb} />
                  <h2 className="title-page-title">{headerData.title}</h2>
                  {headerData.subtitle && (
                    <div className="sub-title body-2" dangerouslySetInnerHTML={{ __html: headerData.subtitle.replace(/\n/g, '<br />') }} />
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="main-content">
            {content && (
              <>
                <ContactCMS data={content} />
                <MapCMS data={content} />
              </>
            )}
          </div>
        </>
      );
      break;
    }

    case 'support': {
      const content = await getSupportContent(language);
      const headerData = content?.header || {
        breadcrumb: "Support",
        title: "Support",
        subtitle: "From incident resolution to preventive maintenance, our support teams keep your operations secure, stable, and always available.",
        language: "rtl" as const,
        isActive: true,
      };
      pageContent = (
        <>
          {headerData.isActive && (
            <div className="page-title style-1 bg-img-8">
              <div className="tf-container">
                <div className="page-title-content">
                  <Breadcumb pageName={headerData.breadcrumb} />
                  <h2 className="title-page-title">{headerData.title}</h2>
                  {headerData.subtitle && (
                    <div className="sub-title body-2" dangerouslySetInnerHTML={{ __html: headerData.subtitle.replace(/\n/g, '<br />') }} />
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="main-content">
            {content && (
              <>
                <SupportServicesCMS data={content} />
                <SupportContactCMS data={content} />
              </>
            )}
          </div>
        </>
      );
      break;
    }

    case 'career': {
      const content = await getCareersContent(language);
      const headerData = content?.header || {
        breadcrumb: "Careers",
        title: "Careers",
        subtitle: "Join our team of industry experts and make a meaningful impact. Discover opportunities to grow your career with us in a dynamic & rewarding environment.",
        language: "rtl" as const,
        isActive: true,
      };
      pageContent = (
        <>
          {headerData.isActive && (
            <div className="page-title style-1 bg-img-8">
              <div className="tf-container">
                <div className="page-title-content">
                  <Breadcumb pageName={headerData.breadcrumb} />
                  <h2 className="title-page-title">{headerData.title}</h2>
                  {headerData.subtitle && (
                    <div className="sub-title body-2" dangerouslySetInnerHTML={{ __html: headerData.subtitle.replace(/\n/g, '<br />') }} />
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="main-content">
            <About />
            {content && <CareerCMS data={content} />}
          </div>
        </>
      );
      break;
    }

    case 'customer-stories': {
      const content = await getCustomerStoriesContent(language);
      const headerData = content?.header || {
        breadcrumb: "Customer Stories",
        title: "Customer Stories",
        subtitle: "See how Al Bahar & Partners helps organizations strengthen security, improve visibility, and modernize IT through proven technology deployments.",
        language: "rtl" as const,
        isActive: true,
      };
      pageContent = (
        <>
          {headerData.isActive && (
            <div className="page-title style-1 bg-img-8">
              <div className="tf-container">
                <div className="page-title-content">
                  <Breadcumb pageName={headerData.breadcrumb} />
                  <h2 className="title-page-title">{headerData.title}</h2>
                  {headerData.subtitle && (
                    <div className="sub-title body-2" dangerouslySetInnerHTML={{ __html: headerData.subtitle.replace(/\n/g, '<br />') }} />
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="main-content">
            {content && <CustomerStoriesCMS data={content} />}
          </div>
        </>
      );
      break;
    }

    case 'news-updates': {
      const content = await getNewsUpdatesContent(language);
      const headerData = content?.header || {
        breadcrumb: "News & Updates",
        title: "News & Updates",
        subtitle: "",
        language: "rtl" as const,
        isActive: true,
      };
      pageContent = (
        <>
          {headerData.isActive && (
            <div className="page-title style-1 bg-img-8">
              <div className="tf-container">
                <div className="page-title-content">
                  <Breadcumb pageName={headerData.breadcrumb} />
                  <h2 className="title-page-title">{headerData.title}</h2>
                  {headerData.subtitle && (
                    <div className="sub-title body-2" dangerouslySetInnerHTML={{ __html: headerData.subtitle.replace(/\n/g, '<br />') }} />
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="main-content">
            {content && <NewsUpdatesCMS data={content} />}
          </div>
        </>
      );
      break;
    }

    case 'brands': {
      const content = await getBrandsContent(language);
      const headerData = content?.header || {
        breadcrumb: "Brands",
        title: "Brands",
        subtitle: "",
        language: "rtl" as const,
        isActive: true,
      };
      pageContent = (
        <>
          {headerData.isActive && (
            <div className="page-title style-1 bg-img-8">
              <div className="tf-container">
                <div className="page-title-content">
                  <Breadcumb pageName={headerData.breadcrumb} />
                  <h2 className="title-page-title">{headerData.title}</h2>
                  {headerData.subtitle && (
                    <div className="sub-title body-2" dangerouslySetInnerHTML={{ __html: headerData.subtitle.replace(/\n/g, '<br />') }} />
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="main-content">
            {content && <BrandsCMS data={content} />}
          </div>
        </>
      );
      break;
    }

    default:
      notFound();
  }

  return (
    <>
      <div className="mb-20" />
      {headerContent ? <HeaderCMS data={headerContent} /> : <Header7 />}
      {pageContent}
      {footerContent ? <FooterCMS data={footerContent} /> : <Footer2 />}
    </>
  );
}
