import Link from "next/link";
import Image from "next/image";
import React from "react";
import { BlogsSection as BlogsSectionType } from "@/types/homepage";

interface BlogsSectionProps {
  content: BlogsSectionType;
  language?: 'ltr' | 'rtl';
}

export default function BlogsSection({ content, language = 'ltr' }: BlogsSectionProps) {
  if (!content.isActive) {
    return null;
  }

  const activePosts = content.posts
    .filter(post => post.isActive);

  if (activePosts.length === 0) {
    return null;
  }

  return (
    <section className="section-new h-8 tf-spacing-2 section-one-page" id="new" dir={language}>
      <div className="tf-container position-relative">
        <div className="row">
          <div className="col-12">
            <div className="heading-section style-2">
              <div className="left">
                <div className="text-anime-wave">
                  <span className="tag label text-btn-uppercase">
                    {content.tag}
                  </span>
                </div>
                <h3 className="title-section mb-12 text-anime-wave">
                  {content.heading}
                </h3>
                <div className="sub-title body-2 text-anime-wave">
                  {content.subheading}
                </div>
              </div>
              <div className="text-anime-wave-2">
                <Link
                  href={content.buttonLink || '/news-updates'}
                  className="tf-btn style-1 bg-color-primary"
                >
                  <span>{content.buttonText}</span>
                </Link>
              </div>
            </div>
            <div
              className="swiper sw-new-h8 sw-layout"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              {activePosts.map((post, index) => (
                <div key={index}>
                  <div className="tf-post-grid style-absolute style-3 hover-img">
                    <div className="image" style={{ aspectRatio: "473 / 630" }}>
                      <Image
                        src={post.imagePath}
                        alt={post.title}
                        fill
                        sizes="(max-width: 575px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                      <Link href={post.link || "#"} className="link" aria-label={`Read more about ${post.title}`} />
                      <div className="date" aria-hidden="true">
                        <span className="day">{post.date.day}</span>
                        <span className="label">{post.date.month}</span>
                      </div>
                    </div>
                    <div className="tf-grid-post-content">
                      <div className="position label text-btn-uppercase mb-12">
                        {post.category}
                      </div>
                      <h5 className="title-post">
                        <Link href={post.link || "#"}>
                          {post.title}
                        </Link>
                      </h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
