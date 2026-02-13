import Image from "next/image";
import React from "react";
import { BrandsContent } from "@/types/brands";

interface Props {
  data: BrandsContent;
}

export default function BrandsCMS({ data }: Props) {
  if (!data.isActive) return null;

  const activeBrands = (data.brands || [])
    .filter(brand => brand.isActive);

  if (activeBrands.length === 0) return null;

  return (
    <section className="section-brand h-7 section-one-page" id="brands">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            {data.tag && (
              <div className="heading-section text-center mb-40">
                <div className="text-anime-wave-1">
                  <a href="#" className="tag label text-btn-uppercase">
                    {data.tag}
                  </a>
                </div>
                <h3 className="title-section text-anime-wave-1 mb-12">
                  {data.heading}
                </h3>
                {data.subheading && (
                  <div className="sub-title body-2 text-anime-wave-1">
                    {data.subheading}
                  </div>
                )}
              </div>
            )}
            <div className="tf-marquee tf-spacing-25">
              <div className="marquee-wrapper">
                <div className="initial-child-container">
                  {activeBrands.map((brand, index) => (
                    <div className="marquee-child-item" style={{ marginRight: '60px' }} key={brand._id || index}>
                      <a href={brand.link || "#"} className="brand-item" target="_blank" rel="noopener noreferrer">
                        <Image
                          alt={brand.name}
                          src={brand.imagePath}
                          width={280}
                          height={55}
                          style={{ width: '280px', height: '55px', objectFit: 'contain' }}
                        />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
