"use client";

import { useContextElement } from "@/context/Context";
import React from "react";

export default function SearchButton() {
  const { setIsSearchModalOpen } = useContextElement();
  return (
    <a
      href="#"
      onClick={() => setIsSearchModalOpen(true)}
      className="search-btn"
    >
      <i className="icon-MagnifyingGlass" />
    </a>
  );
}
