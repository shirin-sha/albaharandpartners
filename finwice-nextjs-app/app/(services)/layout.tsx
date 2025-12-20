import Footer1 from "@/components/footers/Footer1";
import Header7 from "@/components/headers/Header7";
import React from "react";

import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="mb-20" />
      <Header7 />
      {children}
      <Footer1 />
    </>
  );
}
