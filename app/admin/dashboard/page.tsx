"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("adminUser");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: "30px" }}>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "600",
            color: "var(--on-suface-container)",
            marginBottom: "8px",
          }}
        >
          Dashboard
        </h1>
        <p style={{ fontSize: "14px", color: "var(--on-suface-variant-1)" }}>
          Welcome back{user?.name ? `, ${user.name}` : ""}! Here&apos;s an overview of your admin panel.
        </p>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {/* Card 1 */}
        <div
          style={{
            background: "var(--white)",
            borderRadius: "12px",
            padding: "24px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "10px",
                background: "rgba(var(--primary-rgb), 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i className="icon-House" style={{ fontSize: "24px", color: "var(--primary)" }}></i>
            </div>
            <div>
              <p style={{ fontSize: "13px", color: "var(--on-suface-variant-1)", marginBottom: "4px" }}>
                Quick Links
              </p>
              <p style={{ fontSize: "24px", fontWeight: "600", color: "var(--on-suface-container)" }}>
                Coming Soon
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div
          style={{
            background: "var(--white)",
            borderRadius: "12px",
            padding: "24px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "10px",
                background: "rgba(76, 175, 80, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i className="icon-Check" style={{ fontSize: "24px", color: "#4CAF50" }}></i>
            </div>
            <div>
              <p style={{ fontSize: "13px", color: "var(--on-suface-variant-1)", marginBottom: "4px" }}>
                System Status
              </p>
              <p style={{ fontSize: "24px", fontWeight: "600", color: "#4CAF50" }}>
                Online
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div
          style={{
            background: "var(--white)",
            borderRadius: "12px",
            padding: "24px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "10px",
                background: "rgba(33, 150, 243, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i className="icon-User" style={{ fontSize: "24px", color: "#2196F3" }}></i>
            </div>
            <div>
              <p style={{ fontSize: "13px", color: "var(--on-suface-variant-1)", marginBottom: "4px" }}>
                Logged in as
              </p>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "var(--on-suface-container)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "150px",
                }}
              >
                {user?.email || "Admin"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Card */}
      <div
        style={{
          background: "var(--white)",
          borderRadius: "12px",
          padding: "32px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "var(--on-suface-container)",
            marginBottom: "16px",
          }}
        >
          Getting Started
        </h2>
        <p style={{ fontSize: "15px", color: "var(--on-suface-variant-1)", marginBottom: "24px", lineHeight: "1.6" }}>
          This is your admin dashboard. Use the sidebar to navigate between different sections.
          Quick links will be added to help you manage your content efficiently.
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Link
            href="/"
            target="_blank"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 20px",
              background: "var(--primary)",
              color: "var(--white)",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "500",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
            <i className="icon-ArrowSquareOut" style={{ fontSize: "16px" }}></i>
            View Website
          </Link>
        </div>
      </div>
    </div>
  );
}
