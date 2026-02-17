"use client";

import Image from "next/image";
import React from "react";
import { BrandProduct } from "@/types/brands";

interface Props {
  product: BrandProduct;
  brandName: string;
}

export default function ProductDetail({ product, brandName }: Props) {
  return (
    <div className="section-product-details tf-spacing-2">
      <div className="tf-container">
        <div className="row mb-66 rg-60">
          <div className="col-lg-6">
            <div className="thumbs-slider">
              <div className="image">
                <Image
                  src={product.imagePath || "/image/placeholder.jpg"}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="lazyload"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    backgroundColor: "#fff",
                    padding: "2rem",
                    borderRadius: "8px",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="tf-product-info-wrap position-relative ml-50">
              <div className="tf-product-info-heading">
                <h4 className="name-product">{product.name}</h4>
                <p className="text-muted mb-3" style={{ fontSize: '0.9rem' }}>
                  Brand: <strong>{brandName}</strong>
                </p>
              </div>
              <div className="tf-product-info-desc">
                {product.description && (
                  <div 
                    className="product-description"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                    style={{
                      fontSize: '1rem',
                      lineHeight: '1.8',
                      color: '#666',
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
