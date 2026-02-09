"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

interface AdminLayoutWrapperProps {
  children: React.ReactNode;
}

export default function AdminLayoutWrapper({ children }: AdminLayoutWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === "/admin") {
      setIsAuthenticated(true);
      return;
    }

    // Check authentication for other admin pages
    const token = localStorage.getItem("adminToken");
    const userData = localStorage.getItem("adminUser");

    if (!token || !userData) {
      router.push("/admin");
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "var(--bg-1)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "3px solid var(--outline)",
              borderTopColor: "var(--primary)",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          ></div>
          <span style={{ color: "var(--on-suface-variant-1)" }}>Loading...</span>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  // Login page - render without sidebar/header
  if (pathname === "/admin") {
    return <>{children}</>;
  }

  // Dashboard and other admin pages - render with sidebar/header
  return (
    <div className="admin-layout" style={{ minHeight: "100vh", background: "var(--bg-1)" }}>
      <AdminSidebar />
      <AdminHeader />
      <main
        className="admin-main"
        style={{
          marginLeft: "260px",
          paddingTop: "70px",
          minHeight: "100vh",
        }}
      >
        <div
          className="admin-content"
          style={{
            padding: "30px",
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
