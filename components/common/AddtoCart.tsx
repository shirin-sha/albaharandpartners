"use client";

import { useContextElement } from "@/context/Context";
import { Product } from "@/types/products";

interface AddtoCartProps {
  product: Product;
}

export default function AddtoCart({ product }: AddtoCartProps) {
  const { addProductToCart, isAddedToCartProducts } = useContextElement();
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        if (product.id) {
          addProductToCart(product.id);
        }
      }}
      className="tf-btn bg-on-suface-container style-3 text-center w-full"
    >
      <span>
        {isAddedToCartProducts(product.id) ? "Already Added" : "Add to Cart"}
      </span>
    </a>
  );
}
