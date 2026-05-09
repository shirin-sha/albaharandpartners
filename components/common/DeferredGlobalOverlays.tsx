"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Quickview = dynamic(() => import("@/components/modals/Quickview"));
const Search = dynamic(() => import("@/components/modals/Search"));
const SideOffcanvas = dynamic(() => import("@/components/modals/SideOffcanvas"));

export default function DeferredGlobalOverlays() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    const enable = () => setShouldLoad(true);

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      (window as any).requestIdleCallback(enable, { timeout: 1500 });
    } else {
      timer = setTimeout(enable, 1200);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  if (!shouldLoad) return null;

  return (
    <>
      <Quickview />
      <Search />
      <SideOffcanvas />
    </>
  );
}

