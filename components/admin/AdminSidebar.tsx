"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
  label: string;
  href: string;
  icon: string;
}

interface DropdownItem {
  label: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { label: "Enquiries", href: "/admin/enquiries", icon: "icon-ChatCircleText" },
  { label: "Brand Management", href: "/admin/managebrands", icon: "icon-Edit" },
  { label: "News Management", href: "/admin/managenews", icon: "icon-Edit" },
];

const cmsItems: DropdownItem[] = [
  { label: "Homepage", href: "/admin/homepage" },
  { label: "About Us", href: "/admin/cms/about-us" },
  { label: "Solutions", href: "/admin/cms/solutions" },
  { label: "Brands", href: "/admin/cms/brands" },
  { label: "Customer Stories", href: "/admin/cms/customer-stories" },
  { label: "News and Updates", href: "/admin/cms/news-updates" },
  { label: "Careers", href: "/admin/cms/careers" },
  { label: "Support", href: "/admin/cms/support" },
  { label: "Contact Us", href: "/admin/cms/contact-us" },
  { label: "Header", href: "/admin/cms/header" },
  { label: "Footer", href: "/admin/cms/footer" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [cmsOpen, setCmsOpen] = useState(pathname.startsWith("/admin/cms") || pathname.startsWith("/admin/homepage"));

  const isCmsActive = pathname.startsWith("/admin/cms") || pathname.startsWith("/admin/homepage");

  return (
    <aside
      className="admin-sidebar"
      style={{
        width: "260px",
        minHeight: "100vh",
        background: "var(--white)",
        borderRight: "1px solid var(--outline)",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        zIndex: 100,
      }}
    >
      {/* Logo Section */}
      <div
        className="sidebar-logo"
        style={{
          padding: "20px 24px",
          borderBottom: "1px solid var(--outline)",
        }}
      >
        <Link href="/admin/homepage">
          <img
            src="/image/logo/logo-2.png"
            alt="Al Bahar & Partners"
            style={{ height: "40px", width: "auto" }}
          />
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav
        className="sidebar-nav"
        style={{
          flex: 1,
          padding: "20px 0",
          overflowY: "auto",
        }}
      >
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {menuItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href === "/admin/managebrands" && pathname.startsWith("/admin/managebrands")) ||
              (item.href === "/admin/managenews" && pathname.startsWith("/admin/managenews"));
            return (
              <li key={item.href} style={{ marginBottom: "4px" }}>
                <Link
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 24px",
                    color: isActive ? "var(--primary)" : "var(--on-suface-variant-1)",
                    background: isActive ? "rgba(var(--primary-rgb), 0.08)" : "transparent",
                    borderLeft: isActive ? "3px solid var(--primary)" : "3px solid transparent",
                    textDecoration: "none",
                    fontSize: "15px",
                    fontWeight: isActive ? "500" : "400",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "var(--bg-1)";
                      e.currentTarget.style.color = "var(--on-suface-container)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "var(--on-suface-variant-1)";
                    }
                  }}
                >
                  <i className={item.icon} style={{ fontSize: "20px" }}></i>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}

          {/* CMS Dropdown */}
          <li style={{ marginBottom: "4px" }}>
            <button
              onClick={() => setCmsOpen(!cmsOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                gap: "12px",
                padding: "12px 24px",
                color: isCmsActive ? "var(--primary)" : "var(--on-suface-variant-1)",
                background: isCmsActive ? "rgba(var(--primary-rgb), 0.08)" : "transparent",
                borderLeft: isCmsActive ? "3px solid var(--primary)" : "3px solid transparent",
                borderTop: "none",
                borderRight: "none",
                borderBottom: "none",
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: isCmsActive ? "500" : "400",
                transition: "all 0.2s ease",
                cursor: "pointer",
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                if (!isCmsActive) {
                  e.currentTarget.style.background = "var(--bg-1)";
                  e.currentTarget.style.color = "var(--on-suface-container)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isCmsActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--on-suface-variant-1)";
                }
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <i className="icon-Notebook" style={{ fontSize: "20px" }}></i>
                <span>CMS</span>
              </span>
              <i
                className="icon-CaretDown"
                style={{
                  fontSize: "16px",
                  transition: "transform 0.2s ease",
                  transform: cmsOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              ></i>
            </button>

            {/* CMS Submenu */}
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                maxHeight: cmsOpen ? "500px" : "0",
                overflow: "hidden",
                transition: "max-height 0.3s ease",
              }}
            >
              {cmsItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      style={{
                        display: "block",
                        padding: "10px 24px 10px 60px",
                        color: isActive ? "var(--primary)" : "var(--on-suface-variant-1)",
                        background: isActive ? "rgba(var(--primary-rgb), 0.05)" : "transparent",
                        textDecoration: "none",
                        fontSize: "14px",
                        fontWeight: isActive ? "500" : "400",
                        transition: "all 0.2s ease",
                        borderLeft: isActive ? "3px solid var(--primary)" : "3px solid transparent",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = "var(--bg-1)";
                          e.currentTarget.style.color = "var(--on-suface-container)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "var(--on-suface-variant-1)";
                        }
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>

        {/* Quick Links Section - Placeholder for future links */}
        <div
          style={{
            marginTop: "20px",
            padding: "0 24px",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              fontWeight: "600",
              color: "var(--on-suface-variant-1)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "12px",
            }}
          >
            Quick Links
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li>
              <Link
                href="/"
                target="_blank"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 0",
                  color: "var(--on-suface-variant-1)",
                  textDecoration: "none",
                  fontSize: "14px",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--on-suface-variant-1)";
                }}
              >
                <i className="icon-ArrowSquareOut" style={{ fontSize: "18px" }}></i>
                <span>View Website</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: "16px 24px",
          borderTop: "1px solid var(--outline)",
          fontSize: "12px",
          color: "var(--on-suface-variant-1)",
        }}
      >
        <p style={{ margin: 0 }}>Admin Panel v1.0</p>
      </div>
    </aside>
  );
}
