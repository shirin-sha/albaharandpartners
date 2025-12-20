"use client";
import { useContextElement } from "@/context/Context";
import { Product } from "@/types/products";
import React from "react";
interface AddtoCartProps {
  product: Product;
}

export default function AddToQuickview({ product }: AddtoCartProps) {
  const { setQuickViewItem } = useContextElement();
  return (
    <>
      <div className="icon icon-2">
        <a
          href="#canvnasQuickview"
          data-bs-toggle="offcanvas"
          onClick={() => {
            setQuickViewItem(product);
          }}
        >
          <i className="icon-Eye" />
        </a>
      </div>
    </>
  );
}
