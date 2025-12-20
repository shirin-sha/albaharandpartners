import Footer1 from "@/components/footers/Footer1";
import Header7 from "@/components/headers/Header7";
import React from "react";
import "photoswipe/dist/photoswipe.css";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function layout({ children }: LayoutProps) {
  return (
    <>
      <div className="mb-20" />
      <Header7 />
      {children}
      <Footer1 />
    </>
  );
}
