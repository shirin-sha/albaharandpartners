import React from "react";
import Breadcumb from "@/components/common/Breadcumb";
import { Metadata } from "next";
import ContactCMS from "@/components/otherPages/ContactCMS";
import MapCMS from "@/components/otherPages/MapCMS";
import { ContactUsContent } from "@/types/contact-us";
import { getContactUsContent } from "@/lib/data-fetch";

export const metadata: Metadata = {
  title: "Contact Us - Al Bahar & Partners - Technology Solutions",
  description: "Get in touch with Al Bahar & Partners. Reach out today to discuss how we can support your business goals.",
};

// Static generation with on-demand revalidation (triggered from admin panel)

export default async function ContactUsPage() {
  const content = await getContactUsContent();

  // Fallback content if CMS data is not available
  const headerData = content?.header || {
    breadcrumb: "Contact Us",
    title: "Contact Us",
    subtitle: "Explore success stories from businesses that achieved growth through our tailored strategies and solutions.",
    language: "ltr" as const,
    isActive: true,
  };

  return (
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
}
