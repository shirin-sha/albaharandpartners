import React from "react";
import Breadcumb from "@/components/common/Breadcumb";
import { Metadata } from "next";
import CareerCMS from "@/components/otherPages/CareerCMS";
import { CareersContent } from "@/types/careers";
import { getCareersContent } from "@/lib/data-fetch";

export const metadata: Metadata = {
  title: "Careers - Al bahar and partners",
  description: "Join our team of industry experts and make a meaningful impact. Discover opportunities to grow your career with us in a dynamic & rewarding environment.",
};

// Static generation with on-demand revalidation (triggered from admin panel)

export default async function CareersPage() {
  const content = await getCareersContent();

  // Fallback content if CMS data is not available
  const headerData = content?.header || {
    breadcrumb: "Careers",
    title: "Careers",
    subtitle: "Join our team of industry experts and make a meaningful impact. Discover opportunities to grow your career with us in a dynamic & rewarding environment.",
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
              {headerData.subtitle && (
                <div className="sub-title body-2" dangerouslySetInnerHTML={{ __html: headerData.subtitle.replace(/\n/g, '<br />') }} />
              )}
            </div>
          </div>
        </div>
      )}
      <div className="main-content">
        {content && <CareerCMS data={content} />}
      </div>
    </>
  );
}
