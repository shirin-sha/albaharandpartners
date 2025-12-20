"use client";
import React, { useEffect } from "react";

export default function RtlHandler() {
  useEffect(() => {
    // Store the original dir (default "ltr" if missing)
    const originalDir = document.documentElement.getAttribute("dir") || "ltr";

    // Set to RTL
    document.documentElement.setAttribute("dir", "rtl");
    document.body.classList.add("rtl");

    // Clean up on unmount: restore original dir and remove "rtl" class
    return () => {
      document.documentElement.setAttribute("dir", originalDir);
      document.body.classList.remove("rtl");
    };
  }, []);
  return <></>;
}
