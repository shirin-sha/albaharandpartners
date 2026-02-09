import Footer2 from "@/components/footers/Footer2";
import FooterCMS from "@/components/footers/FooterCMS";
import { FooterContent } from "@/types/footer";
import HeaderCMS from "@/components/headers/HeaderCMS";
import Header7 from "@/components/headers/Header7";
import React from "react";
import { Metadata } from "next";
import HeroSlider from "@/components/homes/cms/HeroSlider";
import AboutSection from "@/components/homes/cms/AboutSection";
import ProcessSection from "@/components/homes/cms/ProcessSection";
import ServicesSection from "@/components/homes/cms/ServicesSection";
import TestimonialSection from "@/components/homes/cms/TestimonialSection";
import BrandsSection from "@/components/homes/cms/BrandsSection";
import CaseStudiesSection from "@/components/homes/cms/CaseStudiesSection";
import FeaturesSection from "@/components/homes/cms/FeaturesSection";
import BlogsSection from "@/components/homes/cms/BlogsSection";
import CtaSection from "@/components/homes/cms/CtaSection";
import {
  HomepageContent,
  BlogsSection as BlogsSectionType,
  CaseStudiesSection as CaseStudiesSectionType,
  ServicesSection as ServicesSectionType,
} from "@/types/homepage";
import { HeaderContent } from "@/types/header";
import { NewsUpdatesContent } from "@/types/news-updates";
import { CustomerStoriesContent } from "@/types/customer-stories";
import { SolutionsContent } from "@/types/solutions";
import {
  getHomepageContent,
  getHeaderContent,
  getFooterContent,
  getNewsUpdatesContent,
  getCustomerStoriesContent,
  getSolutionsContent,
} from "@/lib/data-fetch";

export const metadata: Metadata = {
  title: "Al bahar partners - Arabic",
  description: "",
};

// Arabic / RTL homepage
export default async function Page() {
  const language: "ltr" | "rtl" = "rtl";

  const [content, headerContent, footerContent, newsUpdatesContent, customerStoriesContent, solutionsContent] =
    await Promise.all([
      getHomepageContent(language),
      getHeaderContent(language),
      getFooterContent(language),
      getNewsUpdatesContent(language),
      getCustomerStoriesContent(language),
      getSolutionsContent(language),
    ]);

  return (
    <>
      <div className="mb-20" />
      {headerContent ? <HeaderCMS data={headerContent} /> : <Header7 />}

      {/* CMS-driven Hero Section */}
      {content?.heroSlides && content.heroSlides.length > 0 ? (
        <HeroSlider slides={content.heroSlides} language={language} />
      ) : (
        <div style={{ padding: "50px", background: "#f0f0f0", textAlign: "center" }}>
          <p>No Hero Slides Found - Please add content in admin (RTL)</p>
        </div>
      )}

      <div className="main-content">
        {/* CMS-driven About Section */}
        {content?.aboutSection && <AboutSection content={content.aboutSection} language={language} />}

        {/* CMS-driven Process Section */}
        {content?.processSection && <ProcessSection content={content.processSection} language={language} />}

        {/* CMS-driven Services Section (Solutions preview from single Solutions CMS) */}
        {content?.servicesSection &&
          (() => {
            const baseSection: ServicesSectionType = content.servicesSection;

            const mappedServices =
              solutionsContent?.solutions
                ?.filter((s) => s.isActive)
                .map((s, index) => ({
                  _id: s.id,
                  id: s.id,
                  tabTitle: s.tabTitle,
                  title: s.title,
                  description: s.description,
                  benefits: s.benefits || [],
                  imgSrc: s.imgSrc,
                  order: index,
                  language: baseSection.language,
                  isActive: s.isActive,
                })) || [];

            const servicesSectionForHome: ServicesSectionType = {
              ...baseSection,
              services: mappedServices,
            };

            if (servicesSectionForHome.services.length === 0) {
              return null;
            }

            return <ServicesSection content={servicesSectionForHome} language={language} />;
          })()}

        {/* CMS-driven Testimonial Section */}
        {content?.testimonialSection && (
          <TestimonialSection content={content.testimonialSection} language={language} />
        )}

        {/* CMS-driven Brands Section */}
        {content?.brandsSection && <BrandsSection content={content.brandsSection} language={language} />}

        {/* CMS-driven Case Studies Section */}
        {content?.caseStudiesSection &&
          (() => {
            const baseSection: CaseStudiesSectionType = content.caseStudiesSection;

            const mappedCaseStudies =
              customerStoriesContent?.stories
                ?.filter((s) => s.isActive)
                .sort((a, b) => a.order - b.order)
                .map((s) => ({
                  _id: s._id,
                  title: s.title,
                  description: s.description,
                  imagePath: s.imagePath,
                  link: s.link,
                  order: s.order,
                  language: baseSection.language,
                  isActive: s.isActive,
                })) || [];

            const caseStudiesSectionForHome: CaseStudiesSectionType = {
              ...baseSection,
              caseStudies: mappedCaseStudies,
            };

            if (caseStudiesSectionForHome.caseStudies.length === 0) {
              return null;
            }

            return <CaseStudiesSection content={caseStudiesSectionForHome} language={language} />;
          })()}

        {/* CMS-driven Features Section */}
        {content?.featuresSection && <FeaturesSection content={content.featuresSection} language={language} />}

        {/* CMS-driven Blogs Section */}
        {content?.blogsSection &&
          (() => {
            const baseSection: BlogsSectionType = content.blogsSection;

            const mappedPosts =
              newsUpdatesContent?.posts
                ?.filter((p) => p.isActive)
                .sort((a, b) => a.order - b.order)
                .slice(0, 3)
                .map((p) => ({
                  _id: p._id,
                  title: p.title,
                  category: p.category,
                  imagePath: p.imagePath,
                  date: p.date,
                  link: p.link,
                  order: p.order,
                  language: baseSection.language,
                  isActive: p.isActive,
                })) || [];

            const blogsSectionForHome: BlogsSectionType = {
              ...baseSection,
              posts: mappedPosts,
            };

            if (blogsSectionForHome.posts.length === 0) {
              return null;
            }

            return <BlogsSection content={blogsSectionForHome} language={language} />;
          })()}

        {/* CMS-driven CTA Section */}
        {content?.ctaSection && <CtaSection content={content.ctaSection} language={language} />}
      </div>

      {footerContent ? <FooterCMS data={footerContent} /> : <Footer2 />}
    </>
  );
}

